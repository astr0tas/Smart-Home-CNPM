import "../css/list.css";
import { useEffect, useRef } from "react";
import $ from 'jquery';
import { AiOutlinePlus } from "react-icons/ai";

const List = () =>
{
      useEffect(() =>
      {
            $("#device").css("color","rgb(153, 153, 153)");
      })

      return (
        <div className="list">
            <div className="container">
                <div className="control">
                    <input type="text" name='search' placeholder="Tìm kiếm" className="inp"></input>
                    <button id="longbtn"><AiOutlinePlus></AiOutlinePlus> Thêm cảm biến</button>
                    <button>Xóa</button>
                </div>
                <table>
                <tr>
                    <th>
                        <label>
                            <input
                            type="checkbox"
                            />
                        </label>
                    </th>
                    <th>#</th>
                    <th>Vị trí thiết bị</th>
                    <th>Bật/tắt</th>
                    <th>Nhiệt độ hiện tại</th>
                    <th>Tác vụ</th>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input
                            type="checkbox"
                            />
                        </label>
                    </td>
                    <td>1</td>
                    <td>Phòng khách (1)</td>
                    <td><div className="status off">Tắt</div></td>
                    <td className="databox">0</td>
                    <td><button>Chi tiết</button></td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input
                            type="checkbox"
                            />
                        </label>
                    </td>
                    <td>1</td>
                    <td>Phòng khách (2)</td>
                    <td><div className="status on">Bật</div></td>
                    <td className="databox">30</td>
                    <td><button>Chi tiết</button></td>
                </tr>
                </table>
            </div>
        </div>
      );
}

export default List;