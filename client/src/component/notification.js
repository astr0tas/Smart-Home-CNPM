import { useEffect } from "react";
import $ from 'jquery';
import axios from "axios";
import { formatDateAndTime } from "../tools/time";
import styles from "../css/sensor_list.module.css";

const Notification = () =>
{
      useEffect(() =>
      {
            $('#notice').css('color', 'blue');
            axios.get('http://localhost:5000/notification')
                  .then(response =>
                  {
                        $(`.table_body`).empty();
                        for (let i = 0; i < response.data.length; i++)
                        {
                              if (response.data[i].MA_TB.includes("LIGHT_INTENSE"))
                              {
                                    if (response.data[i].GIA_TRI)
                                    {
                                          const max = response.data[i].NGUONG_TREN;
                                          const min = response.data[i].NGUONG_DUOI;
                                          if (response.data[i].GIA_TRI > max)
                                          {
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Độ sáng ${ response.data[i].TEN_TB } cao: ${ response.data[i].GIA_TRI }`).append(` (giới hạn ${ max }%)`).css("color", "red"))
                                                );
                                          }
                                          else if (response.data[i].GIA_TRI < min)
                                          {
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Độ sáng ${ response.data[i].TEN_TB } thấp: ${ response.data[i].GIA_TRI }`).append(` (giới hạn ${ min }%)`).css("color", "blue"))
                                                );
                                          }
                                          else
                                          {
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Độ sáng ${ response.data[i].TEN_TB } hiện tại: ${ response.data[i].GIA_TRI }%`))
                                                );
                                          }
                                    }
                                    else if (response.data[i].TRANG_THAI !== null)
                                    {
                                          if (response.data[i].TRANG_THAI)
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } bật cảm biến ${ response.data[i].TEN_TB }`))
                                                );
                                          else
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } tắt cảm biến ${ response.data[i].TEN_TB }`))
                                                );
                                    }
                                    else if (response.data[i].NGUONG_DUOI_THIET_LAP !== null)
                                    {
                                          $(`.table_body`).append(
                                                $("<tr>")
                                                      .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                      .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } thiết lập ngưỡng dưới của ${ response.data[i].TEN_TB } ${ response.data[i].NGUONG_DUOI_THIET_LAP }%`))
                                          );
                                    }
                                    else if (response.data[i].NGUONG_TREN_THIET_LAP !== null)
                                    {
                                          $(`.table_body`).append(
                                                $("<tr>")
                                                      .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                      .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } thiết lập ngưỡng trên của ${ response.data[i].TEN_TB } ${ response.data[i].NGUONG_TREN_THIET_LAP }%`))
                                          );
                                    }
                              }
                              else if (response.data[i].MA_TB.includes("HEAT"))
                              {
                                    if (response.data[i].GIA_TRI)
                                    {
                                          const max = response.data[i].NGUONG_TREN;
                                          const min = response.data[i].NGUONG_DUOI;
                                          if (response.data[i].GIA_TRI > max)
                                          {
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Nhiệt độ ${ response.data[i].TEN_TB } quá nóng: ${ response.data[i].GIA_TRI }`).append($('<sup>').text('o')).append('C').append(` (giới hạn ${ max }`).append($('<sup>').text('o')).append('C)').css("color", "red"))
                                                );
                                          }
                                          else if (response.data[i].GIA_TRI < min)
                                          {
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Nhiệt độ ${ response.data[i].TEN_TB } quá lạnh: ${ response.data[i].GIA_TRI }`).append($('<sup>').text('o')).append('C').append(` (giới hạn ${ min }`).append($('<sup>').text('o')).append('C)').css("color", "blue"))
                                                );
                                          }
                                          else
                                          {
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Nhiệt độ ${ response.data[i].TEN_TB } hiện tại: ${ response.data[i].GIA_TRI }`).append($('<sup>').text('o')).append('C'))
                                                );
                                          }
                                    }
                                    else if (response.data[i].TRANG_THAI !== null)
                                    {
                                          if (response.data[i].TRANG_THAI)
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } bật cảm biến ${ response.data[i].TEN_TB }`))
                                                );
                                          else
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } tắt cảm biến ${ response.data[i].TEN_TB }`))
                                                );
                                    }
                                    else if (response.data[i].NGUONG_DUOI_THIET_LAP !== null)
                                    {
                                          $(`.table_body`).append(
                                                $("<tr>")
                                                      .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                      .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } thiết lập ngưỡng dưới của ${ response.data[i].TEN_TB } ${ response.data[i].NGUONG_DUOI_THIET_LAP }`).append($('<sup>').text('o')).append('C'))
                                          );
                                    }
                                    else if (response.data[i].NGUONG_TREN_THIET_LAP !== null)
                                    {
                                          $(`.table_body`).append(
                                                $("<tr>")
                                                      .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                      .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } thiết lập ngưỡng trên của ${ response.data[i].TEN_TB } ${ response.data[i].NGUONG_TREN_THIET_LAP }`).append($('<sup>').text('o')).append('C'))
                                          );
                                    }
                              }
                              else if (response.data[i].MA_TB.includes("HUMID"))
                              {
                                    if (response.data[i].GIA_TRI)
                                    {
                                          const max = response.data[i].NGUONG_TREN;
                                          const min = response.data[i].NGUONG_DUOI;
                                          if (response.data[i].GIA_TRI > max)
                                          {
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Độ ẩm ${ response.data[i].TEN_TB } cao: ${ response.data[i].GIA_TRI }`).append(` (giới hạn ${ max }%)`).css("color", "red"))
                                                );
                                          }
                                          else if (response.data[i].GIA_TRI < min)
                                          {
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Độ ẩm ${ response.data[i].TEN_TB } thấp: ${ response.data[i].GIA_TRI }`).append(` (giới hạn ${ min }%)`).css("color", "blue"))
                                                );
                                          }
                                          else
                                          {
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Độ ẩm ${ response.data[i].TEN_TB } hiện tại: ${ response.data[i].GIA_TRI }%`))
                                                );
                                          }
                                    }
                                    else if (response.data[i].TRANG_THAI !== null)
                                    {
                                          if (response.data[i].TRANG_THAI)
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } bật cảm biến ${ response.data[i].TEN_TB }`))
                                                );
                                          else
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } tắt cảm biến ${ response.data[i].TEN_TB }`))
                                                );
                                    }
                                    else if (response.data[i].NGUONG_DUOI_THIET_LAP !== null)
                                    {
                                          $(`.table_body`).append(
                                                $("<tr>")
                                                      .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                      .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } thiết lập ngưỡng dưới của ${ response.data[i].TEN_TB } ${ response.data[i].NGUONG_DUOI_THIET_LAP }%`))
                                          );
                                    }
                                    else if (response.data[i].NGUONG_TREN_THIET_LAP !== null)
                                    {
                                          $(`.table_body`).append(
                                                $("<tr>")
                                                      .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                      .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } thiết lập ngưỡng trên của ${ response.data[i].TEN_TB } ${ response.data[i].NGUONG_TREN_THIET_LAP }%`))
                                          );
                                    }
                              }
                              else if (response.data[i].MA_TB.includes("IR"))
                              {
                                    if (response.data[i].GIA_TRI)
                                          $(`.${ styles.ir_sensor_history }`).append(
                                                $("<tr>")
                                                      .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                      .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN_TB } phát hiện chuyển động`))
                                          );
                                    else if (response.data[i].TRANG_THAI !== null)
                                    {
                                          if (response.data[i].TRANG_THAI)
                                                $(`.${ styles.ir_sensor_history }`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } bật ${ response.data[i].TEN_TB }`))
                                                );
                                          else
                                                $(`.${ styles.ir_sensor_history }`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } tắt ${ response.data[i].TEN_TB }`))
                                                );
                                    }
                              }
                              else if (response.data[i].MA_TB.includes("FAN"))
                              {
                                    if (response.data[i].GIA_TRI !== null)
                                    {
                                          if (response.data[i].TEN !== null)
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } thiết lập tốc độ ${ response.data[i].TEN_TB } ${ response.data[i].GIA_TRI } %`))
                                                );
                                          else
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Tốc độ ${ response.data[i].TEN_TB } hiện tại: ${ response.data[i].GIA_TRI }%`))
                                                );
                                    }
                                    else if (response.data[i].TRANG_THAI !== null)
                                    {
                                          if (response.data[i].TRANG_THAI)
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } bật ${ response.data[i].TEN_TB }`))
                                                );
                                          else
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } tắt ${ response.data[i].TEN_TB }`))
                                                );
                                    }
                                    else if (response.data[i].TU_DONG !== null)
                                          if (response.data[i].TU_DONG)
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } bật chế độ tự động của ${ response.data[i].TEN_TB }`))
                                                );
                                          else
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } tắt chế độ tự động của ${ response.data[i].TEN_TB }`))
                                                );
                              }
                              else if (response.data[i].MA_TB.includes("LIGHT"))
                              {
                                    if (response.data[i].GIA_TRI !== null)
                                    {
                                          if (response.data[i].TEN !== null)
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } thiết lập độ sáng ${ response.data[i].TEN_TB } ${ response.data[i].GIA_TRI } %`))
                                                );
                                          else
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`Độ sáng ${ response.data[i].TEN_TB } hiện tại: ${ response.data[i].GIA_TRI }%`))
                                                );
                                    }
                                    else if (response.data[i].TRANG_THAI !== null)
                                    {
                                          if (response.data[i].TRANG_THAI)
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } bật ${ response.data[i].TEN_TB }`))
                                                );
                                          else
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } tắt ${ response.data[i].TEN_TB }`))
                                                );
                                    }
                                    else if (response.data[i].TU_DONG !== null)
                                          if (response.data[i].TU_DONG)
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } bật chế độ tự động của ${ response.data[i].TEN_TB }`))
                                                );
                                          else
                                                $(`.table_body`).append(
                                                      $("<tr>")
                                                            .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                            .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } tắt chế độ tự động của ${ response.data[i].TEN_TB }`))
                                                );
                              }
                              else if (response.data[i].MA_TB.includes("DOOR"))
                              {
                                    if (response.data[i].GIA_TRI && response.data[i].TEN)
                                          $(`.table_body`).append(
                                                $("<tr>")
                                                      .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                      .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } đã mở ${ response.data[i].TEN_TB }`))
                                          );
                                    else if (response.data[i].GIA_TRI !== null && !response.data[i].GIA_TRI && response.data[i].TEN)
                                          $(`.table_body`).append(
                                                $("<tr>")
                                                      .append($("<td>").addClass("text-center").text(`${ formatDateAndTime(response.data[i].THOI_GIAN) }`))
                                                      .append($("<td>").addClass("text-center").text(`${ response.data[i].TEN } đã đóng ${ response.data[i].TEN_TB }`))
                                          );
                              }
                        }
                  })
                  .catch(err => { console.log(err); })
      });

      return (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                  <div className="h-75 w-75 device-page-board d-flex flex-column align-items-center overflow-auto" style={ { backgroundColor: "white", border: "2px solid black", borderRadius: "20px" } }>
                        <table className="table table-hover mx-2 mt-3" style={ { width: "85%" } }>
                              <thead style={ { borderBottom: "2px solid black" } }>
                                    <tr className="header">
                                          <th scope="col" className={ `col-md-3 col-6 ${ styles.table_header } text-center` }>THỜI GIAN</th>
                                          <th scope="col" className={ `col-md-3 col-6 ${ styles.table_header } text-center` }>NỘI DUNG</th>
                                    </tr>
                              </thead>
                              <tbody className="table_body">
                              </tbody>
                        </table>
                  </div>
            </div>
      );
}

export default Notification;