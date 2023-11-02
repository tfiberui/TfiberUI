import React from "react";
import govt_logo from "/assets/Home/govt_logo.png";
import logo_main from "/public/assets/Home/logo_main.png";
import cm from "/public/assets/Home/cm.png";
import itm from "/public/assets/Home/itm.png";
import title from "/public/assets/Home/title.png";
import wave from '/assets/wave.png';
import "../scss/Landing.scss";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing container">
      <div className="landing_top">
        <img src={govt_logo} alt="gvt_logo" className="govt_logo" />
        <img src={logo_main} alt="logo" className="main_logo" />
        <div className="landing_top_text">
          {/* <h1>
            <span className="coloor">T</span>FIBER
          </h1> */}
          <img src={title} alt="title" />
          <p>TELENGANA FIBER CHIP</p>
        </div>
      </div>
      <div className="landing_center">
        <div className="image_container">
          <div className="container_left">
          <img src={cm} alt="cm" className="landing_main_image"/>
          <h2 className="details">Hon'ble CM of Telangana<br/>Sri K. Chandrashekar Rao</h2>
          </div>
          <div className="container_right">
          <img src={itm} alt="itm" className="landing_main_image"/>
          <h2 className="details">Hon'ble Minister for IT E&C, Telangana<br/>Sri KT Rama Rao</h2>
          </div>
        </div>
        <h1 className="landing_center_main_text">Transforming Telangana's digital landscape</h1>
        <Link to="/home" style={{ textDecoration: 'none' }}><button className="landing_btn">Home</button></Link>
      </div>
      <div className="landing_bottom">
        <img src={wave} alt="wave" />
      </div>
    </div>
  );
};

export default Landing;
