import { useState, TouchEvent, MouseEvent } from "react"
import { GALLERY_IMAGES } from "../../images"
import Arrow from "../../icons/arrow.svg?react"

interface ImageCarouselProps {
  initialIndex: number
  closeModal: () => void
}

export const ImageCarousel = ({
  initialIndex,
  closeModal,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchEndY, setTouchEndY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
    setTouchEndX(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)
    if (
      Math.abs(touchStartX - e.targetTouches[0].clientX) >
      Math.abs(touchStartY - e.targetTouches[0].clientY)
    ) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      setCurrentIndex((prev) =>
        prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1,
      )
    } else if (touchStartX - touchEndX < -50) {
      // Swipe right
      setCurrentIndex((prev) =>
        prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1,
      )
    }
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStartX(e.clientX)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    e.preventDefault()
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
  }

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="carousel-list">
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
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex((prev) =>
                prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1,
              )
            }}
            style={{ zIndex: 101, padding: "20px" }}
          >
            <Arrow className="arrow left" />
          </div>
          <div
            className="control right"
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex((prev) =>
                prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1,
              )
            }}
            style={{ zIndex: 101, padding: "20px" }}
          >
            <Arrow className="arrow right" />
          </div>
        </div>
      </div>
      <div className="close-button-wrapper">
        <button className="close-button" onClick={closeModal} />
      </div>
    </div>
  )
}
