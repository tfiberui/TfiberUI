import React, { useEffect, useState } from "react";
import map from "/public/assets/Home/map.png";
import second_map from "/public/assets/Home/warangal.png";
import pin_map from "../../assets/map.png";
import available from "/assets/healthicons_yes.png";
import no from "/assets/no.png";
import act from "/assets/Home/act.png";
import airtel from "/assets/Home/airtel.png";
import jio from "/assets/Home/jio.png";
import "./NewForm.scss";
import Modal from "../Modal/Modal";
import * as XLSX from "xlsx";
import axios from "axios";
import Map from "../Map/Map";

const NewForm = ({telangana, department}) => {
  //form section logic
  const [visible, setVisible] = useState(false);
  const [residential, setResidential] = useState(false);
  const [government, setGovernment] = useState(false);
  const [cell, setCell] = useState(false);
  const [enterprise, setEnterprise] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("");
  //const [map, setMap] = useState("");
  //const [isMandal, setIsMandal] = useState(false);
  //const [mapVisibility, setMapVisibility] = useState(false);
  const [gramError, setGramError] = useState(false);
  const [isPinError, setIsPinError] = useState(false);
  const [continueBtnDisabled, setContinueBtnDisabled] = useState(true);

  
  let [formName, setFormName] = useState("");
  let [formDepartment, setFormDepartment] = useState("");
  let [formMobile, setFormMobile] = useState("");
  let [formEmail, setFormEmail] = useState("");

  let [formPin, setFormPin] = useState("");
  let [formGP, setFormGP] = useState("");
  let [formSubDepartment, setFormSubDepartment] = useState("");
  let [formOrg, setFormOrg] = useState("");
  let [formBroadband, setFormBroadband] = useState(false);
  let [formILL, setFormILL] = useState(false);
  let [formIPVPM, setFormIPVPN] = useState(false);
  let [formOthers, setFormOthers] = useState(false);
  let [resNameError, setResNameError] = useState(true);
  let [resMobileError, setResMobileError] = useState(true);
  let [resSaveSuccess, setResSaveSuccess] = useState(false);
  




  const handleVisible = () => {
    setResSaveSuccess(false);
    if(gram === ""){
      setContinueBtnDisabled(true);
    }
    else{
      setContinueBtnDisabled(false);
      handleDisable();
      setVisible(true);
    }
    
  };

  const handleRes = (e) => {
    setTrigger(false);
    setResSaveSuccess(false);
    setSelectedSegment("Residential");
    setResidential(true);
    setGovernment(false);
    setCell(false);
    setEnterprise(false);
  };

  const handleGov = () => {
    setTrigger(false);
    setResSaveSuccess(false);
    setGovernment(true);
    setResidential(false);
    setCell(false);
    setEnterprise(false);
    setSelectedSegment("Government");
  };

  const handleCell = () => {
    setTrigger(false);
    setResSaveSuccess(false);
    setResidential(false);
    setGovernment(false);
    setCell(true);
    setEnterprise(false);
    setSelectedSegment("Cell Tower");
  };

  const handleEnterprise = () => {
    setTrigger(false);
    setResSaveSuccess(false);
    setResidential(false);
    setGovernment(false);
    setCell(false);
    setEnterprise(true);
    setSelectedSegment("Enterprise");
  };

  const handleTrigger = () => {
    setTrigger(true);
    setFormName("");
    setFormDepartment("");
    setFormMobile("");
    setFormEmail("");
    setFormPin("");
    setFormGP("");
    setFormSubDepartment("");
    setFormOrg("");
    setFormBroadband(false);
    setFormILL(false);
    setFormIPVPN(false);
    setFormOthers("");


    console.log("segment12: ", selectedSegment);
    
    if(selectedSegment === "Residential"){
      setResSaveSuccess(false);
      formName ? setResNameError(false) : setResNameError(true)
      formMobile ? setResMobileError(false) : setResMobileError(true)
        if(resNameError == false && resMobileError == false){
            console.log("PIN: ", pin);
            console.log("LGD: ", lgd);
            console.log("Name: ", formName);
            console.log("Mobile: ", formMobile);
            console.log("Depart: ", formDepartment);
            console.log("subDepart: ", formSubDepartment);
            console.log("Other: ", formOthers);
          getCheckAvability();
          setResSaveSuccess(true);
        }
        else{
          setTrigger(false);
        }
      
    }
    else if(selectedSegment === "Government"){
      console.log("PIN: ", pin);
      console.log("LGD: ", lgd);
      console.log("Name: ", formName);
      console.log("Mobile: ", formMobile);
      console.log("Depart: ", formDepartment);
      console.log("subDepart: ", formSubDepartment);
      console.log("Other: ", formOthers);
    }
    else if(selectedSegment === "Cell Tower"){
      console.log("PIN: ", pin);
      console.log("LGD: ", lgd);
      console.log("Name: ", formName);
      console.log("Mobile: ", formMobile);
    }
    else if(selectedSegment === "Enterprise"){
      console.log("PIN: ", pin);
      console.log("LGD: ", lgd);
      console.log("Name: ", formName);
      console.log("Mobile: ", formMobile);
    }
    else{
      console.log("Select Segment!");
    }


    //saveFormData();
  };

  const getCheckAvability = () => {
    if (lgd !== null) {   // setIsMandal
      axios
        .get("http://localhost:3020", {
          params: {
            type: "GP",
            lgdCode: lgd,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "ACTIVE" || res.data === "READY_FOR_SERVICE") {
            setReady(true);
          }
          else{
            setReady(false);
          }
        });
    }
  }

  const saveFormData = () => {
      let formData = {
      "leadSource": "WEBSITE",
      "subject": "",
      "winningProbability": "",
      "projectedRevenue": "",
      "remarks": "",
      "customerType": selectedSegment,
      "customerName":  govData.name,
      "departmentName": govData.Department,
      "departmentCode": "",
      "firstName": "",
      "lastName": "",
      "contactNumber": govData.mobile,
      "contactEmail": formEmail,
      "contactDesignation": "",
      "plotNo": "",
      "addressLine1": gram,
      "addressLine2": mandal,
      "pincode": pin,
      "siteType": "",
      "siteA": {
      "contact": {
      "contactFirstName": "",
      "contactLastName": "",
      "contactNumber": "",
      "contactEmail": ""
      },
      "address": {
      "packageName": "",
      "districtName": district,
      "districtLGDCode": lgd,
      "mandalName": mandal,
      "mandalLGDCode": "",
      "gpName": gram,
      "gpLGDCode": lgd,
      "address": "",
      "pincode": pin,
      "latitude": "",
      "longitude": ""
      }
      },
      "siteZ": {
      "contact": null,
      "address": null
      },
      "typeOfPop": "",
      "popName": "",
      "additionalInfos": {
      "ADDITIONAL_INFO_buildingCondition": "",
      "ADDITIONAL_INFO_computerAvailability": "",
      "ADDITIONAL_INFO_functionalComputers": "",
      "ADDITIONAL_INFO_availableComputers": "",
      "ADDITIONAL_INFO_televisionAvailability": "",
      "ADDITIONAL_INFO_internetAvailability": "",
      "ADDITIONAL_INFO_ceilingCondition": "",
      "ADDITIONAL_INFO_popLocationReachability": "",
      "ADDITIONAL_INFO_spaceAvailable": "",
      "ADDITIONAL_INFO_equipmentType": "",
      "ADDITIONAL_INFO_dgSetAvailability": "",
      "ADDITIONAL_INFO_earthingPitFor": "",
      "ADDITIONAL_INFO_rooftopAvailability": ""
      },
      "siteId": "1",
      "createdBy": "superadmin"
    }
    console.log("FormData: ",formData);
        // axios
        //   .post("http://localhost:3020/saveData", {
        //      formData
        //   })
        //   .then((res) => {
        //     console.log(res.data);
        //     console.log(selectedSegment);
        //   });
  }

  const handleForm = (e) => {
    e.preventDefault();
    if(residential === true){
      console.log(resData);
    }
    else if(government === true){
      console.log(govData);
    }
    else if (cell === true){
      console.log(cellData);
    }
    else if( enterprise === true){
      console.log(entData);
    }
  };

  //mandals array
  const mandals = [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanumakonda",
    "Hyderabad",
    "Jagitial",
    "Jangoan",
    "Jayashankar Bhupalapally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Kumuram Bheem Asifabad",
    "Mahabubabad",
    "Mancherial",
    "Medak",
    "Medchal Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Ranga Reddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri",
  ];

  //storing form data
  const [pin, setPin] = useState();
  const [gram, setGram] = useState();
  const [mandal, setMandal] = useState();
  const [district, setDistrict] = useState();
  const [resData, setResData] = useState({
    name: "",
    mobile: "",
  });


  const [govData, setGovData] = useState({
    name: '',
    mobile: '',
    Department: '',
    SubDepartment: '',
    broadband: false,
    ill: false,
    ipvpn: false,
    other: ''
  });

  const [cellData, setCellData] = useState({
    name: '',
    mobile: '',
    organization: '',
    email: '',
    broadband: false,
    ill: false,
    ipvpn: false,
    other: ''
  })

  const [entData, setEntData] = useState({
    name: '',
    mobile: '',
    organization: '',
    email: '',
    broadband: false,
    ill: false,
    ipvpn: false,
    other: ''
  })

  function handleNameChange(e){
    console.log(e);
  }


  const handleResChange = (e) => {
    const { name, value } = e.target;
    if(name === 'name'){
      setUserName(value);
    }
    if(name === 'mobile'){
      setUserMobile(value);
    }
    console.log("NAME: ",userName);
    console.log("mobileNumber: ",userMobile);

    // setResData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const handleGovChange = (e) => {
    const { name, value } = e.target;
    setGovData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCellChange = (e) => {
    const {name, value} = e.target;
    setCellData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEntChange = (e) => {
    const {name, value} = e.target;
    setEntData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //for option 1
  const [grams, setGrams] = useState([]);

  //filter and option functionalities
  function filterGramsbasedonPin() {
    if(pin){
      let pinLen = pin.length;
      pinLen === 6 ? (setIsPinError(false), setPanchayatDisabled(false)) : (setIsPinError(true), setGrams(""), setPanchayatDisabled(true))
    }

    if(pin > 500000){
      const filteredData = telangana.filter(filterPin);
      console.log('FilteredData: ', telangana);
      var gp = [];
      //setGramError(false);
      filteredData.forEach(element => {
        gp.push(element.__EMPTY_13)
      });
      console.log("Grams: ", gp);
      gp[0] != undefined ? setPanchayatDisabled(false) : setPanchayatDisabled(true)
      setGrams(gp);
      // if(gp[0] == undefined || gp == null){
      //   setGramError(true);
      // }
      //console.log("GP: ",gp[0]);
      //setMapVisibility(true);
    }

    function filterPin(item){
      if(item.__EMPTY_10 === pin){
        return true;
      }else{
        return false;
      }
    }
  }
  
  function setPinValue(e){
    e ? (
          //setPinError(false),
          setPin(e)
        ) : 
        (
          //setPinError(true),
          setPin("")
        )
  }

  function setGramValue(e){
    e ? (
          setGramError(false),
          setGram(e),
          setContinueBtnDisabled(false)
        ) : 
        (
          setGramError(true),
          setGram(""),
          setContinueBtnDisabled(true)
        )
  }

  useEffect(() => {
    filterGramsbasedonPin();
  },[pin]);

  //for option 2
  const [mandalam, setMandalam] = useState([])

  function filterMandalbasedondistrict(){
    if(district !== null){
      const filteredData = telangana.filter(filterMandal);
      var mandal = new Set();
      filteredData.forEach(element => {
        mandal.add(element.__EMPTY_5)
      });
      var mandalArr = Array.from(mandal)
      setMandalam(mandalArr);
    }

    function filterMandal(item){
      if(item.__EMPTY_1 === district){
        return true;
      }else{
        return false;
      }
    }
  }

  useEffect(() => {
    filterMandalbasedondistrict()
  },[district])

  const [grammam, setGrammam] = useState([]);

  function filterGrambasedonMandal(){
    if(mandal !== null){
      const filteredData = telangana.filter(filterGramam);
      var gps = new Set();
      filteredData.forEach(element => {
        gps.add(element.__EMPTY_13)
      });
      var gramam = Array.from(gps);
      setGrammam(gramam);
    }

    function filterGramam(item){
      if(item.__EMPTY_5 === mandal){
        return true;
      }else{
        return false;
      }
    }
  }

  useEffect(() => {
    filterGrambasedonMandal();
    //setIsMandal(true);
  },[mandal])

  //lgd fetching
  const [lgd, setLgd] = useState(0);

  function fetchLgd(){
    if(gram !== null){
      const lgdCode = telangana.filter(getLGD);
      // console.log(lgdCode[0].__EMPTY_12);
      if(lgdCode.length > 0){
        setLgd(lgdCode[0].__EMPTY_12);
      }else{
        //console.log("LGD CODE NOT FOUND")
      }
      console.log(lgd);
    }

    function getLGD(item){
      if(item.__EMPTY_9 === gram){
        return true;
      }else {
        return false;
      }
    }
  }

  useEffect(() => {
    fetchLgd();
    //setMapVisibility(true);
    renderMap();
  },[gram])

  //for department
  const [dept, setDept] = useState([])
  function getDepartments() {
    var indDept = new Set();
    department.forEach(element => {
      indDept.add(element.__EMPTY_1)
    });
    var depts = Array.from(indDept);
    setDept(depts);
  }

  useEffect(() =>{
    getDepartments();
  },[government])

  //for sundepartments
  const [subdept, setSubdept] = useState([]);

  function getSubDepartments() {
    if(govData.Department !== null){
      setFormDepartment(govData.Department);
      const filteredData = department.filter(filterSubDept);
      var subDept = new Set();
      filteredData.forEach(element => {
        subDept.add(element.__EMPTY)
      });
      var subDeptArr = Array.from(subDept);
      setSubdept(subDeptArr);
    }

    function filterSubDept(item){
      if(item.__EMPTY_1 === govData.Department){
        return true;
      }else{
        return false;
      }
    }
  }

  useEffect(() => {
    getSubDepartments();
  },[govData.Department])


  

//set active option
let Buttons = document.querySelectorAll(".selectSection button");
for (let button of Buttons) {
  button.addEventListener('click', (e) => {
    const et = e.target;
    const active = document.querySelector(".active");

    if (active) {
      active.classList.remove("active");
    }
    
    et.classList.add("active");
    let allContent = document.querySelectorAll('.content');

    for (let content of allContent) {
      if(content.getAttribute('data-number') === button.getAttribute('data-number')) {
        content.style.display = "block";
       }
      else {
        content.style.display = "none";
       }
     }
  });
}

const [pinDisabled, setPinDisabled] = useState(false);
const [panchayatDisabled, setPanchayatDisabled] = useState(true);

const [districtDisabled, setDistrictDisabled] = useState(true);
const [mandalDisabled, setMandalDisabled] = useState(true);
const [opt2PanchayatDisabled, setOpt2PanchayatDisabled] = useState(true);

const [mapDisabled, setMapDisabled] = useState(true);

function handleDisable(e) {
  let selectedOption = e;
  console.log("handleDisable: ", e);
  if(selectedOption == 1){
    setGram(null);
    setDistrictDisabled(true);
    setMandalDisabled(true);
    setOpt2PanchayatDisabled(true);
    setMapDisabled(true);
    setPinDisabled(false);
    setPanchayatDisabled(true);
    setMandal("");
    setDistrict("");
    setGram("");
    setSelectedOption3MapAddress("");
  }
  if(selectedOption == 2){
    setGram(null);
    setDistrictDisabled(false);
    setMandalDisabled(false);
    setOpt2PanchayatDisabled(false);
    setMapDisabled(true);
    setPinDisabled(true);
    setPanchayatDisabled(true);
    setPin("");
    setGrams("");
    setSelectedOption3MapAddress("");
  }
  if(selectedOption == 3){
    setGram(null);
    setDistrictDisabled(true);
    setMandalDisabled(true);
    setOpt2PanchayatDisabled(true);
    setMapDisabled(false);
    setPinDisabled(true);
    setPanchayatDisabled(true);
    setMandal("");
    setDistrict("");
    setGram("");
    setPin("");
    setGrams("");
  }
};

// Map
//map essentials
const [position, setPosition] = useState({
  lat: 18.1124372,
  lng: 79.01929969999999,
});
const zoom = 15;
const apiKey = "AIzaSyAVs-wCER__18LpKRb3ozA2pot15DGmels";

//filtering
const [filter, setFilter] = useState("");

//filtering json
const renderMap = () => {
  const mapApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${gram}&key=${apiKey}`;
  if (location !== "") {
    let addressComponents = 0;

    axios
      .get(mapApi)
      .then(function (response) {
        // handle success
        console.log(response);
        let selectedIndex = 0;

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

        console.log("selectedIndex: ", selectedIndex);

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

const [selectedOption3MapAddress, setSelectedOption3MapAddress] = useState();
const addressValue= (address) => {
  setSelectedOption3MapAddress(address);
  setGram(address);
  console.log("AddressValue: ",address);
}

function nameValid(e){
  console.log("TEST: ", e);
}

  return (
    
    <form className="section_form container" onSubmit={handleForm}>
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
                    onClick={handleRes}
                    // onChange={handleChange}
                  />
                  {"  "}Residential
                </label>

                <label>
                  <input
                    type="radio"
                    id="celltower"
                    name="segment"
                    value="celltower"
                    onClick={handleCell}
                    // onChange={handleChange}
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
                    onClick={handleGov}
                    // onChange={handleChange}
                  />
                  {"  "}Government
                </label>

                <label>
                  <input
                    type="radio"
                    id="Enterprise"
                    name="segment"
                    value="enterprise"
                    onClick={handleEnterprise}
                    // onChange={handleChange}
                  />
                  {"  "}Enterprise
                </label>
              </div>
            </div>

          

          </div>
          <div className="form_top_right">
            {gram ? (
              <>
                <Map position={position} zoom={zoom} id="map-1" className="mapping" />
              </>
            ) : (
              <img src={pin_map} alt="form_img" className="pin_map" />
            )}
          </div>
        </div>
        {residential === true ||
        government === true ||
        cell === true ||
        enterprise === true ? (
          <>
            <div className="form_locality">
              <h2 className="locality_header">Add your Location</h2>
              {visible === false ? (
                <>
                  <div className="location-form-wrapper">

                    <div className="option1">
                      <div className="selectSection">
                      <button type="button" data-number="1" className="active" onClick={() => handleDisable(1)}>Option 1</button></div>
                      <div className="input-wrapper">
                        <div className="pincode">
                          <input
                            type="text"
                            name="pinCode"
                            placeholder="Enter 6-digit Pincode here"
                            value={pin}
                            //onChange={(e) => {setPin(e.target.value);}}
                            onChange={(e) => setPinValue(e.target.value)}
                            disabled={pinDisabled ? true : null}
                          />  
                        </div>
                        <p className="invalid_p">{isPinError ? "Enter 6-digit pincode here" : ""}</p>

                        <div className="gram-panchayat">
                          <select
                            name="gramPanchayat"
                            className="gram"
                            //onChange={(e) => setGram(e.target.value)}
                            onChange={(e) => setGramValue(e.target.value)}
                            disabled={panchayatDisabled ? true : null}
                            value={gram}
                          >
                            <option value="">
                              Enter Gram Panchayat here
                            </option>
                            {grams.length ? (grams.map((item, index) => (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            ))) : ""}
                          </select>
                        </div>
                        <p className="invalid_p">{gramError ? "Please Select Gram Panchayat!" : ""}</p>
                      </div>
                    </div>

                    <div className="or">OR</div>
                    
                    <div className="option2">
                    <div className="selectSection">
                    <button type="button" data-number="2" onClick={() => handleDisable(2)}>Option 2</button></div>
                      <div className="district-wrapper">
                        <select
                          name="district"
                          className="district"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          disabled={districtDisabled ? true : null}
                        >
                          <option value="">Select District Name</option>
                          {mandals.map((item, idx) => (
                            <option value={item} key={idx}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mandal-wrapper">
                        <select
                          name="mandal"
                          className="mandal"
                          value={mandal}
                          onChange={(e) => setMandal(e.target.value)}
                          disabled={mandalDisabled ? true : null}
                        >
                          <option value="">Select Mandal Name</option>
                          {mandalam.map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="panchayat-wrapper">
                        <select
                          name="panchayat"
                          className="panchayat"
                          //onChange={(e) => setGram(e.target.value)}
                          onChange={(e) => setGramValue(e.target.value)}
                          disabled={opt2PanchayatDisabled ? true : null}
                        >
                          <option value="">
                            Select Gram Panchayat
                          </option>
                          {grammam.map((item, idx) => (
                            <option value={item} key={idx}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="or">OR</div>
                    
                    <div className="option3">
                      <div className="selectSection">
                      <button type="button" data-number="3" onClick={() => handleDisable(3)}>Option 3</button></div>
                      <div className="map" onClick={() => setModal(true)}>
                        <input
                          type="text"
                          name="map"
                          placeholder="Enter your area to ‘Search on the map’"
                          value={selectedOption3MapAddress}
                          onChange={(e) => setMap(e.target.value)}
                          disabled={mapDisabled ? true : null}
                        />
                      </div>
                    </div>
                    
                    {modal && <Modal closeModal={setModal} addressValue={addressValue} />} 
                  </div>
                </>
              ) : (
                <>
                  <div className="details-wrapper">
                    <div className="location-details">
                      <input
                        type="text"
                        name="location"
                        defaultValue={`${gram} ${pin}`}
                      />
                    </div>
                    <div
                      onClick={() => setVisible(!visible)}
                      className="edit-wrapper"
                    >
                      <p onClick={() => setTrigger(false)}>Edit</p>
                    </div>
                  </div>
                </>
              )}
              <div>
                {visible === false ? (
                  <>
                    <button className="form_btn" onClick={handleVisible} disabled={continueBtnDisabled ? true : null}>
                      Continue
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {residential === true && visible === true ? (
          <>
            <h2 className="details_text">Add Your Details</h2>
            <div className="form_section_details">
              <div className="details_left">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Here"
                  name="name"
                  //value={resData.name}
                  value={formName}
                  //onChange={handleResChange}
                  onChange={(e) => {setFormName(e.target.value), setResNameError(false)}}
                />
                {resNameError ? <p className="error-small">Enter Name</p> : ""}
              </div>
              <div className="details_right">
                <label>Mobile Number</label>
                <br />
                <input
                  type="text"
                  placeholder="+91"
                  name="mobile"
                  //value={resData.mobile}
                  value={formMobile}
                  //onChange={(e) => setFormMobile(e.target.value)}
                  onChange={(e) => {setFormMobile(e.target.value), setResMobileError(false)}}
                />
                {resMobileError ? <p className="error-small">Enter Mobile Number</p> : ""}
              </div>
            </div>
                
                {resSaveSuccess ? 
                  <p className="successMessage">You details has been saved successfully!</p> : ""
                  // <p className="errorMessage">Please enter Name and Mobile No.</p>
                }
                
            <button className="form_btn" onClick={handleTrigger}>
              Check Availability
            </button>
          </>
        ) : (
          <></>
        )}
        {government === true && visible === true ? (
          <>
            <h2 className="details_text">Add Your Details</h2>
            <div className="form_section_details">
              <div className="details_left">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Here"
                  name="name"
                    value={formName}
                    //onChange={handleGovChange}
                    onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="details_right">
                <label>Mobile Number</label>
                <br />
                <input
                  type="text"
                  placeholder="+91"
                  name="mobile"
                    value={formMobile}
                    //onChange={handleGovChange}
                    onChange={(e) => setFormMobile(e.target.value)}
                />
              </div>
            </div>
            <div className="input-wrapper-select">
              <div className="selection">
                <label className="label-details-department">
                  Department Name
                </label>
                <select 
                    name="Department" 
                    value={govData.Department}
                    onChange={handleGovChange}
                  >
                  <option value="">Select</option>
                  {dept.map((item, idx) => (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="selection">
                <label className="label-details-department">
                  Sub Department Name
                </label>
                <select 
                    name="SubDepartment" 
                    value={formSubDepartment}
                    onChange={(e) => {setFormSubDepartment(e.target.value)}}
                    //onChange={(e) => {setFormMobile(e.target.value), setResMobileError(false)}}
                  >
                  <option value="">Select</option>
                  {subdept.map((item, idx) => (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="checkbox-wrapper">
              <label className="checkbox-label">Type of Services</label>
              <div className="label-wrapper">
                <label>
                  <input type="checkbox" name="broadband" value='true' onChange={handleGovChange}/>
                  Broadband<span className="checkmark"></span>
                </label>
                <label>
                  <input type="checkbox" name="ill" value='true' onChange={handleGovChange}/>
                  Internet Leased Line <span className="checkmark"></span>{" "}
                </label>
                <label>
                  <input type="checkbox" name="ipvpn" value='true' onChange={handleGovChange}/>
                  IP-VPN <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="other_services">
              <label>Please Specify if other services are needed</label>
              <br />
              <input
                type="text"
                placeholder="Enter Here"
                name="other"
                value={formOthers}
                onChange={(e) => setFormOthers(e.target.value)}
              />
            </div>
            <button className="form_btn" onClick={handleTrigger}>
              Check Availability
            </button>
          </>
        ) : (
          <></>
        )}
        {cell === true && visible === true ? (
          <>
            <h2 className="details_text">Add Your Details</h2>
            <div className="form_section_details">
              <div className="details_left">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Here"
                  name="name"
                    value={formName}
                    //onChange={handleCellChange}
                    onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="details_right">
                <label>Mobile Number</label>
                <br />
                <input
                  type="text"
                  placeholder="+91"
                  name="mobile"
                    value={formMobile}
                    //onChange={handleCellChange}
                    onChange={(e) => setFormMobile(e.target.value)}
                />
              </div>
            </div>
            <div className="form_section_details">
              <div className="details_left">
                <label>Organization</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Organization"
                  name="organization"
                    value={formOrg}
                    //onChange={handleCellChange}
                    onChange={(e) => setFormOrg(e.target.value)}
                />
              </div>
              <div className="details_right">
                <label>Email Address</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Here"
                  name="email"
                    value={formEmail}
                    //onChange={handleCellChange}
                    onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="checkbox-wrapper">
              <label className="checkbox-label">Type of Services</label>
              <div className="label-wrapper">
                <label>
                  <input type="checkbox" name="broadband" value='true' onChange={handleCellChange}/>
                  Broadband<span className="checkmark"></span>
                </label>
                <label>
                  <input type="checkbox" name="ill" value='true' onChange={handleCellChange}/>
                  Internet Leased Line <span className="checkmark"></span>{" "}
                </label>
                <label>
                  <input type="checkbox" name="ipvpn" value='true' onChange={handleCellChange}/>
                  IP-VPN <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="other_services">
              <label>Please Specify if other services are needed</label>
              <br />
              <input
                type="text"
                placeholder=""
                name="other"
                value={formOthers}
                onChange={(e) => setFormOthers(e.target.value)}
              />
            </div>
            <button className="form_btn" onClick={handleTrigger}>
              Check Availability
            </button>
          </>
        ) : (
          <></>
        )}
        {enterprise === true && visible === true ? (
          <>
            <h2 className="details_text">Add Your Details</h2>
            <div className="form_section_details">
              <div className="details_left">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="details_right">
                <label>Mobile Number</label>
                <br />
                <input
                  type="text"
                  placeholder="+91"
                  name="mobile"
                    value={formMobile}
                    onChange={(e) => setFormMobile(e.target.value)}
                />
              </div>
            </div>
            <div className="form_section_details">
              <div className="details_left">
                <label>Organization</label>
                <br />
                {/* <input type="text" placeholder="Enter Here" /> */}
                <input
                  type="text"
                  placeholder="Enter Organization"
                  name="organization"
                    value={formOrg}
                    //onChange={handleCellChange}
                    onChange={(e) => setFormOrg(e.target.value)}
                />
              </div>
              <div className="details_right">
                <label>Email Address</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Here"
                  name="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="checkbox-wrapper">
              <label className="checkbox-label">Type of Services</label>
              <div className="label-wrapper">
                <label>
                  <input type="checkbox" name="broadband" value='true' onChange={handleEntChange}/>
                  Broadband<span className="checkmark"></span>
                </label>
                <label>
                  <input type="checkbox" name="ill" value='true' onChange={handleEntChange}/>
                  Internet Leased Line <span className="checkmark"></span>{" "}
                </label>
                <label>
                  <input type="checkbox" name="ipvpn" value='true' onChange={handleEntChange}/>
                  IP-VPN <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="other_services">
              <label>Please Specify if other services are needed</label>
              <br />
              <input type="text" placeholder="Enter Here" value={formOthers}
                onChange={(e) => setFormOthers(e.target.value)}
                />
            </div>
            <button className="form_btn" onClick={handleTrigger}>
              Check Availability
            </button>
          </>
        ) : (
          <></>
        )}
        {trigger === true ? (
          ready === true ? (
            <>
              <div className="form_bottom">
                <div className="status_img">
                  <img src={available} alt="yes" />
                </div>
                <div className="status_body">
                  <h2>T-Fiber Network is available in your area</h2>
                  {/* <h4>Our Executiive will connect with you soon!</h4> */}
                </div>
                <div className="service_provider">
                  {/* <p>Service providers available in your locality</p>
                  <div className="providers">
                    <img src={act} alt="act" />
                    <img src={airtel} alt="airtel" />
                    <img src={jio} alt="jio" />
                  </div> */}
                  <p>To Proceed</p>
                  <h4><span className="actionText"><a href="https://172.28.10.9:8443/CustomerPortal/" target="_blank">Place Order</a></span>  |  <span className="actionText"><a href="https://172.28.10.9:8443/CustomerPortal/" target="_blank">Send Enquiry</a></span>  | <span className="actionText">Call Us</span></h4>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form_bottom">
                <div className="status_img">
                  <img src={no} alt="no" />
                </div>
                <div className="status_body">
                  <h2>T-Fiber Network is coming soon to your area</h2>
                  {/* <h4>Our Executiive will connect with you soon!</h4> */}
                </div>
                <div className="service_provider">
                  {/* <p>
                    We are expanding our network rapidly, and will be available
                    in your locality soon.
                  </p> */}
                  <p>To Proceed</p>
                  <h4><span className="actionText"><a href="https://172.28.10.9:8443/CustomerPortal/" target="_blank">Send Enquiry</a></span>  | <span className="actionText">Call Us</span></h4>
                </div>
              </div>
            </>
          )
        ) : (
          <></>
        )}
      </div>
    </form>
    
  );
};

export default NewForm;










// //store excel data
  // const [dept, setDept] = useState([]);
  // const [res, setRes] = useState([]);
  // const [mandalam, setMandalam] = useState([]);
  // const [districts, setDistricts] = useState([]);
  // const [lgd, setLgd] = useState(0);


  // //fetch excel data
  // const readExcelFile = () => {
  //   const url = "/files/data.xls"; // Adjust the path based on your file location

  //   const fetchExcelFile = async () => {
  //     const response = await fetch(url);

  //     const arrayBuffer = await response.arrayBuffer();

  //     const data = new Uint8Array(arrayBuffer);

  //     const workbook = XLSX.read(data, { type: "array" });

  //     // Access the first sheet of the workbook

  //     const sheetName = workbook.SheetNames[0];

  //     const sheet = workbook.Sheets[sheetName];

  //     // Parse sheet data

  //     const sheetData = XLSX.utils.sheet_to_json(sheet);

  //     //   console.log(sheetData); // Output data to console
  //     // setRes(sheetData);

  //     if (pin > 500000) {
  //       // filter based on pincode
  //       const filteredData = sheetData.filter((row) => row.__EMPTY_10 === pin);

  //       const arr = [];

  //       filteredData.forEach((element) => {
  //         arr.push(element.__EMPTY_9);
  //       });

  //       setRes(arr);

  //       // res.forEach((element) => {
  //       //   console.log(element);
  //       // });
  //     }

  //     if (district !== null) {
  //       const filteredData = sheetData.filter(
  //         (row) => row.__EMPTY_1 === district
  //       );

  //       const districts = new Set();

  //       filteredData.forEach((element) => {
  //         districts.add(element.__EMPTY_5);
  //       });

  //       const distArr = Array.from(districts);

  //       setDistricts(distArr);
  //     }

  //     if (mandal !== null) {
  //       const filteredData = sheetData.filter(
  //         (row) => row.__EMPTY_5 === mandal
  //       );

  //       const mandalSet = new Set();

  //       filteredData.forEach((element) => {
  //         mandalSet.add(element.__EMPTY_9);
  //       });

  //       const mandalArr = Array.from(mandalSet);

  //       setMandalam(mandalArr);
  //     }

  //     if (gram !== null) {
  //       const filteredData = sheetData.filter((row) => row.__EMPTY_9 === gram);

  //       console.log(filteredData);
  //       const lgdCode = filteredData[0].__EMPTY_12;
  //       console.log(lgdCode);
  //       setLgd(lgdCode);
  //     }
  //   };

  //   fetchExcelFile();
  // };

  //department files relations