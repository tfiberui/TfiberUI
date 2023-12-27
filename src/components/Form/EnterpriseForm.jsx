import React, { useEffect, useState } from "react";
import "./GovernmentForm.scss";
import {
  isEmailValid,
  isMobileValid,
  isNameValid,
} from "../../utils/validations";

function EnterpriseForm({ handleYourDetailsChange }) {
  const [yourDetail, setYourDetail] = useState({
    name: "",
    mobile: "",
    organizationName: "",
    email: "",
    services: [],
    otherServices: "",
  });

  const [error, setError] = useState({ email: "" });

  const [isChecked, setIsChecked] = useState({
    check1: false,
    check2: false,
    check3: false,
  });

  const handleNameChange = (e) => {
    const validation = isNameValid(e.target.value);

    if (validation.status) {
      handleYourDetailsChange(e.target.value, "name");
      setYourDetail((currentValue) => {
        return { ...currentValue, name: e.target.value };
      });
    }
  };

  const handleMobileChange = (e) => {
    const validation = isMobileValid(e.target.value);

    if (validation.status && e.target.value.length <= 10) {
      handleYourDetailsChange(e.target.value, "mobile");
      setYourDetail((currentValue) => {
        return { ...currentValue, mobile: e.target.value };
      });
    }
  };

  const handleEmailChange = (e) => {
    const validation = isEmailValid(e.target.value);

    setError((currentValue) => {
      return { ...currentValue, email: validation.message };
    });
    setYourDetail((currentValue) => {
      return { ...currentValue, email: e.target.value };
    });
    handleYourDetailsChange(e.target.value, "email");

    if (e.target.value.toString().length == 0) {
      setError((currentValue) => {
        return { ...currentValue, email: "" };
      });
    }
  };

  const handleCheckboxChange = (check, value) => {
    if (isChecked[check]) {
      setYourDetail((currentValue) => {
        return {
          ...currentValue,
          services: currentValue.services.filter((val) => val !== value),
        };
      });
      setIsChecked((currentValue) => {
        return { ...currentValue, [check]: false };
      });
    } else {
      setYourDetail((currentValue) => {
        return { ...currentValue, services: [...currentValue.services, value] };
      });
      setIsChecked((currentValue) => {
        return { ...currentValue, [check]: true };
      });
    }
  };

  useEffect(() => {
    handleYourDetailsChange(yourDetail.services, "services");
  }, [yourDetail.services]);

  const handleOtherServicesChange = (e) => {
    handleYourDetailsChange(e.target.value, "otherServices");
    setYourDetail((currentValue) => {
      return { ...currentValue, otherServices: e.target.value };
    });
  };

  return (
    <div className="input-wrapper-container">
      <label>Add your details</label>
      <div className="input-wrapper-details">
        <div className="user-name">
          <label className="label-details">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter here"
            value={yourDetail.name || ''}
            onChange={handleNameChange}
            autoComplete="off" 
          />
        </div>
        <div className="user-number">
          <label className="label-details">Mobile Number</label>
          <input
            type="text"
            placeholder="+91"
            value={yourDetail.mobile || ''}
            onChange={handleMobileChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="input-wrapper-details">
        <div className="user-name">
          <label className="label-details">Organization</label>
          <input
            type="text"
            name="organizationName"
            placeholder="Enter here"
            value = {yourDetail.organizationName || ''}
            onChange = {(e) => {handleYourDetailsChange(e.target.value, 'organizationName'); setYourDetail((currentValue) => { return { ...currentValue, organizationName: e.target.value } })}}
            autoComplete="off"
          />
        </div>
        <div className="user-number">
          <label className="label-details">Email address</label>
          <input
            type="text"
            name="email"
            placeholder="Enter here"
            value={yourDetail.email}
            onChange={handleEmailChange}                          
            autoComplete="off"
          />
          <span className="error">{ error.email }</span>
        </div>
      </div>
      <div className="checkbox-wrapper">
        <label className="checkbox-label">Type of Services</label>
        <div className="label-wrapper">
          <label>
            <input
              type="checkbox"
              name="broadband"
              value="Broadband"
              checked={isChecked.check1}
              onChange={(e) => handleCheckboxChange('check1', e.target.value)}
            />
            Broadband<span className="checkmark"></span>
          </label>
          <label>
            <input
              type="checkbox"
              name="InternetLeasedLine"
              value="Internet Leased Line"
              checked={isChecked.check2}
              onChange={(e) => handleCheckboxChange('check2', e.target.value)}
            />
            Internet Leased Line <span className="checkmark"></span>{" "}
          </label>
          <label>
            <input
              type="checkbox"
              name="ipvpn"
              value="IP-VPN"
              checked={isChecked.check3}
              onChange={(e) => handleCheckboxChange('check3', e.target.value)}
            />
            IP-VPN <span className="checkmark"></span>
          </label>
        </div>
      </div>
      <div className="cloud-wrapper">
        <input
          type="text"
          placeholder="Please specify in case other services are needed"
          name="other"
          value={yourDetail.otherServices || ''}
          onChange={handleOtherServicesChange}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
export default EnterpriseForm;
