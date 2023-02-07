import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import { useMemo } from "react";
import { useState } from "react";

function Map(props) {
    //props.lat
    //props.lng
    // const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API})
    // const [lng, setLng] = useState(false);
    // const [lat, setLat] = useState(false);

    // const center  = useMemo(() => ({lat: 39.7392, lng: -104.9903}), []);
    // function getLocation() {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(showPosition);
    //     } else {
    //       console.log("Geolocation is not supported by this browser.")
    //     }
    // }

    // function showPosition(position) {
    //     setLng(position.coords.longitude);
    //     setLat(position.coords.latitude);
    //     console.log("Latitude: " + position.coords.latitude + 
    //     "Longitude: " + position.coords.longitude)
    // }


    // getLocation();






    if (props.lng && props.lat) {
        console.log("loaded");

        return (

            <div className="google-map">
                <GoogleMap 
                    zoom={10} 
                    center={{lat: props.lat, lng: props.lng}} 
                    mapContainerClassName="map-container"
                >
                    {/* <MarkerF position={center} /> */}
                </GoogleMap>
            </div>
        );
    } else {
        console.log("loading");

        return (
            <div className="google-map">
                Loading Map
            </div>
        );

    }


  }
  
  export default Map;