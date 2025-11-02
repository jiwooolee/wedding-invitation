import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import SubwayIcon from "../../icons/subway-icon.svg?react"
import ParkingIcon from "../../icons/parking-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <SubwayIcon className="transportation-icon"/>
          </div>
          <div className="heading">지하철</div>
          <div />
          <div className="content">
            <b><p style={{margin: 0}}>1호선 & 7호선 가산디지털단지역</p></b>
            5번 출구에서 약 20M 직진 후 셔틀버스 탑승
            <br />
            <br />
            <b><p style={{margin: 0}}>2호선 구로디지털단지역</p></b>
            4번 출구 나와서 약 100M 직진후 셔틀버스 탑승
            <br/>
            <br/>
            셔틀버스는 15분 간격으로 순환 운행됩니다
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">버스</div>
          <div />
          <div className="content">
            <p style={{margin: 0}}><b>지선버스</b> 5536, 5615</p>
            <br />
            <p style={{margin: 0}}><b>마을버스</b> 금천07</p>
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <ParkingIcon className="transportation-icon" />
          </div>
          <div className="heading">주차</div>
          <div />
          <div className="content">
            <p style={{margin: 0}}>단독주차, 1400대 주차 가능</p>
            <p>2시간 무료주차 (이후 10분당 700원)</p>
          </div>
          <div />
        </div>
      </LazyDiv>
    </>
  )
}
