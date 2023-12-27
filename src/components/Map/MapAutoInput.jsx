import React, { useEffect, useRef } from "react"
import { Loader } from '@googlemaps/js-api-loader'

const MapAutoInput = ({ placeholder, value, changeHandler }) => {

    const apiKey = 'AIzaSyAVs-wCER__18LpKRb3ozA2pot15DGmels';
    const inputRef = useRef();
    const autoCompleteRef = useRef();
    const options = {
        componentRestrictions: { country: "in" }
    };
    const loader = new Loader({
        apiKey: apiKey
    });

    useEffect(() => {
        loader
        .importLibrary('places')
        .then(({Autocomplete}) => {
            autoCompleteRef.current = new Autocomplete(inputRef.current, options);

            autoCompleteRef.current.addListener("place_changed", async function () {
                const place = await autoCompleteRef.current.getPlace();
                // console.log({ place });
            });
        })
        .catch((e) => {
            // do something
        });
    }, []);

    return (
        <div>
            <label></label>
            <input ref={inputRef} placeholder={placeholder} value={value} onBlur={(e) => changeHandler(e.target.value)} onChange={(e) => changeHandler(e.target.value)} />
        </div>
    );
};

export default MapAutoInput;