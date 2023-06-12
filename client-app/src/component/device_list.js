import styles from "../css/device_list.module.css";
import { useEffect, useRef, React, useState } from "react";
import ReactDOM from 'react-dom/client';
import $ from 'jquery';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { TbPlus } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Fan = (props) =>
{
      const [render, setRender] = useState(false);

      const increase = (id) =>
      {
            let value = parseFloat($(`.sensorVal_${ id }`).text()) + 5;
            if (value > 100) value = 100;
            axios.post(
                  'http://localhost:5000/device_increase', {
                  id: id,
                  value: value,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      const decrease = (id) =>
      {
            let value = parseFloat($(`.sensorVal_${ id }`).text()) - 5;
            if (value < 0) value = 0;
            axios.post(
                  'http://localhost:5000/device_decrease', {
                  id: id,
                  value: value,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      const auto = (id, auto) =>
      {
            axios.post(
                  'http://localhost:5000/device_auto', {
                  id: id,
                  auto: auto,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      const toggle = (id, status) =>
      {
            axios.post(
                  'http://localhost:5000/device_status', {
                  id: id,
                  status: status,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      useEffect(() =>
      {
            if (typeof (props.name) === "undefined" || props.name === '')
            {
                  $(".header").empty();
                  $(".header")
                        .append($("<th>").attr("scope", "col").addClass("col-1").addClass(styles.table_header).text("#"))
                        .append($("<th>").attr("scope", "col").addClass("col-2").addClass(styles.table_header).text("Tên thiết bị"))
                        .append($("<th>").attr("scope", "col").addClass("col-1").addClass("text-center").addClass(styles.table_header).text("Bật/tắt"))
                        .append($("<th>").attr("scope", "col").addClass("col-2").addClass("text-center").addClass(styles.table_header).text("Tốc độ (%)"))
                        .append($("<th>").attr("scope", "col").addClass("col-4").addClass("text-center").addClass(styles.table_header).text("Điều khiển"))
                        .append($("<th>").attr("scope", "col").addClass("col-2").addClass("text-center").addClass(styles.table_header).text("Tác vụ"));
                  axios.post('http://localhost:5000/device_list', {
                        type: "FAN"
                  })
                        .then(function (response)
                        {
                              $(".table_body").empty();
                              for (let i = 0; i < response.data.length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[i].TEN));
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Tắt").addClass(styles.off).addClass(`off_${ response.data[i].MA_TB }`).on("click", () => { toggle(response.data[i].MA_TB, false); }))
                                          .append($("<button>").text("Bật").addClass(styles.on).addClass(`on_${ response.data[i].MA_TB }`).on("click", () => { toggle(response.data[i].MA_TB, true); }))
                                    );
                                    table_row.append($("<td>").addClass("text-center").addClass(`currentValue_${ response.data[i].MA_TB }`));
                                    axios.post('http://localhost:5000/device_list/latest_data', {
                                          id: response.data[i].MA_TB,
                                    }).then(res =>
                                    {
                                          if (!('error' in res.data))
                                          {
                                                if (response.data[i].TRANG_THAI)
                                                      if (!$(`.currentValue_${ response.data[i].MA_TB }`).children().length)
                                                            $(`.currentValue_${ response.data[i].MA_TB }`).append($("<p>").text(res.data[0].GIA_TRI).addClass(styles.current_value).addClass(`sensorVal_${ response.data[i].MA_TB }`));
                                          }
                                    }).catch(error => { console.log(error); });
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<div>").addClass(styles.button_list)
                                                .append($("<button>").text("Tăng").addClass(styles.increase).addClass(`value_${ response.data[i].MA_TB }`).on("click", () => { increase(response.data[i].MA_TB) }))
                                                .append($("<button>").text("Giảm").addClass(styles.decrease).addClass(`value_${ response.data[i].MA_TB }`).on("click", () => { decrease(response.data[i].MA_TB) }))
                                                .append($("<button>").text("Tự động").addClass(styles.auto).addClass(`setAuto_${ response.data[i].MA_TB }`).on("click", () => { auto(response.data[i].MA_TB, !response.data[i].TU_DONG) }))
                                          )
                                    );
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).on("click", () => { window.location.href = "./" + response.data[i].MA_TB; }))
                                    );
                                    $(".table_body").append(table_row);
                                    if (response.data[i].TRANG_THAI)
                                    {
                                          $(`.off_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.on_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.setAuto_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.sensorVal_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          if (response.data[i].TU_DONG)
                                                $(`.value_${ response.data[i].MA_TB }`).css("display", "none");
                                          else
                                                $(`.value_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                    }
                                    else
                                    {
                                          $(`.on_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.off_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.value_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.setAuto_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.sensorVal_${ response.data[i].MA_TB }`).css("display", "none");
                                    }
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
            else
            {
                  axios.post('http://localhost:5000/device_list', {
                        type: "FAN",
                        name: props.name
                  })
                        .then(function (response)
                        {
                              $(".table_body").empty();
                              for (let i = 0; i < response.data.length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[i].TEN));
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Tắt").addClass(styles.off).addClass(`off_${ response.data[i].MA_TB }`).on("click", () => { toggle(response.data[i].MA_TB, false); }))
                                          .append($("<button>").text("Bật").addClass(styles.on).addClass(`on_${ response.data[i].MA_TB }`).on("click", () => { toggle(response.data[i].MA_TB, true); }))
                                    );
                                    table_row.append($("<td>").addClass("text-center").addClass(`currentValue_${ response.data[i].MA_TB }`));
                                    axios.post('http://localhost:5000/device_list/latest_data', {
                                          id: response.data[i].MA_TB,
                                    }).then(res =>
                                    {
                                          if (!('error' in res.data))
                                          {
                                                if (response.data[i].TRANG_THAI)
                                                      if (!$(`.currentValue_${ response.data[i].MA_TB }`).children().length)
                                                            $(`.currentValue_${ response.data[i].MA_TB }`).append($("<p>").text(res.data[0].GIA_TRI).addClass(styles.current_value).addClass(`sensorVal_${ response.data[i].MA_TB }`));
                                          }
                                    }).catch(error => { console.log(error); });
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<div>").addClass(styles.button_list)
                                                .append($("<button>").text("Tăng").addClass(styles.increase).addClass(`value_${ response.data[i].MA_TB }`).on("click", () => { increase(response.data[i].MA_TB) }))
                                                .append($("<button>").text("Giảm").addClass(styles.decrease).addClass(`value_${ response.data[i].MA_TB }`).on("click", () => { decrease(response.data[i].MA_TB) }))
                                                .append($("<button>").text("Tự động").addClass(styles.auto).addClass(`setAuto_${ response.data[i].MA_TB }`).on("click", () => { auto(response.data[i].MA_TB, !response.data[i].TU_DONG) }))
                                          )
                                    );
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).on("click", () => { window.location.href = "./" + response.data[i].MA_TB; }))
                                    );
                                    $(".table_body").append(table_row);
                                    if (response.data[i].TRANG_THAI)
                                    {
                                          $(`.off_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.on_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.setAuto_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.sensorVal_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          if (response.data[i].TU_DONG)
                                                $(`.value_${ response.data[i].MA_TB }`).css("display", "none");
                                          else
                                                $(`.value_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                    }
                                    else
                                    {
                                          $(`.on_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.off_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.value_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.setAuto_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.sensorVal_${ response.data[i].MA_TB }`).css("display", "none");
                                    }
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      }, [render,props.name]);
}

const Light = (props) =>
{
      const [render, setRender] = useState(false);

      const increase = (id) =>
      {
            let value = parseFloat($(`.sensorVal_${ id }`).text()) + 5;
            if (value > 100) value = 100;
            axios.post(
                  'http://localhost:5000/device_increase', {
                  id: id,
                  value: value,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      const decrease = (id) =>
      {
            let value = parseFloat($(`.sensorVal_${ id }`).text()) - 5;
            if (value < 0) value = 0;
            axios.post(
                  'http://localhost:5000/device_decrease', {
                  id: id,
                  value: value,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      const auto = (id, auto) =>
      {
            axios.post(
                  'http://localhost:5000/device_auto', {
                  id: id,
                  auto: auto,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }

      const toggle = (id, status) =>
      {
            axios.post(
                  'http://localhost:5000/device_status', {
                  id: id,
                  status: status,
                  username: localStorage.getItem('username')
            }).then(res =>
            {
                  console.log(res);
                  setRender(!render);
            }).catch(error => { console.log(error); })
      }


      useEffect(() =>
      {
            if (typeof (props.name) === "undefined" || props.name === '')
            {
                  $(".header").empty();
                  $(".header")
                        .append($("<th>").attr("scope", "col").addClass("col-1").addClass(styles.table_header).text("#"))
                        .append($("<th>").attr("scope", "col").addClass("col-2").addClass(styles.table_header).text("Tên thiết bị"))
                        .append($("<th>").attr("scope", "col").addClass("col-1").addClass("text-center").addClass(styles.table_header).text("Bật/tắt"))
                        .append($("<th>").attr("scope", "col").addClass("col-2").addClass("text-center").addClass(styles.table_header).text("Tốc độ (%)"))
                        .append($("<th>").attr("scope", "col").addClass("col-4").addClass("text-center").addClass(styles.table_header).text("Điều khiển"))
                        .append($("<th>").attr("scope", "col").addClass("col-2").addClass("text-center").addClass(styles.table_header).text("Tác vụ"));

                  axios.post('http://localhost:5000/device_list', {
                        type: "LIGHT"
                  })
                        .then(function (response)
                        {
                              $(".table_body").empty();
                              for (let i = 0; i < response.data.length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[i].TEN));
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Tắt").addClass(styles.off).addClass(`off_${ response.data[i].MA_TB }`).on("click", () => { toggle(response.data[i].MA_TB, false); }))
                                          .append($("<button>").text("Bật").addClass(styles.on).addClass(`on_${ response.data[i].MA_TB }`).on("click", () => { toggle(response.data[i].MA_TB, true); }))
                                    );
                                    table_row.append($("<td>").addClass("text-center").addClass(`currentValue_${ response.data[i].MA_TB }`));
                                    axios.post('http://localhost:5000/device_list/latest_data', {
                                          id: response.data[i].MA_TB,
                                    }).then(res =>
                                    {
                                          if (!('error' in res.data))
                                          {
                                                if (response.data[i].TRANG_THAI)
                                                      if (!$(`.currentValue_${ response.data[i].MA_TB }`).children().length)
                                                            $(`.currentValue_${ response.data[i].MA_TB }`).append($("<p>").text(res.data[0].GIA_TRI).addClass(styles.current_value).addClass(`sensorVal_${ response.data[i].MA_TB }`));
                                          }
                                    }).catch(error => { console.log(error); });
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<div>").addClass(styles.button_list)
                                                .append($("<button>").text("Tăng").addClass(styles.increase).addClass(`value_${ response.data[i].MA_TB }`).on("click", () => { increase(response.data[i].MA_TB) }))
                                                .append($("<button>").text("Giảm").addClass(styles.decrease).addClass(`value_${ response.data[i].MA_TB }`).on("click", () => { decrease(response.data[i].MA_TB) }))
                                                .append($("<button>").text("Tự động").addClass(styles.auto).addClass(`setAuto_${ response.data[i].MA_TB }`).on("click", () => { auto(response.data[i].MA_TB, !response.data[i].TU_DONG) }))
                                          )
                                    );
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).on("click", () => { window.location.href = "./" + response.data[i].MA_TB; }))
                                    );
                                    $(".table_body").append(table_row);
                                    if (response.data[i].TRANG_THAI)
                                    {
                                          $(`.on_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.off_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.setAuto_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.sensorVal_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          if (response.data[i].TU_DONG)
                                                $(`.value_${ response.data[i].MA_TB }`).css("display", "none");
                                          else
                                                $(`.value_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                    }
                                    else
                                    {
                                          $(`.off_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.on_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.value_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.setAuto_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.sensorVal_${ response.data[i].MA_TB }`).css("display", "none");
                                    }
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
            else
            {
                  axios.post('http://localhost:5000/device_list', {
                        type: "LIGHT",
                        name: props.name
                  })
                        .then(function (response)
                        {
                              $(".table_body").empty();
                              for (let i = 0; i < response.data.length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[i].TEN));
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Tắt").addClass(styles.off).addClass(`off_${ response.data[i].MA_TB }`).on("click", () => { toggle(response.data[i].MA_TB, false); }))
                                          .append($("<button>").text("Bật").addClass(styles.on).addClass(`on_${ response.data[i].MA_TB }`).on("click", () => { toggle(response.data[i].MA_TB, true); }))
                                    );
                                    table_row.append($("<td>").addClass("text-center").addClass(`currentValue_${ response.data[i].MA_TB }`));
                                    axios.post('http://localhost:5000/device_list/latest_data', {
                                          id: response.data[i].MA_TB,
                                    }).then(res =>
                                    {
                                          if (!('error' in res.data))
                                          {
                                                if (response.data[i].TRANG_THAI)
                                                      if (!$(`.currentValue_${ response.data[i].MA_TB }`).children().length)
                                                            $(`.currentValue_${ response.data[i].MA_TB }`).append($("<p>").text(res.data[0].GIA_TRI).addClass(styles.current_value).addClass(`sensorVal_${ response.data[i].MA_TB }`));
                                          }
                                    }).catch(error => { console.log(error); });
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<div>").addClass(styles.button_list)
                                                .append($("<button>").text("Tăng").addClass(styles.increase).addClass(`value_${ response.data[i].MA_TB }`).on("click", () => { increase(response.data[i].MA_TB) }))
                                                .append($("<button>").text("Giảm").addClass(styles.decrease).addClass(`value_${ response.data[i].MA_TB }`).on("click", () => { decrease(response.data[i].MA_TB) }))
                                                .append($("<button>").text("Tự động").addClass(styles.auto).addClass(`setAuto_${ response.data[i].MA_TB }`).on("click", () => { auto(response.data[i].MA_TB, !response.data[i].TU_DONG) }))
                                          )
                                    );
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).on("click", () => { window.location.href = "./" + response.data[i].MA_TB; }))
                                    );
                                    $(".table_body").append(table_row);
                                    if (response.data[i].TRANG_THAI)
                                    {
                                          $(`.on_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.off_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.setAuto_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.sensorVal_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          if (response.data[i].TU_DONG)
                                                $(`.value_${ response.data[i].MA_TB }`).css("display", "none");
                                          else
                                                $(`.value_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                    }
                                    else
                                    {
                                          $(`.off_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.on_${ response.data[i].MA_TB }`).css("display", "inline-block");
                                          $(`.value_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.setAuto_${ response.data[i].MA_TB }`).css("display", "none");
                                          $(`.sensorVal_${ response.data[i].MA_TB }`).css("display", "none");
                                    }
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      })
}

const Door = (props) =>
{
      useEffect(() =>
      {
            if (typeof (props.name) === "undefined" || props.name === '')
            {
                  $(".header").empty();
                  $(".header")
                        .append($("<th>").attr("scope", "col").addClass("col-1").addClass(styles.table_header).text("#"))
                        .append($("<th>").attr("scope", "col").addClass("col-2").addClass(styles.table_header).text("Tên thiết bị"))
                        .append($("<th>").attr("scope", "col").addClass("col-1").addClass("text-center").addClass(styles.table_header).text("Trạng thái"))
                        .append($("<th>").attr("scope", "col").addClass("col-1").addClass("text-center").addClass(styles.table_header).text("Tác vụ"));

                  axios.post('http://localhost:5000/device_list', {
                        type: "DOOR",
                  })
                        .then(function (response)
                        {
                              $(".table_body").empty();
                              for (let i = 0; i < response.data.length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[i].TEN));
                                    const td = $("<td>").addClass("text-center");
                                    axios.post('http://localhost:5000/device_list/latest_data', {
                                          id: response.data[i].MA_TB,
                                    }).then(res =>
                                    {
                                          if (!('error' in res.data))
                                          {
                                                if (res.data[0].GIA_TRI)
                                                      td.append($("<p>").text(`Mở`).addClass(styles.current_value).css("color", "red"));
                                                else if (res.data[0].GIA_TRI !== null && !res.data[0].GIA_TRI)
                                                      td.append($("<p>").text(`Đóng`).addClass(styles.current_value).css("color", "green"));
                                          }
                                    }).catch(error => { console.log(error); });
                                    table_row.append(td);
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[i].MA_TB; }))
                                    );
                                    $(".table_body").append(table_row);
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
            else
            {
                  axios.post('http://localhost:5000/device_list', {
                        type: "DOOR",
                        name: props.name
                  })
                        .then(function (response)
                        {
                              $(".table_body").empty();
                              for (let i = 0; i < response.data.length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[i].TEN));
                                    const td = $("<td>").addClass("text-center");
                                    axios.post('http://localhost:5000/device_list/latest_data', {
                                          id: response.data[i].MA_TB,
                                    }).then(res =>
                                    {
                                          if (!('error' in res.data))
                                          {
                                                if (res.data[0].GIA_TRI)
                                                      td.append($("<p>").text(`Mở`).addClass(styles.current_value).css("color", "red"));
                                                else if (res.data[0].GIA_TRI !== null && !res.data[0].GIA_TRI)
                                                      td.append($("<p>").text(`Đóng`).addClass(styles.current_value).css("color", "green"));
                                          }
                                    }).catch(error => { console.log(error); });
                                    table_row.append(td);
                                    table_row.append($("<td>").addClass("text-center")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[i].MA_TB; }))
                                    );
                                    $(".table_body").append(table_row);
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      }, [props.name])
}

const DeviceList = () =>
{
      const render = useRef(false);
      const Navigate = useNavigate();
      const URL = useParams();
      let root = useRef();

      useEffect(() =>
      {
            if (!render.current)
            {
                  root.current = ReactDOM.createRoot(document.getElementsByClassName('table_body')[0]);
                  $("#device").css("color", "blue");
                  if (URL.type === "fan")
                        root.current.render(<Fan />);
                  else if (URL.type === "light")
                        root.current.render(<Light />);
                  else
                        root.current.render(<Door />);
                  render.current = true;
            }
      })

      const search = (event) =>
      {
            event.preventDefault();
            if (URL.type === "fan")
                  root.current.render(<Fan name={ $("#search").val() } />);
            else if (URL.type === "light")
                  root.current.render(<Light name={ $("#search").val() } />);
            else
                  root.current.render(<Door name={ $("#search").val() } />);
      }

      const goBack = (event) =>
      {
            event.preventDefault();
            Navigate(-1);
      }

      return (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                  <div className="h-75 w-75 device-page-board d-flex flex-column" style={ { backgroundColor: "white", border: "2px solid black", borderRadius: "20px" } }>
                        <div className="w-100 d-flex justify-content-between" style={ { height: "50px" } }>
                              <div className="w-75 d-flex justify-content-start align-items-center" style={ { marginLeft: "10px", position: "relative" } }>
                                    <BsSearch id='scope' className={ `${ styles.search_icon }` } onClick={ search } />
                                    <input className={ `${ styles.search }` } id='search' type='text' placeholder='Find' />
                                    { localStorage.getItem('type') !== null && localStorage.getItem('type').includes("ADMIN") && <button className={ `mx-sm-4 ${ styles.add } d-flex align-items-center` }><TbPlus />Thêm</button> }
                              </div>
                              <div className="w-25 d-flex justify-content-end align-items-center">
                                    <AiOutlineCloseCircle size={ 30 } style={ { marginRight: "5px" } } className={ `${ styles.close }` } onClick={ goBack } />
                              </div>
                        </div>
                        <div className="w-100 overflow-auto" style={ { height: "calc(100% - 50px)" } }>
                              <table className="table table-hover mx-2 mt-3 overflow-auto" style={ { width: "95%" } }>
                                    <thead style={ { borderBottom: "2px solid black" } }>
                                          <tr className="header">
                                          </tr>
                                    </thead>
                                    <tbody className="table_body">
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
}

export default DeviceList;