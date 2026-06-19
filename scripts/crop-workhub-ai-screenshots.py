"""Crop admin WorkHub +AI screenshots: remove sidebar except centro operativo."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "public" / "images" / "projects" / "workhub"

# Sidebar ~210px at 1024px width; top app header ~56px
SIDEBAR = 210


def crop_box(img: Image.Image, left: int, top: int, right: int, bottom: int) -> Image.Image:
    w, h = img.size
    return img.crop((max(0, left), max(0, top), min(w, right), min(h, bottom)))


def save(path: Path, img: Image.Image) -> None:
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")
    img.save(path, format="PNG", optimize=True)
    print(f"  saved {path.name} {img.size[0]}x{img.size[1]}")


def main() -> None:
    crops = {
        "ai-admin-overview-turni.png": (SIDEBAR, 48, 1024, 512),
        "ai-admin-ticket.png": (SIDEBAR, 48, 1024, 681),
        "ai-admin-customer.png": (SIDEBAR, 158, 1024, 681),
    }

    for name, (l, t, r, b) in crops.items():
        path = IMG / name
        img = Image.open(path)
        cropped = crop_box(img, l, t, r, b)
        save(path, cropped)


if __name__ == "__main__":
    main()
