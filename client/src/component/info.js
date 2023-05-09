import "../css/device.css";
import { useEffect, useRef, React } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

const Info = () =>
{
      const render = useRef(true);
      const Nav = useNavigate();


      useEffect(() =>
      {
            if (render.current)
            {
                  console.log("Render device page!");
                  $("#device").css("color", "blue");
                  render.current = false;
            }
      })

      const handleClick = (event, class_name) =>
      {
            event.preventDefault();
            $("." + class_name).css("color", "rgb(123, 123, 123)");
            setTimeout(() =>
            {
                  $("." + class_name).css("color", "black");
                  setTimeout(() =>
                  {
                        Nav("./" + class_name + "/list");
                  }, 0);
            }, 100);
      }

      return (
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center device-page" style={ {
                  minHeight: "700px",
                  overflow: "auto"
            } }>
                  <div className="h-75 w-75 device-page-board d-flex flex-column overflow-auto h-auto" style={ { minHeight: "750px" } }>
                        <div className="d-flex justify-content-center select-device">
                              <h1>Thông tin cá nhân</h1>
                        </div>
                        <div className="d-flex flex-column flex-md-row w-100 h-75 justify-content-around align-items-center m-auto">
                        <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                              <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" alt="Avatar" />
                              <button>Chọn file</button>
                        </div>
                        <div className="col-6">
                        <div style={{width: '630px', height: '60px', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
                              <input type="text" style={{width: '100%', height: '100%', borderRadius: '50px', border: '1px solid black', padding: '5px'}} placeholder="Name" />
                        </div>


                        <div style={{display: 'inline-block', width: '300px', height: '60px', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
                              <input type="text" style={{width: '100%', height: '100%', borderRadius: '50px', border: '1px solid black', padding: '5px', marginLeft: '0px'}} placeholder="Giới tính" />
                        </div>
                        <div style={{display: 'inline-block', width: '300px', height: '60px', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
                              <input type="text" style={{width: '100%', height: '100%', borderRadius: '50px', border: '1px solid black', padding: '5px', marginRight: '0px'}} placeholder="Năm sinh" />
                        </div>
                              
                        
                        <div style={{width: '630px', height: '60px', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
                              <input type="text" style={{width: '100%', height: '100%', borderRadius: '50px', border: '1px solid black', padding: '5px'}} placeholder="Số CCCD" />
                        </div>
                        <div style={{width: '630px', height: '60px', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
                              <input type="text" style={{width: '100%', height: '100%', borderRadius: '50px', border: '1px solid black', padding: '5px'}} placeholder="Email" />
                        </div>
                        <div style={{width: '630px', height: '60px', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
                              <input type="text" style={{width: '100%', height: '100%', borderRadius: '50px', border: '1px solid black', padding: '5px'}} placeholder="SĐT" />
                        </div>
                        <div style={{width: '630px', height: '60px', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
                              <input type="text" style={{width: '100%', height: '100%', borderRadius: '50px', border: '1px solid black', padding: '5px'}} placeholder="Tài khoản" />
                        </div>
                        <div style={{width: '630px', height: '60px', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
                              <input type="text" style={{width: '100%', height: '100%', borderRadius: '50px', border: '1px solid black', padding: '5px'}} placeholder="Mật khẩu" />
                        </div>
                        </div>
                        
                        </div>
                        <div style={{ display: 'flex',  justifyContent: 'center', padding: '15px' }}>
                              <button style={{ width: '300px', height: '40px', backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '15px', marginRight: '50px', }}>Hủy bỏ</button>
                              <button style={{ width: '300px', height: '40px', backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '15px', marginLeft: '50px' }}>Xác nhận</button>
                        </div>
                  </div>
                  
            </div>
      );
}

export default Info;
