import "./index.scss"

interface Props {
  onClick: () => void
}

export const Overlay = ({ onClick }: Props) => {
  return (
    <div className="overlay" onClick={onClick}>
      초대장을 보려면 화면을 터치하세요
    </div>
  )
}
