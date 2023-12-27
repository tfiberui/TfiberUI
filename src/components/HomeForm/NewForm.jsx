import React, { useEffect, useState } from "react";
import map from "/public/assets/Home/map.png";
import second_map from "/public/assets/Home/warangal.png";
import pin_map from "/public/assets/map.png";
import available from "/assets/healthicons_yes.png";
import no from "/assets/no.png";
import errorIcon from "/assets/no.png";
import "./NewForm1.scss";
import Modal from "../Modal/Modal";
import * as XLSX from "xlsx";
import axios from "axios";
import Map from "../Map/Map";
import MapAutoInput from "../Map/MapAutoInput";
import RenderMapBySearch from "../Map/RenderMapBySearch";


const NewForm = ({telangana, department}) => {
 
    //select dropdown section
  let [selectedDistrict, setSelectedDistrict] = useState("Select District");
  let [selectedMandal, setSelectedMandal] = useState("Select Mandal");
  let [selectedGP, setSelectedGP] = useState("Select Gram Panchayat");
  let [selectedGram, setSelectedGram] = useState("Select Gram Panchayat");
  
  let [isActiveDistrict, setIsActiveDistrict] = useState(true);

  const [visible, setVisible] = useState(false);
  const [residential, setResidential] = useState(false);
  const [government, setGovernment] = useState(false);
  const [cell, setCell] = useState(false);
  const [enterprise, setEnterprise] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedOpt, setSelectedOpt] = useState(1);
  
  const [gramError, setGramError] = useState(false);
  const [isPinError, setIsPinError] = useState(false);
  const [continueBtnDisabled, setContinueBtnDisabled] = useState(true);
  const [isDistrictError, setIsDistrictError] = useState(false);


  
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
  let [formOthers, setFormOthers] = useState("");
  let [resNameError, setResNameError] = useState(true);
  let [resMobileError, setResMobileError] = useState(true);
  let [resSaveSuccess, setResSaveSuccess] = useState(false);
  let [govNameError, setGovNameError] = useState(false);
  let [govMobileError, setGovMobileError] = useState(false);
  let [govDeptError, setGovDeptError] = useState(false);
  let [cellNameError, setCellNameError] = useState(false);
  let [cellMobileError, setCellMobileError] = useState(false);
  let [cellOrgError, setCellOrgError] = useState(false);
  let [cellEmailError, setCellEmailError] = useState(false);
  let [entNameError, setEntNameError] = useState(false);
  let [entMobileError, setEntMobileError] = useState(false);
  let [entOrgError, setEntOrgError] = useState(false);
  let [entEmailError, setEntEmailError] = useState(false);
  let [distNames, setDistNames] = useState([]);
  let [districtError, setDistrictError] = useState(false);
  let [mandalError, setMandalError] = useState(false);
  let [gramErrorOpt2, setGramErrorOpt2] = useState(false);

  let [activeOption, setActiveOption] = useState(false);
  let [isAvailable, setIsAvailable] = useState(true);
  const [option3, setOption3] = useState('');
  let [mapImage, setMapImage] = useState(true);



  const mobilePattern = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
  const emailPattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);


  const handleContinue = () => {
    console.log("SelectedOption: ",selectedOpt);
    console.log("Gram: ",gram);
    console.log("Pin: ",pin);
    console.log("Option3: ",option3);
    
    if(selectedOpt === 1){
      console.log("Reached: ", pin, "Gram: ", gram);
      if(pin === ""){
        setVisible(false);
        setIsPinError(true);

        setIsDistrictError(false);
        setMandalError(false);
        setGramErrorOpt2(false);
      }
      else if(gram === "Select Gram Panchayat"){
        setGramError(true);
        setVisible(false);
      }
      else{
        setVisible(true);
      }
    }

    else if(selectedOpt === 2){
      selectedDistrict === "Select District" ? (setIsDistrictError(true), setVisible(false)) : setIsDistrictError(false)
      selectedMandal === "Select Mandal" ? (setMandalError(true), setVisible(false)) : setMandalError(false)
      selectedGP === "Select Gram Panchayat" ? (setGramErrorOpt2(true), setVisible(false)) : setGramErrorOpt2(false)

      console.log("DistrictError: ",isDistrictError);
      console.log("MandalError: ",mandalError);
      console.log("GramErrorOpt2: ",gramErrorOpt2);

      setIsPinError(false);
      setGramError(false);
      (isDistrictError || mandalError || gramErrorOpt2) ? setVisible(false) : setVisible(true)
    }

    else if(selectedOpt === 3){
      gram === "Select Gram Panchayat" ? setGram(option3) : ''
      setVisible(true);
      ClearData();
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
    ClearData();
  };

  const handleGov = () => {
    setTrigger(false);
    setResSaveSuccess(false);
    setGovernment(true);
    setResidential(false);
    setCell(false);
    setEnterprise(false);
    setSelectedSegment("Government");
    ClearData();
  };

  const handleCell = () => {
    setTrigger(false);
    setResSaveSuccess(false);
    setResidential(false);
    setGovernment(false);
    setCell(true);
    setEnterprise(false);
    setSelectedSegment("Cell Tower");
    ClearData();
  };

  const handleEnterprise = () => {
    setTrigger(false);
    setResSaveSuccess(false);
    setResidential(false);
    setGovernment(false);
    setCell(false);
    setEnterprise(true);
    setSelectedSegment("Enterprise");
    ClearData();
  };

  const ClearData = () => {
    setFormName("");
    setFormMobile("");
    setFormEmail("");
    setFormDepartment("");
    setFormSubDepartment("");
    setFormOrg("");
    // if(selectedOpt === 3){
    //   setGram("Select Gram Panchayat")
    // }    
  }

  const handleTrigger = () => {
    //setTrigger(true);
    // setFormName("");
    // setFormDepartment("");
    // setFormMobile("");
    // setFormEmail("");
    // setFormPin("");
    // setFormGP("");
    // setFormSubDepartment("");
    // setFormOrg("");
    // setFormBroadband(false);
    // setFormILL(false);
    // setFormIPVPN(false);
    // setFormOthers("");

    
    if(selectedSegment === "Residential"){
      //setResSaveSuccess(false);
      formName ? setResNameError(false) : setResNameError(true)
        if(resNameError === false && resMobileError === false){
            console.log("PIN: ", pin);
            console.log("LGD: ", lgd);
            console.log("Name: ", formName);
            console.log("Mobile: ", formMobile);
            console.log("Depart: ", formDepartment);
            console.log("subDepart: ", formSubDepartment);
            console.log("Other: ", formOthers);
            getCheckAvability();
          //setResSaveSuccess(true);
        }
        // else{
        //   setTrigger(false);
        // }
      
    }
    else if(selectedSegment === "Government"){
      console.log("Gov!!");
      console.log("PIN: ", pin);
      console.log("LGD: ", lgd);
      console.log("Name: ", formName);
      console.log("Mobile: ", formMobile);
      console.log("Depart: ", formDepartment);
      console.log("subDepart: ", formSubDepartment);
      console.log("Other: ", formOthers);
      
      {formName == "" ? setGovNameError(true) : setGovNameError(false)}
      {formMobile == "" ? setGovMobileError(true) : setGovMobileError(false)}
      {formDepartment == "" ? setGovDeptError(true) : setGovDeptError(false)}

      {!govNameError && !govMobileError && !govDeptError ? getCheckAvability() : console.log("Don't save data")}
      
    }
    else if(selectedSegment === "Cell Tower"){
      console.log("PIN: ", pin);
      console.log("LGD: ", lgd);
      console.log("Name: ", formName);
      console.log("Mobile: ", formMobile);
      {formName == "" ? setCellNameError(true) : setCellNameError(false)}
      {formMobile == "" ? setCellMobileError(true) : setCellMobileError(false)}
      {formOrg == "" ? setCellOrgError(true) : setCellOrgError(false)}
      {formEmail == "" ? setCellEmailError(true) : setCellEmailError(false)}

      {!cellNameError && !cellMobileError && !cellOrgError && !cellEmailError ? getCheckAvability() : console.log("Don't save data")}
    }

    else if(selectedSegment === "Enterprise"){
      console.log("PIN: ", pin);
      console.log("LGD: ", lgd);
      console.log("Name: ", formName);
      console.log("Mobile: ", formMobile);

      {formName == "" ? setEntNameError(true) : setEntNameError(false)}
      {formMobile == "" ? setEntMobileError(true) : setEntMobileError(false)}
      {formOrg == "" ? setEntOrgError(true) : setEntOrgError(false)}
      {formEmail == "" ? setEntEmailError(true) : setEntEmailError(false)}

      {!entNameError && !entMobileError && !entOrgError && !entEmailError ? getCheckAvability() : console.log("Don't save data")}

    }
    else{
      console.log("Select Segment!");
    }


    //saveFsaveFormData();
  };

  const getCheckAvability = () => {
    if (lgd !== null) {   // setIsMandal
      axios
        .get("http://172.28.10.10:3020", {
          params: {
            type: "GP",
            lgdCode: lgd,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "ACTIVE" || res.data === "READY_FOR_SERVICE") {
            setTrigger(true);
            setReady(true);
          }
          else{
            setTrigger(true);
            setReady(false);
          }
          saveFormData();
        });
    }
  }

  const saveFormData = () => {
        axios
          .post("http://172.28.10.10:3020/saveData", {
            "leadSource": "WEBSITE",
            "subject": "",
            "winningProbability": "",
            "projectedRevenue": "",
            "remarks": "",
            "customerType": selectedSegment,
            "customerName":  formName,
            "departmentName": formDepartment,
            "departmentCode": "",
            "firstName": "",
            "lastName": "",
            "contactNumber": formMobile,
            "contactEmail": formEmail,
            "contactDesignation": "",
            "plotNo": "",
            "addressLine1": gram,
            "addressLine2": mandal,
            "pincode": pin,
            "siteType": "SP",
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
          })
          .then((res) => {
            console.log(res.data);
            console.log(selectedSegment);
          });
  }

  const handleForm = (e) => {
    e.preventDefault();
    if(residential === true){
      console.log("resData");
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

  const getDistrictNames = () => {
      const distData = [];
        telangana.forEach(element => {
        distData.push(element.__EMPTY_4);
      });
          
      let outputArray = distData.filter(function (val, i, self) {
        return i == self.indexOf(val);
      });
      if(outputArray.length){
        setDistNames(outputArray);
      }
      //console.log('distData: ', outputArray);
  }

  //storing form data
  const [pin, setPin] = useState("");
  const [gram, setGram] = useState("");
  const [mandal, setMandal] = useState("");
  const [district, setDistrict] = useState("");


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

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPin(value);
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
      pinLen === 6 ? (setIsPinError(false), setPanchayatDisabled(false)) : (setIsPinError(true), setGrams([]), setPanchayatDisabled(true))
    }

    if(pin.length === 6){
      const filteredData = telangana.filter(filterPin);
      let gp = [];
      filteredData.forEach(element => {
        gp.push(element.__EMPTY_8);
      });
      gp[0] != undefined ? setPanchayatDisabled(false) : setPanchayatDisabled(true)
      setGrams(gp);
    }

    function filterPin(item){
      if(item.__EMPTY_9 == pin){
        return true;
      }else{
        return false;
      }
    }
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

  useEffect(() => {
    filterMandalbasedondistrict(selectedDistrict);
  },[selectedDistrict]);

  useEffect(() => {
    console.log("SelectedMandal: ",selectedMandal);
    filterGramBasedonMandal(selectedMandal);
  },[selectedMandal])

  useEffect(() => {
    setGramValue(selectedGP);
  },[selectedGP]);

  useEffect(() => {
    setGramValue(selectedGram);
  },[selectedGram]);



  //for option 2
  const [mandalam, setMandalam] = useState([])

  function filterMandalbasedondistrict(selDist){
    console.log("selDist", selDist);
    if(selDist !== null){
      const filteredMandalData = telangana.filter(filterMandal);
      let mandalList = [];
      filteredMandalData.forEach(element => {
        mandalList.push(element.__EMPTY_6);
      });
      //console.log("mandalList: ", mandalList);

      let mandalData = mandalList.filter(function (val, i, self) {
        return i == self.indexOf(val);
      });
      if(mandalData.length){
        setMandalam(mandalData);
      }
      console.log('mandalData: ', mandalData);
    }

    function filterMandal(item){
      if(item.__EMPTY_4 === selDist){
        return true;
      }else{
        return false;
      }
    }
  }


  const [grammam, setGrammam] = useState([]);

  function filterGramBasedonMandal(selMandal){
    console.log("selMandal: ", selMandal);
    if(selMandal !== null){
      const filteredGramData = telangana.filter(filterMandal);
      let gramList = [];
      filteredGramData.forEach(element => {
        gramList.push(element.__EMPTY_8);
      });
      //console.log("mandalList: ", mandalList);

      let gramData = gramList.filter(function (val, i, self) {
        return i == self.indexOf(val);
      });
      if(gramData.length){
        setGrammam(gramData);
      }
      console.log('setGrammam: ', gramData);
    }

    function filterMandal(item){
      if(item.__EMPTY_6 === selMandal){
        return true;
      }else{
        return false;
      }
    }
  }



  // useEffect(() => {
  //   filterGrambasedonMandal();
  // },[mandal])

  //lgd fetching
  const [lgd, setLgd] = useState(0);

  function fetchLgd(){
    if(gram !== null || gram != "Select Gram Panchayat"){
      const lgdCode = telangana.filter(getLGD);
      // console.log(lgdCode[0].__EMPTY_12);
      if(lgdCode.length > 0){
        setLgd(lgdCode[0].__EMPTY_7);
      }else{
        //console.log("LGD CODE NOT FOUND")
      }
      console.log(lgd);
    }

    function getLGD(item){
      if(item.__EMPTY_8 === gram){
        return true;
      }else {
        return false;
      }
    }
  }

  useEffect(() => {
    //setGram("");
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
// let Buttons = document.querySelectorAll(".selectSection button");
// for (let button of Buttons) {
//   button.addEventListener('click', (e) => {
//     const et = e.target;
//     let active = document.querySelector(".active");

//     if (active) {
//       active.classList.remove("active");
//     }
    
//     et.classList.add("active");
//     let allContent = document.querySelectorAll('.content');

//     for (let content of allContent) {
//       if(content.getAttribute('data-number') === button.getAttribute('data-number')) {
//         content.style.display = "block";
//        }
//       else {
//         content.style.display = "none";
//        }
//      }
//   });
// }

const [pinDisabled, setPinDisabled] = useState(false);
const [panchayatDisabled, setPanchayatDisabled] = useState(true);

const [districtDisabled, setDistrictDisabled] = useState(true);
const [mandalDisabled, setMandalDisabled] = useState(true);
const [opt2PanchayatDisabled, setOpt2PanchayatDisabled] = useState(true);

const [mapDisabled, setMapDisabled] = useState(true);
//let [selectedOption, setSelectedOption] = useState(1);

function handleDisable(e) {
  setSelectedOpt(e);
  let selectedOption = e;
  if(selectedOption == 1){
    setMapImage(true);
    setOption3("");
    setDistrictDisabled(true);
    setMandalDisabled(true);
    setOpt2PanchayatDisabled(true);
    setMapDisabled(true);
    setPinDisabled(false);
    setPanchayatDisabled(true);
    setMandal("");
    setDistrict("");
    setGram("Select Gram Panchayat");
    setSelectedOption3MapAddress("");
    setSelectedDistrict("Select District");
    setSelectedMandal("Select Mandal");
    setSelectedGP("Select Gram Panchayat");
    setSelectedGram("Select Gram Panchayat");
    setIsActiveDistrict(true);

    setIsDistrictError(false);
    setMandalError(false);
    setGramErrorOpt2(false);
  }
  if(selectedOption == 2){
    setMapImage(true);
    setOption3("");
    getDistrictNames();

    setGram("Select Gram Panchayat");
    setDistrictDisabled(false);
    setMandalDisabled(false);
    setOpt2PanchayatDisabled(false);
    setMapDisabled(true);
    setPinDisabled(true);
    setPanchayatDisabled(true);
    setPin("");
    setGrams("");
    setSelectedOption3MapAddress("");
    setIsActiveDistrict(false);
    setIsPinError(false);
    setIsDistrictError(true);
    setMandalError(true);
    setGramErrorOpt2(true);
  }
  if(selectedOption == 3){
    setMapImage(false);
    setDistrictDisabled(true);
    setMandalDisabled(true);
    setOpt2PanchayatDisabled(true);
    setMapDisabled(false);
    setPinDisabled(true);
    setPanchayatDisabled(true);
    setMandal("");
    setDistrict("");
    setPin("");
    setGram("Select Gram Panchayat");
    setSelectedDistrict("Select District");
    setSelectedMandal("Select Mandal");
    setSelectedGP("Select Gram Panchayat");
    setSelectedGram("Select Gram Panchayat");
    setIsActiveDistrict(true);
    setIsDistrictError(false);
    setMandalError(false);
    setGramErrorOpt2(false);
    setIsPinError(false);
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

        console.log("selectedIndex: ", response.data.results[selectedIndex].formatted_address);

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

  const addressArr = address.split(',');
  console.log("AddressValue: ",address);

  if (addressArr.indexOf(" Telangana" || "Telangana") > -1) {
    console.log("Available: ");
  } else {
    console.log("Not Available");
  }
}

const handleMapResponse = (response) => {
  response.searchResult ? setIsAvailable(true) : setIsAvailable(false);
  setSelectedOption3MapAddress(option3)
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

          <div className={`form_top_right}`}>
              

              
              {
                selectedOpt == 3 ? (
                  <>
                  <div className={`${isAvailable ? '' : 'hide'}`}>
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
                  </div>
                  </>
                ) : (
                    gram != "Select Gram Panchayat" ? (
                      <Map position={position} zoom={zoom} id="map-1" className="mapping" />
                  ) : (
                     <img src={pin_map} alt="form_img" className={`pin_map ${mapImage ? '' : 'hide'}`} /> 
                  )
                )
              }
              
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
                        <button type="button" data-number="1" onClick={() => handleDisable(1)} className={(selectedOpt == 1 ? 'active' : '')}>Option 1</button>
                      </div>
                      <div className="input-wrapper">
                        <div className="pincode">
                          <input
                            placeholder="Enter 6-digit Pincode here"
                            value={pin}
                            //onChange={(e) => setPinValue(e.target.value)}
                            onChange={handlePinChange}
                            disabled={pinDisabled ? true : null}
                            autoComplete="off"
                          />
                        </div>
                        <p className="invalid_p">{isPinError ? "Enter 6-digit pincode here" : ""}</p>

                        <div className="gram-panchayat">
                          {/* <select
                            name="gramPanchayat"
                            className="gram"
                            onChange={(e) => setGramValue(e.target.value)}
                            disabled={panchayatDisabled ? true : null}
                            value={gram}
                          >
                            <option value="">
                              Enter Gram Panchayat here
                            </option>
                            {grams.length ? (grams.map((item, index) => (
                              <option value={item} key={index} className="selOptions">
                                {item}
                              </option>
                            ))) : ""}
                          </select> */}
                          <DropdownGPOpt1
                            selectedGram={gram}
                            setSelectedGram={setSelectedGram}
                            gramListOpt1={grams}
                          />
                        </div>
                        <p className="invalid_p">{gramError ? "Please Select Gram Panchayat!" : ""}</p>
                      </div>
                    </div>

                    <div className="or">OR</div>
                    
                    <div className="option2">
                    <div className="selectSection">
                    {/* <button type="button" data-number="2" onClick={() => {handleDisable(2)}}>Option 2</button></div> */}
                    <button type="button" data-number="2" className={(selectedOpt == 2) ? 'active' : ''} onClick={() => {handleDisable(2), setActiveOption(true)}}>Option 2</button></div>
                      
                        <div className="opt2Overlay" style={{display: isActiveDistrict ? 'block' : 'none' }}></div>
                        <div className="district-wrapper">
                         <Dropdown
                          selectedDistrict={selectedDistrict}// != "" || selectedDistrict != "Select District" ? selectedDistrict : ""} 
                          setSelectedDistrict={setSelectedDistrict}
                          districtList={distNames}
                        />
                        <p className="invalid_p">{isDistrictError ? "Please Select District!" : ""}</p>
                      </div>
                      
                      <div className="mandal-wrapper">
                        <DropdownMandal
                            selectedMandal={selectedMandal}
                            setSelectedMandal={setSelectedMandal}
                            mandalList={mandalam}
                        />
                        <p className="invalid_p">{mandalError ? "Please Select Mandal!" : ""}</p>
                      </div>
                      <div className="panchayat-wrapper">
                        <DropdownGP
                          selectedGP={selectedGP}
                          setSelectedGP={setSelectedGP}
                          gpList={grammam}
                        />
                        <p className="invalid_p">{gramErrorOpt2 ? "Please Select Gram Panchayat!" : ""}</p>
                      </div>
                    </div>

                    <div className="or">OR</div>
                    
                    <div className="option3">
                      <div className="selectSection">
                      <button type="button" data-number="3" className={(selectedOpt == 3) ? 'active' : ''} onClick={() => {handleDisable(3), setIsPinError(false), setGramError(false)}}>Option 3</button></div>
                      <div className="map">
                        {/* <input
                          type="text"
                          name="map"
                          placeholder="Enter your area to ‘Search on the map’"
                          value={selectedOption3MapAddress}
                          onChange={(e) => setMap(e.target.value)}
                          disabled={mapDisabled ? true : null}
                          autoComplete="off"
                        /> */}

                        <MapAutoInput placeholder="Enter your area to ‘Search on the map’" value={option3} changeHandler={(val) => setOption3(val)} />
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
                        disabled
                        autoComplete="off"
                      />
                    </div>
                    <div
                      onClick={() => setVisible(!visible)}
                      className="edit-wrapper"
                    >
                      <p onClick={() => {setTrigger(false), ClearData(), setGram("Select Gram Panchayat")}}>Edit</p>
                    </div>
                  </div>
                </>
              )}
              <div>
                {visible === false ? (
                  <>
                    {/* <button className="form_btn" onClick={handleContinue} disabled={continueBtnDisabled ? true : null}>
                      Continue
                    </button> */}
                    <button className="form_btn" onClick={handleContinue}>
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
                  value={formName}
                  //onChange={handleResChange}
                  onChange={(e) => {setFormName(e.target.value), setResNameError(false)}}
                  autoComplete="off"
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
                  autoComplete="off"
                  value={formMobile}
                  //onChange={(e) => setFormMobile(e.target.value)}
                  // onChange={(e) => {setFormMobile(e.target.value), setResMobileError(false)}}
                  onChange={(e) => {
                    setFormMobile(e.target.value);
                    if (!mobilePattern.test(e.target.value))
                        setResMobileError(true);
                    else setResMobileError(false);
                    }}
                />
                {resMobileError ? <p className="error-small">Enter Valid Mobile Number</p> : ""}
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
                  autoComplete="off"
                    value={formName}
                    //onChange={handleGovChange}
                    onChange={(e) => setFormName(e.target.value)}
                />
                {govNameError ? <p className="error-small">Enter Name</p> : ""}
              </div>
              <div className="details_right">
                <label>Mobile Number</label>
                <br />
                <input
                  type="text"
                  placeholder="+91"
                  name="mobile"
                  autoComplete="off"
                    value={formMobile}
                    //onChange={handleGovChange}
                    // onChange={(e) => setFormMobile(e.target.value)}
                    onChange={(e) => {
                      setFormMobile(e.target.value);

                      if (!mobilePattern.test(e.target.value))
                          setGovMobileError(true);
                      else setGovMobileError(false);
                      }}

                />
                {govMobileError ? <p className="error-small">Enter Valid Mobile Number</p> : ""}
              </div>
            </div>
            <div className="input-wrapper-select">
              <div className="selection">
                <label className="label-details-department">
                  Department Name
                </label>
                <select 
                    name="Department" 
                    value={formDepartment}
                    onChange={handleGovChange}
                  >
                  <option value="">Select</option>
                  {dept.map((item, idx) => (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  ))}
                </select>
                {govDeptError ? <p className="error-small">Select Department</p> : ""}
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
                autoComplete="off"
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
                  placeholder="Enter Name"
                  name="name"
                  autoComplete="off"
                    value={formName}
                    //onChange={handleCellChange}
                    onChange={(e) => {setFormName(e.target.value), setCellNameError(false)}}
                />
                {cellNameError ? <p className="error-small">Please Enter Name</p> : ""}
              </div>
              <div className="details_right">
                <label>Mobile Number</label>
                <br />
                <input
                  type="text"
                  placeholder="+91"
                  name="mobile"
                  autoComplete="off"
                    value={formMobile}
                    //onChange={handleCellChange}
                    //onChange={(e) => {setFormMobile(e.target.value), setCellMobileError(false)}}
                    onChange={(e) => {
                      setFormMobile(e.target.value);
                      if (!mobilePattern.test(e.target.value))
                              setCellMobileError(true);
                        else  setCellMobileError(false);
                      }}
                />
                {cellMobileError ? <p className="error-small">Enter Mobile Number</p> : ""}
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
                  autoComplete="off"
                    value={formOrg}
                    //onChange={handleCellChange}
                    onChange={(e) => {setFormOrg(e.target.value), setCellOrgError(false)}}
                />
                {cellOrgError ? <p className="error-small">Please Enter Organization</p> : ""}
                
              </div>
              <div className="details_right">
                <label>Email Address</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Here"
                  name="email"
                  autoComplete="off"
                    value={formEmail}
                    //onChange={handleCellChange}
                    //onChange={(e) => {setFormEmail(e.target.value), setCellEmailError(false)}}
                    onChange={(e) => {
                      setFormEmail(e.target.value);
                      if (!emailPattern.test(e.target.value))
                              setCellEmailError(true);
                        else  setCellEmailError(false);
                      }}
                />
                {cellEmailError ? <p className="error-small">Please Enter Email</p> : ""}
              </div>
            </div>
            <div className="checkbox-wrapper">
              <label className="checkbox-label">Type of Services</label>
              <div className="label-wrapper">
                <label>
                  <input type="checkbox" name="Hub-and-spoke" value='true' onChange={handleCellChange}/>
                  Hub and Spoke<span className="checkmark"></span>
                </label>
                <label className="rightMargin100">
                  <input type="checkbox" name="point-to-point" value='true' onChange={handleCellChange}/>
                  Point to Point <span className="checkmark"></span>{" "}
                </label>
                {/* <label>
                  <input type="checkbox" name="ipvpn" value='true' onChange={handleCellChange}/>
                  IP-VPN <span className="checkmark"></span>
                </label> */}
              </div>
            </div>
            <div className="other_services">
              <label>Please Specify if other services are needed</label>
              <br />
              <input
                type="text"
                placeholder=""
                name="other"
                autoComplete="off"
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
                  autoComplete="off"
                    value={formName}
                    onChange={(e) => {setFormName(e.target.value), setEntNameError(false)}}
                />
                {entNameError ? <p className="error-small">Please Enter Name</p> : ""}
              </div>
              <div className="details_right">
                <label>Mobile Number</label>
                <br />
                <input
                  type="text"
                  placeholder="+91"
                  name="mobile"
                  autoComplete="off"
                    value={formMobile}
                    onChange={(e) => {setFormMobile(e.target.value), setEntMobileError(false)}}
                />
                {entMobileError ? <p className="error-small">Please Enter Mobile</p> : ""}
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
                  autoComplete="off"
                    value={formOrg}
                    //onChange={handleCellChange}
                    onChange={(e) => {setFormOrg(e.target.value), setEntOrgError(false)}}
                />
                {entOrgError ? <p className="error-small">Please Enter Mobile</p> : ""}
              </div>
              <div className="details_right">
                <label>Email Address</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Here"
                  name="email"
                  autoComplete="off"
                  value={formEmail}
                  onChange={(e) => {setFormEmail(e.target.value), setEntEmailError(false)}}
                />
                {entEmailError ? <p className="error-small">Please Enter Mobile</p> : ""}
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
              <input type="text" placeholder="Enter Here" autoComplete="off" value={formOthers}
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