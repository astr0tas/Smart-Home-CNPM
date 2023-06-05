import axios from "axios";
import "../css/login.css"
import React from 'react';
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";


const Login = () =>
{
      /*
      https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig=
      */

      const handleForm = (e) =>
      {
            e.preventDefault();
            const username = document.getElementsByName("username")[0];
            const password = document.getElementsByName("password")[0];
            axios.post("http://localhost:5000/login", { username: username.value, password: password.value })
                  .then(res =>
                  {
                        console.log(res);
                  })
                  .catch(err => { console.log(err); })
      }

      return (
            // <div className="login">
            //       <div className="container">
            //             <img className="pic" src="https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig=" alt="pic"></img>
            //             <div className='login-box'>
            //                   <h1 className='title'>Đăng nhập</h1>
            //                   <form>
            //                         <div className="d-flex align-items-center">
            //                               <AiOutlineUser size={30} className="icons"></AiOutlineUser>
            //                               <input type="text" name='uname' placeholder="Tên đăng nhập" className='inp'></input>
            //                         </div>
            //                         <div className="d-flex align-items-center">
            //                               <AiOutlineLock size={ 30 } className="icons"></AiOutlineLock>
            //                               <input type="password" name='password' placeholder="Mật khẩu" className='inp'></input>
            //                         </div>
            //                         <input type="submit" className='button' value="Truy cập" />
            //                   </form>
            //                   <a href='#' className='link'>Quên mật khẩu?</a>
            //             </div>
            //       </div>
            // </div>
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
                                    <input type="submit" value="Truy cập" className="submit" />
                              </form>
                              <a href='#' className="text-decoration-none forgot">Quên mật khẩu?</a>
                        </div>
                  </div>
            </div>
      );
}

export default Login;