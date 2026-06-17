import { useCallback, useEffect, useRef, useState } from 'react'

const MIN_SCALE = 1
const DOUBLE_TAP_MS = 320
const DOUBLE_TAP_SCALE = 2.5
const TAP_MOVE_THRESHOLD_PX = 12
const TAP_MAX_DURATION_MS = 280

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function getTouchDistance(touches) {
  const [first, second] = touches
  return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY)
}

function getTouchCenter(touches, container) {
  const rect = container.getBoundingClientRect()
  const [first, second] = touches

  return {
    x: (first.clientX + second.clientX) / 2 - rect.left,
    y: (first.clientY + second.clientY) / 2 - rect.top,
  }
}

function clampTranslation(scale, x, y, container) {
  if (scale <= 1) {
    return { x: 0, y: 0 }
  }

  const maxX = (container.clientWidth * (scale - 1)) / 2
  const maxY = (container.clientHeight * (scale - 1)) / 2

  return {
    x: clamp(x, -maxX, maxX),
    y: clamp(y, -maxY, maxY),
  }
}

function zoomAroundPoint({ scale, x, y, center, nextScale }) {
  const contentX = (center.x - x) / scale
  const contentY = (center.y - y) / scale

  return {
    scale: nextScale,
    x: center.x - contentX * nextScale,
    y: center.y - contentY * nextScale,
  }
}

/**
 * Viewport con pinch-to-zoom e pan su dispositivi touch.
 */
