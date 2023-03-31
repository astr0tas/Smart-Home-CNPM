import "../css/sensor.css";
import { useEffect, useRef } from "react";
import $ from 'jquery';
import { BsFan,BsDoorOpen } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";

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
                              <h1 id="pageTitle">Chọn thiết bị</h1>
                        </div>
                        <div className="d-flex justify-content-around mt-5 mb-5 page">
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices">
                                    <div>
                                          <BsFan className="icons"></BsFan><br></br>
                                          <h1 className="device">Quạt</h1>
                                    </div>
                              </a>
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices">
                                    <div>
                                          <TiLightbulb className="icons"></TiLightbulb><br></br>
                                          <h1 className="device">Đèn</h1>
                                    </div>
                              </a>
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices">
                                    <div>
                                          <BsDoorOpen className="icons"></BsDoorOpen><br></br>
                                          <h1 className="device">Cửa</h1>
                                    </div>
                              </a>
                        </div>
                  </div>
            </div>
      );
}

export default Sensor;