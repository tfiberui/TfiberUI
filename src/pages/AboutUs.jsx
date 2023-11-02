import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../scss/about.scss";
import videoBg from "/public/assets/VideoBG.png";
import videoPlay from "/public/assets/Play.png";
import sectionImg1 from "/public/assets/About_1.png";
import sectionImg2 from "/public/assets/About_2.png";
import sectionImg3 from "/public/assets/About_3.png";
import FirstTab from "../components/Tabs/FirstTab";
import SecondTab from "../components/Tabs/SecondTab";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
      setActiveTab("tab1");
    };
    const handleTab2 = () => {
      // update the state to tab2
      setActiveTab("tab2");
    };

  return (
    <div>
      <Header />
        <div className="video_holder">
          <img src={videoBg} alt="" className="video_img" />
          <img src={videoPlay} alt="" className="play_img" />
        </div>

        <div class="heading_holder">
          <h1 class="heading_container">
            T-Fiber aims to create cutting-edge network infrastructure, enabling the realization of 'Digital Telangana’
          </h1>
        </div>

        <div className="main_section">
            <div className="content_holder">
                <div className="section_left">
                  <div className="image_holder float_left">
                    <img src={sectionImg1} alt="" className="section_img" />
                  </div>
                  <div className="para_holder float_right">
                    <h2 className="section_heading">Transforming socio-economic development</h2>
                    <p className="section_details">The Telangana Government is driving broadband optical fiber network infrastructure development through T-Fiber, aiming to connect household, government institutions and enterprise with reliable and affordable broadband connectivity. </p>
                  </div>
                </div>


                <div className="section_left">
                  <div className="para_holder float_left">
                    <h2 className="section_heading">Fueling state’s innovation and growth</h2>
                    <p className="section_details">Our robust network infrastructure catalyses economic growth, generates employment, fosters entrepreneurship, and enhances productivity. Connecting communities and businesses for a brighter and more prosperous future.</p>
                  </div>
                  <div className="image_holder float_right">
                    <img src={sectionImg2} alt="" className="section_img" />
                  </div>
                </div>

                <div className="section_left">
                  <div className="para_holder float_right">
                    <h2 className="section_heading">Our Unique Value Proposition</h2>
                    <p className="section_details">Our end-to-end optical fiber network enables reliable and affordable broadband services universally across the state, promoting inclusive participation of all segments. It's not just about connectivity; it's about transforming lives and shaping a brighter future for everyone.</p>
                  </div>
                  <div className="image_holder float_left">
                    <img src={sectionImg3} alt="" className="section_img" />
                  </div>
                </div>
            </div>
        </div>

        <div className="tab_section">
          <div className="Tabs">
            <ul className="nav">
              <li
                className={activeTab === "tab1" ? "active" : ""}
                onClick={handleTab1}
              >
                Board of Directors
              </li>
              <li
                className={activeTab === "tab2" ? "active" : ""}
                onClick={handleTab2}
              >
                Organization Structure
              </li>
            </ul>
            <div className="outlet">
              {activeTab === "tab1" ? <FirstTab /> : <SecondTab />}
            </div>
          </div>
        </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
