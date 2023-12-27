import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../scss/feedback.scss";

const Feedback = () => { 

  return (
    <div>
      <Header />
       
        <div className="documents_container">
            <div className="heading">
                <h2>We Appreciate your Feedback</h2>
            </div>

            <div className="documents_content">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p><br/>
            </div>

            <div className="documents_section">
                    <div className="material-form-field left">
                        <input type="text" required name="text" id="field-text" alt="Your Name" />
                        <label className="material-form-field-label" for="field-text">Your Name</label>
                    </div>

                    <div className="material-form-field right">
                        <input type="text" required name="text" id="field-contact" alt="Your Contact Number" />
                        <label className="material-form-field-label" for="field-text">Your Contact Number</label>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="material-form-field">
                        <input type="text" required name="text" id="field-feedback" alt="Your Feedback"/>
                        <label className="material-form-field-label" for="field-text">Your Feedback</label>
                    </div>
            </div>

        </div>

        


      <Footer />
    </div>
  );
};

export default Feedback;