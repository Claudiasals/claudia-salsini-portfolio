import { useCallback, useEffect, useRef, useState } from 'react'
import { FaCompress, FaExpand, FaPause, FaPlay } from 'react-icons/fa'
import { useVideoVolumeBoost } from '../hooks/useVideoVolumeBoost'

const PAUSE_CONTROL_HIDE_MS = 1000

const isIOSDevice = () => {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

function formatVideoTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const minutes = Math.floor(total / 60)
  const secs = total % 60
  return `${minutes}:${String(secs).padStart(2, '0')}`
}

function playWhenReady(video) {
  if (video.seeking) {
    return new Promise((resolve, reject) => {
      const onSeeked = () => {
        video.removeEventListener('seeked', onSeeked)
        resolve(video.play())
      }
      const onError = () => {
        video.removeEventListener('error', onError)
        reject(new Error('Seek failed'))
      }
      video.addEventListener('seeked', onSeeked, { once: true })
      video.addEventListener('error', onError, { once: true })
    })
  }

  return video.play()
}

/**
 * Demo video a tutta larghezza senza crop (object-fit: contain).
 * Play sempre visibile in pausa; in riproduzione la pausa compare 1s poi sparisce
 * finché il cursore non esce dal video e vi rientra. Barra seek sempre in basso.
 */
