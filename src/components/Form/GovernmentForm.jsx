import React, { useEffect, useState } from "react";
import Select from "../Select/Select";
import './GovernmentForm.scss';
import { isMobileValid, isNameValid } from "../../utils/validations";

function GovernmentForm({ handleYourDetailsChange, departmentData }) {

  const [yourDetail, setYourDetail] = useState({
    name: '', mobile: '', department: '', subdepartment: '', otherDepartment: '', services: [], otherServices: ''
  });

  const [departsData, setDepartsData] = useState({
    departments: [],
    departmentWithSubDepartments: {}
  });

  const [isChecked, setIsChecked] = useState({
    check1: false,
    check2: false,
    check3: false
  });

  useEffect(() => {
    setDepartsData(departmentData);
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

  const handleCheckboxChange = (check, value) => {
    if(isChecked[check]) {
      setYourDetail((currentValue) => { return { ...currentValue, services: currentValue.services.filter((val) => val !== value) } });
      setIsChecked((currentValue) => { return { ...currentValue, [check]: false } })
    } else {
      setYourDetail((currentValue) => { return { ...currentValue, services: [...currentValue.services, value] } });
      setIsChecked((currentValue) => { return { ...currentValue, [check]: true } })
    }
  }

  useEffect(() => {
    handleYourDetailsChange(yourDetail.services, 'services');
  }, [yourDetail.services]);

  const handleOtherServicesChange = (e) => {
    handleYourDetailsChange(e.target.value, 'otherServices');
    setYourDetail((currentValue) => { return { ...currentValue, otherServices: e.target.value } });
  };
  const handleOtherDepartmentChange = (e) => {
    handleYourDetailsChange(e.target.value, 'otherDepartment');
    setYourDetail((currentValue) => { return { ...currentValue, otherDepartment: e.target.value } });
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
      <div className="input-wrapper-select">
        <div>
          <label className="label-details-department">Department Name</label>
          <Select options={(departsData?.departments) ? departsData.departments : []} clasname="department" defaultSelectName="Select" selectedValue={yourDetail.department} changeHandler={(department) => {handleYourDetailsChange(department, 'department'); setYourDetail((currentValue) => { return { ...currentValue, department: department } })}} />
        </div>
        <div>
          <label className="label-details-department">
            Sub Department Name
          </label>
          <Select options={(departsData?.departmentWithSubDepartments[yourDetail.department]) ? departsData?.departmentWithSubDepartments[yourDetail.department] : []} clasname="subdepartment" defaultSelectName="Select" selectedValue={yourDetail.subdepartment} changeHandler={(subdepartment) => {handleYourDetailsChange(subdepartment, 'subdepartment'); setYourDetail((currentValue) => { return { ...currentValue, subdepartment: subdepartment } })}}/>
        </div>
      </div>
      <div className="cloud-wrapper">
        <input
          type="text"
          placeholder="Please specify in case of any other"
          name="other"
          value={yourDetail.otherDepartment || ''}
          onChange={handleOtherDepartmentChange}
          autoComplete="off"
        />
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

export default GovernmentForm;