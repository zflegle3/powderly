

import { useState, useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


//Styles
import "./custom-styles/App.scss";
import "./custom-styles/Calendar.scss";
import "./custom-styles/auth.scss";

//Components
import Home from "./components/Home"
import Chat from "./components/Chat"

function App() {
  const center  = useMemo(() => getLocation(), []);
  const [lng, setLng] = useState(false);
  const [lat, setLat] = useState(false);

  // console.log(process.env.REACT_APP_GOOGLE_MAPS_API);
  // console.log(process.env.NODE_ENV);

  function getLocation() {
    //attempts to pull users location and set as lat/lng states
    //if err, sets default as denver lat/lng
    // console.log("getting location")
    navigator.geolocation.getCurrentPosition(showPosition, defaultPosition);
  }

  function showPosition(position) {
    //if user accepts geolocation, sets lat/lng to user location
    setLng(Number(position.coords.longitude));
    setLat(Number(position.coords.latitude));
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
      </div>
    );
  } else {
    return (
      <div>Loadin user Location</div>
    )
  }

}

export default App;
