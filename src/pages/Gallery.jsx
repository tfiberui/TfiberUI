import React from "react";
import Carousel from 'react-multi-carousel';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../scss/gallery.scss";
import 'react-multi-carousel/lib/styles.css';

import gallery_1_1 from "/public/assets/gallery_img_1.png";
import gallery_1_2 from "/public/assets/gallery_img_2.png";
import gallery_1_3 from "/public/assets/gallery_img_3.png";
import gallery_1_4 from "/public/assets/gallery_img_4.png";
import gallery_1_5 from "/public/assets/gallery_img_5.png";
import gallery_1_6 from "/public/assets/gallery_img_6.png";


const Gallery = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div>
      <Header />
       
        <div className="gallery_container">
            <div className="heading_title">
                <h3>Gallery</h3>
            </div>

            <div className="gallery_content">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>

                <Carousel responsive={responsive}>
                  <div>
                    <img src={gallery_1_1} className="gallery_img"/>
                  </div>
                  <div>
                    {" "}
                    <img src={gallery_1_2} className="gallery_img" />
                  </div>
                  <div>
                    {"  "}
                    <img src={gallery_1_3} className="gallery_img" />
                  </div>
                  <div>
                    {" "}
                    <img src={gallery_1_4} className="gallery_img" />
                  </div>
                  <div>
                    {" "}
                    <img src={gallery_1_5} className="gallery_img" />
                  </div>
                  <div>
                    {" "}
                    <img src={gallery_1_6} className="gallery_img" />
                  </div>
                  <div>
                    {" "}
                    <img src={gallery_1_1} className="gallery_img" />
                  </div>
                  <div>
                    {" "}
                    <img src={gallery_1_2} className="gallery_img" />
                  </div>
                </Carousel>
                
            </div>


           


            

            
        </div> 

      <Footer />
    </div>
  );
};

export default Gallery;