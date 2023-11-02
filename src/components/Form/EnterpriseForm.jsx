import React from "react";

function EnterpriseForm() {
  return (
    <div className="input-wrapper-container">
      <label>Add your details</label>
      <div className="input-wrapper-details">
        <div className="user-name">
          <label className="label-details">Name</label>
          <input type="text" placeholder="Enter here" name="name" autoComplete="off"/>
        </div>
        <div className="user-number">
          <label className="label-details">Mobile Number</label>
          <input type="text" name="mobile" placeholder="+91" autoComplete="off"/>
        </div>
      </div>
      <div className="input-wrapper-details">
        <div className="user-name">
          <label className="label-details">Organization</label>
          <input type="text" placeholder="Enter here" name="name" autoComplete="off"/>
        </div>
        <div className="user-number">
          <label className="label-details">Email address</label>
          <input type="text" name="email" placeholder="Enter here" autoComplete="off" />
        </div>
      </div>
      <div className="checkbox-wrapper">
        <label className="checkbox-label">Type of Services</label>
        <div className="label-wrapper">
          <label>
            <input type="checkbox" name="broadband" value="true" />
            Broadband<span className="checkmark"></span>
          </label>
          <label>
            <input type="checkbox" name="ill" value="true" />
            Internet Leased Line
            <span className="checkmark"></span>
          </label>
          <label>
            <input type="checkbox" name="ill" value="true" />
            IP-VPN
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
      <div className="cloud-wrapper">
        <input
          type="text"
          placeholder="Please specify in case other services are needed"
          name="other"
        />
      </div>
    </div>
  );
}
export default EnterpriseForm;
