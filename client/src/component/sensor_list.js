import styles from "../css/sensor_list.module.css";
import { useEffect, useRef, React } from "react";
import ReactDOM from 'react-dom/client';
import $ from 'jquery';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { TbPlus } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Tempature = (props) =>
{
      const render = useRef(false);

      useEffect(() =>
      {
            $(".table_body").empty();
            if (typeof (props.name) === "undefined" || props.name === '')
            {
                  if (!render.current)
                  {
                        $(".header")
                              .append($("<th>").attr("scope", "col").addClass("col-2").addClass("text-center").addClass(styles.table_header).text("Trạng thái"))
                              .append($("<th>").attr("scope", "col").addClass("col-3").addClass("text-center").addClass(styles.table_header).text("Nhiệt độ hiện tại (").append($('<sup>').text('o')).append('C)'))
                              .append($("<th>").attr("scope", "col").addClass("col").text("Tác vụ").css("padding-left", "15px").addClass(styles.table_header));

                        render.current = true;
                  }

                  axios.post('http://localhost:5000/sensor_list', {
                        type: "HEAT",
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              for (let i = 0; i < response.data[0].length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[0][i].TEN));
                                    if (response.data[0][i].TRANG_THAI)
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Tắt").addClass(styles.off))
                                          );
                                    }
                                    else
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Bật").addClass(styles.on))
                                          );
                                    }
                                    if (response.data.length === 1)
                                          table_row.append($("<td>"));
                                    else
                                    {
                                    }
                                    table_row.append($("<td>")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[0][i].MA_CB; }))
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
                  axios.post('http://localhost:5000/sensor_list', {
                        type: "HEAT",
                        name: props.name
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              for (let i = 0; i < response.data[0].length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[0][i].TEN));
                                    if (response.data[0][i].TRANG_THAI)
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Tắt").addClass(styles.off))
                                          );
                                    }
                                    else
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Bật").addClass(styles.on))
                                          );
                                    }
                                    if (response.data.length === 1)
                                          table_row.append($("<td>"));
                                    else
                                    {
                                    }
                                    table_row.append($("<td>")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[0][i].MA_CB; }))
                                    );
                                    $(".table_body").append(table_row);
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      })
}

const Humid = (props) =>
{
      const render = useRef(false);

      useEffect(() =>
      {
            $(".table_body").empty();
            if (typeof (props.name) === "undefined" || props.name === '')
            {
                  if (!render.current)
                  {
                        $(".header")
                              .append($("<th>").attr("scope", "col").addClass("col-2").addClass("text-center").addClass(styles.table_header).text("Trạng thái"))
                              .append($("<th>").attr("scope", "col").addClass("col-3").addClass("text-center").addClass(styles.table_header).text("Độ ẩm hiện tại(%)"))
                              .append($("<th>").attr("scope", "col").addClass("col").text("Tác vụ").css("padding-left", "15px").addClass(styles.table_header));

                        render.current = true;
                  }

                  axios.post('http://localhost:5000/sensor_list', {
                        type: "HUMID",
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              for (let i = 0; i < response.data[0].length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[0][i].TEN));
                                    if (response.data[0][i].TRANG_THAI)
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Tắt").addClass(styles.off))
                                          );
                                    }
                                    else
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Bật").addClass(styles.on))
                                          );
                                    }
                                    if (response.data.length === 1)
                                          table_row.append($("<td>"));
                                    else
                                    {
                                    }
                                    table_row.append($("<td>")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[0][i].MA_CB; }))
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
                  axios.post('http://localhost:5000/sensor_list', {
                        type: "HUMID",
                        name: props.name
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              for (let i = 0; i < response.data[0].length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[0][i].TEN));
                                    if (response.data[0][i].TRANG_THAI)
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Tắt").addClass(styles.off))
                                          );
                                    }
                                    else
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Bật").addClass(styles.on))
                                          );
                                    }
                                    if (response.data.length === 1)
                                          table_row.append($("<td>"));
                                    else
                                    {
                                    }
                                    table_row.append($("<td>")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[0][i].MA_CB; }))
                                    );
                                    $(".table_body").append(table_row);
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      })
}

const LightSensor = (props) =>
{
      const render = useRef(false);

      useEffect(() =>
      {
            $(".table_body").empty();
            if (typeof (props.name) === "undefined" || props.name === '')
            {
                  if (!render.current)
                  {
                        $(".header")
                              .append($("<th>").attr("scope", "col").addClass("col-2").addClass("text-center").addClass(styles.table_header).text("Trạng thái"))
                              .append($("<th>").attr("scope", "col").addClass("col-3").addClass("text-center").addClass(styles.table_header).text("Cường độ ánh sáng(%)"))
                              .append($("<th>").attr("scope", "col").addClass("col").text("Tác vụ").css("padding-left", "15px").addClass(styles.table_header));

                        render.current = true;
                  }

                  axios.post('http://localhost:5000/sensor_list', {
                        type: "LIGHT_INTENSE",
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              for (let i = 0; i < response.data[0].length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[0][i].TEN));
                                    if (response.data[0][i].TRANG_THAI)
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Tắt").addClass(styles.off))
                                          );
                                    }
                                    else
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Bật").addClass(styles.on))
                                          );
                                    }
                                    if (response.data.length === 1)
                                          table_row.append($("<td>"));
                                    else
                                    {
                                    }
                                    table_row.append($("<td>")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[0][i].MA_CB; }))
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
                  axios.post('http://localhost:5000/sensor_list', {
                        type: "LIGHT_INTENSE",
                        name: props.name
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              for (let i = 0; i < response.data[0].length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[0][i].TEN));
                                    if (response.data[0][i].TRANG_THAI)
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Tắt").addClass(styles.off))
                                          );
                                    }
                                    else
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Bật").addClass(styles.on))
                                          );
                                    }
                                    if (response.data.length === 1)
                                          table_row.append($("<td>"));
                                    else
                                    {
                                    }
                                    table_row.append($("<td>")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[0][i].MA_CB; }))
                                    );
                                    $(".table_body").append(table_row);
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      })
}

