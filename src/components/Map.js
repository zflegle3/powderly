import { GoogleMap, useLoadScript, MarkerF, getBounds, Marker } from "@react-google-maps/api"
import { useMemo } from "react";
import { useState, createRef } from "react";
// import LocationMarker from "./LocationMarker";

function Map({resorts, lat, lng}) {
    //props.resorts
    const myMap = createRef();
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



    // function onMapLoad(e) {
    //     // const bounds = new window.google.maps.LatLngBounds();
    //     // console.log("Map Loaded...", bounds);

    //     // const bounds = map.getBounds();
    //     // console.log(bounds);
    //     // console.log(map.current);
    //     // console.log(map.getBounds());
    // };

    const handleClick = () => {
        console.log("SHREEEED IT DUUUUUUDE!!!")
    }

    console.log(Array.isArray(resorts));
    console.log(resorts);
    const markers = resorts.map((resort) => {
        return <MarkerF key={resort.refId} onClick={handleClick} position={{lat: Number(resort.location.lat), lng: Number(resort.location.lng,), optimized: true }}/>
    });

    if (lng && lat) {
        console.log("loaded");
        const defaultLat = 39.7392;
        const defaultLng = -104.9903;

        return (

            <div className="google-map">
                <GoogleMap
                    ref={myMap} 
                    zoom={8} 
                    center={{lat: lat, lng: lng}} 
                    mapContainerClassName="map-container"
                    // onBoundsChanged={map => onMapLoad(map)}
                    // onLoad = {onMapLoad}
                >
                    {/* <LocationMarker lat={defaultLat} lng={defaultLng} /> */}
                    {markers}
                    <MarkerF position={{lat: lat, lng: lng}} />
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