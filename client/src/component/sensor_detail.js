import { React, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../css/sensor_detail.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import $ from 'jquery';

const SensorDetail = () =>
{
      const render = useRef(false);

      const currentURL = useParams();
      const id = currentURL.id;

      useEffect(() =>
      {
            if (!render.current)
            {
                  render.current = true;
                  if (id.includes("HEAT"));
                  else if (id.includes("HUMID"))
                        $("#img_src").attr("src", "https://thumbs.dreamstime.com/b/humidity-sensor-icon-monochrome-style-design-sensors-collection-ui-ux-pixel-perfect-web-apps-software-printing-usage-127150047.jpg");
                  else if (id.includes("IR"));
                  else;
            }
      });

      return (
            <div className='h-100 w-100 d-flex flex-column justify-content-center align-items-center'>
                  <div className={ `h-75 w-75 d-flex flex-column align-items-center ${ styles['sensor_detail'] }` }>
                        <div className="d-flex flex-row justify-content-between align-items-center w-100" style={ { height: "30px" } }>
                              <BsFillTrashFill size={ 25 } style={ { marginLeft: "15px" } } class={ `${ styles.icons }` } />
                              <AiOutlineCloseCircle size={ 30 } style={ { marginRight: "10px" } } class={ `${ styles.icons }` } />
                        </div>
                        <div className="w-100 d-flex flex-row" style={ { marginTop: "20px", height: "calc(100% - 50px)" } }>
                              <div className="w-25 h-100 d-flex flex-column align-items-center mt-2" style={ {
                                    marginLeft: "40px"
                              } }>
                                    <img id="img_src" alt="sensor image" style={ {
                                          height: "75%", width: "90%", border: "2px solid black", borderRadius: "10px"
                                    } }></img>
                                    <button style={ {
                                          borderRadius: "10px",
                                          backgroundColor: "#4080FF",
                                          color: "white",
                                          marginTop: "5%"
                                    } }>
                                          Chọn ảnh
                                    </button>
                              </div>
                              <div className="h-100 d-flex flex-column justify-content-center" style={ {
                                    width: "calc(75% - 40px)"
                              } }>
                                    <div>
                                          <div>

                                          </div>
                                    </div>
                                    <div>

                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default SensorDetail;