import React, { useState } from "react";
import card_img1 from "/public/assets/Home/card_img_1.png";
import card_img2 from "/public/assets/Home/card_img_2.png";
import card_img3 from "/public/assets/Home/card_img_3.png";
import card_img4 from "/public/assets/Home/card_img_4.png";
import circle from "/public/assets/Home/bg_circle.png";
import banner_11 from "/public/assets/Home/card_img_1_banner.png";
import banner_12 from "/public/assets/Home/card_img_2_banner.png";
import banner_13 from "/public/assets/Home/card_img_3_banner.png";
import banner_21 from "/public/assets/Home/banner_21.png";
import banner_22 from "/public/assets/Home/banner_22.png";
import banner_31 from "/public/assets/Home/banner_31.png";
import banner_32 from "/public/assets/Home/banner_32.png";
import arrow from "/public/assets/Home/arrow.png";
import arrow_hover from '/public/assets/Home/arrow_hover.png'
import './CardSlider.scss';
import { useNavigate } from "react-router-dom";

const CardSlider = () => {
    //card carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardData = [
    {
      id: 1,
      title: "Government",
      route: "/government",
      img: card_img1,
      banner: {
        text: "Efficiency in\nGovernance with\nDigital Connectivity Solutions",
        sub1: "Broadband",
        para1: "Including Internet",
        img1: banner_11,
        sub2: "Internet Leased Line",
        para2: "Dedicated Connectivity",
        img2: banner_12,
        sub3: "IP-VPN",
        para3: "P2P and P2MP",
        img3: banner_13,
      },
    },
    {
      id: 2,
      title: "Residential",
      route: "/residential",
      img: card_img2,
      banner: {
        text: "Elevate Your Home Broadband Experience with a plethora of services",
        sub1: "Triple Play Broadband",
        para1: "TV, Internet, Voice",
        img1: banner_21,
        sub2: "Government to Citizen Services",
        para2: "E-Education, E-Governance, Tele-Medicine etc.",
        img2: banner_22,
        // sub3: "",
        // para3: "",
        // img3: "",
      },
    },
    {
      id: 3,
      title: "Cell Tower",
      route: "/celltower",
      img: card_img3,
      banner: {
        text: "Optical Fiber Cable backbone connectivity to Cell Towers",
        sub1: "Hub & Spoke",
        para1: "Scalable and redundant",
        img1: banner_31,
        sub2: "Point to Point",
        para2: "Scalable bandwidth",
        img2: banner_32,
        // sub3: "IP-VPN",
        // para3: "P2P and P2MP",
        // img3: "",
      },
    },
    {
      id: 4,
      title: "Business",
      route: "/business",
      img: card_img4,
      banner: {
        text: "Digitalize your enterprise with secured high-speed connectibity services",
        sub1: "Broadband",
        para1: "Including Internet",
        img1: banner_11,
        sub2: "Internet Leased Line",
        para2: "Dedicated Connectivity",
        img2: banner_12,
        sub3: "IP-VPN",
        para3: "P2P and P2MP",
        img3: banner_13,
      },
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    // console.log(currentIndex);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cardData.length - 1 : prevIndex - 1
    );
    // console.log(currentIndex);
  };


  //capturing hover state
  const [hoverLeft, SetHoverLeft] = useState(false);

  const handleHoverLeft = () => {
    SetHoverLeft(!hoverLeft);
  };

  const [hoverRight, SetHoverRight] = useState(false);

  const handleHoverRight = () => {
    SetHoverRight(!hoverRight);
  };

  const navigate = useNavigate();

  return (
    <div className="banner_container container">
        <h1 className="banner_heading">
          Empowering Segments with digital Solutions
        </h1>
        <p className="banner_para">
          Choose from our thoughtfully curated services across segments.
        </p>
        <div className="card_slider">
          <div className="slider">
            
            
            {hoverLeft === false ? <><img src={arrow} alt="arrow" onClick={handlePrev} onMouseEnter={handleHoverLeft} className="arrow_left"/></> : <><img src={arrow_hover} alt="arrow_hover" onClick={handlePrev} onMouseLeave={handleHoverLeft} className="arrow_hover_left"/></>}

            <div className="card">
              <img src={cardData[currentIndex].img} alt="img" />
              <div className="card_content centered">
                <h3>{cardData[currentIndex].title}</h3>
                <button onClick={() => navigate(cardData[currentIndex].route)}>Learn More</button>
              </div>
            </div>

            <div className="card bg-card">
              <img src={cardData[(currentIndex + 1) % 4].img} alt="img" />
              <div className="card_content centered">
                <h3>{cardData[(currentIndex + 1) % 4].title}</h3>
                <button>Know More</button>
              </div>
            </div>

            <div className="card bg-card-1">
              <img src={cardData[(currentIndex + 2) % 4].img} alt="img" />
              <div className="card_content centered">
                <h3>{cardData[(currentIndex + 2) % 4].title}</h3>
                <button>Know More</button>
              </div>
            </div>

            <div className="card bg-card-2">
              <img src={cardData[(currentIndex + 3) % 4].img} alt="img" />
              <div className="card_content centered">
                <h3>{cardData[(currentIndex + 3) % 4].title}</h3>
                <button>Know More</button>
              </div>
            </div>
            {/* arrow */}
            {hoverRight === false ? <><img src={arrow} alt="arrow" onClick={handleNext} onMouseEnter={handleHoverRight} className="arrow_right"/></> : <><img src={arrow_hover} alt="arrow_hover" onClick={handleNext} onMouseLeave={handleHoverRight} className="arrow_hover_right"/></>}
          </div>
        </div>
        <div className="banner_bottom">
          <div className="banner_content">
            <h3>{cardData[currentIndex].banner.text}</h3>
            <div className="banner_content_section">
              <div className="parent">
                <img src={circle} alt="bg" className="card_img_bg" />
                <img
                  src={cardData[currentIndex].banner.img1}
                  alt="img"
                  className="banner_img"
                />
              </div>
              <div className="section_inside">
                <h3>{cardData[currentIndex].banner.sub1}</h3>
                <p>{cardData[currentIndex].banner.para1}</p>
              </div>
            </div>
            <div className="banner_content_section">
              <div className="parent">
                <img src={circle} alt="bg" className="card_img_bg" />
                <img
                  src={cardData[currentIndex].banner.img2}
                  alt="img"
                  className="banner_img"
                />
              </div>
              <div className="section_inside">
                <h3>{cardData[currentIndex].banner.sub2}</h3>
                <p>{cardData[currentIndex].banner.para2}</p>
              </div>
            </div>
            <div className="banner_content_section">
              {currentIndex === 1 || currentIndex === 2 ? (
                <></>
              ) : (
                <>
                  <div className="parent">
                    <img src={circle} alt="bg" className="card_img_bg" />
                    <img
                      src={cardData[currentIndex].banner.img3}
                      alt="img"
                      className="banner_img"
                    />
                  </div>
                  <div className="section_inside">
                    <h3>{cardData[currentIndex].banner.sub3}</h3>
                    <p>{cardData[currentIndex].banner.para3}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default CardSlider