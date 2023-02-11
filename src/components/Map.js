import { GoogleMap, useLoadScript, MarkerF, getBounds } from "@react-google-maps/api"
import { useMemo } from "react";
import { useState, createRef } from "react";

function Map(props) {

    const map = createRef();
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

    function onMapLoad(e) {
        const bounds = new window.google.maps.LatLngBounds();
        console.log("Map Loaded...", bounds);

        // const bounds = map.getBounds();
        // console.log(bounds);
        console.log(map.current);
        // console.log(map.getBounds());
      };



    if (props.lng && props.lat) {
        console.log("loaded");

        return (

            <div className="google-map">
                <GoogleMap
                    ref={map} 
                    zoom={5} 
                    center={{lat: props.lat, lng: props.lng}} 
                    mapContainerClassName="map-container"
                    // onBoundsChanged={map => onMapLoad(map)}
                    onLoad = {onMapLoad}

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