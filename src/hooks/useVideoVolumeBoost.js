import { useEffect, useRef } from 'react'

/** Boost leggero oltre il massimo del controllo volume nativo del `<video>` (1.0). */
export const useVideoVolumeBoost = (gain = 1.35) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || gain <= 1) return undefined

    let audioContext = null
    let source = null
    let gainNode = null

    const attachBoost = () => {
      if (video.dataset.volumeBoost === 'true') return

      try {
        audioContext = new AudioContext()
        source = audioContext.createMediaElementSource(video)
        gainNode = audioContext.createGain()
        gainNode.gain.value = gain
        source.connect(gainNode)
        gainNode.connect(audioContext.destination)
        video.dataset.volumeBoost = 'true'
        video.volume = 1
      } catch {
        video.volume = 1
      }
    }

    const resumeOnPlay = () => {
      if (audioContext?.state === 'suspended') {
        void audioContext.resume()
      }
    }

    if (video.readyState >= 1) {
      attachBoost()
    } else {
      video.addEventListener('loadedmetadata', attachBoost, { once: true })
    }

    video.addEventListener('play', resumeOnPlay)

    return () => {
      video.removeEventListener('play', resumeOnPlay)
      source?.disconnect()
      gainNode?.disconnect()
      void audioContext?.close()
      delete video.dataset.volumeBoost
    }
  }, [gain])

  return videoRef
}
