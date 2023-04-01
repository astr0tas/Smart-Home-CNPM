import '../css/navbar.css';
import { React, useEffect, useRef } from 'react';
import { BsFillBellFill, BsFillPersonFill, BsThermometerHalf } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import $ from 'jquery';
import { AiOutlineMenu } from "react-icons/ai";



function AdminNavbar()
{
      /*
      https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig=
      */

      const render = useRef(false);

      const toggleMenu = () =>
      {
            if ($(".nav").css("visibility") === "hidden")
            {
                  $(".nav").css("visibility", "visible");
                  $(".dropdown").first().css("display", "block");
                  $(".dropdown").last().css("display", "block");
            }
            else
            {
                  $(".nav").css("visibility", "hidden");
                  $(".dropdown").first().css("display", "block");
                  $(".dropdown").last().css("display", "none");
            }
      }


      useEffect(() =>
      {
            if (!render.current)
            {
                  console.log("render");
                  render.current = true;

                  window.addEventListener('resize', () =>
                  {
                        if (window.innerWidth > 768)
                        {
                              $(".nav").css("visibility", "visible");
                              $(".dropdown").css("display", "none");
                        }
                        else
                        {
                              $(".dropdown").first().css("display", "block");
                        }
                  });
            }
      });

      return (
            // <div className='h-100 w-100'>
            //       <AiOutlineMenu size={ 30 } className="dropdown" onClick={ toggleMenu }></AiOutlineMenu>
            //       <div className='nav'>
            //             <img className='navpic' src="https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig="></img>
            //             <ul>
            //                   <li>
            //                         <a href='/admin/device' id="device"><TiLightbulb></TiLightbulb>Thiết bị</a>
            //                   </li>
            //                   <li>
            //                         <a href='/admin/sensor' id="sensor"><BsThermometerHalf></BsThermometerHalf>Cảm biến</a>
            //                   </li>
            //                   <li>
            //                         <a href='#' id="notice"><BsFillBellFill></BsFillBellFill>Thông báo</a>
            //                   </li>
            //                   <li>
            //                         <a href='#' id="account"><BsFillPersonFill></BsFillPersonFill>Tài khoản</a>
            //                   </li>
            //             </ul>
            //             <FaUserCircle className='userpic' />
            //       </div>
            //       <div className='child-page'>
            //             <Outlet />
            //       </div>
            // </div>
            
            <div className='h-100 w-100'>
                  <AiOutlineMenu size={ 25 } className="dropdown" onClick={ toggleMenu } type='button'></AiOutlineMenu>
                  <div className='d-flex flex-column flex-md-row nav'>
                        <AiOutlineMenu size={ 25 } className="dropdown" onClick={ toggleMenu } type='button'></AiOutlineMenu>
                        <img className='smart-home' src="https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig="></img>
                        <div className='d-flex flex-column flex-md-row align-items-center justify-content-around tabs'>
                              <a href='/device' id="device" className='d-flex align-items-center text-dark text-decoration-none'><TiLightbulb></TiLightbulb>Thiết bị</a>
                              <a href='/sensor' id="sensor" className='d-flex align-items-center text-dark text-decoration-none'><BsThermometerHalf></BsThermometerHalf>Cảm biến</a>
                              <a href='#' id="notice" className='d-flex align-items-center text-dark text-decoration-none'><BsFillBellFill></BsFillBellFill>Thông báo</a>
                              <a href='#' id="account" className='d-flex align-items-center text-dark text-decoration-none'><BsFillPersonFill></BsFillPersonFill>Tài khoản</a>
                        </div>
                        <FaUserCircle className='userpic' />
                  </div>
                  <div className='page'>
                        <Outlet />
                  </div>
            </div>
      );
}

export default AdminNavbar;
