import logo from './logo.svg';
import './App.scss';
import { useState, useMemo } from 'react';
// import { GoogleMap, useLoadScript, Marker } from "react-google-maps"

import Home from "./components/Home"
import Chat from "./components/Chat"

function App() {
  const center  = useMemo(() => getLocation(), []);
  const [lng, setLng] = useState(false);
  const [lat, setLat] = useState(false);

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API);
  console.log(process.env.NODE_ENV);

  function getLocation() {
    //attempts to pull users location and set as lat/lng states
    //if err, sets default as denver lat/lng
    console.log("getting location")
    navigator.geolocation.getCurrentPosition(showPosition, defaultPosition);
  }

  function showPosition(position) {
    //if user accepts geolocation, sets lat/lng to user location
    setLng(position.coords.longitude);
    setLat(position.coords.latitude);
    console.log("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude)
  }

  function defaultPosition(err) {
    //if user declines geolocation, sets lat/lng to Denver, CO
    console.log(err);
    console.log("Geolocation is not supported by this browser.")
    setLng(-104.9903);
    setLat(39.7392);
  }


  if (lat && lng) {
    return (
      <div className="App">
        <Home lat={lat} lng={lng}/>
        <Chat/>
      </div>
    );
  } else {
    return (
      <div>Loadin user Location</div>
    )
  }

}

export default App;
