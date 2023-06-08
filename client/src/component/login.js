import "../css/login.css"
import React, { useEffect, useState } from 'react';
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from 'react-icons/ai';


const Login = () =>
{
      /*
      https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig=
      */
      const [wrong, setWrong] = useState(false);
      const Navigate = useNavigate()
      const handleForm = (e) =>
      {
            e.preventDefault();
            const username = document.getElementsByName("username")[0];
            const password = document.getElementsByName("password")[0];
            axios.post('http://localhost:5000/login', { username: username.value, password: password.value })
                  .then(res =>
                  {
                        if (res.data === 1)
                        {
                              localStorage.setItem('username', username.value);
                              localStorage.setItem('type', 'ADMIN');
                              Navigate("/admin/sensor");
                              setWrong(false);
                        }
                        else if (res.data === 2)
                        {
                              localStorage.setItem('username', username.value);
                              localStorage.setItem('type', 'USER');
                              Navigate("/sensor");
                              setWrong(false);
                        }
                        else
                              setWrong(true);
                  })
                  .catch(err => { console.log(err); })
      };

      useEffect(() =>
      {
            if (localStorage.getItem('username') !== null && localStorage.getItem('username') !== 'undefined')
            {
                  if (localStorage.getItem('type') === 'ADMIN')
                        Navigate('./admin/device');
                  else
                        Navigate('./device');
            }
      })

      return (
            <div className="login w-100 h-100 d-flex justify-content-center align-items-center">
                  <div className="w-75 h-75 login-board d-flex justify-content-center align-items-center">
                        <img className="pic" src="https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig=" alt="pic"></img>
                        <div className="d-flex flex-column form">
                              <h1>Đăng nhập</h1>
                              <form className="d-flex flex-column" onSubmit={ handleForm }>
                                    <div className="d-flex align-items-center">
                                          <AiOutlineUser className="icons"></AiOutlineUser>
                                          <input type="text" name='username' placeholder="Tên đăng nhập" className="input"></input>
                                    </div>
                                    <div className="d-flex align-items-center">
                                          <AiOutlineLock className="icons"></AiOutlineLock>
                                          <input type="password" name='password' placeholder="Mật khẩu" className="input"></input>
                                    </div>
                                    { wrong && <div className="d-flex align-items-center" style={ { color: "red", fontSize: "1rem" } }><AiOutlineCloseCircle />Tài khoản hoặc mật khẩu sai!</div> }
                                    <input type="submit" value="Truy cập" className="submit" />
                              </form>
                              <a href='/Change' className="text-decoration-none forgot">Quên mật khẩu?</a>
                        </div>
                  </div >
            </div >
      );
}

export default Login;