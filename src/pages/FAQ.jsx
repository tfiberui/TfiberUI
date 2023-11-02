import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../scss/faq.scss";
import { Collapsible } from 'collapsible-react-component'
import 'collapsible-react-component/dist/index.css'

const FAQ = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

  return (
    <div>
      <Header />
       
        <div className="faq_container">
            <div className="heading_title">
                <h3>Frequently Asked Questions</h3>
            </div>

            <div className="faq_holder">
                <p className="boldFont">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                </p>
                
                <Collapsible
                    open={open}
                    revealType='bottomFirst'
                >
                    <p>
                        Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Department(s) and/or other source(s), and to obtain appropriate professional advice.
                    </p>
                </Collapsible>
                <button type='button' className="readMore_btn" onClick={() => {
                    setOpen(!open)
                    }}
                >
                    {open ? 'Read Less' : 'Read More'}
                </button>
            </div>


            <div className="faq_holder">
                <p className="boldFont">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                </p>
                
                <Collapsible
                    open={open1}
                    revealType='bottomFirst'
                >
                    <p>
                        Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Department(s) and/or other source(s), and to obtain appropriate professional advice.
                    </p>
                </Collapsible>
                <button type='button' className="readMore_btn" onClick={() => {
                    setOpen1(!open1)
                    }}
                >
                    {open1 ? 'Read Less' : 'Read More'}
                </button>
            </div>



            <div className="faq_holder">
                <p className="boldFont">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                </p>
                
                <Collapsible
                    open={open2}
                    revealType='bottomFirst'
                >
                    <p>
                        Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Department(s) and/or other source(s), and to obtain appropriate professional advice.
                    </p>
                </Collapsible>
                <button type='button' className="readMore_btn" onClick={() => {
                    setOpen2(!open2)
                    }}
                >
                    {open2 ? 'Read Less' : 'Read More'}
                </button>
            </div>
            
           
            
            




            
            
        </div> 

      <Footer />
    </div>
  );
};

export default FAQ;