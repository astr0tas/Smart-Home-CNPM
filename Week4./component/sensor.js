import "../css/sensor.css";
import { useEffect, useRef } from "react";
import $ from 'jquery';
import { BsThermometerSnow } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineLightMode,MdOutlineAir } from "react-icons/md";

const Sensor = () =>
{
      useEffect(() =>
      {
            $("#sensor").css("color","rgb(153, 153, 153)");
      })

      return (
        <div className="sensor-page d-flex flex-column justify-content-center">
            <div className="sensor-page-board">
                <div className="d-flex justify-content-center mt-5 mb-5">
                        <h1 id="pageTitle">Chọn loại cảm biến</h1>
                </div>
                <div className="d-flex justify-content-around mt-5 mb-5 page">
                        <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark sensors">
                            <BsThermometerSnow className="sensor_image"></BsThermometerSnow>
                            <h1>Nhiệt độ</h1>
                        </a>
                        <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark sensors">
                            <WiHumidity className="sensor_image"></WiHumidity>
                            <h1>Độ ẩm</h1>
                        </a>
                </div>
                <div className="d-flex justify-content-around mt-5 mb-5 page">
                        <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark sensors">
                            <MdOutlineLightMode className="sensor_image"></MdOutlineLightMode>
                            <h1>Ánh sáng</h1>
                        </a>
                        <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark sensors">
                            <MdOutlineAir className="sensor_image"></MdOutlineAir>
                            <h1>Không khí</h1>
                        </a>
                </div>
            </div>
        </div>
      );
}

export default Sensor;
