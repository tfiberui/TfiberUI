import React, { useState } from "react";
import './GovernmentForm.scss';
import { isMobileValid, isNameValid } from "../../utils/validations";

function ResidentialForm({handleYourDetailsChange}) {

  const [yourDetail, setYourDetail] = useState({
    name: '', mobile: ''
  }); 

  const handleNameChange = (e) => {
    const validation = isNameValid(e.target.value);

    if(validation.status) {
      handleYourDetailsChange(e.target.value, 'name');
      setYourDetail((currentValue) => { return { ...currentValue, name: e.target.value } });
    }
  };

  const handleMobileChange = (e) => {
    const validation = isMobileValid(e.target.value);

    if(validation.status && e.target.value.length <= 10) {
      handleYourDetailsChange(e.target.value, 'mobile');
      setYourDetail((currentValue) => { return { ...currentValue, mobile: e.target.value } });
    }
  };

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
            value={yourDetail.name || ''}
            onChange={handleNameChange}
            autoComplete="off"
          />
        </div>
        <div className="user-number">
          <label className="label-details">Mobile Number</label>
          <input
            type="text"
            name="mobile"            
            placeholder="+91"
            value={yourDetail.mobile || ''}
            onChange={handleMobileChange}
            autoComplete="off"         
          />
        </div>
      </div>
    </div>
  );
}

export default ResidentialForm;
