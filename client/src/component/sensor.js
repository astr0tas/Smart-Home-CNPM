import "../css/sensor.css";
import { useEffect, useRef } from "react";
import $ from 'jquery';
import { BsThermometerSnow } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineLightMode, MdOutlineAir } from "react-icons/md";


const Sensor = () =>
{
      useEffect(() =>
      {
            $("#sensor").css("color", "blue");
      })

      // const handleClick = (event, class_name) =>
      // {
      //       event.preventDefault();
      //       $("." + class_name).css("color", "rgb(123, 123, 123)");
      //       window.setTimeout(() =>
      //       {
      //             $("." + class_name).css("color", "black");
      //       }, 50);
      // }

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

            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
                  <div className="h-75 w-75 sensor-page-board d-flex flex-column">
                        <div className="d-flex justify-content-center">
                              <h1 className="mt-3 mb-2">Chọn cảm biến</h1>
                        </div>
                        <div>

                        </div>
                  </div>
            </div>
      );
}

export default Sensor;