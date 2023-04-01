import "../css/sensor.css";
import { useEffect, useRef } from "react";
import $ from 'jquery';
import { BsThermometerSnow } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineLightMode } from "react-icons/md";
import { MdSensors } from "react-icons/md";
import { useNavigate } from "react-router-dom"

const Sensor = () =>
{
      const render = useRef(true);

      useEffect(() =>
      {
            if (render.current)
            {
                  $("#sensor").css("color", "blue");
                  render.current = false;
            }
      })

      const Nav = useNavigate();

      const handleClick = (event, class_name) =>
      {
            event.preventDefault();
            $("." + class_name).css("color", "rgb(123, 123, 123)");
            window.setTimeout(() =>
            {
                  $("." + class_name).css("color", "black");
                  window.setTimeout(() =>
                  {
                        Nav("./" + class_name);
                  }, 0);
            }, 100);
      }

      return (
            // <div className="sensor-page d-flex flex-column justify-content-center align-items-center">
            //       <div className="sensor-page-board d-flex flex-column">
            //             <div className="d-flex justify-content-center choose-sensor h-15">
            //                   <h1 className="title">Chọn loại cảm biến</h1>
            //             </div>
            //             <div className="sensor-type">
            //                   <div className="d-flex justify-content-around choose-sensor-type">
            //                         <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark sensors" onClick={ (e) => handleClick(e, 'thermal') }>
            //                               <BsThermometerSnow className="sensor_image thermal"></BsThermometerSnow>
            //                               <h1 className="thermal">Nhiệt độ</h1>
            //                         </a>
            //                         <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark sensors " onClick={ (e) => handleClick(e, 'wet') }>
            //                               <WiHumidity className="sensor_image wet" ></WiHumidity>
            //                               <h1 className="wet" >Độ ẩm</h1>
            //                         </a>
            //                   </div>
            //                   <div className="d-flex justify-content-around choose-sensor-type">
            //                         <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark sensors " onClick={ (e) => handleClick(e, 'ligh_intensity') }>
            //                               <MdOutlineLightMode className="sensor_image ligh_intensity"></MdOutlineLightMode>
            //                               <h1 className="ligh_intensity">Ánh sáng</h1>
            //                         </a>
            //                         <a href="#" className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-dark sensors" onClick={ (e) => handleClick(e, 'IR') }>
            //                               <MdOutlineAir className="sensor_image IR" ></MdOutlineAir>
            //                               <h1 className="IR">Hồng ngoại</h1>
            //                         </a>
            //                   </div>
            //             </div>
            //       </div>
            // </div>

            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center sensor-page">
                  <div className="h-75 w-75 sensor-page-board d-flex flex-column">
                        <div className="d-flex justify-content-center select-sensor">
                              <h1>Chọn cảm biến</h1>
                        </div>
                        <div className="d-flex w-100 h-75 justify-content-md-between align-items-center m-auto groups">
                              <div className="d-flex flex-md-row align-items-center w-50 h-50 m-auto group">
                                    <div className="d-flex flex-column justify-content-center align-items-center sensors" onClick={ (e) => handleClick(e, 'thermal') }>
                                          <BsThermometerSnow className="sensor_image thermal"></BsThermometerSnow>
                                          <p className="thermal">Nhiệt độ</p>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center sensors " onClick={ (e) => handleClick(e, 'humid') }>
                                          <WiHumidity className="sensor_image humid"></WiHumidity>
                                          <p className="humid" >Độ ẩm</p>
                                    </div>
                              </div>
                              <div className="d-flex flex-md-row align-items-center w-50  h-50 m-auto group" >
                                    <div className="d-flex flex-column justify-content-center align-items-center sensors" onClick={ (e) => handleClick(e, 'ligh_intensity') }>
                                          <MdOutlineLightMode className="sensor_image ligh_intensity"></MdOutlineLightMode>
                                          <p className="ligh_intensity">Ánh sáng</p>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center sensors" onClick={ (e) => handleClick(e, 'IR') }>
                                          <MdSensors className="sensor_image IR"></MdSensors>
                                          <p className="IR">Hồng ngoại</p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default Sensor;