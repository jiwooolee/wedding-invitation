import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react"
import "./index.scss"
import { VolumeOnIcon } from "../../icons/volumeOn"
import { VolumeOffIcon } from "../../icons/volumeOff"

export const AudioPlayer = forwardRef((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const isKakaoInApp = () => {
    const ua = navigator.userAgent.toLowerCase()
    return ua.includes("kakaotalk")
  }

  const startAudio = () => {
    if (hasStarted) return

    const audio = audioRef.current
    if (!audio) return

    audio.muted = false
    setIsMuted(false)

    audio.play().then(() => {
      console.log("Audio autoplay succeeded")
    }).catch(err => {
      console.warn("Autoplay failed:", err)
    })

    setHasStarted(true)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // 카카오 인앱 브라우저는 바로 재생 허용
    if (isKakaoInApp()) {
      audio.muted = false
      setIsMuted(false)
      audio.play().catch(() => {})
      setHasStarted(true)
      return
    }

    // 🔥 핵심: 스크롤이 아니라 "touchstart"에서 play() 호출해야 브라우저가 허용함
    const triggerEvents = ["touchstart", "pointerdown", "mousedown", "keydown"]

    const onUserGesture = (e: Event) => {
      console.info("User gesture detected:", e.type)
      startAudio()
      // once:true라 자동 제거
    }

    triggerEvents.forEach(ev =>
        document.addEventListener(ev, onUserGesture, { once: true, passive: true })
    )

    return () => {
      triggerEvents.forEach(ev =>
          document.removeEventListener(ev, onUserGesture)
      )
    }
  }, [])

  useImperativeHandle(ref, () => ({
    play: () => startAudio()
  }))

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    const newMuted = !audio.muted
    audio.muted = newMuted
    setIsMuted(newMuted)
  }

  return (
      <div className="audio-player">
        <audio
            ref={audioRef}
            src={`${import.meta.env.BASE_URL}BGM.mp3`}
            preload="auto"
            loop
        />
        <button onClick={toggleMute} className="control-button">
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </button>
      </div>
  )
})
