import "../css/device.css";
import { useEffect, useRef } from "react";
import { BsFan, BsDoorOpen } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";
import $ from 'jquery';

const Device = () =>
{
      const render = useRef(true);

      useEffect(() =>
      {
            if (render.current)
            {
                  $("#device").css("color", "rgb(153, 153, 153)");
                  render.current = false;
            }
      })

      return (
            <div className="device-page d-flex flex-column justify-content-center">
                  <div className="device-page-board">
                        <div className="d-flex justify-content-center choosing">
                              <h1>Chọn thiết bị</h1>
                        </div>
                        <div className="device-catergory">
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices">
                                    <BsFan className="device_image" />
                                    <h1>Quạt</h1>
                              </a>
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices">
                                    <TiLightbulb className="device_image" />
                                    <h1>Đèn</h1>
                              </a>
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices">
                                    <BsDoorOpen className="device_image" />
                                    <h1>Cửa</h1>
                              </a>
                        </div>
                  </div>
            </div>
      );
}

export default Device;
