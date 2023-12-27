import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../scss/press.scss";
import download_logo from "/public/assets/Home/download_logo.png";
import { Collapsible } from 'collapsible-react-component'
import 'collapsible-react-component/dist/index.css'

const Press = () => { 

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);

  return (
    <div>
      <Header />
       
        <div className="documents_container">
            <div className="heading">
                <h2>Press Release</h2>
            </div>

            <div className="documents_content">
                <div className="leftSection">
                    <h3>Media Contact</h3>
                    <p>
                    7th Floor, Splendid Towers, S.P. Road, <br/>
                    Indian Airlines Colony, Begumpet, <br/>
                    OPP. Begumpet Police Station, Secunderabad – 500016 <br/>
                    Telangana, India
                    </p>
                </div>

                <div className="rightSection">
                    <h3>Download Logo</h3>
                    <img src={download_logo} alt="download logo" />
                </div>
            </div>

            <div className="documents_section">
                    <div className="heading_title1">
                        <h4>October 2023</h4>
                    </div>
                
                    <div className="leftContent">

                        <div className="content_card">
                            <h6>20/06/2023</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <Collapsible open={open} revealType='bottomFirst'>
                            <p>
                                Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes.
                            </p>
                            </Collapsible>
                            <button type='button' className="readMore_btn" onClick={() => { setOpen(!open) }} >
                                {open ? 'Read Less' : 'Read More'}
                            </button>
                        </div>

                        <div className="content_card">
                            <h6>20/06/2023</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <Collapsible open={open2} revealType='bottomFirst'>
                            <p>
                                Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes.
                            </p>
                            </Collapsible>
                            <button type='button' className="readMore_btn" onClick={() => { setOpen2(!open2) }} >
                                {open2 ? 'Read Less' : 'Read More'}
                            </button>
                        </div>

                        <div className="content_card">
                            <h6>20/06/2023</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida massa ut ex lobortis, at pellentesque sem rhoncus.</p>
                            <Collapsible open={open3} revealType='bottomFirst'>
                            <p>
                                Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes.
                            </p>
                            </Collapsible>
                            <button type='button' className="readMore_btn" onClick={() => { setOpen3(!open3) }} >
                                {open3 ? 'Read Less' : 'Read More'}
                            </button>
                        </div>
                        


                    </div>

                    <div className="rightContent">
                        <div className="content_card">
                            <h6>20/06/2023</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida massa ut ex lobortis, at pellentesque sem rhoncus.</p>
                            <Collapsible open={open4} revealType='bottomFirst'>
                            <p>
                                Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes.
                            </p>
                            </Collapsible>
                            <button type='button' className="readMore_btn" onClick={() => { setOpen4(!open4) }} >
                                {open4 ? 'Read Less' : 'Read More'}
                            </button>
                        </div>

                        <div className="content_card">
                            <h6>20/06/2023</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <Collapsible open={open5} revealType='bottomFirst'>
                            <p>
                                Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes.
                            </p>
                            </Collapsible>
                            <button type='button' className="readMore_btn" onClick={() => { setOpen5(!open5) }} >
                                {open5 ? 'Read Less' : 'Read More'}
                            </button>
                        </div>

                        <div className="content_card">
                            <h6>20/06/2023</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida massa ut ex lobortis, at pellentesque sem rhoncus.</p>
                            <Collapsible open={open4} revealType='bottomFirst'>
                            <p>
                                Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes.
                            </p>
                            </Collapsible>
                            <button type='button' className="readMore_btn" onClick={() => { setOpen4(!open4) }} >
                                {open4 ? 'Read Less' : 'Read More'}
                            </button>
                        </div>


                    </div>
                    
                    <button className="viewAll_btn">View All</button>

            </div>

            

        </div>

        


      <Footer />
    </div>
  );
};

export default Press;