import { useEffect, useRef } from "react"
import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Information } from "./component/information"
import { GuestBook } from "./component/guestbook"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import { STATIC_ONLY } from "./env"
import { AudioPlayer } from "./component/audioPlayer"

function App() {
  const audioPlayerRef = useRef<{ play: () => Promise<void> | undefined }>(null)
  const hasPlayed = useRef(false)

  useEffect(() => {
    const tryAutoplay = () => {
      if (hasPlayed.current) return

      if (document.visibilityState === "visible") {
        hasPlayed.current = true
        const playPromise = audioPlayerRef.current?.play()

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If autoplay fails, set up interaction listeners
            const onFirstInteraction = () => {
              audioPlayerRef.current?.play()
            }
            window.addEventListener("click", onFirstInteraction, { once: true })
            window.addEventListener("touchstart", onFirstInteraction, {
              once: true,
            })
          })
        }
      }
    }

    document.addEventListener("visibilitychange", tryAutoplay)
    tryAutoplay() // Initial attempt

    return () => {
      document.removeEventListener("visibilitychange", tryAutoplay)
    }
  }, [])

  return (
    <div className="background">
      <AudioPlayer ref={audioPlayerRef} />
      <div className={`card-view visible`}>
        <LazyDiv className="card-group">
          {/* 표지 */}
          <Cover />

          {/* 모시는 글 */}
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 결혼식 날짜 (달력) */}
          <Calendar />

          {/* 겔러리 */}
          <Gallery />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 오시는길 */}
          <Location />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 마음 전하기 */}
          <Information />
          {/* 방명록 */}
          {!STATIC_ONLY && <GuestBook />}
        </LazyDiv>

        <ShareButton />
      </div>
    </div>
  )
}

export default App
