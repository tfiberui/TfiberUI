import React from 'react'
import './Carousel.scss'
import { useState } from 'react';
import carousel_img1 from '/public/assets/Home/carousel_img1.png'
import carousel_img2 from "/public/assets/Home/carousel_img2.png";
import carousel_img3 from "/public/assets/Home/carousel_img3.png";
//import img1 from "/public/assets/Home/img1.png";
//import img2 from "/public/assets/Home/img2.png";
//import img3 from "/public/assets/Home/img3.png";

import img1 from "/public/assets/Home/cutting-edge-technology.gif";
import img2 from "/public/assets/Home/speed.gif";
import img3 from "/public/assets/Home/affordability.gif";

import { useNavigate } from 'react-router-dom';

const Carousel = () => {
    //carousel Data
  const carouselData = [
    {
      title: "Realization of Digital Telangana",
      body: "Connecting every home, government office, and enterprise with high-speed broadband end to end optical fiber cable network.",
      img: carousel_img1,
      subTitle1: "33",
      subPara1: "Districts",
      subTitle2: "589",
      subPara2: "Mandals",
      subTitle3: "12,751",
      subPara3: "Gram Panchayats",
    },
    {
      title: "Reliable & affordable fiber connectivity",
      body: "Futuristic state of the art network that is robust, reliable and affordable providing end users with seamless communication experience.",
      img: carousel_img2,
      subTitle1: img1,
      subPara1: "Cutting Edge Technology",
      subTitle2: img2,
      subPara2: "High Network Speed",
      subTitle3: img3,
      subPara3: "Affordable Solutions",
    },
    {
      title: "Catalyzing State's Economic Growth",
      body: "Transforming economic landscape of Telangana through inclusive growth opportunities and creating a brighter digital future.",
      img: carousel_img3,
      subTitle1: "35M+",
      subPara1: "Customers",
      subTitle2: "10M+",
      subPara2: "Households",
      subTitle3: "60,000+",
      subPara3: "Government Offices",
    },
  ];

  //carousel state varialble
  const [currentSlide, setCurrentSlide] = useState(0);

  //function to handle slide change caraousel
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const navigate = useNavigate();

  return (
    <div className="carousel_container container">
        {/* <h1>{carouselData[currentSlide].title}</h1>
        <p>{carouselData[currentSlide].body}</p>
        <img src={carouselData[currentSlide].img} alt="carousel_img" /> */}

        <div className="carousel_wrapper">
          <div className="carousel_left">
            <h1 className="carousel_heading">
              {carouselData[currentSlide].title}
            </h1>
            <p className="carousel_body">{carouselData[currentSlide].body}</p>
            <button className="carousel_btn" onClick={() => navigate('/about-us')}>Learn More</button>
            <div className="subpart">
              <div className="parts">
                {currentSlide === 1 ? (
                  <img src={img1} alt="img" />
                ) : (
                  <h3>{carouselData[currentSlide].subTitle1}</h3>
                )}
                <p>{carouselData[currentSlide].subPara1}</p>
              </div>
              <div className="parts">
                {currentSlide === 1 ? (
                  <img src={img2} alt="img" />
                ) : (
                  <h3>{carouselData[currentSlide].subTitle2}</h3>
                )}
                <p>{carouselData[currentSlide].subPara2}</p>
              </div>
              <div className="parts">
                {currentSlide === 1 ? (
                  <img src={img3} alt="img" />
                ) : (
                  <h3>{carouselData[currentSlide].subTitle3}</h3>
                )}
                <p>{carouselData[currentSlide].subPara3}</p>
              </div>
            </div>
          </div>
          <div className="carousel_right">
            <img src={carouselData[currentSlide].img} alt="carousel_img" />
          </div>
        </div>

        <div className="indicators">
          {carouselData.map((_, index) => (
            <span
              key={index}
              onClick={() => handleSlideChange(index)}
              className={index === currentSlide ? "active" : ""}
            />
          ))}
        </div>
      </div>
  )
}

export default Carousel