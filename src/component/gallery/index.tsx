import { useEffect, useState } from "react"
import { LazyDiv } from "../lazyDiv"
import { Button } from "../button"
import { useModal } from "../modal"
import { GALLERY_IMAGES } from "../../images"
import { ImageCarousel } from "./ImageCarousel"

export const Gallery = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const { openModal, closeModal } = useModal()
  const numberOfRows = Math.ceil(GALLERY_IMAGES.length / 3)

  useEffect(() => {
    // preload images
    GALLERY_IMAGES.forEach((image) => {
      const img = new Image()
      img.src = image.thumb
    })
  }, [])

  useEffect(() => {
    if (selectedImageIndex === null) {
      return
    }

    openModal({
      className: "carousel-modal",
      closeOnClickBackground: true,
      onClose: () => setSelectedImageIndex(null),
      content: (
        <ImageCarousel
          initialIndex={selectedImageIndex}
          closeModal={closeModal}
        />
      ),
    })
  }, [selectedImageIndex, openModal, closeModal])

  return (
    <LazyDiv className="card gallery">
      <h2 className="english">Gallery</h2>
      <div className="grid-wrapper">
        <div className="grid">
          {(isExpanded ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, 9)).map(
            (item, idx) => (
              <div
                className="grid-item"
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
              >
                <img src={item.thumb} draggable={false} alt={`${idx}`} />
              </div>
            ),
          )}
        </div>
      </div>

      <div style={{ height: '1rem' }} />

      <Button type="button" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "접기" : "사진 전체보기"}
      </Button>
      <style>
        {`
          .grid-wrapper {
            position: relative;
            width: 100%;
            padding-top: ${isExpanded ? `calc(100% / 3 * ${numberOfRows})` : '100%'}; /* 1:1 Aspect Ratio */
            transition: padding-top 0.3s ease-out;
          }
          .grid-wrapper::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: ${isExpanded ? '0' : '50%'};
            background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
            transition: height 0.3s ease-out;
          }
          .grid {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: ${isExpanded ? `repeat(${numberOfRows}, 1fr)` : 'repeat(3, 1fr)'};
            gap: 2px;
          }
          .grid-item {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .grid-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .photo-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2px;
          }
        `}
      </style>
    </LazyDiv>
  )
}
