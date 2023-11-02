import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import contact_map from '/public/assets/Home/contact_map.png';
import call from '/public/assets/Home/icon_call.png';
import mail from '/public/assets/Home/icon_mail.png';
import '../scss/contact.scss'
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="contact container">
        <div className="contact_wrapper">
          <div className="contact_left">
            <h2>T FIBER</h2>
            <h3>(Telangana Fiber Grid Corporation Ltd)</h3>
            <p>
              7th Floor, Splendid Towers, S.P. Road, Indian Airlines Colony,
              Begumpet, OPP. Begumpet Police Station, Secunderabad – 500016
              Telangana, India
            </p>
            <div className="contact_btn">
                <button><img src={call} alt="icon" />call us</button>
                <button><img src={mail} alt="icon" />Email us</button>
            </div>
          </div>
          <div className="contact_right">
            <img src={contact_map} alt="map" />
          </div>
        </div>
      </div>
      <div className="faq_link container">
        <p>Have a question? Go to <span><Link to='/'>FAQ Section</Link></span></p>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
