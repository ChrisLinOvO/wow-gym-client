import React from "react";
import "./Footer.scss";
import { FaFacebookSquare } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { AiFillPlaySquare } from 'react-icons/ai';
import { FaTwitterSquare } from 'react-icons/fa';

function Footer(props) {
  return (
      <div className="footer-wrapper">
        <div className="copyright">
        <p>Copyright © 2020 WoW FIT Inc.</p>
        </div>
        <div className="triangle"></div>
        <div className="address">
          TEL:02-6666-6631 地址:台北市大安區復興南路一段441號
        </div>
        
        <div className="icon">
          <a href="https://www.facebook.com/"><FaFacebookSquare/></a>
          <a href="https://www.instagram.com/"><FiInstagram/></a>
          <a href="https://www.youtube.com/"><AiFillPlaySquare/></a>
          <a href="https://www.twitter.com/"><FaTwitterSquare/></a>
          <img src="./line-logo-messenger-png-2109-64x64.png" alt=""></img>
        </div>
      </div>
  );
}
export default Footer;