import '../css/navbar.css';
import { React, useEffect, useRef } from 'react';
import { BsFillBellFill, BsThermometerHalf } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import $ from 'jquery';



function UserNavbar()
{
      /*
      https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig=
      */

      const render = useRef(false);

      const toggleMenu = () =>
      {
            if ($(".nav").css("visibility") === "hidden")
                  $(".nav").css("visibility", "visible");
            else
                  $(".nav").css("visibility", "hidden");
      }


      useEffect(() =>
      {
            if (!render.current)
            {
                  console.log("render");
                  render.current = true;

                  window.addEventListener('resize', () =>
                  {
                        if (window.innerWidth > 768 && $(".nav").css("visibility") === "hidden")
                              $(".nav").css("visibility", "visible");
                        else if (window.innerWidth <= 768 && $(".nav").css("visibility") === "visible" )
                              $(".nav").css("visibility", "hidden");
                  });
            }
      });

      return (
            <div className="UI">
                  <AiOutlineMenu size={ 40 } className="dropdown" onClick={ toggleMenu }></AiOutlineMenu>
                  <div className='nav'>
                        <img className='navpic' src="https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig="></img>
                        <ul>
                              <li>
                                    <a href='#' id="device"><TiLightbulb></TiLightbulb>Thiết bị</a>
                              </li>
                              <li>
                                    <a href='/sensor' id="sensor"><BsThermometerHalf></BsThermometerHalf>Cảm biến</a>
                              </li>
                              <li>
                                    <a href='#' id="notice"><BsFillBellFill></BsFillBellFill>Thông báo</a>
                              </li>
                        </ul>
                        <FaUserCircle className='userpic' />
                  </div>
                  <div className='child-page'>
                        <Outlet />
                  </div>
            </div>
      );
}

export default UserNavbar;
