import React, { useEffect, useRef, useState } from "react";
import Map from "../Map/Map";
import axios from "axios";
import { isSearchValid } from "../../utils/validations";

const RenderMapBySearch = ({ address, searchResponse, id, clickResponse }) => {

    const zoom = 15;
    const apiKey = "AIzaSyAVs-wCER__18LpKRb3ozA2pot15DGmels";
    const mapApi = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}`;
    const searchByAddressApi = `${mapApi}&address=${address}`;
    const [position, setPosition] = useState({
        lat: 18.1124372,
        lng: 79.01929969999999,
    });
    const [searchCompleted, setSearchCompleted] = useState(0);
    const [addressState, setAddressState] = useState('');
    const searchResult = useRef(false);
    const searchIsWithinTelangana = useRef(false);
    const responseData = useRef({
        district: '',
        gp: [],
        pincode: '',
        formattedAddress: '',
        position: ''
    });
    const search = () => {
        setSearchCompleted(0);
        searchResult.current = false;
        searchIsWithinTelangana.current = true;
        responseData.current = {
            district: '',
            gp: [],
            pincode: '',
            position: ''
        };
        
        if(addressState.length > 0) {
            let addressComponents = 0;
            let maxMatches = 0;

            axios.get(searchByAddressApi)
                .then(function (response) {
                    console.log(response);
                    const validateSearch = response.data?.results.length > 0 ? isSearchValid(response.data?.results, addressState) : { status: false, filteredIndex: [], maxMatchIndex: {}, type: "NoResult" };

                    if (validateSearch.status) {
                        let selectedIndex = 0;
            
                        if (response.data.results.length > 1) {
                            response.data.results.forEach((value, index) => {
                                if (validateSearch.filteredIndex.includes(index)) {
                                    if (value.address_components.length > addressComponents && validateSearch.maxMatchIndex[index] >= maxMatches) {
                                        addressComponents = value.address_components.length;
                                        maxMatches = validateSearch.maxMatchIndex[index];
                                        selectedIndex = index;
                                    }
                                }
                            });
                        }
            
                        setPosition(response.data.results[selectedIndex].geometry.location);
                        responseData.current.position = response.data.results[selectedIndex].geometry.location;

                        response.data.results[selectedIndex].address_components.forEach((comp) => {
                            if(comp.types.includes('administrative_area_level_3')) {
                                responseData.current = { ...responseData.current, district: comp.long_name };
                            }
                            if(comp.types.includes('locality')) {
                                responseData.current = { ...responseData.current, gp: [...responseData.current.gp, comp.long_name] };
                            }
                            if(comp.types.includes('sublocality')) {
                                responseData.current = { ...responseData.current, gp: [...responseData.current.gp, comp.long_name] };
                            }
                            if(comp.types.includes('postal_code')) {
                                responseData.current = { ...responseData.current, pincode: comp.long_name };
                            }
                        });

                        searchResult.current = true;
                        searchIsWithinTelangana.current = true;
                    } else {
                        if (validateSearch.type === "NoResult") {
                            searchResult.current = false;
                        } else {
                            searchIsWithinTelangana.current = false;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    setSearchCompleted(1);
                });
        }
    };

    const searchAddressByPlaceIdOrLatLng = (locationData) => {
        const parameters = (locationData?.placeId) ? `&place_id=${locationData.placeId}` : `&latlng=${locationData.lat},${locationData.lng}`;
        const searchApiUrl = mapApi + parameters;

        axios.get(searchApiUrl)
            .then(function (response) {
                console.log('response: ', response);
                const validateSearch = response.data?.results.length > 0 ? isSearchValid(response.data?.results, '', ['postal_code']) : { status: false, filteredIndex: [], maxMatchIndex: {}, type: "NoResult" };

                if (validateSearch.status) {
                    let selectedIndex = 0;
                    let addressComponents = 0;
                    let maxMatches = 0;
        
                    if (response.data.results.length > 1) {
                        responseData.current = {
                            district: '',
                            gp: [],
                            pincode: '',
                            formattedAddress: ''
                        };
                        response.data.results.forEach((value, index) => {
                            if (validateSearch.filteredIndex.includes(index)) {
                                if (value.address_components.length > addressComponents && validateSearch.maxMatchIndex[index] >= maxMatches) {
                                    addressComponents = value.address_components.length;
                                    maxMatches = validateSearch.maxMatchIndex[index];
                                    selectedIndex = index;
                                }
                            }
                        });
                    }

                    response.data.results[selectedIndex].address_components.forEach((comp) => {
                        responseData.current = { ...responseData.current, formattedAddress: responseData.current.formattedAddress + (responseData.current.formattedAddress != '') ? `, ${comp.long_name}` : comp.long_name };
                    });

                    if(response.data.results[selectedIndex].formatted_address.length > responseData.current.formattedAddress.length) {
                        responseData.current = { ...responseData.current, formattedAddress: response.data.results[selectedIndex].formatted_address };
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                clickResponse({ clickResponse: responseData.current });
            });
    };

    useEffect(() => {
        setAddressState(address);
    });

    useEffect(() => {
        search();
    }, [addressState]);

    useEffect(() => {
        searchResponse({
            searchResult: searchResult.current,
            searchIsWithinTelangana: searchIsWithinTelangana.current,
            searchCompleted: searchCompleted,
            searchResponse: responseData.current
        });
    }, [searchCompleted]);

    return (
        <div>
            <Map position={position} zoom={zoom} id={id} getLatLngPlaceID={searchAddressByPlaceIdOrLatLng} />
        </div>
    )
};

export default RenderMapBySearch;