export function PinchZoomImage({
  children,
  className = '',
  stageClassName = '',
  maxScale = 4,
  resetKey,
  onZoomChange,
  onSingleTap,
  onActivate,
  ariaLabel,
}) {
  const viewportRef = useRef(null)
  const transformRef = useRef({ scale: 1, x: 0, y: 0 })
  const gestureRef = useRef(null)
  const lastTapRef = useRef(null)
  const tapRef = useRef(null)

  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 })

  const applyTransform = useCallback(
    (next) => {
      const container = viewportRef.current
      const clamped = container
        ? clampTranslation(next.scale, next.x, next.y, container)
        : next
      const normalized = {
        scale: clamp(clamped.scale, MIN_SCALE, maxScale),
        x: clamped.scale <= 1 ? 0 : clamped.x,
        y: clamped.scale <= 1 ? 0 : clamped.y,
      }

      transformRef.current = normalized
      setTransform(normalized)
      onZoomChange?.(normalized.scale > 1.01)
    },
    [maxScale, onZoomChange],
  )

  const resetTransform = useCallback(() => {
    applyTransform({ scale: 1, x: 0, y: 0 })
  }, [applyTransform])

  useEffect(() => {
    resetTransform()
  }, [resetKey, resetTransform])

  const handleTouchStart = useCallback(
    (event) => {
      const container = viewportRef.current
      if (!container) return

      if (event.touches.length === 2) {
        tapRef.current = null
        lastTapRef.current = null

        const center = getTouchCenter(event.touches, container)
        const { scale, x, y } = transformRef.current

        gestureRef.current = {
          mode: 'pinch',
          startDistance: getTouchDistance(event.touches),
          startScale: scale,
          startX: x,
          startY: y,
          startCenter: center,
        }
        return
      }

      if (event.touches.length === 1 && transformRef.current.scale > 1.01) {
        const touch = event.touches[0]
        gestureRef.current = {
          mode: 'pan',
          startX: touch.clientX,
          startY: touch.clientY,
          originX: transformRef.current.x,
          originY: transformRef.current.y,
        }
        return
      }

      if (event.touches.length === 1 && (onSingleTap || onActivate)) {
        const touch = event.touches[0]
        tapRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now(),
        }
      }
    },
    [onActivate, onSingleTap],
  )

  const handleTouchMove = useCallback(
    (event) => {
      const container = viewportRef.current
      const gesture = gestureRef.current

      if (tapRef.current && event.touches.length === 1 && !gesture) {
        const touch = event.touches[0]
        const deltaX = touch.clientX - tapRef.current.x
        const deltaY = touch.clientY - tapRef.current.y

        if (Math.hypot(deltaX, deltaY) > TAP_MOVE_THRESHOLD_PX) {
          tapRef.current = null
          lastTapRef.current = null
        }
      }

      if (!container || !gesture) return

      if (gesture.mode === 'pinch' && event.touches.length === 2) {
        event.preventDefault()

        const center = getTouchCenter(event.touches, container)
        const distanceRatio = getTouchDistance(event.touches) / gesture.startDistance
        const nextScale = clamp(gesture.startScale * distanceRatio, MIN_SCALE, maxScale)
        const zoomed = zoomAroundPoint({
          scale: gesture.startScale,
          x: gesture.startX,
          y: gesture.startY,
          center,
          nextScale,
        })

        applyTransform(zoomed)
        return
      }

      if (gesture.mode === 'pan' && event.touches.length === 1) {
        event.preventDefault()

        const touch = event.touches[0]
        const deltaX = touch.clientX - gesture.startX
        const deltaY = touch.clientY - gesture.startY

        applyTransform({
          scale: transformRef.current.scale,
          x: gesture.originX + deltaX,
          y: gesture.originY + deltaY,
        })
      }
    },
    [applyTransform, maxScale],
  )

  const handleTouchEnd = useCallback(
    (event) => {
      const gesture = gestureRef.current

      if (gesture?.mode === 'pinch' && event.touches.length < 2) {
        gestureRef.current = null

        if (transformRef.current.scale <= 1.01) {
          resetTransform()
        }
        return
      }

      if (gesture?.mode === 'pan' && event.touches.length === 0) {
        gestureRef.current = null
        return
      }

      if (event.touches.length > 0) return
      if (gesture) {
        gestureRef.current = null
        return
      }

      if (!onSingleTap && !onActivate) return
      if (transformRef.current.scale > 1.01) return

      const activate = onSingleTap ?? onActivate
      if (!activate) return

      const touch = event.changedTouches[0]
      if (!touch) return

      const pendingTap = tapRef.current
      tapRef.current = null
      if (!pendingTap) return

      const now = Date.now()
      const duration = now - pendingTap.time
      const movement = Math.hypot(touch.clientX - pendingTap.x, touch.clientY - pendingTap.y)

      if (movement > TAP_MOVE_THRESHOLD_PX || duration > TAP_MAX_DURATION_MS) {
        lastTapRef.current = null
        return
      }

      const lastTap = lastTapRef.current

      if (lastTap && now - lastTap.time <= DOUBLE_TAP_MS) {
        const container = viewportRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const center = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        }

        if (transformRef.current.scale > 1.01) {
          resetTransform()
        } else {
          applyTransform(
            zoomAroundPoint({
              scale: 1,
              x: 0,
              y: 0,
              center,
              nextScale: DOUBLE_TAP_SCALE,
            }),
          )
        }

        lastTapRef.current = null
        return
      }

      lastTapRef.current = { time: now, x: touch.clientX, y: touch.clientY }

      window.setTimeout(() => {
        const pendingTap = lastTapRef.current
        if (!pendingTap || pendingTap.time !== now) return

        lastTapRef.current = null
        activate()
      }, DOUBLE_TAP_MS)
    },
    [applyTransform, onActivate, onSingleTap, resetTransform],
  )

  const handleTouchCancel = useCallback(() => {
    gestureRef.current = null
    tapRef.current = null
  }, [])

  const handleClick = useCallback(() => {
    if (transformRef.current.scale > 1.01) return
    onActivate?.()
  }, [onActivate])

  return (
    <div
      ref={viewportRef}
      className={`pinch-zoom-image ${className}`.trim()}
      onTouchStart={(event) => {
        handleTouchStart(event)
        event.stopPropagation()
      }}
      onTouchMove={(event) => {
        handleTouchMove(event)
        event.stopPropagation()
      }}
      onTouchEnd={(event) => {
        handleTouchEnd(event)
        event.stopPropagation()
      }}
      onTouchCancel={(event) => {
        handleTouchCancel(event)
        event.stopPropagation()
      }}
      onClick={onActivate ? handleClick : undefined}
      role={onActivate ? 'button' : undefined}
      aria-label={ariaLabel}
      tabIndex={onActivate ? 0 : undefined}
      onKeyDown={
        onActivate
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onActivate()
              }
            }
          : undefined
      }
    >
      <div
        className={`pinch-zoom-image__stage ${stageClassName}`.trim()}
        style={{
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
