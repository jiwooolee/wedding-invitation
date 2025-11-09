import {
  useState,
  TouchEvent,
  MouseEvent,
  useRef,
  useEffect,
  useCallback,
} from "react"
import { GALLERY_IMAGES } from "../../images"
import Arrow from "../../icons/arrow.svg?react"

interface ImageCarouselProps {
  initialIndex: number
}

export const ImageCarousel = ({ initialIndex }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [touchStartX, setTouchStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
  }

  const handleTouchMove = useCallback(
    (e: globalThis.TouchEvent) => {
      const currentX = e.targetTouches[0].clientX
      const currentY = e.targetTouches[0].clientY
      const dx = currentX - touchStartX
      const dy = currentY - touchStartY

      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault()
      }

      setDragOffset(dx)
    },
    [touchStartX, touchStartY],
  )

  useEffect(() => {
    const carouselElement = carouselRef.current
    if (carouselElement) {
      carouselElement.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      })
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [handleTouchMove])

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const touchDistance = e.changedTouches[0].clientX - touchStartX
    if (touchDistance < -50) {
      // Swipe left
      setCurrentIndex((prev) =>
        prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1,
      )
    } else if (touchDistance > 50) {
      // Swipe right
      setCurrentIndex((prev) =>
        prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1,
      )
    }
    setDragOffset(0)
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStartX(e.clientX)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setDragOffset(e.clientX - dragStartX)
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(false)
    const dragDistance = e.clientX - dragStartX
    if (dragDistance < -50) {
      setCurrentIndex((prev) =>
        prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1,
      )
    } else if (dragDistance > 50) {
      setCurrentIndex((prev) =>
        prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1,
      )
    }
    setDragOffset(0)
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      setDragOffset(0)
    }
  }

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        <div
          ref={carouselRef}
          className="carousel-list"
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="carousel-item" style={{ userSelect: "none" }}>
            <img
              src={GALLERY_IMAGES[currentIndex].original}
              alt={`${currentIndex}`}
              draggable={false}
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
        <div className="carousel-control" style={{ zIndex: 100 }}>
          <div
            className="control left"
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1,
              )
            }
            style={{ zIndex: 101, padding: '20px' }}
          >
            <Arrow className="arrow left" />
          </div>
          <div
            className="control right"
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1,
              )
            }
            style={{ zIndex: 101, padding: '20px' }}
          >
            <Arrow className="arrow right" />
          </div>
        </div>
      </div>
    </div>
  )
}
