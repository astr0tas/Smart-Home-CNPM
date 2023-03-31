import '../css/navbar.css';
import React from 'react';
import { BsFillBellFill, BsThermometerHalf } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { Outlet } from 'react-router-dom';


function UserNavbar()
{
      /*
      https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig=
      */
      return (
            <>
                  <div className='nav'>
                        <img class='navpic' src='https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig='></img>
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
                        <FaUserCircle class='navpic' />
                  </div>
                  <div className='child-page'>
                        <Outlet />
                  </div>
            </>
      );
}

export default UserNavbar;