export function ProjectDemoVideo({ src, poster, volumeGain = 1.35, className = '' }) {
  const frameRef = useRef(null)
  const videoRef = useVideoVolumeBoost(volumeGain)
  const hidePauseTimerRef = useRef(null)
  const isSeekingRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPauseControl, setShowPauseControl] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const syncCurrentTime = useCallback(() => {
    const video = videoRef.current
    if (video && Number.isFinite(video.currentTime)) {
      setCurrentTime(video.currentTime)
    }
  }, [videoRef])

  const clearHidePauseTimer = useCallback(() => {
    if (hidePauseTimerRef.current != null) {
      window.clearTimeout(hidePauseTimerRef.current)
      hidePauseTimerRef.current = null
    }
  }, [])

  const scheduleHidePauseControl = useCallback(() => {
    clearHidePauseTimer()
    hidePauseTimerRef.current = window.setTimeout(() => {
      setShowPauseControl(false)
      hidePauseTimerRef.current = null
    }, PAUSE_CONTROL_HIDE_MS)
  }, [clearHidePauseTimer])

  const revealPauseControl = useCallback(() => {
    setShowPauseControl(true)
    scheduleHidePauseControl()
  }, [scheduleHidePauseControl])

  const togglePlayback = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    isSeekingRef.current = false

    if (!video.paused) {
      video.pause()
      return
    }

    void playWhenReady(video).catch(() => {
      /* play interrotto (es. seek rapido): ignorato */
    })
  }, [videoRef])

  const handleSeek = useCallback(
    (event) => {
      const video = videoRef.current
      if (!video || !Number.isFinite(video.duration)) return

      const nextTime = Number(event.target.value)
      video.currentTime = nextTime
      setCurrentTime(nextTime)
    },
    [videoRef],
  )

  const handleSeekStart = useCallback(() => {
    isSeekingRef.current = true
    const video = videoRef.current
    if (video && !video.paused) {
      video.pause()
    }
  }, [videoRef])

  const finishSeeking = useCallback(() => {
    isSeekingRef.current = false
    syncCurrentTime()
  }, [syncCurrentTime])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const syncDuration = () => {
      if (Number.isFinite(video.duration)) {
        setDuration(video.duration)
      }
    }

    const onTimeUpdate = () => {
      if (!isSeekingRef.current) {
        setCurrentTime(video.currentTime)
      }
    }

    const onPlay = () => {
      setIsPlaying(true)
      revealPauseControl()
    }

    const onPause = () => {
      setIsPlaying(false)
      setShowPauseControl(false)
      clearHidePauseTimer()
    }

    const onSeeked = () => {
      finishSeeking()
    }

    syncDuration()
    video.addEventListener('loadedmetadata', syncDuration)
    video.addEventListener('durationchange', syncDuration)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onPause)

    return () => {
      video.removeEventListener('loadedmetadata', syncDuration)
      video.removeEventListener('durationchange', syncDuration)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onPause)
      clearHidePauseTimer()
    }
  }, [videoRef, revealPauseControl, clearHidePauseTimer, finishSeeking])

  const handleFrameMouseEnter = useCallback(() => {
    if (!isPlaying) return
    revealPauseControl()
  }, [isPlaying, revealPauseControl])

  const handleFrameMouseLeave = useCallback(() => {
    if (!isPlaying) return
    setShowPauseControl(false)
    clearHidePauseTimer()
  }, [isPlaying, clearHidePauseTimer])

  const toggleFullscreen = useCallback(async () => {
    const frame = frameRef.current
    const video = videoRef.current
    if (!frame && !video) return

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        return
      }

      if (isIOSDevice() && video?.webkitEnterFullscreen) {
        video.webkitEnterFullscreen()
        return
      }

      if (frame?.requestFullscreen) {
        await frame.requestFullscreen()
        return
      }

      if (video?.webkitEnterFullscreen) {
        video.webkitEnterFullscreen()
      }
    } catch {
      /* fullscreen non supportato o rifiutato */
    }
  }, [videoRef])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const frameClass = [
    'project-case-video__frame',
    'project-case-video__frame--contain',
    isPlaying ? 'is-playing' : '',
    isPlaying && showPauseControl ? 'is-pause-control-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const seekMax = duration > 0 ? duration : 0

  return (
    <div
      ref={frameRef}
      className={frameClass}
      onMouseEnter={handleFrameMouseEnter}
      onMouseLeave={handleFrameMouseLeave}
    >
      <video
        ref={videoRef}
        className="project-case-video__player"
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        onClick={togglePlayback}
      >
        Il tuo browser non supporta il tag video.
      </video>

      <div className="project-case-video__controls">
        <input
          type="range"
          className="project-case-video__seek"
          min={0}
          max={seekMax}
          step={0.1}
          value={Math.min(currentTime, seekMax)}
          disabled={seekMax <= 0}
          aria-label="Posizione nel video"
          aria-valuemin={0}
          aria-valuemax={seekMax}
          aria-valuenow={currentTime}
          aria-valuetext={`${formatVideoTime(currentTime)} su ${formatVideoTime(duration)}`}
          onChange={handleSeek}
          onInput={handleSeek}
          onPointerDown={handleSeekStart}
          onPointerUp={finishSeeking}
          onPointerCancel={finishSeeking}
          onBlur={finishSeeking}
        />
        <div className="project-case-video__time" aria-hidden>
          <span>{formatVideoTime(currentTime)}</span>
          <span className="project-case-video__time-sep">/</span>
          <span>{formatVideoTime(duration)}</span>
        </div>
      </div>

      <div className="project-case-video__fullscreen-wrap">
        <button
          type="button"
          className="nav-btn project-case-video__fullscreen-btn"
          onClick={(event) => {
            event.stopPropagation()
            void toggleFullscreen()
          }}
          aria-label={isFullscreen ? 'Esci da schermo intero' : 'Schermo intero'}
        >
          <span className="nav-btn-inner flex items-center justify-center">
            {isFullscreen ? (
              <FaCompress className="project-case-video__fullscreen-icon" aria-hidden />
            ) : (
              <FaExpand className="project-case-video__fullscreen-icon" aria-hidden />
            )}
          </span>
        </button>
      </div>

      <div className="project-case-video__toggle-wrap">
        <button
          type="button"
          className="nav-btn project-case-video__toggle"
          onClick={(event) => {
            event.stopPropagation()
            togglePlayback()
          }}
          aria-label={isPlaying ? 'Metti in pausa il video' : 'Avvia il video'}
        >
          <span className="nav-btn-inner flex items-center justify-center">
            {isPlaying ? (
              <FaPause className="project-case-video__toggle-icon" aria-hidden />
            ) : (
              <FaPlay
                className="project-case-video__toggle-icon project-case-video__toggle-icon--play"
                aria-hidden
              />
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
