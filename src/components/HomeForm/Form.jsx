import './Form.scss'
import React, { useEffect, useState } from "react"
import Map from '../Map/Map'
import axios from 'axios'

function Form(props) {
    const [visibility, setVisibility] = useState(0);
    const [availability, setAvailability] = useState(0);
    const [map, setMap] = useState("");
    const [location, setLocation] = useState("");
    const [position, setPosition] = useState({lat: 18.1124372, lng: 79.01929969999999});
    const zoom = 15;
    const apiKey = 'AIzaSyAVs-wCER__18LpKRb3ozA2pot15DGmels';

    const continueHandler = (e) => {
        e.preventDefault();
        setVisibility(!visibility);
    };

    const availabilityHandler = (e) => {
        e.preventDefault();
        setAvailability(1);
    };

    const editHandler = () => {
        setVisibility(0);
        setAvailability(0);
        setPosition({lat: 18.1124372, lng: 79.01929969999999});
    }

    const renderMap = () => {
        const mapApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`;
        if(location !== "") {
            let addressComponents = 0;

            axios.get(mapApi)
            .then(function (response) {
                // handle success
                console.log(response);
                let selectedIndex = 0;
                
                if(response.data.results.length > 1) {
                    selectedIndex = response.data.results.reduce((highest, value, index, array) => {
                        if(value.address_components.length > addressComponents) {
                            addressComponents = value.address_components.length;
                            highest = index;
                        }
    
                        return highest;
                    });
                }

                console.log('selectedIndex: ', selectedIndex);

                setPosition(response.data.results[selectedIndex].geometry.location);
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

    useEffect(() => {
        renderMap();
    }, [availability]);

    useEffect(() => {
        setLocation(map);
    }, [map]);

    return(
        <section className="section form-main">
            <div className="container"> 
                <div className="form-container">
                    <div className="headline-wrapper">
                        <h2>{props.text}</h2>
                        <p>{props.paragraph}</p>
                    </div>
                    <div className="form-map-wrapper">
                        <div className="form-wrapper">
                            <form>
                                <label>Add your location</label>
                                <div className={visibility ? 'initial-fields-wrapper hide' : 'initial-fields-wrapper'}>
                                    <div className="input-wrapper">
                                        <div className="option1">
                                            <label>Option 1</label>
                                            <div className="pincode">
                                                <input type="type" name="pinCode" placeholder="Enter 6-digit Pincode here" />
                                            </div>                                    
                                            <div className="gram-panchayat">
                                                <select name="district" className="gram">
                                                    <option value="panchayat">Enter Gram Panchayat here</option>
                                                    <option value="">Annaram</option>
                                                    <option value="">Anantharam</option>                                       
                                                </select>                                    
                                            </div>
                                        </div> 
                                        <div className="or">OR</div>                                   
                                        <div className="option2">
                                            <label>Option 2</label>                           
                                            <div className="district-wrapper">
                                                <select name="district" className="district">
                                                    <option value="district">Select District Name</option>
                                                    <option value=""></option>                                        
                                                </select>                                    
                                            </div>
                                            <div className="mandal-wrapper">
                                                <select name="mandal" className="mandal">
                                                    <option value="mandal">Select Mandal Name</option>
                                                    <option value=""></option>                                        
                                                </select>                                    
                                            </div>
                                            <div className="panchayat-wrapper">
                                                <select name="panchayat" className="panchayat">
                                                    <option value="Panchayat">Select Gram Panchayat</option>
                                                    <option value=""></option>                                        
                                                </select>                                    
                                            </div>
                                        </div>
                                    </div>
                                    <div className="or">OR</div> 
                                    <div className="option3">
                                        <label>Option 3</label>
                                        <div className="map">
                                            <input type="text" name="map" placeholder="Enter your area to ‘Search on the map’" value={map} onChange={(e) => setMap(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={visibility ? 'hidden-fields-wrapper show' : 'hidden-fields-wrapper'}>
                                    <div className="details-wrapper">
                                        <div className="location-details">
                                            <input type="text" name="location" placeholder="Annaram, 505001" defaultValue={location}/>
                                        </div>
                                        <div onClick={editHandler} className="edit-wrapper">
                                          Edit 
                                        </div>
                                    </div>                                
                                    <div className="input-wrapper-container">
                                        <label>Add your details</label>
                                        <div className="input-wrapper-details">
                                            <div className="user-name">
                                                <label className="label-details">Name</label>  
                                                <input type="text" name="name" placeholder="Enter here" /> 
                                            </div>
                                            <div className="user-number">
                                                <label className="label-details">Mobile Number</label>
                                                <input type="text" name="mobileNumber" placeholder="+91" />
                                            </div>
                                        </div> 
                                        <div className="input-wrapper-select">
                                            <div>
                                                <label className="label-details-department">Department Name</label>
                                                <select name="Department">
                                                    <option value="Department">Select</option>
                                                    <option value=""></option>                                        
                                                </select>
                                            </div>
                                            <div>
                                                <label className="label-details-department">Sub Department Name</label>
                                                <select  name="Sub Department">
                                                    <option value="sub Department">Select</option>
                                                    <option value=""></option>                                        
                                                </select>
                                            </div>
                                        </div>
                                        <div className="checkbox-wrapper">
                                            <label className="checkbox-label">Type of Services</label>
                                            <div className="label-wrapper">
                                                <label><input type="checkbox" />Broadband<span className="checkmark"></span></label>  
                                                <label><input type="checkbox" />Internet Leased Line <span className="checkmark"></span> </label>
                                                <label><input type="checkbox" />IP-VPN <span className="checkmark"></span></label>                                            
                                            </div>
                                        </div>
                                        <div className="cloud-wrapper">
                                            <input type="text" name="name" placeholder="Please specify in case other services are needed" /> 
                                        </div>
                                    </div>
                                </div>  
                                <button onClick={continueHandler} className={visibility ? 'hide' : ''} >Continue</button>
                                <button onClick={availabilityHandler} className={visibility ? '' : 'hide'}>Check Availability </button>
                            </form>
                        </div>
                        <div className="map-wrapper">
                            <img className={visibility ? 'hide light-map': 'light-map'} src="/public/assets/map.jpg"/>
                            <img className={(visibility && !availability)? 'dark-map' : 'hide dark-map'} src="/public/assets/map2.jpg"/>
                            <div className={(visibility && availability) ? 'detail-map':'hide detail-map'}>
                                <Map position={position} zoom={zoom} id="map-1" />
                            </div>
                            {/* <img className={(visibility && availability) ? 'detail-map':'hide detail-map'} src="/public/assets/map3.jpg"/> */}
                        </div>                  
                    </div>
                    <div className={availability ? 'hidden-network-wrapper show' : 'hidden-network-wrapper'}>
                        <div className={visibility ? 'hidden-network-wrapper show' : 'hidden-network-wrapper'}>
                            <div className="network-wrapper">
                                <img src="/public/assets/healthicons_yes.png"/>
                                <div className="text-wrapper">
                                    <p className="big">T-Fiber Network is<br/> available in your area.</p>
                                    <p className="small">To proceed,<br/> Place order | Send enquiry | Call Us</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                 
            </div>                               
        </section>
    )
}

export default Form;