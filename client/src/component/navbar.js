import logo from './logo.svg';
import '../css/navbar.css';
import React from 'react';
import { BsFillBellFill, BsFillPersonFill, BsThermometerHalf } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";


function Navbar()
{
      return (
            <nav className='nav'>
                  <a href='#' id='home'>

                        <img src='https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig=' id='pic'></img>
                  </a>
                  <ul>
                        <li>
                              <a href='#'><TiLightbulb></TiLightbulb>Thiết bị</a>
                        </li>
                        <li>
                              <a href='#'><BsThermometerHalf></BsThermometerHalf>Cảm biến</a>
                        </li>
                        <li>
                              <a href='#'><BsFillBellFill></BsFillBellFill>Thông báo</a>
                        </li>
                        <li>
                              <a href='#'><BsFillPersonFill></BsFillPersonFill>Tài khoản</a>
                        </li>
                  </ul>
            </nav>
      );
}

export default Navbar;
