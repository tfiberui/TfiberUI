import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../scss/circulars.scss";
import downloadIcon from "/public/assets/download_icon.png";

const Circulars = () => {

  return (
    <div>
      <Header />
       
        <div className="documents_container">
            <div className="heading_title">
                <h3>Circulars and Notices</h3>
                <h6>Last updated on 4th October 2023</h6>
            </div>

            <div className="documents_content">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p><br/>
                
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>


            <div className="documents_section">
                

            </div>


            

            
        </div> 

      <Footer />
    </div>
  );
};

export default Circulars;