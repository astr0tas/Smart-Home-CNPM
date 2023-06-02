import "../css/sensor.css";
import { useEffect, React } from "react";
import $ from 'jquery';
import { BsThermometerSnow } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineLightMode } from "react-icons/md";
import { MdSensors } from "react-icons/md";
import { useNavigate, Outlet } from "react-router-dom"

const Sensor = () =>
{
      useEffect(() =>
      {
            $("#sensor").css("color", "blue");
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
                        Nav("./" + class_name + "/list");
                  }, 0);
            }, 100);
      }

      return (
            <>
                  <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center sensor-page" style={ {
                        minHeight: "350px",
                        overflow: "auto"
                  } }>
                        <div className="h-75 w-75 sensor-page-board d-flex flex-column">
                              <div className="d-flex justify-content-center select-sensor">
                                    <h1>Chọn cảm biến</h1>
                              </div>
                              <div className="d-flex w-100 justify-content-md-between align-items-center overflow-auto" style={ { height: "85%" } }>
                                    <div className="d-flex flex-column flex-md-row justify-content-around align-items-center w-50 h-100 m-auto">
                                          <div className="d-flex flex-column justify-content-center align-items-center sensors" onClick={ (e) => handleClick(e, 'thermal') }>
                                                <BsThermometerSnow className="sensor_image thermal"></BsThermometerSnow>
                                                <p className="thermal">Nhiệt độ</p>
                                          </div>
                                          <div className="d-flex flex-column justify-content-center align-items-center sensors " onClick={ (e) => handleClick(e, 'humid') }>
                                                <WiHumidity className="sensor_image humid"></WiHumidity>
                                                <p className="humid" >Độ ẩm</p>
                                          </div>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row justify-content-around align-items-center w-50 h-100 m-auto" >
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
                  <Outlet />
            </>
      );
}

export default Sensor;