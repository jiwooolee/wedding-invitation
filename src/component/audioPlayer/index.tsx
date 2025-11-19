import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react"
import "./index.scss"
import { VolumeOnIcon } from "../../icons/volumeOn"
import { VolumeOffIcon } from "../../icons/volumeOff"

export const AudioPlayer = forwardRef((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const timer = setTimeout(() => {
      const promise = audio.play()
      promise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
          const onFirstInteraction = () => {
            togglePlay()
          }
          window.addEventListener("click", onFirstInteraction, { once: true })
          window.addEventListener("touchstart", onFirstInteraction, {
            once: true,
          })
        })
    }, 150)

    return () => {
      clearTimeout(timer)
      // Listeners with { once: true } are auto-removed, but good practice to have a cleanup
      // This is complex because onFirstInteraction is not stable.
      // For this case, we rely on `once: true`.
    }
  }, [])

  useImperativeHandle(ref, () => ({}))

  const togglePlay = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        if (audio.muted) {
          audio.muted = false
        } else {
          audio.pause()
          setIsPlaying(false)
        }
      } else {
        audio.muted = false
        audio
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            setIsPlaying(false)
          })
      }
    }
  }

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}BGM.mp3`}
        preload="auto"
        loop
        muted
        playsInline
      />
      <button onClick={togglePlay} className="control-button">
        {isPlaying ? <VolumeOnIcon /> : <VolumeOffIcon />}
      </button>
    </div>
  )
})
