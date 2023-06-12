import { useNavigate, useParams } from 'react-router-dom';
import '../css/device_detail.module.css';
import { useEffect, React, useRef, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from '../css/device_detail.module.css';
import axios from 'axios';
import $ from 'jquery';
import { formatDateAndTime } from '../tools/time';
import ReactDOM from 'react-dom/client';

const FanDetail = (props) =>
{
      const [name, setName] = useState("N/A");
      const [render, setRender] = useState(false);

      const onOff = useRef(null);
      const auto = useRef(null);
      const value = useRef(null);

      useEffect(() =>
      {
            $(`.${ styles.device_history }`).empty();

            axios.post('http://localhost:5000/device_detail', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        setName(response.data[0].TEN);
                        if (onOff.current !== null && onOff.current !== 'undefined')
                              onOff.current.checked = response.data[0].TRANG_THAI;
                        if (auto.current !== null && auto.current !== 'undefined')
                              auto.current.checked = response.data[0].TU_DONG;
                        if (response.data[0].TRANG_THAI)
                        {
                              if (auto.current !== null && auto.current !== "undefined")
                                    auto.current.disabled = false;
                              if (value.current !== null && value.current !== 'undefined')
                              {
                                    if (!response.data[0].TU_DONG)
                                          value.current.disabled = false;
                                    else
                                          value.current.disabled = true;
                              }
                        }
                        else
                        {
                              if (value.current !== null && value.current !== 'undefined')
                              {
                                    value.current.disabled = true;
                                    value.current.value = "";
                              }
                              if (auto.current !== null && auto.current !== "undefined")
                                    auto.current.disabled = true;
                        }
                        axios.post('http://localhost:5000/device_list/latest_data', {
                              id: props.id,
                        }).then(res =>
                        {
                              if (!('error' in res.data))
                              {
                                    if (response.data[0].TRANG_THAI)
                                    {
                                          if (value.current !== null && value.current !== 'undefined')
                                                value.current.value = res.data[0].GIA_TRI;
                                    }
                              }
                        }).catch(error => { console.log(error); })
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
            axios.post('http://localhost:5000/device_history', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        for (let i = 0; i < response.data.length; i++)
                        {
                              if (response.data[i].GIA_TRI !== null)
                              {
                                    if (response.data[i].TEN !== null)
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } thiết lập tốc độ quạt ${ response.data[i].GIA_TRI }%`)
                                                      )
                                                )
                                          );
                                    else
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Tốc độ quạt hiện tại: ${ response.data[i].GIA_TRI }%`)
                                                      )
                                                )
                                          );
                              }
                              else if (response.data[i].TRANG_THAI !== null)
                              {
                                    if (response.data[i].TRANG_THAI)
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } bật quạt`)
                                                      )
                                                )
                                          );
                                    else
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } tắt quạt`)
                                                      )
                                                )
                                          );
                              }
                              else if (response.data[i].TU_DONG !== null)
                                    if (response.data[i].TU_DONG)
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } bật chế độ tự động`)
                                                      )
                                                )
                                          );
                                    else
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } tắt chế độ tự động`)
                                                      )
                                                )
                                          );
                        }
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });

      }, [render, props.id]);

      const toggleStatus = (e) =>
      {
            axios.post(
                  'http://localhost:5000/device_status', {
                  id: props.id,
                  status: e.target.checked,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      const toggleAuto = (e) =>
      {
            axios.post(
                  'http://localhost:5000/device_auto', {
                  id: props.id,
                  auto: e.target.checked,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      let timer;
      const changeValue = (e) =>
      {
            clearTimeout(timer);

            timer = setTimeout(() =>
            {
                  axios.post(
                        'http://localhost:5000/device_value', {
                        id: props.id,
                        value: e.target.value,
                        username: localStorage.getItem('username')
                  }).then(res =>
                  {
                        console.log(res);
                        setRender(!render);
                  }).catch(error => { console.log(error); })
            }, 500);
      }

      return (
            <>
                  <div className='d-flex flex-column align-items-center justify-content-around w-100 mt-5 h-50'>
                        <div className="row w-100">
                              <div className="col-md-3 col-6 my-auto">
                                    <strong className={ `${ styles.font } ` }>Tên thiết bị</strong>
                              </div>
                              <div className="col-md-9 col my-auto">
                                    <p className={ `${ styles.font }` }>{ name }</p>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-3 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Trạng thái</strong>
                              </div>
                              <div className="col-md-9 col my-auto">
                                    <div className="form-check form-switch">
                                          <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleStatus } ref={ onOff }></input>
                                    </div>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Tốc độ (%)</strong>
                                    </div>
                              </div>
                              <div className="col-4 col-md-2 my-auto">
                                    <div className="d-flex flex-column flex-md-row align-items-md-center">
                                          <input type="number" style={ {
                                                width: "60px",
                                                backgroundColor: "#D8D8D8",
                                                borderRadius: "10px",
                                                borderWidth: "1px",
                                                paddingLeft: "10px"
                                          } } ref={ value } onChange={ changeValue } />
                                    </div>
                              </div>
                              <div className="col my-auto">
                                    <div className="d-flex flex-column flex-md-row align-items-md-center">
                                          <strong className={ `${ styles.font }` }>Tự động</strong>
                                          <div className="form-check form-switch ms-md-3">
                                                <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleAuto } ref={ auto }></input>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div >
                  <div className="row w-100" style={ { marginLeft: "0px" } }>
                        <div className="row w-100">
                              <div className="col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Lịch sử hoạt động</strong>
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
                  <div className={ `d-flex flex-column align-items-center ${ styles.device_history }` }>
                  </div>
            </>
      );
}

const LightDetail = (props) =>
{
      const [name, setName] = useState("N/A");
      const [render, setRender] = useState(false);
      const onOff = useRef(null);
      const auto = useRef(null);
      const value = useRef(null);

      useEffect(() =>
      {
            $(`.${ styles.device_history }`).empty();

            axios.post('http://localhost:5000/device_detail', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        setName(response.data[0].TEN);
                        if (onOff.current !== null && onOff.current !== 'undefined')
                              onOff.current.checked = response.data[0].TRANG_THAI;
                        if (auto.current !== null && auto.current !== 'undefined')
                              auto.current.checked = response.data[0].TU_DONG;
                        if (response.data[0].TRANG_THAI)
                        {
                              if (auto.current !== null && auto.current !== "undefined")
                                    auto.current.disabled = false;
                              if (value.current !== null && value.current !== 'undefined')
                              {
                                    if (!response.data[0].TU_DONG)
                                          value.current.disabled = false;
                                    else
                                          value.current.disabled = true;
                              }
                        }
                        else
                        {
                              if (value.current !== null && value.current !== 'undefined')
                              {
                                    value.current.disabled = true;
                                    value.current.value = "";
                              }
                              if (auto.current !== null && auto.current !== "undefined")
                                    auto.current.disabled = true;
                        }

                        axios.post('http://localhost:5000/device_list/latest_data', {
                              id: props.id,
                        }).then(res =>
                        {
                              if (!('error' in res.data))
                              {
                                    if (response.data[0].TRANG_THAI)
                                    {
                                          if (value.current !== null && value.current !== 'undefined')
                                                value.current.value = res.data[0].GIA_TRI;
                                    }
                              }
                        }).catch(error => { console.log(error); })
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
            axios.post('http://localhost:5000/device_history', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        for (let i = 0; i < response.data.length; i++)
                        {
                              if (response.data[i].GIA_TRI !== null)
                              {
                                    if (response.data[i].TEN !== null)
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } thiết lập độ sáng ${ response.data[i].GIA_TRI }%`)
                                                      )
                                                )
                                          );
                                    else
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - Độ sáng hiện tại: ${ response.data[i].GIA_TRI }%`)
                                                      )
                                                )
                                          );
                              }
                              else if (response.data[i].TRANG_THAI !== null)
                              {
                                    if (response.data[i].TRANG_THAI)
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } bật đèn`)
                                                      )
                                                )
                                          );
                                    else
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } tắt đèn`)
                                                      )
                                                )
                                          );
                              }
                              else if (response.data[i].TU_DONG !== null)
                                    if (response.data[i].TU_DONG)
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } bật chế độ tự động`)
                                                      )
                                                )
                                          );
                                    else
                                          $(`.${ styles.device_history }`).append(
                                                $("<div>").addClass("row").addClass("w-100").append(
                                                      $("<div>").addClass("col").append(
                                                            $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } tắt chế độ tự động`)
                                                      )
                                                )
                                          );
                        }
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
      }, [render, props.id]);

      const toggleStatus = (e) =>
      {
            axios.post(
                  'http://localhost:5000/device_status', {
                  id: props.id,
                  status: e.target.checked,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      const toggleAuto = (e) =>
      {
            axios.post(
                  'http://localhost:5000/device_auto', {
                  id: props.id,
                  auto: e.target.checked,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      let timer;

      const changeValue = (e) =>
      {
            clearTimeout(timer);

            timer = setTimeout(() =>
            {
                  axios.post(
                        'http://localhost:5000/device_value', {
                        id: props.id,
                        value: e.target.value,
                        username: localStorage.getItem('username')
                  }).then(res =>
                  {
                        console.log(res);

                        setRender(!render);
                  }).catch(error => { console.log(error); })
            }, 500);
      }

      return (
            <>
                  <div className='d-flex flex-column align-items-center justify-content-around w-100 mt-5 h-50'>
                        <div className="row w-100">
                              <div className="col-md-3 col-6 my-auto">
                                    <strong className={ `${ styles.font } ` }>Tên thiết bị</strong>
                              </div>
                              <div className="col-md-9 col my-auto">
                                    <p className={ `${ styles.font }` }>{ name }</p>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-3 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Trạng thái</strong>
                              </div>
                              <div className="col-md-9 col my-auto">
                                    <div className="form-check form-switch">
                                          <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleStatus } ref={ onOff }></input>
                                    </div>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-3 my-auto">
                                    <div className="d-flex flex-column flex-md-row">
                                          <strong className={ `${ styles.font }` }>Độ sáng (%)</strong>
                                    </div>
                              </div>
                              <div className="col-4 col-md-2 my-auto">
                                    <div className="d-flex flex-column flex-md-row align-items-md-center">
                                          <input type="number" style={ {
                                                width: "60px",
                                                backgroundColor: "#D8D8D8",
                                                borderRadius: "10px",
                                                borderWidth: "1px",
                                                paddingLeft: "10px"
                                          } } ref={ value } onChange={ changeValue } />
                                    </div>
                              </div>
                              <div className="col my-auto">
                                    <div className="d-flex flex-column flex-md-row align-items-md-center">
                                          <strong className={ `${ styles.font }` }>Tự động</strong>
                                          <div className="form-check form-switch ms-md-3">
                                                <input className={ `form-check-input ${ styles.switch }` } type="checkbox" role="switch" onChange={ toggleAuto } ref={ auto }></input>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div >
                  <div className="row w-100" style={ { marginLeft: "0px" } }>
                        <div className="row w-100">
                              <div className="col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Lịch sử hoạt động</strong>
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
                  <div className={ `d-flex flex-column align-items-center ${ styles.device_history }` }>
                  </div>
            </>
      );
}

const DoorDetail = (props) =>
{
      const [name, setName] = useState("N/A");

      useEffect(() =>
      {
            $(`.${ styles.device_history }`).empty();

            axios.post('http://localhost:5000/device_detail', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        setName(response.data[0].TEN);
                        axios.post('http://localhost:5000/device_list/latest_data', {
                              id: props.id,
                        }).then(res =>
                        {
                              if (!('error' in res.data))
                              {
                                    if (res.data[0].GIA_TRI)
                                          $(`.doorStatus`).val("Mở").css("color", "red");
                                    else if (res.data[0].GIA_TRI === 0)
                                          $(`.doorStatus`).val("Đóng").css("color", "green");
                              }
                        }).catch(error => { console.log(error); })
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
            axios.post('http://localhost:5000/device_history', {
                  id: props.id
            })
                  .then(function (response)
                  {
                        for (let i = 0; i < response.data.length; i++)
                        {
                              if (response.data[i].GIA_TRI && response.data[i].TEN)
                                    $(`.${ styles.device_history }`).append(
                                          $("<div>").addClass("row").addClass("w-100").append(
                                                $("<div>").addClass("col").append(
                                                      $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } đã mở cửa`)
                                                )
                                          )
                                    );
                              else if (response.data[i].GIA_TRI !== null && !response.data[i].GIA_TRI && response.data[i].TEN)
                                    $(`.${ styles.device_history }`).append(
                                          $("<div>").addClass("row").addClass("w-100").append(
                                                $("<div>").addClass("col").append(
                                                      $("<p>").addClass(styles.history_font).text(`${ formatDateAndTime(response.data[i].THOI_GIAN) } - ${ response.data[i].TEN } đã đóng cửa`)
                                                )
                                          )
                                    );
                        }
                  })
                  .catch(function (error)
                  {
                        console.log(error);
                  });
      }, [props.id]);


      return (
            <>
                  <div className='d-flex flex-column align-items-center justify-content-evenly w-100 mt-5 h-50'>
                        <div className="row w-100">
                              <div className="col-md-3 col-6 my-auto">
                                    <strong className={ `${ styles.font } ` }>Tên thiết bị</strong>
                              </div>
                              <div className="col-md-9 col my-auto">
                                    <p className={ `${ styles.font }` }>{ name }</p>
                              </div>
                        </div>
                        <div className="row w-100">
                              <div className="col-md-2 col-6 my-auto">
                                    <strong className={ `${ styles.font }` }>Trạng thái</strong>
                              </div>
                              <div className="col-md-1 col my-auto">
                                    <input type="text" style={ {
                                          width: "60px",
                                          backgroundColor: "#D8D8D8",
                                          borderRadius: "10px",
                                          borderWidth: "1px",
                                          textAlign: "center"
                                    } } className='ms-md-3 doorStatus' disabled />
                              </div>
                        </div>
                  </div >
                  <div className="row w-100" style={ { marginLeft: "0px" } }>
                        <div className="row w-100">
                              <div className="col-5 my-auto">
                                    <strong className={ `${ styles.font }` }>Lịch sử hoạt động</strong>
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
                  <div className={ `d-flex flex-column align-items-center ${ styles.device_history }` }>
                  </div>
            </>
      )
}

export default function DeviceDetail()
{
      const id = useParams().id;
      const type = useParams().type;

      const target = useRef(null);
      const imgSrc = useRef(null);

      const Navigate = useNavigate();

      useEffect(() =>
      {
            $("#device").css("color", "blue");
            if (localStorage.getItem('type') !== null && localStorage.getItem('type').includes("ADMIN"))
                  $(`.${ styles['device_detail'] }`).removeClass('justify-content-end').addClass('justify-content-between');
            if (type === "fan")
            {
                  if (imgSrc.current !== null && imgSrc.current !== 'undefined')
                        imgSrc.current.src = "https://static.vecteezy.com/system/resources/previews/000/351/514/original/charging-fan-vector-icon.jpg";
                  if (target.current !== null && target.current !== 'undefined')
                        ReactDOM.createRoot(target.current).render(<FanDetail id={ id } />);
            }
            else if (type === "light")
            {
                  if (imgSrc.current !== null && imgSrc.current !== 'undefined')
                        imgSrc.current.src = "https://img.freepik.com/premium-vector/lighting-lamp-symbol-icon-image_625678-62.jpg?w=2000";
                  if (target.current !== null && target.current !== 'undefined')
                        ReactDOM.createRoot(target.current).render(<LightDetail id={ id } />);
            }
            else
            {
                  if (imgSrc.current !== null && imgSrc.current !== 'undefined')
                        imgSrc.current.src = "https://static.vecteezy.com/system/resources/previews/000/351/814/original/door-vector-icon.jpg";
                  if (target.current !== null && target.current !== 'undefined')
                        ReactDOM.createRoot(target.current).render(<DoorDetail id={ id } />);
            }
      }, [id,type]);

      return (
            <div className='h-100 w-100 d-flex flex-column justify-content-center align-items-center' style={ {
                  minHeight: "350px",
                  overflow: "auto"
            } }>
                  <div className={ `h-75 w-75 d-flex flex-column align-items-center ${ styles['device_detail'] }` }>
                        <div className="d-flex flex-row justify-content-end align-items-center w-100" style={ { height: "30px" } }>
                              { localStorage.getItem('type') !== null && localStorage.getItem('type').includes("ADMIN") && <BsFillTrashFill size={ 25 } style={ { marginLeft: "15px" } } className={ `${ styles.icons } me-auto` } /> }
                              <AiOutlineCloseCircle size={ 30 } style={ { marginRight: "10px" } } className={ `${ styles.icons }` } onClick={ () => { Navigate(-1); } } />
                        </div>
                        <div className="w-100 d-flex flex-column align-items-center flex-md-row justify-content-around" style={ { height: "calc(100% - 40px)" } }>
                              <div className={ `align-items-center mt-0 mt-md-2 ${ styles.image }` }>
                                    <img ref={ imgSrc } alt="device_image" className="mt-md-5 mt-0"></img>
                                    <button style={ {
                                          borderRadius: "10px",
                                          backgroundColor: "#4080FF",
                                          color: "white",
                                          borderColor: "#4080FF"
                                    } }>
                                          Chọn ảnh
                                    </button>
                              </div>
                              <div ref={ target } className={ `d-flex flex-column ${ styles.detail }` }>
                              </div>
                        </div>
                  </div>
            </div>
      );
}