import React, { useEffect, useState } from "react";
import "./Modal.scss";
import modal_map from "/assets/Home/modal_map.png";
import modal_close from "/assets/Home/modal_close.png";
import errorIcon from "/assets/no.png";
import { render } from "react-dom";
import Map from "../Map/Map";
import axios from "axios";
import indicate from "/assets/Group 117.png";

const Modal = ({ closeModal, addressValue }) => {
  //store address from input
  const [address, setAddress] = useState("");

  //assign location
  const [location, setLocation] = useState("");

  //map essentials
  const [position, setPosition] = useState({
    lat: 18.1124372,
    lng: 79.01929969999999,
  });
  const zoom = 15;
  const apiKey = "AIzaSyAVs-wCER__18LpKRb3ozA2pot15DGmels";

  //filtering
  const [filter, setFilter] = useState("");
  let [isAvailable, setIsAvailable] = useState(true);

  //filtering json
  const renderMap = () => {
    const mapApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    if (location !== "") {
      let addressComponents = 0;

      axios
        .get(mapApi)
        .then(function (response) {
          // handle success
          console.log("Response:", response);
          let selectedIndex = 0;
          let completeAddress = "";

          if (response.data.results.length > 1) {
            selectedIndex = response.data.results.reduce(
              (highest, value, index, array) => {
                if (value.address_components.length > addressComponents) {
                  addressComponents = value.address_components.length;
                  highest = index;
                }
                return highest;
              }
            );
          }

          completeAddress = response.data.results[selectedIndex].formatted_address;
          const addressArr = completeAddress.split(',');
          if (addressArr.indexOf(" Telangana" || "Telangana") > -1) {
            console.log("Available: ");
            setIsAvailable(true);
          } else {
            console.log("Not Available");
            setIsAvailable(false);
          }

          console.log("completeAddress: ", addressArr);

          setPosition(response.data.results[selectedIndex].geometry.location);
          setFilter(response.data.results[selectedIndex].formatted_address);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  };

  function handleAddress(){
    closeModal(false);
    addressValue(filter);
  }

  useEffect(() => {
    renderMap();
  }, [address]);

  useEffect(() => {
    setLocation(address);
  }, [address]);

  return (
    <div className="modal_wrapper">
      <div className="modal_container">
        <div className="modal_left">
          <input
            type="text"
            placeholder="enter your address.."
            id="modal_input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {address.length > 0 && (
            <>
              <div className="filtered">
                <h3>{filter}</h3>
                {isAvailable ? <img src={indicate} alt="arrow" className="arrowIcon" onClick={handleAddress}/> : ""}                
              </div>
              <hr />
            </>
          )}
        </div>
        <div className="modal_right">
        {isAvailable ? (
          <>
          <Map position={position} zoom={zoom} id="map-1" className="mapping" />
          <img
            src={modal_close}
            alt="close_btn"
            className="close_btn"
            onClick={() => closeModal(false)}
          />
          </>
        ) : (
          <>
          <div className="mapErrorHolder">
              <img
                src={errorIcon}
                alt="not_available"
                className="errorIcon"
              />
              <h2>Selected location is outside Telangana State</h2>
              <p>Our services are limited to Telangana, India</p>
          </div>
          </>
        )}

            
        </div>
      </div>
    </div>
  );
};

export default Modal;
