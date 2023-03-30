import "../css/sensor.css";
import { useEffect, useRef } from "react";
import $ from 'jquery';

const Sensor = () =>
{
      useEffect(() =>
      {
            $("#sensor").css("color","blue");
      })

      return (
            <div className="sensor-page d-flex flex-column justify-content-center">
                  <div className="sensor-page-board">
                        <div className="d-flex justify-content-center mt-5 mb-5">
                              <h1>Chọn thiết bị</h1>
                        </div>
                        <div className="d-flex justify-content-around mt-5 mb-5">
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices">
                                    <img src="" alt="picture" className="device_image"></img>
                                    <h1>Quạt</h1>
                              </a>
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices">
                                    <img src="" alt="picture" className="device_image"></img>
                                    <h1>Đèn</h1>
                              </a>
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices">
                                    <img src="" alt="picture" className="device_image"></img>
                                    <h1>Cửa</h1>
                              </a>
                        </div>
                  </div>
            </div>
      );
}

export default Sensor;