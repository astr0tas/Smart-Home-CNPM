import { React, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../css/sensor_detail.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import $ from 'jquery';

const RenderHeatSensorDetail = (props) =>
{
      const render = useRef(false);
      useEffect(() =>
      {
            if (!render.current)
            {
                  axios.post('http://localhost:5000/sensor_detail', {
                        id: props.id
                  })
                        .then(function (response)
                        {
                              $(".sensor_name").text(response.data[0].TEN);
                              $(".sensor_temp").val(response.data[0].GIA_TRI);
                              $(".sensor_min").val(response.data[0].NGUONG_DUOI);
                              $(".sensor_max").val(response.data[0].NGUONG_TREN);
                              $(`.${ styles.switch }`).prop("checked", response.data[0].TRANG_THAI);

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
                  render.current = true;
            }
      });

      const toggleStatus = () =>
      {
            axios.post(
                  'http://localhost:5000/sensor_status', {
                  id: props.id,
                  status: $(`.${ styles.switch }`).is(":checked")
            }).then(res => { console.log(res) }).catch(error => { console.log(error); })
            if (!$(`.${ styles.switch }`).is(":checked"))
                  $(".sensor_temp").val("");
            else
            {
                  axios.post('http://localhost:5000/sensor_detail', {
                        id: props.id
                  })
                        .then(function (response)
                        {
                              $(".sensor_temp").val(response.data[0].GIA_TRI);

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      }

      const changeMinimum = () =>
      {
            if (parseInt($(".sensor_min").val()) >= parseInt($(".sensor_max").val()))
                  $(".sensor_min").val(parseInt($(".sensor_max").val()) - 1);
            axios.post(
                  'http://localhost:5000/sensor_min', {
                  id: props.id,
                  value: $(".sensor_min").val() === "" ? 0 : parseInt($(".sensor_min").val())
            }).then(res => { console.log(res) }).catch(error => { console.log(error); })
      }

      const changeMaximum = () =>
      {
            axios.post(
                  'http://localhost:5000/sensor_max', {
                  id: props.id,
                  value: $(".sensor_max").val() === "" ? 0 : parseInt($(".sensor_max").val())
            }).then(res => { console.log(res) }).catch(error => { console.log(error); })
      }

      return (
            <>
                  <div className='d-flex flex-column align-items-center justify-content-around w-100 mt-auto' style={ { height: '80%' } }>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font } ` }>Tên thiết bị</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <p className={ `${ styles.font } sensor_name` }></p>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Trạng thái</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <div className="form-check form-switch">
                                          <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleStatus }></input>
                                    </div>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font } ` }>Nhiệt độ hiện tại (<sup>o</sup>C)</strong>

                              </div>
                              <div className="col-md-7 col my-auto">
                                    <input type="number" disabled="disabled" style={ {
                                          width: "60px",
                                          backgroundColor: "#D8D8D8",
                                          borderRadius: "10px",
                                          borderWidth: "1px",
                                          paddingLeft: "10px",
                                          borderColor: "black"
                                    } } className='sensor_temp' />
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Ngưỡng hoạt động (<sup>o</sup>C)</strong>
                              </div>
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tối thiểu</strong>
                                          <input type="number" style={ {
                                                width: "60px",
                                                backgroundColor: "#D8D8D8",
                                                borderRadius: "10px",
                                                borderWidth: "1px",
                                                paddingLeft: "10px"
                                          } } className='mx-md-2 sensor_min' onChange={ changeMinimum } />
                                    </div>
                              </div>
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tối đa</strong>
                                          <input type="number" style={ {
                                                width: "60px",
                                                backgroundColor: "#D8D8D8",
                                                borderRadius: "10px",
                                                borderWidth: "1px",
                                                paddingLeft: "10px"
                                          } } className='mx-md-2 sensor_max' onChange={ changeMaximum } />
                                    </div>
                              </div>
                        </div>
                  </div >
                  <div className="row w-100" style={ { marginLeft: "0px" } }>
                        <div className="row w-100">
                              <div className="col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Lịch sử hoạt động</strong>
                              </div>
                              <div className="col-md-2 col text-end text-md-center my-auto">
                                    <button style={ {
                                          borderRadius: "10px",
                                          backgroundColor: "#4080FF",
                                          color: "white",
                                          borderColor: "#4080FF"
                                    } } className={ `${ styles.font }` }>
                                          Thống kê
                                    </button>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-7 col">
                                    <hr style={ {
                                          border: "1px solid black",
                                          opacity: "1",
                                          borderRadius: "10px"
                                    } } />
                              </div>
                        </div>
                  </div>
                  <div className={ `d-flex flex-column align-items-center ${ styles.sensor_history }` }>
                        <div className="row w-100">
                              <div className="col">
                                    <p className={ `${ styles.history_font }` }>Test</p>
                              </div>
                        </div>
                  </div>
            </>
      );
}

const RenderHumidSensorDetail = (props) =>
{
      const render = useRef(false);
      useEffect(() =>
      {
            if (!render.current)
            {
                  axios.post('http://localhost:5000/sensor_detail', {
                        id: props.id
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              $(".sensor_name").text(response.data[0].TEN);
                              $(".sensor_humid").val(response.data[0].GIA_TRI);
                              $(".sensor_min").val(response.data[0].NGUONG_DUOI);
                              $(".sensor_max").val(response.data[0].NGUONG_TREN);
                              $(`.${ styles.switch }`).prop("checked", response.data[0].TRANG_THAI);

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
                  render.current = true;
            }
      });

      const toggleStatus = () =>
      {
            axios.post(
                  'http://localhost:5000/sensor_status', {
                  id: props.id,
                  status: $(`.${ styles.switch }`).is(":checked")
            }).then(res => { console.log(res) }).catch(error => { console.log(error); })
            if (!$(`.${ styles.switch }`).is(":checked"))
                  $(".sensor_humid").val("");
            else
            {
                  axios.post('http://localhost:5000/sensor_detail', {
                        id: props.id
                  })
                        .then(function (response)
                        {
                              $(".sensor_humid").val(response.data[0].GIA_TRI);

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      }

      const changeMinimum = () =>
      {
            if (parseInt($(".sensor_min").val()) >= parseInt($(".sensor_max").val()))
                  $(".sensor_min").val(parseInt($(".sensor_max").val()) - 1);
            axios.post(
                  'http://localhost:5000/sensor_min', {
                  id: props.id,
                  value: $(".sensor_min").val() === "" ? 0 : parseInt($(".sensor_min").val())
            }).then(res => { console.log(res) }).catch(error => { console.log(error); })
      }

      const changeMaximum = () =>
      {
            if (parseInt($(".sensor_max").val()) > 100)
                  $(".sensor_max").val("100");

            axios.post(
                  'http://localhost:5000/sensor_max', {
                  id: props.id,
                  value: $(".sensor_max").val() === "" ? 0 : parseInt($(".sensor_max").val())
            }).then(res => { console.log(res); }).catch(error => { console.log(error); })
      }

      return (
            <>
                  <div className='d-flex flex-column align-items-center justify-content-around w-100 mt-auto' style={ { height: '80%' } }>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font } ` }>Tên thiết bị</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <p className={ `${ styles.font } sensor_name` }></p>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Trạng thái</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <div className="form-check form-switch">
                                          <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleStatus }></input>
                                    </div>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Độ ẩm hiện tại (%)</strong>

                              </div>
                              <div className="col-md-7 col my-auto">
                                    <input type="number" disabled="disabled" style={ {
                                          width: "60px",
                                          backgroundColor: "#D8D8D8",
                                          borderRadius: "10px",
                                          borderWidth: "1px",
                                          paddingLeft: "10px",
                                          borderColor: "black"
                                    } } className='sensor_humid' />
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Ngưỡng hoạt động (%)</strong>
                              </div>
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tối thiểu</strong>
                                          <input type="number" style={ {
                                                width: "60px",
                                                backgroundColor: "#D8D8D8",
                                                borderRadius: "10px",
                                                borderWidth: "1px",
                                                paddingLeft: "10px"
                                          } } className='mx-md-2 sensor_min' onChange={ changeMinimum } />
                                    </div>
                              </div>
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tối đa</strong>
                                          <input type="number" style={ {
                                                width: "60px",
                                                backgroundColor: "#D8D8D8",
                                                borderRadius: "10px",
                                                borderWidth: "1px",
                                                paddingLeft: "10px"
                                          } } className='mx-md-2 sensor_max' onChange={ changeMaximum } />
                                    </div>
                              </div>
                        </div>
                  </div >
                  <div className="row w-100" style={ { marginLeft: "0px" } }>
                        <div className="row w-100">
                              <div className="col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Lịch sử hoạt động</strong>
                              </div>
                              <div className="col-md-2 col text-end text-md-center my-auto">
                                    <button style={ {
                                          borderRadius: "10px",
                                          backgroundColor: "#4080FF",
                                          color: "white",
                                          borderColor: "#4080FF"
                                    } } className={ `${ styles.font }` }>
                                          Thống kê
                                    </button>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-7 col">
                                    <hr style={ {
                                          border: "1px solid black",
                                          opacity: "1",
                                          borderRadius: "10px"
                                    } } />
                              </div>
                        </div>
                  </div>
                  <div className={ `d-flex flex-column align-items-center ${ styles.sensor_history }` }>
                  </div>
            </>
      );
}

const RenderLightSensorDetail = (props) =>
{
      const render = useRef(false);
      useEffect(() =>
      {
            if (!render.current)
            {
                  axios.post('http://localhost:5000/sensor_detail', {
                        id: props.id
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              $(".sensor_name").text(response.data[0].TEN);
                              $(".sensor_light").val(response.data[0].GIA_TRI);
                              $(".sensor_min").val(response.data[0].NGUONG_DUOI);
                              $(".sensor_max").val(response.data[0].NGUONG_TREN);
                              $(`.${ styles.switch }`).prop("checked", response.data[0].TRANG_THAI);

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
                  render.current = true;
            }
      });

      const toggleStatus = () =>
      {
            axios.post(
                  'http://localhost:5000/sensor_status', {
                  id: props.id,
                  status: $(`.${ styles.switch }`).is(":checked")
            }).then(res => { console.log(res) }).catch(error => { console.log(error); })
            if (!$(`.${ styles.switch }`).is(":checked"))
                  $(".sensor_light").val("");
            else
            {
                  axios.post('http://localhost:5000/sensor_detail', {
                        id: props.id
                  })
                        .then(function (response)
                        {
                              $(".sensor_light").val(response.data[0].GIA_TRI);

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      }

      const changeMinimum = () =>
      {
            if (parseInt($(".sensor_min").val()) >= parseInt($(".sensor_max").val()))
                  $(".sensor_min").val(parseInt($(".sensor_max").val()) - 1);
            axios.post(
                  'http://localhost:5000/sensor_min', {
                  id: props.id,
                  value: $(".sensor_min").val() === "" ? 0 : parseInt($(".sensor_min").val())
            }).then(res => { console.log(res) }).catch(error => { console.log(error); })
      }

      const changeMaximum = () =>
      {
            if (parseInt($(".sensor_max").val()) > 100)
                  $(".sensor_max").val("100");

            axios.post(
                  'http://localhost:5000/sensor_max', {
                  id: props.id,
                  value: $(".sensor_max").val() === "" ? 0 : parseInt($(".sensor_max").val())
            }).then(res => { console.log(res); }).catch(error => { console.log(error); })
      }

      return (
            <>
                  <div className='d-flex flex-column align-items-center justify-content-around w-100 mt-auto' style={ { height: '80%' } }>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font } ` }>Tên thiết bị</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <p className={ `${ styles.font } sensor_name` }></p>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Trạng thái</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <div className="form-check form-switch">
                                          <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleStatus }></input>
                                    </div>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Cường độ ÁS hiện tại (%)</strong>

                              </div>
                              <div className="col-md-7 col my-auto">
                                    <input type="number" disabled="disabled" style={ {
                                          width: "60px",
                                          backgroundColor: "#D8D8D8",
                                          borderRadius: "10px",
                                          borderWidth: "1px",
                                          paddingLeft: "10px",
                                          borderColor: "black"
                                    } } className='sensor_light' />
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Ngưỡng hoạt động (%)</strong>
                              </div>
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tối thiểu</strong>
                                          <input type="number" style={ {
                                                width: "60px",
                                                backgroundColor: "#D8D8D8",
                                                borderRadius: "10px",
                                                borderWidth: "1px",
                                                paddingLeft: "10px"
                                          } } className='mx-md-2 sensor_min' onChange={ changeMinimum } />
                                    </div>
                              </div>
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tối đa</strong>
                                          <input type="number" style={ {
                                                width: "60px",
                                                backgroundColor: "#D8D8D8",
                                                borderRadius: "10px",
                                                borderWidth: "1px",
                                                paddingLeft: "10px"
                                          } } className='mx-md-2 sensor_max' onChange={ changeMaximum } />
                                    </div>
                              </div>
                        </div>
                  </div >
                  <div className="row w-100" style={ { marginLeft: "0px" } }>
                        <div className="row w-100">
                              <div className="col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Lịch sử hoạt động</strong>
                              </div>
                              <div className="col-md-2 col text-end text-md-center my-auto">
                                    <button style={ {
                                          borderRadius: "10px",
                                          backgroundColor: "#4080FF",
                                          color: "white",
                                          borderColor: "#4080FF"
                                    } } className={ `${ styles.font }` }>
                                          Thống kê
                                    </button>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-7 col">
                                    <hr style={ {
                                          border: "1px solid black",
                                          opacity: "1",
                                          borderRadius: "10px"
                                    } } />
                              </div>
                        </div>
                  </div>
                  <div className={ `d-flex flex-column align-items-center ${ styles.sensor_history }` }>
                  </div>
            </>
      );
}

const RenderIRDetail = (props) =>
{
      const render = useRef(false);
      useEffect(() =>
      {
            if (!render.current)
            {
                  axios.post('http://localhost:5000/sensor_detail', {
                        id: props.id
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              $(".sensor_name").text(response.data[0].TEN);
                              $(".sensor_ir").val(response.data[0].GIA_TRI);
                              $(`.${ styles.switch }`).prop("checked", response.data[0].TRANG_THAI);

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
                  render.current = true;
            }
      });

      const toggleStatus = () =>
      {
            axios.post(
                  'http://localhost:5000/sensor_status', {
                  id: props.id,
                  status: $(`.${ styles.switch }`).is(":checked")
            }).then(res => { console.log(res) }).catch(error => { console.log(error); })
      }

      return (
            <>
                  <div className={ `d-flex flex-column align-items-center ${ styles.irdetail } mt-md-5` }>
                        <div className='d-flex flex-column align-items-center justify-content-md-end w-100 mt-5'>
                              <div className="row w-100">
                                    <div className="col-md-5 col-6 my-auto">
                                          <strong className={ `${ styles.font } ` }>Tên thiết bị</strong>
                                    </div>
                                    <div className="col-md-7 col my-auto">
                                          <p className={ `${ styles.font } sensor_name` }></p>
                                    </div>
                              </div>
                        </div>
                        <div className='d-flex flex-column align-items-center w-100 mt-md-5 mt-2'>
                              <div className="row w-100">
                                    <div className="col-md-5 col-6 my-auto">
                                          <strong className={ `${ styles.font }` }>Trạng thái</strong>
                                    </div>
                                    <div className="col-md-7 col my-auto">
                                          <div className="form-check form-switch">
                                                <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleStatus }></input>
                                          </div>
                                    </div>
                              </div>
                        </div >
                  </div >
                  <div className={ `row w-100 ${ styles.irhistory }` } style={ { marginLeft: "0px" } }>
                        <div className="row w-100">
                              <div className="col-md-5 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Lịch sử hoạt động</strong>
                              </div>
                              <div className="col-md-2 col text-end text-md-center my-auto">
                                    <button style={ {
                                          borderRadius: "10px",
                                          backgroundColor: "#4080FF",
                                          color: "white",
                                          borderColor: "#4080FF"
                                    } } className={ `${ styles.font }` }>
                                          Thống kê
                                    </button>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-7 col">
                                    <hr style={ {
                                          border: "1px solid black",
                                          opacity: "1",
                                          borderRadius: "10px"
                                    } } />
                              </div>
                        </div>
                  </div>
                  <div className={ `d-flex flex-column align-items-center ${ styles.ir_sensor_history }` }>
                  </div>
            </>
      );
}

const SensorDetail = () =>
{
      const render = useRef(false);

      const currentURL = useParams();
      const id = currentURL.id;

      const Navigate = useNavigate();

      useEffect(() =>
      {
            if (!render.current)
            {
                  $("#sensor").css("color", "blue");
                  render.current = true;
                  if (id.includes("HEAT"))
                  {
                        $("#img_src").attr("src", "https://previews.123rf.com/images/vectorhome/vectorhome1907/vectorhome190702084/127670474-temperature-sensor-icon-vector-illustration.jpg");
                        ReactDOM.createRoot(document.getElementById('sensor_detail_display')).render(<RenderHeatSensorDetail id={ id } />);

                  }
                  else if (id.includes("HUMID"))
                  {
                        $("#img_src").attr("src", "https://thumbs.dreamstime.com/b/humidity-sensor-icon-monochrome-style-design-sensors-collection-ui-ux-pixel-perfect-web-apps-software-printing-usage-127150047.jpg");
                        ReactDOM.createRoot(document.getElementById('sensor_detail_display')).render(<RenderHumidSensorDetail id={ id } />);
                  }
                  else if (id.includes("IR"))
                  {
                        $("#img_src").attr("src", "https://us.123rf.com/450wm/amin268/amin2681706/amin268170600951/80500497-motion-detector-line-icon-security-and-guard-vector-graphics-a-linear-pattern-on-a-white.jpg?ver=6");
                        ReactDOM.createRoot(document.getElementById('sensor_detail_display')).render(<RenderIRDetail id={ id } />);

                  }
                  else if (id.includes("LIGHT"))
                  {
                        $("#img_src").attr("src", "https://media.istockphoto.com/id/1192301368/pt/vetorial/light-sensor-outline-icon-thin-line-style-from-sensors-icons-collection-pixel-perfect.jpg?s=612x612&w=0&k=20&c=OL47FuRbDR4xIsraE0Q0-fQcRiZR8sy2gGNyyfvH6Fo=");
                        ReactDOM.createRoot(document.getElementById('sensor_detail_display')).render(<RenderLightSensorDetail id={ id } />);
                  }
            }
      });

      const goback = (event) =>
      {
            event.preventDefault();
            Navigate(-1);
      }

      return (
            <div className='h-100 w-100 d-flex flex-column justify-content-center align-items-center' style={ {
                  minHeight: "350px",
                  overflow: "auto"
            } }>
                  <div className={ `h-75 w-75 d-flex flex-column align-items-center ${ styles['sensor_detail'] }` }>
                        <div className="d-flex flex-row justify-content-between align-items-center w-100" style={ { height: "30px" } }>
                              <BsFillTrashFill size={ 25 } style={ { marginLeft: "15px" } } className={ `${ styles.icons }` } />
                              <AiOutlineCloseCircle size={ 30 } style={ { marginRight: "10px" } } className={ `${ styles.icons }` } onClick={ goback } />
                        </div>
                        <div className="w-100 d-flex flex-column align-items-center flex-md-row justify-content-around" style={ { height: "calc(100% - 40px)" } }>
                              <div className={ `align-items-center mt-0 mt-md-2 ${ styles.image }` }>
                                    <img id="img_src" alt="sensor_image" className="mt-md-5 mt-0"></img>
                                    <button style={ {
                                          borderRadius: "10px",
                                          backgroundColor: "#4080FF",
                                          color: "white",
                                          borderColor: "#4080FF"
                                    } }>
                                          Chọn ảnh
                                    </button>
                              </div>
                              <div id="sensor_detail_display" className={ `d-flex flex-column ${ styles.detail }` }>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default SensorDetail;