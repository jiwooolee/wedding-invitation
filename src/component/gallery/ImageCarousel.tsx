import { useState, TouchEvent, MouseEvent } from "react"
import { GALLERY_IMAGES } from "../../images"
import Arrow from "../../icons/arrow.svg?react"

interface ImageCarouselProps {
  initialIndex: number
}

export const ImageCarousel = ({ initialIndex }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchEndX(e.targetTouches[0].clientX) // Reset touchEndX on new touch
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const currentX = e.targetTouches[0].clientX
    setTouchEndX(currentX)
    setDragOffset(currentX - touchStartX)
  }

  const handleTouchEnd = () => {
    const touchDistance = touchStartX - touchEndX
    if (touchDistance > 50) {
      // Swipe left
      setCurrentIndex((prev) =>
        prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1,
      )
    } else if (touchDistance < -50) {
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
          className="carousel-list"
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
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
