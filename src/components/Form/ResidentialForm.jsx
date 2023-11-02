import React from "react";

function ResidentialForm() {
  return (
    <div className="input-wrapper-container">
      <label>Add your details</label>
      <div className="input-wrapper-details">
        <div className="user-name">
          <label className="label-details">Name</label>
          <input
            type="text"
            placeholder="Enter here"
            name="name"
            autoComplete="off"
          />
        </div>
        <div className="user-number">
          <label className="label-details">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            placeholder="+91" 
            autoComplete="off"          
          />
        </div>
      </div>
    </div>
  );
}

export default ResidentialForm;
