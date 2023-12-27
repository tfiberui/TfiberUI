import React, { useEffect, useState } from "react";
import "./Modal.scss";
import modal_close from "/assets/Home/modal_close.png";
import errorIcon from "/assets/no.png";
import modal_map from "/assets/Home/map-inactive.png";
import MapAutoInput from "../Map/MapAutoInput";
import RenderMapBySearch from "../Map/RenderMapBySearch";

const Modal = ({ closeModal }) => {

  const [option3, setOption3] = useState('');
  const [visible, setVisible] = useState(false);
  let [isAvailable, setIsAvailable] = useState(true);

  // useEffect(() => {
  //   setLocation(option3);
  // }, [option3]);


  const handleMapResponse = (response) => {
    response.searchResult ? setIsAvailable(true) : setIsAvailable(false);
  }

  const handleCloseModal= () => {
    closeModal(false);
    //addressValue(option3);
  }

  const handleDetails= () => {
    setVisible(true);
  }
 

  return (
    <div className="modal_wrapper">
      <div className="modal_container">
        <div className="modal_left">
          <MapAutoInput placeholder="Enter your area to ‘Search on the map’" value={option3} changeHandler={(val) => setOption3(val)} />
          <div className="modalMapErrorHolder">
              <img
                src={errorIcon}
                alt="not_available"
                className="errorIcon"
              />
              <p>Address not found</p>
              <button className="form_btn marginTop" onClick={handleDetails}>
                Enter Pincode manually
              </button>
          </div>
          <div className={`modalForm ${visible ? '' : 'hide'}`}>
            <input
              type="text"
              placeholder="Enter address here"
              name="name"
              value={""}
              //onChange={handleResChange}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Enter 6 digit Pincode here*"
              name="pin"
              value={""}
              //onChange={handleResChange}
              autoComplete="off"
              className="modalPincode"
            />
            <span>*Mandatory Field</span>
          </div>
        </div>
        <div className="modal_right">
          {/* <div className={`${isAvailable ? '' : 'hide'}`}>
            <RenderMapBySearch address={option3} id="map-1" searchResponse={handleMapResponse} />
            
          </div>          
            
            <div className={`mapErrorHolder ${isAvailable ? 'hide' : ''}`}>
                <img
                  src={errorIcon}
                  alt="not_available"
                  className="errorIcon"
                />
                <h2>Selected location is outside Telangana State</h2>
                <p>Our services are limited to Telangana, India</p>
            </div> */}

              <img
                src={modal_map}
                alt="not_available"
                className="mapInactive"
              />
            
              <img
                src={modal_close}
                alt="close_btn"
                className="close_btn"
                onClick={() => handleCloseModal(false)}
              />

        </div>

            
        </div>
      </div>
  );
};

export default Modal;
