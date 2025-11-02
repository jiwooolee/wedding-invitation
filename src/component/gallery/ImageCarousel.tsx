import { useState } from "react"
import { GALLERY_IMAGES } from "../../images"
import Arrow from "../../icons/arrow.svg?react"

interface ImageCarouselProps {
  initialIndex: number
}

export const ImageCarousel = ({ initialIndex }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        <div className="carousel-list">
          <div className="carousel-item">
            <img
              src={GALLERY_IMAGES[currentIndex].original}
              alt={`${currentIndex}`}
              draggable={false}
            />
          </div>
        </div>
        <div className="carousel-control">
          <div
            className="control left"
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1,
              )
            }
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
          >
            <Arrow className="arrow right" />
          </div>
        </div>
      </div>
    </div>
  )
}
