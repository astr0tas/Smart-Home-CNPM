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
                  // $("#device").css("color", "rgb(153, 153, 153)");
                  $("#device").css("color", "blue");
                  render.current = false;
            }
      })

      const handleClick = (event, class_name) =>
      {
            event.preventDefault();
            $("." + class_name).css("color", "rgb(123, 123, 123)");
            setTimeout(() =>
            {
                  $("." + class_name).css("color", "black");
            }, 50);
      }

      return (
            // <div className="device-page d-flex flex-column justify-content-center">
            //       <div className="device-page-board">
            //             <div className="d-flex justify-content-center choose-device">
            //                   <h1>Chọn thiết bị</h1>
            //             </div>
            //             <div className="device-catergory">
            //                   <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices" onClick={ (e) => handleClick(e, "fans") }>
            //                         <BsFan className="device_image fans" />
            //                         <h1 className="fans">Quạt</h1>
            //                   </a>
            //                   <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices" onClick={ (e) => handleClick(e, "lights") }>
            //                         <TiLightbulb className="device_image lights" />
            //                         <h1 className="lights">Đèn</h1>
            //                   </a>
            //                   <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices" onClick={ (e) => handleClick(e, "doors") }>
            //                         <BsDoorOpen className="device_image doors" />
            //                         <h1 className="doors">Cửa</h1>
            //                   </a>
            //             </div>
            //       </div>
            // </div>
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
                  <div className="h-75 w-75 sensor-page-board d-flex flex-column">
                        <div className="d-flex justify-content-center select-device">
                              <h1>Chọn cảm biến</h1>
                        </div>
                        <div className="d-flex flex-column flex-md-row w-100 h-75 justify-content-around justify-content-md-around align-items-center m-auto">
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices" onClick={ (e) => handleClick(e, "fans") }>
                                    <BsFan className="device_image fans" />
                                    <p className="fans">Quạt</p>
                              </a>
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices" onClick={ (e) => handleClick(e, "lights") }>
                                    <TiLightbulb className="device_image lights" />
                                    <p className="lights">Đèn</p>
                              </a>
                              <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark devices" onClick={ (e) => handleClick(e, "doors") }>
                                    <BsDoorOpen className="device_image doors" />
                                    <p className="doors">Cửa</p>
                              </a>
                        </div>
                  </div>
            </div>
      );
}

export default Device;
