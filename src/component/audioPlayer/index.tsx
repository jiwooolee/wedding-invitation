import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import "./index.scss"
import { VolumeOnIcon } from "../../icons/volumeOn"
import { VolumeOffIcon } from "../../icons/volumeOff"

export const AudioPlayer = forwardRef((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.muted = false
        setIsMuted(false)
        audioRef.current.play()
      }
    },
  }))

  const toggleMute = () => {
    const audio = audioRef.current
    if (audio) {
      const newMutedState = !audio.muted
      audio.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}BGM.mp3`}
        autoPlay
        preload="auto"
        loop
        muted={isMuted}
      />
      <button onClick={toggleMute} className="control-button">
        {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
      </button>
    </div>
  )
})