const InfraredSensor = (props) =>
{
      const render = useRef(false);

      useEffect(() =>
      {
            $(".table_body").empty();
            if (typeof (props.name) === "undefined" || props.name === '')
            {
                  if (!render.current)
                  {
                        $(".header")
                              .append($("<th>").attr("scope", "col").addClass("col-2").addClass("text-center").addClass(styles.table_header).text("Trạng thái"))
                              .append($("<th>").attr("scope", "col").addClass("col-3").addClass("text-center").addClass(styles.table_header).text("Lần phát hiện gần đây"))
                              .append($("<th>").attr("scope", "col").addClass("col").text("Tác vụ").css("padding-left", "15px").addClass(styles.table_header));

                        render.current = true;
                  }

                  axios.post('http://localhost:5000/sensor_list', {
                        type: "IR",
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              for (let i = 0; i < response.data[0].length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[0][i].TEN));
                                    if (response.data[0][i].TRANG_THAI)
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Tắt").addClass(styles.off))
                                          );
                                    }
                                    else
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Bật").addClass(styles.on))
                                          );
                                    }
                                    if (response.data.length === 1)
                                          table_row.append($("<td>"));
                                    else
                                    {
                                    }
                                    table_row.append($("<td>")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[0][i].MA_CB; }))
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
                  axios.post('http://localhost:5000/sensor_list', {
                        type: "IR",
                        name: props.name
                  })
                        .then(function (response)
                        {
                              console.log(response);
                              for (let i = 0; i < response.data[0].length; i++)
                              {
                                    let table_row = $("<tr>")
                                          .append($("<th>").attr("scope", "row").text(i + 1))
                                          .append($("<td>").text(response.data[0][i].TEN));
                                    if (response.data[0][i].TRANG_THAI)
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Tắt").addClass(styles.off))
                                          );
                                    }
                                    else
                                    {
                                          table_row.append($("<td>").addClass("text-center")
                                                .append($("<button>").text("Bật").addClass(styles.on))
                                          );
                                    }
                                    if (response.data.length === 1)
                                          table_row.append($("<td>"));
                                    else
                                    {
                                    }
                                    table_row.append($("<td>")
                                          .append($("<button>").text("Chi tiết").addClass(styles.detail).addClass("m-0").on("click", () => { window.location.href = "./" + response.data[0][i].MA_CB; }))
                                    );
                                    $(".table_body").append(table_row);
                              }

                        })
                        .catch(function (error)
                        {
                              console.log(error);
                        });
            }
      })
}

const SensorList = () =>
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
                  $("#sensor").css("color", "blue");
                  if (URL.type === "thermal")
                        root.current.render(<Tempature />);
                  else if (URL.type === "humid")
                        root.current.render(<Humid />);
                  else if (URL.type === "ligh_intensity")
                        root.current.render(<LightSensor />);
                  else
                        root.current.render(<InfraredSensor />);
                  render.current = true;
            }
      })

      const search = (event) =>
      {
            event.preventDefault();
            if (URL.type === "thermal")
                  root.current.render(<Tempature name={ $("#search").val() } />);
            else if (URL.type === "humid")
                  root.current.render(<Humid name={ $("#search").val() } />);
            else if (URL.type === "ligh_intensity")
                  root.current.render(<LightSensor name={ $("#search").val() } />);
            else
                  root.current.render(<InfraredSensor name={ $("#search").val() } />);
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
                                    <button className={ `mx-sm-4 ${ styles.add } d-flex align-items-center` }><TbPlus />Thêm cảm biến</button>
                              </div>
                              <div className="w-25 d-flex justify-content-end align-items-center">
                                    <AiOutlineCloseCircle size={ 30 } style={ { marginRight: "10px" } } className={ `${ styles.close }` } onClick={ goBack } />
                              </div>
                        </div>
                        <div className="w-100 overflow-auto" style={ { height: "calc(100% - 50px)" } }>
                              <table className="table table-hover mx-2 mt-3 overflow-auto" style={ { width: "95%" } }>
                                    <thead style={ { borderBottom: "2px solid black" } }>
                                          <tr className="header">
                                                <th scope="col" className={ `col-1 ${ styles.table_header }` }>#</th>
                                                <th scope="col" className={ `col-2 ${ styles.table_header }` }>Tên thiết bị</th>
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

export default SensorList;