"""Rimozione alone bianco sul bordo capelli (solo pixel collegati a trasparenza esterna)."""
from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'public/images/foto-ibrida-portfolio.png'
BAK = ROOT / 'public/images/foto-ibrida-portfolio.png.bak'

ALPHA_BG = 28
FACE_Y0_RATIO = 0.095
FACE_X0_RATIO = 0.33
FACE_X1_RATIO = 0.67
HAIR_Y_MAX_RATIO = 0.19


def main() -> None:
    source = BAK if BAK.exists() else SRC
    arr = np.array(Image.open(source).convert('RGBA'), dtype=np.uint8)
    h, w = arr.shape[:2]

    face_y0 = int(h * FACE_Y0_RATIO)
    face_x0 = int(w * FACE_X0_RATIO)
    face_x1 = int(w * FACE_X1_RATIO)
    hair_y_max = int(h * HAIR_Y_MAX_RATIO)

    r = arr[:, :, 0].astype(np.float32)
    g = arr[:, :, 1].astype(np.float32)
    b = arr[:, :, 2].astype(np.float32)
    a = arr[:, :, 3].astype(np.float32)
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    sat = np.divide(mx - mn, mx, out=np.zeros_like(mx), where=mx > 0)

    external = _flood_external_alpha(a, ALPHA_BG)

    def in_hair_zone(y: int, x: int) -> bool:
        if y >= hair_y_max:
            return False
        if y >= face_y0 and face_x0 <= x <= face_x1:
            return False
        return True

    def is_light_fringe(y: int, x: int) -> bool:
        if a[y, x] < 30:
            return False
        if mx[y, x] < 208 or sat[y, x] > 0.2:
            return False
        return mx[y, x] >= 205

    def is_hair_blocker(y: int, x: int) -> bool:
        return a[y, x] > 100 and mx[y, x] < 175 and sat[y, x] < 0.45

    fringe = _fringe_connected_to_external(
        external, in_hair_zone, is_light_fringe, is_hair_blocker, hair_y_max, w
    )

    fixed = _repair_fringe_pixels(arr, fringe, external, r, g, b, a, mx, sat, hair_y_max, h, w)

    Image.fromarray(arr, 'RGBA').save(SRC, optimize=True)
    print(f'fixed {fixed} fringe pixels -> {SRC}')


def _flood_external_alpha(alpha: np.ndarray, threshold: int) -> np.ndarray:
    h, w = alpha.shape
    external = np.zeros((h, w), dtype=bool)
    visited = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if alpha[y, x] < threshold and not visited[y, x]:
                visited[y, x] = True
                external[y, x] = True
                q.append((x, y))

    for y in range(h):
        for x in (0, w - 1):
            if alpha[y, x] < threshold and not visited[y, x]:
                visited[y, x] = True
                external[y, x] = True
                q.append((x, y))

    while q:
        x, y = q.popleft()
        for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nx, ny = x + dx, y + dy
            if nx < 0 or ny < 0 or nx >= w or ny >= h:
                continue
            if visited[ny, nx] or alpha[ny, nx] >= threshold:
                continue
            visited[ny, nx] = True
            external[ny, nx] = True
            q.append((nx, ny))

    return external


def _fringe_connected_to_external(
    external, in_hair_zone, is_light_fringe, is_hair_blocker, hair_y_max, w
):
    h = external.shape[0]
    fringe = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    for y in range(hair_y_max):
        for x in range(w):
            if not in_hair_zone(y, x) or not is_light_fringe(y, x):
                continue
            if not _touches_mask(y, x, external, fringe, h, w):
                continue
            fringe[y, x] = True
            q.append((x, y))

    while q:
        x, y = q.popleft()
        for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nx, ny = x + dx, y + dy
            if nx < 0 or ny < 0 or nx >= w or ny >= hair_y_max:
                continue
            if not in_hair_zone(ny, nx) or fringe[ny, nx]:
                continue
            if is_hair_blocker(ny, nx) or not is_light_fringe(ny, nx):
                continue
            fringe[ny, nx] = True
            q.append((nx, ny))

    return fringe


def _touches_mask(y, x, mask_a, mask_b, h, w):
    for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)):
        ny, nx = y + dy, x + dx
        if ny < 0 or nx < 0 or ny >= h or nx >= w:
            return True
        if mask_a[ny, nx] or mask_b[ny, nx]:
            return True
    return False


def _sample_hair(y, x, fringe, external, r, g, b, a, mx, sat, h, w):
    rs, gs, bs, ws = [], [], [], []
    for dy in range(-7, 8):
        for dx in range(-7, 8):
            ny, nx = y + dy, x + dx
            if ny < 0 or nx < 0 or ny >= h or nx >= w:
                continue
            if fringe[ny, nx] or external[ny, nx]:
                continue
            if a[ny, nx] < 150:
                continue
            if mx[ny, nx] >= 228 and sat[ny, nx] < 0.14:
                continue
            weight = 1.0 / (abs(dx) + abs(dy) + 0.5)
            rs.append(r[ny, nx] * weight)
            gs.append(g[ny, nx] * weight)
            bs.append(b[ny, nx] * weight)
            ws.append(weight)

    if not ws:
        return None

    total = sum(ws)
    return (
        int(np.clip(sum(rs) / total, 0, 255)),
        int(np.clip(sum(gs) / total, 0, 255)),
        int(np.clip(sum(bs) / total, 0, 255)),
    )


def _repair_fringe_pixels(arr, fringe, external, r, g, b, a, mx, sat, hair_y_max, h, w):
    fixed = 0
    for y in range(hair_y_max):
        for x in range(w):
            if not fringe[y, x]:
                continue

            sampled = _sample_hair(y, x, fringe, external, r, g, b, a, mx, sat, h, w)
            alpha_val = float(a[y, x])

            if sampled:
                arr[y, x, 0], arr[y, x, 1], arr[y, x, 2] = sampled
                if mx[y, x] >= 225:
                    arr[y, x, 3] = int(np.clip(alpha_val * 0.55, 0, 220))
                else:
                    arr[y, x, 3] = int(np.clip(alpha_val, 120, 255))
            else:
                alpha_norm = max(alpha_val / 255.0, 0.05)
                nr = int(np.clip((r[y, x] - (1.0 - alpha_norm) * 255) / alpha_norm, 0, 255))
                ng = int(np.clip((g[y, x] - (1.0 - alpha_norm) * 255) / alpha_norm, 0, 255))
                nb = int(np.clip((b[y, x] - (1.0 - alpha_norm) * 255) / alpha_norm, 0, 255))
                arr[y, x, 0], arr[y, x, 1], arr[y, x, 2] = nr, ng, nb
                arr[y, x, 3] = int(np.clip(alpha_val * 0.4, 0, 180))

            fixed += 1

    return fixed


if __name__ == '__main__':
    main()
