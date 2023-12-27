import "../Form/Form.scss";
//import "../HomeForm/NewForm.scss";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
//import pageData from "../data/governement";
import Select from "../Select/Select";
import { fetchDepartmentData, fetchTelanganaData } from "../../utils/telanganaData";
import { isEmailValid, isPincodeValid } from "../../utils/validations";
import MapAutoInput from "../Map/MapAutoInput";
import RenderMapBySearch from "../Map/RenderMapBySearch";
import GovernmentForm from "./GovernmentForm";
import ResidentialForm from "./ResidentialForm";
import CellTowerForm from "./CellTowerForm";
import EnterpriseForm from "./EnterpriseForm";
import { addLeadData } from "../../utils/leadData";
import pin_map from "/public/assets/map.png";

function Form_homepage() {

  const bssApi = 'http://172.28.10.10:3020';
  const [telanganaData, setTelanganaData] = useState({
    districts: [],
    districtsWithCode: {},
    districtsWithMandals: {},
    mandalsWithCode: {},
    mandalsWithGp: {},
    gpWithCode: {},
    pincodeWithGP: {},
    gpWithPincode: {},
    pincodes: [],
    gpPincodeWithLGDC: {},
    gpMandalDistrictWithLGDC: {},
    gpDistrictWithLGDC: {},
    gpDistrictPincodeWithLGDC: {},
    pincodeWithLGDC: {}
  });
  const [departmentData, setDepartmentData] = useState({
    departments: [],
    departmentWithSubDepartments: {}
  });
  const [segment, setSegment] = useState('government');
  const [selectedOption, setSelectedOption] = useState({
    option1: false,
    option2: false,
    option3: false
  });
  const [option1, setOption1] = useState({
    pincode: {
      value: '',
      errorMessage: ''
    },
    gp: {
      value: '',
      options: []
    }
  });
  const [option2, setOption2] = useState({
    district: '',
    mandal: '',
    gp: ''
  });
  const [option3, setOption3] = useState('');
  const [manualAddress, setManualAddress] = useState({
    address: '',
    pincode: {
      value: '',
      errorMessage: ''
    }
  });

  const locationDetailsFromMap = useRef({
    districtName: '',
    districtLGDCode: '',
    mandalName: '',
    mandalLGDCode: '',
    gpName: '',
    gpLGDCode: '',
    pincode: '',
    latitude: '',
    longitude: ''
  });
  const [yourDetails, setYourDetails] = useState({});
  const [activeScreen, setActiveScreen] = useState('');
  const [buttonsState, setButtonsState] = useState({
    button1: false,
    button2: false
  });
  const [location, setLocation] = useState('');
  const [lgdCode, setLgdCode] = useState('');
  const [yourDetailsForm, setYourDetailsForm] = useState([]);
  const [mapResultFound, setMapResultFound] = useState(0);
  const [mapResultNotFound, setMapResultNotFound] = useState(0);
  const [mapResultOutsideTelangana, setMapResultOutsideTelangana] = useState(0);
  const [mapResultProcessed, setMapResultProcessed] = useState(0);
  const [available, setAvailable] = useState(0);
  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(0);
  const [skipAvailabilityCheck, setSkipAvailabilityCheck] = useState(0);

  const [selectedOpt, setSelectedOpt] = useState(1);
  
  const handlePincode = (pincode) => {
    const validation = isPincodeValid(pincode);

    if(validation.status && pincode.toString().length <= 6) {
      setOption1((currentValue) => { return { pincode: {value: pincode, errorMessage: currentValue.pincode.errorMessage}, gp: { value: '', options: [] } } });
      if(pincode.toString().length == 6) {
        if(telanganaData.pincodeWithGP[pincode]) {
          setOption1((currentValue) => { return { pincode: { value: currentValue.pincode.value, errorMessage: '' }, gp: { value: '', options: telanganaData.pincodeWithGP[pincode].sort() } } });
        } else {
          setOption1((currentValue) => { return { pincode: { value: currentValue.pincode.value, errorMessage: 'No GP available for this pincode' }, gp: { value: '', options: [] } } });
        }
      }
    }
  };

  const handleMapResponse = (response) => {
    console.log(response);
    const {lat: latitude, lng: longitude} = response.searchResponse.position;
    if(selectedOption.option3 && (response.searchResponse.district !== '' || response.searchResponse.gp !== '' || response.searchResponse.pincode !== '')) {
      let address = [];
      let district = response.searchResponse.district;
      let gp = response.searchResponse.gp;
      let pincode = response.searchResponse.pincode;
      let districtPincode = '';
      let selectedGp = '';
      const stringRegex = /[^a-z ]/gi;
      const numericRegex = /[^0-9 ]/gi;
      const pincodeRegex = /^(50)([0-9]{4})$/;

      if(district !== '') {
        districtPincode += district;
        locationDetailsFromMap.districtName = district;
        locationDetailsFromMap.districtLGDCode = telanganaData.districtsWithCode[district];
      } 
      if(pincode !== '') {
        if(districtPincode !== '') {
          districtPincode += ', ';
        }
        districtPincode += pincode;
        locationDetailsFromMap.pincode = pincode;
      }

      gp.forEach((g) => {
        if(districtPincode != '') {
          address.push(g + ', ' + districtPincode);
        }
        if(district != '') {
          address.push(g + ', ' + district);
        }
        if(pincode != '') {
          address.push(g + ', ' + pincode);
          address.push(pincode);
        }
        address.push(g);
      });

      address.forEach((ad) => {
        if(telanganaData.gpDistrictPincodeWithLGDC[ad]) {
          setLgdCode(telanganaData.gpDistrictPincodeWithLGDC[ad]);
          selectedGp = ad.split(district)[0];
        } else if (telanganaData.gpDistrictWithLGDC[ad]) {
          setLgdCode(telanganaData.gpDistrictWithLGDC[ad]);
          selectedGp = ad.split(district)[0];
        } else if (telanganaData.gpPincodeWithLGDC[ad]) {
          setLgdCode(telanganaData.gpPincodeWithLGDC[ad]);
          selectedGp = ad.split(pincode)[0];
        } else if (telanganaData.gpWithCode[ad]) {
          setLgdCode(telanganaData.gpWithCode[ad]);
          selectedGp = ad.replace(stringRegex, "");
        } else if(telanganaData.pincodeWithLGDC[ad]) {
          setLgdCode(telanganaData.pincodeWithLGDC[ad]);
        } else {
          const pinArr = location.replace(numericRegex, '').trim().split(' ');
          pinArr.forEach((pin) => {
            if(pin.match(pincodeRegex)) {
              setLgdCode(telanganaData.pincodeWithLGDC[pin]);
            }
          });
        }
        if(selectedGp != '' && telanganaData.gpWithCode[selectedGp]) {
          locationDetailsFromMap.gpName = selectedGp;
          locationDetailsFromMap.gpLGDCode = telanganaData.gpWithCode[selectedGp];
        }
      });
      if(locationDetailsFromMap.pincode === '' && response.searchResult) {
        setSelectedOption({ option1: false, option2: false, option3: false });
        setSkipAvailabilityCheck(1);
      } else {
        setSkipAvailabilityCheck(0);
      }
    } else if(selectedOption.option2) {
      locationDetailsFromMap.districtName = option2.district;
      locationDetailsFromMap.districtLGDCode = (telanganaData.districtsWithCode[option2.district]) ? telanganaData.districtsWithCode[option2.district] : '';
      locationDetailsFromMap.mandalName = option2.mandal;
      locationDetailsFromMap.mandalLGDCode = (telanganaData.mandalsWithCode[option2.mandal]) ? telanganaData.mandalsWithCode[option2.mandal] : '';
      locationDetailsFromMap.gpName = option2.gp;
      locationDetailsFromMap.gpLGDCode = (telanganaData.gpWithCode[option2.gp]) ? telanganaData.gpWithCode[option2.gp] : '';
    } else if(selectedOption.option1) {
      locationDetailsFromMap.gpName = option1.gp.value;
      locationDetailsFromMap.gpLGDCode = (telanganaData.gpWithCode[option1.gp]) ? telanganaData.gpWithCode[option1.gp] : '';
      locationDetailsFromMap.pincode = option1.pincode.value;
    }

    locationDetailsFromMap.latitude = latitude;
    locationDetailsFromMap.longitude = longitude;
    setMapResultFound(response.searchResult);
    setMapResultNotFound(!response.searchResult);
    setMapResultOutsideTelangana(!response.searchIsWithinTelangana);
  }

  const handleMapClickResponse = (response) => {
    setOption3(response?.clickResponse?.formattedAddress);
  };

  const getYourDetailsForm = () => {
    switch(segment) {
      case 'government':
          setYourDetailsForm([<GovernmentForm key="government" departmentData={departmentData}  handleYourDetailsChange={handleYourDetailsChange} />]);
        break;
       
      case 'residential':
        setYourDetailsForm([<ResidentialForm key="residential" handleYourDetailsChange={handleYourDetailsChange}/>]) 
        break;

      case 'cellTower':
        setYourDetailsForm([<CellTowerForm key="celltower" handleYourDetailsChange={handleYourDetailsChange}/>]) 
        break;

      case 'enterprise':
        setYourDetailsForm([<EnterpriseForm key="enterprise" departmentData={departmentData} handleYourDetailsChange={handleYourDetailsChange}/>]) 
        break;

        case 'home':
        setYourDetailsForm([<GovernmentForm key="home" departmentData={departmentData}  handleYourDetailsChange={handleYourDetailsChange} />]);
        break;

      default:
        setYourDetailsForm([<></>]);
    }
  }

  const setYourDetailsState = () => {
    //console.log("segment000: ", segment)
    switch(segment) {
      case 'government':
        setYourDetails({ name: '', mobile: '', department: '', subdepartment: '', services: [], otherServices: '' });
        break;

      case 'residential':
        setYourDetails({name: '', mobile: ''});
        break;

      case 'cellTower':
        setYourDetails({name: '', mobile: '', organizationName:'', email: '', services: [], otherServices: ''});
        break;

      case 'enterprise':
        setYourDetails({name: '', mobile: '', organizationName:'', email:'', services: [], otherServices: ''});
       break;   

      default:
        setYourDetails({});
    }
  };

  const handleYourDetailsChange = (value, property) => {
    setYourDetails((currentValue) => { return { ...currentValue, [property]: value } });
  };

  const checkIfYourDetailsFilled = () => {
    addLeadData.siteA.address.districtName = locationDetailsFromMap.districtName;
    addLeadData.siteA.address.districtLGDCode = locationDetailsFromMap.districtLGDCode;
    addLeadData.siteA.address.mandalName = locationDetailsFromMap.mandalName;
    addLeadData.siteA.address.mandalLGDCode = locationDetailsFromMap.mandalLGDCode;
    addLeadData.siteA.address.gpName = locationDetailsFromMap.gpName;
    addLeadData.siteA.address.gpLGDCode = locationDetailsFromMap.gpLGDCode;
    addLeadData.siteA.address.address = location;
    addLeadData.siteA.address.pincode = locationDetailsFromMap.pincode;
    addLeadData.siteA.address.latitude = locationDetailsFromMap.latitude;
    addLeadData.siteA.address.longitude = locationDetailsFromMap.longitude;

    switch(segment) {
      case 'government':
        if(yourDetails?.name?.length > 2 && yourDetails?.mobile?.length == 10 && yourDetails?.department?.length > 0 && yourDetails?.subdepartment?.length > 0 && (yourDetails?.services?.length > 0 || yourDetails?.otherServices?.length > 0)) {
          addLeadData.customerName = yourDetails.name;
          addLeadData.departmentName = yourDetails.department;
          addLeadData.contactNumber = yourDetails.mobile;
          return true;
        } else {
          return false;
        }
        break;

      case 'residential':
        if(yourDetails?.name?.length > 2 && yourDetails?.mobile?.length == 10) {
          addLeadData.customerName = yourDetails.name;
          addLeadData.contactNumber = yourDetails.mobile;
          return true;
        } else {
          return false;
        }
        break;

      case 'cellTower':
        if(yourDetails?.name?.length > 2 && yourDetails?.mobile?.length == 10 && yourDetails?.organizationName?.length > 0 && (yourDetails?.email?.length > 0 && isEmailValid(yourDetails?.email).status) && (yourDetails?.services?.length > 0 || yourDetails?.otherServices?.length > 0)) {
          addLeadData.customerName = yourDetails.organizationName;
          addLeadData.contactNumber = yourDetails.mobile;
          addLeadData.firstName = yourDetails.name;
          addLeadData.contactEmail = yourDetails.email;
          return true;
        } else {
          return false;
        }
        break;

        case 'enterprise':
          if(yourDetails?.name?.length > 2 && yourDetails?.mobile?.length == 10 && yourDetails?.organizationName?.length > 0 && (yourDetails?.email?.length > 0 && isEmailValid(yourDetails?.email).status) && (yourDetails?.services?.length > 0 || yourDetails?.otherServices?.length > 0)) {
            addLeadData.customerName = yourDetails.organizationName;
            addLeadData.contactNumber = yourDetails.mobile;
            addLeadData.firstName = yourDetails.name;
            addLeadData.contactEmail = yourDetails.email;
            return true;
          } else {
            return false;
          }
          break;

      default:
        break;
    }
  }

  const checkAvailability = () => {
    const availabilityApi = `${bssApi}?type=GP&lgdCode=${lgdCode}`;   
    //console.log("availabilityApi", availabilityApi);
    axios
      .get(availabilityApi)
      .then(function(response) {
        if(response.status === 200) {
          setAvailable((response?.data === 'ACTIVE') ? 1 : 0);
          setIsAvailabilityChecked(1);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {

      });
  };

  const addLead = () => {
    const addLeadApi = `${bssApi}/saveData`;   
    axios
      .post(addLeadApi, addLeadData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getYourDetailsForm();
    setYourDetailsState();
  }, []);

  useEffect(() => {
    getYourDetailsForm();
    if(checkIfYourDetailsFilled()) {
      setButtonsState((currentValue) => { return { ...currentValue, button2: true } });
    } else {
      setButtonsState((currentValue) => { return { ...currentValue, button2: false } });
    }
  }, [yourDetails, departmentData])

  useEffect(() => {
    fetchTelanganaData()
    .then((data) => {
      setTelanganaData({...data});
    });

    fetchDepartmentData()
    .then((data) => {
      setDepartmentData({...data});
    });
  }, [])

  useEffect(() => {
    resetMapStates();
    setLgdCode('');
  }, [option1.pincode.value, option2.district, option3]);

  useEffect(() => {
    if(option1.pincode.value.length > 0) {
      resetOption2();
      resetOption3();
      console.log("option1");
      setSelectedOption({ option1: true, option2: false, option3: false });
    }
  }, [option1.pincode.value]);

  useEffect(() => {
    if(option2.district.length > 0) {
      resetOption1();
      resetOption3();
      console.log("option2");
      setSelectedOption({ option1: false, option2: true, option3: false });
    }
  }, [option2.district]);

  useEffect(() => {
    if(option3?.length > 0) {
      resetOption1();
      resetOption2();
      setSelectedOption({ option1: false, option2: false, option3: true });
    }
  }, [option3]);

  useEffect(() => {
    if(option1.gp.value.length > 3 || option2.gp.length > 3 || option3.length > 3) {
      setMapResultProcessed(1);
    }

    if(option1.gp.value.length > 0) {
      setLocation(`${option1.gp.value}, Telangana, India, ${option1.pincode.value}`);
    } else if(option2.gp.length > 0) {
      setLocation(`${option2.gp}, ${option2.mandal}, ${option2.district}, Telangana, India`);
    } else if(option3.length > 0) {
      setLocation(option3);
    } else {
      setLocation('');
    }
  }, [option1.gp.value, option2.gp, option3]);

  useEffect(() => {
    if(location.length > 0) {
      if(telanganaData.gpMandalDistrictWithLGDC[location]) {
        setLgdCode(telanganaData.gpMandalDistrictWithLGDC[location]);
      } else if (telanganaData.gpPincodeWithLGDC[location]) {
        setLgdCode(telanganaData.gpPincodeWithLGDC[location]);
      }
    }
  }, [location]);

  useEffect(() => {
    // console.log('Hello');
    // console.log('option1.gp.value: ', option1.gp.value.length);
    // console.log('option2.gp: ', option2.gp.length);
    // console.log('option3: ', option3.length);
    // console.log('lgdCode: ', lgdCode.length);
    if((option1.gp.value.length > 0 || option2.gp.length > 0 || option3.length > 0) && lgdCode?.toString().length > 0) {
      setButtonsState((currentValue) => { return { ...currentValue, button1: true } })
    } else {
      setButtonsState((currentValue) => { return { ...currentValue, button1: false } })
    }
  }, [lgdCode]);

  useEffect(() => {
    if(activeScreen === 'screen1') {
      setIsAvailabilityChecked(0);
      setAvailable(0);
    }
  }, [activeScreen]);

  const resetOption1 = () => {
    setOption1({
      pincode: {
        value: '',
        errorMessage: ''
      },
      gp: {
        value: '',
        options: []
      }
    });
  };

  const resetOption2 = () => {
    setOption2(() => { return {
      district: '',
      mandal: '',
      gp: ''
    }});
  };

  const resetOption3 = () => {
    setOption3('');
  };

  const resetMapStates = () => {
    setMapResultFound(0);
    setMapResultNotFound(0);
    setMapResultOutsideTelangana(0);
    setMapResultProcessed(0);
  }

  function handleSegmentChange(val) {
    setActiveScreen('screen1');
    setSegment(val);
  }

  useEffect(() => {
    getYourDetailsForm();
    setYourDetailsState();
  }, [segment]);

  useEffect(() => {
    resetMapStates();
    setLgdCode('');
    setSkipAvailabilityCheck(0);
    setManualAddress({ address: '', pincode: { value: '', errorMessage: '' } });
  }, [option1.pincode.value, option2.district, option3]);

  useEffect(() => {
    console.log("manualAddress.pincode.value: ",manualAddress.pincode.value);
    if (skipAvailabilityCheck && manualAddress.pincode.value.toString().length === 6) {
      setButtonsState((currentValue) => { return { ...currentValue, button1: true } });
      setLocation(`${(manualAddress.address != '') ? manualAddress.address+', ': ''} ${option1.pincode.value}`);
    }
  }, [manualAddress.pincode.value]);


  return (
  <>
    <form className="section_form container">
      <div className="form_container">
        <div className="form_top">
          <div className="form_top_left">
            <h1>Check connectivity in your area</h1>
            <p>
              select a segment and add details to find service providers in your area
            </p>
            <h2>Select a segment</h2>
            <div className="form_section_segment">
              <div className="form_section_segment-1">
                <label>
                  <input
                    type="radio"
                    id="residential"
                    name="segment"
                    value="residential"
                    //onClick={handleRes}
                    onChange={(e) => {handleSegmentChange("residential")}}
                  />
                  {"  "}Residential
                </label>

                <label>
                  <input
                    type="radio"
                    id="celltower"
                    name="segment"
                    value="celltower"
                    //onClick={handleCell}
                    onChange={(e) => {handleSegmentChange("cellTower")}}
                  />
                  {"  "}Cell Tower
                </label>
              </div>
              <div className="form_section_segment-2">
                <label>
                  <input
                    type="radio"
                    id="government"
                    name="segment"
                    value="government"
                    //onClick={handleGov}
                    onChange={(e) => {handleSegmentChange("government")}}
                  />
                  {"  "}Government
                </label>

                <label>
                  <input
                    type="radio"
                    id="Enterprise"
                    name="segment"
                    value="enterprise"
                    //onClick={handleEnterprise}
                    onChange={(e) => {handleSegmentChange("enterprise")}}
                  />
                  {"  "}Enterprise
                </label>
              </div>
            </div>
          </div>

          <div className={`form_top_right}`}>              
              {/* <img src={pin_map} alt="form_img" className={`pin_map`} /> */}
              <div className="map-wrapper">
              <img
                className={`light-map ${((!mapResultFound && !mapResultNotFound && !mapResultOutsideTelangana) || !mapResultProcessed) ? '' : 'hide'}`}
                src="/public/assets/map.jpg"
              />
              <div className={`detail-map ${(mapResultFound && mapResultProcessed) ? '' : 'hide'}`}>
                <RenderMapBySearch address={location} id="map-1" searchResponse={handleMapResponse} clickResponse={handleMapClickResponse} />
              </div>
              <div className={`detail-map outside ${(mapResultOutsideTelangana && mapResultProcessed) ? '' : 'hide'}`}>
                <div className="outside-wrapper">
                  <img src="/public/assets/no.png" />
                  <div className="text-wrapper">
                    <p className="bold">Selected location is outside Telangana State</p>
                    <p>Our services are limited to Telangana, India.</p>
                  </div>
                </div>
              </div>
              <div className={`detail-map ${(mapResultNotFound && !mapResultOutsideTelangana && mapResultProcessed) ? '' : 'hide'}`}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <p>No Results Found</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="form_locality">
              <h2 className="locality_header">Add your Location</h2>
              <div className={`location-form-wrapper screen1 ${(activeScreen !== 'screen1') ? 'hide' : ''}`}>
                {/* <div className={`screen1 ${(activeScreen !== 'screen1') ? 'hide' : ''}`}> */}
                      
                        <div className="option1">
                          <div className="input-wrapper">
                            <label className={(selectedOption.option1) ? 'selected' : ''}>Option 1</label>
                            <div className="pincode">
                              <input
                                type="text"
                                name="pincode"
                                placeholder="Enter 6-digit Pincode here"
                                value={option1.pincode.value}
                                onChange={(e) => handlePincode(e.target.value)}
                                autoComplete="off"
                              />
                              <p className="error">{option1.pincode.errorMessage}</p>
                            </div>
                            <div className="gram-panchayat">
                              <Select defaultSelectName="Select Gram Panchayat" options={option1.gp.options} changeHandler={(val) => {setOption1((currentValue) => { return { ...currentValue, gp: { value: val, options: currentValue.gp.options } } })}} selectedValue={option1.gp.value}/>
                            </div>
                          </div>
                        </div>

                        <div className="or">OR</div>
                        
                        <div className="option2">
                          <label className={(selectedOption.option2) ? 'selected' : ''}>Option 2</label>
                          <div className="district-wrapper">
                            <Select defaultSelectName="Select District Name" options={telanganaData.districts} changeHandler={(val) => {setOption2(() => { return {district: val, mandal: '', gp: ''} })}} selectedValue={option2.district} />
                          </div>
                          <div className="mandal-wrapper">
                            <Select defaultSelectName="Select Mandal Name" options={(telanganaData.districtsWithMandals[option2.district]) ? telanganaData.districtsWithMandals[option2.district] : []} changeHandler={(val) => {setOption2((currentValue) => { return {...currentValue, mandal: val, gp: ''} })}} selectedValue={option2.mandal} />
                          </div>
                          <div className="panchayat-wrapper">
                            <Select defaultSelectName="Select Gram Panchayat" options={(telanganaData.mandalsWithGp[option2.mandal]) ? telanganaData.mandalsWithGp[option2.mandal] : []} changeHandler={(val) => {setOption2((currentValue) => { return {...currentValue, gp: val} })}} selectedValue={option2.gp} />
                          </div>
                        </div>
                      
                      <div className="or">OR</div>
                      
                      <div className="option3">
                        <label className={(selectedOption.option3) ? 'selected' : ''}>Option 3</label>
                        <div className="map">
                          <MapAutoInput placeholder="Enter your area to ‘Search on the map’" value={option3} changeHandler={(val) => setOption3(val)} />
                        </div>
                      </div>
                    {/* </div> */}
                    <div className={`manual-address ${(skipAvailabilityCheck) ? '' : 'hide'}`}>
                      <div className="leftSection1">
                          <img src="/public/assets/no.png" />
                          <label className={(skipAvailabilityCheck) ? 'selected' : ''} >Address not found, please enter Pincode manually</label>
                          {/* <p>Enter Pincode manually</p> */}
                      </div>

                      <div className="rightSection1">
                        <input
                          type="text"
                          placeholder="Enter address here"
                          name="address"
                          value={manualAddress.address}
                          onChange={(e) => setManualAddress(currentValue => { return { pincode: currentValue.pincode, address: e.target.value } })}
                          autoComplete="off"
                        />
                      <div>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="Enter 6-digit Pincode here"
                          value={manualAddress.pincode.value}
                          onChange={(e) => handlePincode(e.target.value)}
                          autoComplete="off"
                        />
                        <span className="error">{manualAddress.pincode.errorMessage}</span>
                      </div>
                      <span style={{float: "right", fontSize: "13px", fontStyle: "italic", padding: "2px 8px"}}>*Mandatory Field</span>
                    </div>   
                  </div>
              </div>

              


              <div className={`screen2 ${(activeScreen !== 'screen2') ? 'hide' : ''}`}>
                <div className="details-wrapper">
                  <div className="location-details">
                    <input
                      type="text"
                      name="location"
                      defaultValue={location}
                      disabled={true}
                      autoComplete="off"
                      style={{width: "570px"}}
                    />
                  </div>
                  <div onClick={() => setActiveScreen('screen1')} className="edit-wrapper">
                    Edit
                  </div>
                </div>
                {
                  yourDetailsForm
                }
              </div>

              <div className="formButtonHolder">
                <a
                  onClick={(e) => {e.preventDefault(); if(!e.target.classList.contains('disabled')) setActiveScreen('screen2')}}
                  className={`${(activeScreen !== 'screen1') ? 'hide' : ''} ${(!buttonsState.button1) ? 'disabled' : ''}`}
                >
                  Continue
                </a>
                <a
                  onClick={(e) => {e.preventDefault(); if(!e.target.classList.contains('disabled')) { if(!skipAvailabilityCheck) checkAvailability(); addLead()}}}
                  className={`${(activeScreen !== 'screen2') ? 'hide' : ''} ${(!buttonsState.button2) ? 'disabled' : ''}`}
                >
                  {
                    (!skipAvailabilityCheck) ? 'Check Availability' : 'Submit'
                  }
                </a>
              </div>

                  
            </div>

        </div>







        <div className="form-container" style={{display:"none"}}>
          <div className="form-map-wrapper">
            
            <div className="map-wrapper">
              <img
                className={`light-map ${((!mapResultFound && !mapResultNotFound && !mapResultOutsideTelangana) || !mapResultProcessed) ? '' : 'hide'}`}
                src="/assets/map.jpg"
              />
              <div className={`detail-map`}>
                <RenderMapBySearch address="adilabad" id="map-1" searchResponse={handleMapResponse} clickResponse={handleMapClickResponse} />
              </div>
              <div className={`detail-map outside ${(mapResultOutsideTelangana && mapResultProcessed) ? '' : 'hide'}`}>
                <div className="outside-wrapper">
                  <img src="/assets/no.png" />
                  <div className="text-wrapper">
                    <p className="bold">Selected location is outside Telangana State</p>
                    <p>Our services are limited to Telangana, India.</p>
                  </div>
                </div>
              </div>
              <div className={`detail-map ${(mapResultNotFound && !mapResultOutsideTelangana && mapResultProcessed) ? '' : 'hide'}`}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <p>No Results Found</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={`hidden-network-wrapper ${(isAvailabilityChecked && available) ? 'show' : ''}`}>
              <div className="network-wrapper">
                <img src="/assets/healthicons_yes.png" />
                <div className="text-wrapper">
                  <p className="big">
                    T-Fiber Network is
                    <br /> available in your area.
                  </p>
                  <p className="small">
                    To proceed,
                    <br /> Place order | Send enquiry | Call Us
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={`hidden-network-wrapper ${(isAvailabilityChecked && !available) ? 'show' : ''}`}>
              <div className="network-wrapper">
                <img src="/assets/no.png" />
                <div className="text-wrapper">
                  <p className="big">
                    T-Fiber Network is coming
                    <br /> soon to your area.
                  </p>
                  <p className="small">
                    To proceed,
                    <br /> Send enquiry | Call Us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </form>
  </>
  );
}

export default Form_homepage;