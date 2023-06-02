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
      const render = useRef(false);

      const toggleMenu = () =>
      {
            if ($(".nav").css("visibility") === "hidden")
            {
                  $(".nav").css("opacity", "1");
                  $(".nav").css("visibility", "visible");
                  $(".dropdown").first().css("display", "block");
                  $(".dropdown").last().css("display", "block");
            }
            else
            {
                  $(".nav").css("opacity", "0");
                  $(".nav").css("visibility", "hidden");
                  $(".dropdown").first().css("display", "block");
                  $(".dropdown").last().css("display", "none");
            }
      }


      useEffect(() =>
      {
            if (!render.current)
            {
                  render.current = true;

                  window.addEventListener('resize', () =>
                  {
                        if (window.innerWidth >= 768)
                        {
                              $(".nav").css("opacity", "1");
                              $(".nav").css("visibility", "visible");
                              $(".dropdown").css("display", "none");
                        }
                        else
                              $(".dropdown").first().css("display", "block");
                  });
            }
      });

      return (
            <>
                  <div className='nav_bar'>
                        <AiOutlineMenu size={ 25 } className="dropdown" onClick={ toggleMenu } type='button'></AiOutlineMenu>
                        <div className='d-flex flex-column flex-md-row align-items-center nav w-100 h-100'>
                              <AiOutlineMenu size={ 25 } className="dropdown" onClick={ toggleMenu } type='button'></AiOutlineMenu>
                              <img className='smart-home' src="https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig="></img>
                              <div className='d-flex flex-column flex-md-row align-items-center justify-content-around tabs'>
                                    <a href='/device' id="device" className='d-flex align-items-center tab'><TiLightbulb></TiLightbulb>Thiết bị</a>
                                    <a href='/sensor' id="sensor" className='d-flex align-items-center tab'><BsThermometerHalf></BsThermometerHalf>Cảm biến</a>
                                    <a href='#' id="notice" className='d-flex align-items-center tab'><BsFillBellFill></BsFillBellFill>Thông báo</a>
                              </div>
                              <FaUserCircle className='userpic' />
                        </div>
                  </div>
                  <div className='page'>
                        <Outlet />
                  </div>
            </>
      );
}

export default UserNavbar;
