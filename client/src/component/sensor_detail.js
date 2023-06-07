import { React, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../css/sensor_detail.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import $ from 'jquery';
import { formatDateAndTime } from '../tools/time';

const RenderHeatSensorDetail = (props) =>
{
      const [renderPage, setRenderPage] = useState(false);

      useEffect(() =>
      {
            axios.post('http://localhost:5000/sensor_detail', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        $(".sensor_name").text(response.data[0].TEN);
                        $(".sensor_min").val(response.data[0].NGUONG_DUOI);
                        $(".sensor_max").val(response.data[0].NGUONG_TREN);
                        $(`.${ styles.switch }`).prop("checked", response.data[0].TRANG_THAI);
                        axios.post('http://localhost:5000/sensor_list/latest_data', {
                              id: props.id,
                        }).then(res =>
                        {
                              if (!('error' in res.data))
                              {
                                    if (response.data[0].TRANG_THAI)
                                          $(".sensor_temp").val(res.data[0].GIA_TRI);
                              }
                        }).catch(error => { console.log(error); })
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });

            axios.post('http://localhost:5000/sensor_history', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        // console.log(response)

                        $(`.${ styles.sensor_history }`).empty();

                        const min = parseFloat($(".sensor_min").val());
                        const max = parseFloat($(".sensor_max").val());
                        for (let i = 0; i < response.data.length; i++)
                        {
                              if (response.data[i].GIA_TRI)
                              {
                                    if (response.data[i].GIA_TRI > max)
                                    {
                                          $(`.${ styles.sensor_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Nhiệt độ quá nóng: ${ response.data[i].GIA_TRI }`).append($('<sup>').text('o')).append('C').append(` (giới hạn ${ max }`).append($('<sup>').text('o')).append('C)').css("color", "red")
                                                      )
                                                )
                                          );
                                    }
                                    else if (response.data[i].GIA_TRI < min)
                                    {
                                          $(`.${ styles.sensor_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Nhiệt độ quá lạnh: ${ response.data[i].GIA_TRI }`).append($('<sup>').text('o')).append('C').append(` (giới hạn ${ min }`).append($('<sup>').text('o')).append('C)').css("color", "blue")
                                                      )
                                                )
                                          );
                                    }
                                    else
                                    {
                                          $(`.${ styles.sensor_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Nhiệt độ hiện tại: ${ response.data[i].GIA_TRI }`).append($('<sup>').text('o')).append('C')
                                                      )
                                                )
                                          );
                                    }
                              }
                        }
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
      }, [renderPage]);

      const toggleStatus = () =>
      {
            axios.post(
                  'http://localhost:5000/sensor_status', {
                  id: props.id,
                  status: $(`.${ styles.switch }`).is(":checked")
            }).then(res => { console.log(res); }).catch(error => { console.log(error); })
            if (!$(`.${ styles.switch }`).is(":checked"))
                  $(".sensor_temp").val("");
            else
            {
                  axios.post('http://localhost:5000/sensor_list/latest_data', {
                        id: props.id,
                  }).then(res =>
                  {
                        if (!('error' in res.data))
                              $(".sensor_temp").val(res.data[0].GIA_TRI);
                        setRenderPage(!renderPage);
                  }).catch(error => { console.log(error); })
            }
      }

      var debounceTimeout1 = 500;
      var debounceTimer1;

      const changeMinimum = () =>
      {
            clearTimeout(debounceTimer1);
            debounceTimer1 = setTimeout(function ()
            {
                  if ($(".sensor_min").val() === "") $(".sensor_min").val(0);
                  if (parseFloat($(".sensor_min").val()) >= parseFloat($(".sensor_max").val()))
                        $(".sensor_min").val(parseFloat($(".sensor_max").val()) - 1);
                  axios.post(
                        'http://localhost:5000/sensor_min', {
                        id: props.id,
                        value: parseFloat($(".sensor_min").val())
                  }).then(res => { console.log(res); }).catch(error => { console.log(error); })
            }, debounceTimeout1);
      }

      var debounceTimeout2 = 500;
      var debounceTimer2;
      const changeMaximum = () =>
      {
            clearTimeout(debounceTimer2);
            debounceTimer2 = setTimeout(function ()
            {
                  if ($(".sensor_max").val() === "") $(".sensor_max").val(0);
                  if (parseFloat($(".sensor_max").val()) <= parseFloat($(".sensor_min").val()))
                        $(".sensor_max").val(parseFloat($(".sensor_min").val()) + 1);
                  axios.post(
                        'http://localhost:5000/sensor_max', {
                        id: props.id,
                        value: parseFloat($(".sensor_max").val())
                  }).then(res => { console.log(res); }).catch(error => { console.log(error); })
            }, debounceTimeout2);
      }

      return (
            <>
                  <div className='d-flex flex-column align-items-center justify-content-around w-100 mt-auto' style={ { height: '80%' } }>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font } ` }>Tên cảm biến</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <p className={ `${ styles.font } sensor_name` }></p>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Trạng thái</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <div className="form-check form-switch">
                                          <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleStatus }></input>
                                    </div>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font } ` }>Nhiệt độ hiện tại (<sup>o</sup>C)</strong>

                              </div>
                              <div className="col-md-7 col my-auto">
                                    <input type="number" disabled="disabled" style={ {
                                          width: "50px",
                                          backgroundColor: "#D8D8D8",
                                          borderRadius: "10px",
                                          borderWidth: "1px",
                                          paddingLeft: "10px",
                                          borderColor: "black"
                                    } } className='sensor_temp' />
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Ngưỡng hoạt động (<sup>o</sup>C)</strong>
                              </div>
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tối thiểu</strong>
                                          <input type="number" style={ {
                                                width: "50px",
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
                                                width: "50px",
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

const RenderHumidSensorDetail = (props) =>
{
      const [renderPage, setRenderPage] = useState(false);

      useEffect(() =>
      {
            axios.post('http://localhost:5000/sensor_detail', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        $(".sensor_name").text(response.data[0].TEN);
                        $(".sensor_min").val(response.data[0].NGUONG_DUOI);
                        $(".sensor_max").val(response.data[0].NGUONG_TREN);
                        $(`.${ styles.switch }`).prop("checked", response.data[0].TRANG_THAI);
                        axios.post('http://localhost:5000/sensor_list/latest_data', {
                              id: props.id,
                        }).then(res =>
                        {
                              if (!('error' in res.data))
                              {
                                    if (response.data[0].TRANG_THAI)
                                          $(".sensor_humid").val(res.data[0].GIA_TRI);
                              }
                        }).catch(error => { console.log(error); })

                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
            axios.post('http://localhost:5000/sensor_history', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        // console.log(response)

                        $(`.${ styles.sensor_history }`).empty();

                        const min = parseFloat($(".sensor_min").val());
                        const max = parseFloat($(".sensor_max").val());
                        for (let i = 0; i < response.data.length; i++)
                        {
                              if (response.data[i].GIA_TRI)
                              {
                                    if (response.data[i].GIA_TRI > max)
                                    {
                                          $(`.${ styles.sensor_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Độ ẩm cao: ${ response.data[i].GIA_TRI }%`).append(` (giới hạn ${ max }%)`).css("color", "red")
                                                      )
                                                )
                                          );
                                    }
                                    else if (response.data[i].GIA_TRI < min)
                                    {
                                          $(`.${ styles.sensor_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Độ ẩm thấp: ${ response.data[i].GIA_TRI }%`).append(` (giới hạn ${ min }%)`).css("color", "blue")
                                                      )
                                                )
                                          );
                                    }
                                    else
                                    {
                                          $(`.${ styles.sensor_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Độ ẩm hiện tại: ${ response.data[i].GIA_TRI }%`)
                                                      )
                                                )
                                          );
                                    }
                              }
                        }
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
      }, [renderPage]);

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
                  axios.post('http://localhost:5000/sensor_list/latest_data', {
                        id: props.id,
                  }).then(res =>
                  {
                        if (!('error' in res.data))
                              $(".sensor_humid").val(res.data[0].GIA_TRI);
                        setRenderPage(!renderPage);
                  }).catch(error => { console.log(error); })
            }
      }

      var debounceTimeout1 = 500;
      var debounceTimer1;

      const changeMinimum = () =>
      {
            clearTimeout(debounceTimer1);
            debounceTimer1 = setTimeout(function ()
            {
                  if ($(".sensor_min").val() === "") $(".sensor_min").val(0);
                  if (parseFloat($(".sensor_min").val()) >= parseFloat($(".sensor_max").val()))
                        $(".sensor_min").val(parseFloat($(".sensor_max").val()) - 1);
                  if (parseFloat($(".sensor_min").val()) < 0)
                        $(".sensor_min").val(0);
                  axios.post(
                        'http://localhost:5000/sensor_min', {
                        id: props.id,
                        value: parseFloat($(".sensor_min").val())
                  }).then(res => { console.log(res) }).catch(error => { console.log(error); })
            }, debounceTimeout1);
      }

      var debounceTimeout2 = 500;
      var debounceTimer2;

      const changeMaximum = () =>
      {
            clearTimeout(debounceTimer2);
            debounceTimer2 = setTimeout(function ()
            {
                  if ($(".sensor_max").val() === "") $(".sensor_max").val(0);
                  if (parseFloat($(".sensor_max").val()) <= parseFloat($(".sensor_min").val()))
                        $(".sensor_max").val(parseFloat($(".sensor_min").val()) + 1);
                  if (parseFloat($(".sensor_max").val()) > 100)
                        $(".sensor_max").val("100");
                  axios.post(
                        'http://localhost:5000/sensor_max', {
                        id: props.id,
                        value: parseFloat($(".sensor_max").val())
                  }).then(res => { console.log(res) }).catch(error => { console.log(error); })
            }, debounceTimeout2);
      }

      return (
            <>
                  <div className='d-flex flex-column align-items-center justify-content-around w-100 mt-auto' style={ { height: '80%' } }>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font } ` }>Tên cảm biến</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <p className={ `${ styles.font } sensor_name` }></p>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Trạng thái</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <div className="form-check form-switch">
                                          <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleStatus }></input>
                                    </div>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Độ ẩm hiện tại (%)</strong>

                              </div>
                              <div className="col-md-7 col my-auto">
                                    <input type="number" disabled="disabled" style={ {
                                          width: "50px",
                                          backgroundColor: "#D8D8D8",
                                          borderRadius: "10px",
                                          borderWidth: "1px",
                                          paddingLeft: "10px",
                                          borderColor: "black"
                                    } } className='sensor_humid' />
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Ngưỡng hoạt động (%)</strong>
                              </div>
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tối thiểu</strong>
                                          <input type="number" style={ {
                                                width: "50px",
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
                                                width: "50px",
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
      const [renderPage, setRenderPage] = useState(false);

      useEffect(() =>
      {
            axios.post('http://localhost:5000/sensor_detail', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        $(".sensor_name").text(response.data[0].TEN);
                        $(".sensor_min").val(response.data[0].NGUONG_DUOI);
                        $(".sensor_max").val(response.data[0].NGUONG_TREN);
                        $(`.${ styles.switch }`).prop("checked", response.data[0].TRANG_THAI);
                        axios.post('http://localhost:5000/sensor_list/latest_data', {
                              id: props.id,
                        }).then(res =>
                        {
                              if (!('error' in res.data))
                              {
                                    if (response.data[0].TRANG_THAI)
                                          $(".sensor_light").val(res.data[0].GIA_TRI);
                              }
                        }).catch(error => { console.log(error); })

                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
            axios.post('http://localhost:5000/sensor_history', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        // console.log(response)

                        $(`.${ styles.sensor_history }`).empty();

                        const min = parseFloat($(".sensor_min").val());
                        const max = parseFloat($(".sensor_max").val());
                        for (let i = 0; i < response.data.length; i++)
                        {
                              if (response.data[i].GIA_TRI)
                              {
                                    if (response.data[i].GIA_TRI > max)
                                    {
                                          $(`.${ styles.sensor_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Cường độ ánh sáng mạnh: ${ response.data[i].GIA_TRI }%`).append(` (giới hạn ${ max }%)`).css("color", "red")
                                                      )
                                                )
                                          );
                                    }
                                    else if (response.data[i].GIA_TRI < min)
                                    {
                                          $(`.${ styles.sensor_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Cường độ ánh sáng yếu: ${ response.data[i].GIA_TRI }%`).append(` (giới hạn ${ min }%)`).css("color", "blue")
                                                      )
                                                )
                                          );
                                    }
                                    else
                                    {
                                          $(`.${ styles.sensor_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Cường độ ánh sáng hiện tại: ${ response.data[i].GIA_TRI }%`)
                                                      )
                                                )
                                          );
                                    }
                              }
                        }
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
      }, [renderPage]);

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
                  axios.post('http://localhost:5000/sensor_list/latest_data', {
                        id: props.id,
                  }).then(res =>
                  {
                        if (!('error' in res.data))
                        {
                              $(".sensor_light").val(res.data[0].GIA_TRI);
                        }
                        setRenderPage(!renderPage);
                  }).catch(error => { console.log(error); })
            }
      }

      var debounceTimeout1 = 500;
      var debounceTimer1;

      const changeMinimum = () =>
      {
            clearTimeout(debounceTimer1);
            debounceTimer1 = setTimeout(function ()
            {
                  if ($(".sensor_min").val() === "") $(".sensor_min").val(0);
                  if (parseFloat($(".sensor_min").val()) >= parseFloat($(".sensor_max").val()))
                        $(".sensor_min").val(parseFloat($(".sensor_max").val()) - 1);
                  if (parseFloat($(".sensor_min").val()) < 0)
                        $(".sensor_min").val(0);
                  axios.post(
                        'http://localhost:5000/sensor_min', {
                        id: props.id,
                        value: parseFloat($(".sensor_min").val())
                  }).then(res => { console.log(res) }).catch(error => { console.log(error); })
            }, debounceTimeout1);
      }

      var debounceTimeout2 = 500;
      var debounceTimer2;

      const changeMaximum = () =>
      {
            clearTimeout(debounceTimer2);
            debounceTimer2 = setTimeout(function ()
            {
                  if ($(".sensor_max").val() === "") $(".sensor_max").val(0);
                  if (parseFloat($(".sensor_max").val()) <= parseFloat($(".sensor_min").val()))
                        $(".sensor_max").val(parseFloat($(".sensor_min").val()) + 1);
                  if (parseFloat($(".sensor_max").val()) > 100)
                        $(".sensor_max").val("100");
                  axios.post(
                        'http://localhost:5000/sensor_max', {
                        id: props.id,
                        value: parseFloat($(".sensor_max").val())
                  }).then(res => { console.log(res) }).catch(error => { console.log(error); })
            }, debounceTimeout2);
      }

      return (
            <>
                  <div className='d-flex flex-column align-items-center justify-content-around w-100 mt-auto' style={ { height: '80%' } }>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font } ` }>Tên cảm biến</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <p className={ `${ styles.font } sensor_name` }></p>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Trạng thái</strong>
                              </div>
                              <div className="col-md-7 col my-auto">
                                    <div className="form-check form-switch">
                                          <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleStatus }></input>
                                    </div>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Cường độ ÁS hiện tại (%)</strong>

                              </div>
                              <div className="col-md-7 col my-auto">
                                    <input type="number" disabled="disabled" style={ {
                                          width: "50px",
                                          backgroundColor: "#D8D8D8",
                                          borderRadius: "10px",
                                          borderWidth: "1px",
                                          paddingLeft: "10px",
                                          borderColor: "black"
                                    } } className='sensor_light' />
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-5 col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Ngưỡng hoạt động (%)</strong>
                              </div>
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tối thiểu</strong>
                                          <input type="number" style={ {
                                                width: "50px",
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
                                                width: "50px",
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
      const [renderPage, setRenderPage] = useState(false);

      useEffect(() =>
      {
            axios.post('http://localhost:5000/sensor_detail', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        $(".sensor_name").text(response.data[0].TEN);
                        $(`.${ styles.switch }`).prop("checked", response.data[0].TRANG_THAI);

                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
            axios.post('http://localhost:5000/sensor_history', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        // console.log(response)

                        $(`.${ styles.ir_sensor_history }`).empty();

                        for (let i = 0; i < response.data.length; i++)
                        {
                              $(`.${ styles.ir_sensor_history }`).append(
                                    $("<div>").addClass("row").addClass("w-100").append(
                                          $("<div>").addClass("col").append(
                                                $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Phát hiện chuyển động`)
                                          )
                                    )
                              );
                        }
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
      }, [renderPage]);

      const toggleStatus = () =>
      {
            axios.post(
                  'http://localhost:5000/sensor_status', {
                  id: props.id,
                  status: $(`.${ styles.switch }`).is(":checked")
            }).then(res =>
            {
                  console.log(res);
                  setRenderPage(!renderPage);
            }).catch(error => { console.log(error); })
      }

      return (
            <>
                  <div className={ `d-flex flex-column align-items-center ${ styles.irdetail } mt-md-5` }>
                        <div className='d-flex flex-column align-items-center justify-content-md-end w-100 mt-5'>
                              <div className="row w-100">
                                    <div className="col-md-5 col-5 my-auto">
                                          <strong className={ `${ styles.font } ` }>Tên cảm biến</strong>
                                    </div>
                                    <div className="col-md-7 col my-auto">
                                          <p className={ `${ styles.font } sensor_name` }></p>
                                    </div>
                              </div>
                        </div>
                        <div className='d-flex flex-column align-items-center w-100 mt-md-5 mt-2'>
                              <div className="row w-100">
                                    <div className="col-md-5 col-5 my-auto">
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
                  if (localStorage.getItem('type') !== null && localStorage.getItem('type').includes("ADMIN"))
                        $(`.${ styles['device_detail'] }`).removeClass('justify-content-end').addClass('justify-content-between');
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
                  <div className={ `h-75 w-75 ${ styles['sensor_detail'] }` }>
                        <div className="d-flex flex-row justify-content-end align-items-center w-100" style={ { height: "30px" } }>
                              { localStorage.getItem('type') !== null && localStorage.getItem('type').includes("ADMIN") && <BsFillTrashFill size={ 25 } style={ { marginLeft: "15px" } } className={ `${ styles.icons }` } /> }
                              <AiOutlineCloseCircle size={ 30 } style={ { marginRight: "10px" } } className={ `${ styles.icons }` } onClick={ goback } />
                        </div>
                        <div className="w-100 d-md-flex align-items-center justify-content-around overflow-auto" style={ { height: "calc(100% - 50px)" } }>
                              <div className={ `mt-0 mt-md-2 ${ styles.image }` }>
                                    <img id="img_src" alt="sensor_image" className="mt-md-5 mt-0 mx-auto d-block"></img>
                                    <button style={ {
                                          borderRadius: "10px",
                                          backgroundColor: "#4080FF",
                                          color: "white",
                                          borderColor: "#4080FF",
                                          fontSize: '13px'
                                    } } className='d-block mx-auto mt-1'>
                                          Chọn ảnh
                                    </button>
                              </div>
                              <div id="sensor_detail_display" className={ `d-flex flex-column ${ styles.detail } w-100` }>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default SensorDetail;