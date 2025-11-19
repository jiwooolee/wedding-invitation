import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react"
import "./index.scss"
import { VolumeOnIcon } from "../../icons/volumeOn"
import { VolumeOffIcon } from "../../icons/volumeOff"

export const AudioPlayer = forwardRef((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current
      if (audio) {
        const promise = audio.play()
        if (promise !== undefined) {
          promise
            .then(() => {
              setIsPlaying(true)
            })
            .catch(() => {
              setIsPlaying(false)
            })
        }
        return promise
      }
      return Promise.reject("Audio element not found")
    },
  }))

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
