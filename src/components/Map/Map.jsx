import React, { useEffect, useState } from "react"
import { Loader } from '@googlemaps/js-api-loader'

function Map({ position, zoom, id, getLatLngPlaceID }) {

    const apiKey = 'AIzaSyAVs-wCER__18LpKRb3ozA2pot15DGmels';

    const [pos, setPos] = useState({
        lat: 18.1124372,
        lng: 79.01929969999999,
    });

    const loader = new Loader({
        apiKey: apiKey
    });

    const mapOptions = {
        center: pos || {lat: 18.1124372, lng: 79.01929969999999},
        zoom: zoom
    };

    useEffect(() => {
        loader
        .importLibrary('maps')
        .then(({Map}) => {
            const map = new Map(document.getElementById(id), mapOptions);

            map.addListener('click', (mapsMouseEvent) => {
                console.log('mapsMouseEvent: ', mapsMouseEvent);
                console.log('mapsMouseEvent.latLng: ', mapsMouseEvent.latLng);
                console.log('mapsMouseEvent.latLng.lat(): ', mapsMouseEvent.latLng.lat());
                console.log('mapsMouseEvent.latLng.lng(): ', mapsMouseEvent.latLng.lng());
                const locationData = {
                    placeId: (mapsMouseEvent.placeId) ? mapsMouseEvent.placeId : '',
                    lat: mapsMouseEvent.latLng.lat(),
                    lng: mapsMouseEvent.latLng.lng()
                };

                getLatLngPlaceID(locationData);
                // https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng
                // https://maps.googleapis.com/maps/api/geocode/json?latlng=12.900595237402618,77.47905135154724&sensor=false&key=AIzaSyAVs-wCER__18LpKRb3ozA2pot15DGmels
                // https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJ_R4mNTJb0jsRa7VsAAzX-Yw&sensor=false&key=AIzaSyAVs-wCER__18LpKRb3ozA2pot15DGmels
            });
        })
        .catch((e) => {
            // do something
        });
    }, [pos]);

    useEffect(() => {
        setPos(position);
    });

    return (
        <div id={id} style={{width: '100%', height: '100%'}} />
    )
}

export default Map;