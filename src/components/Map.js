import { GoogleMap, MarkerF, getBounds, Marker, Size } from "@react-google-maps/api"
import { useMemo } from "react";
import { useState, useEffect, useRef } from "react";
import { ReactComponent as Greaticon } from '../svgs/bestIcon.svg';
import IconPng from "../svgs/bestIcon.png";
import mapStyles from "../custom-styles/mapStyles";
import PlacesAutocomplete from "./PlacesAutocomplete.js";
import SearchBar from "./SearchBar.js"

import usePlacesAutocomplete, { getGeocode, getLatLng} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput, 
    ComboboxPopover, 
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
// import LocationMarker from "./LocationMarker";

function Map({resorts, lat, lng}) {
    //props.resorts
    const [myMap, setMyMap] = useState(null);
    const [selected, setSelected] = useState({lat, lng});
    const [editStatus, setEditStatus] = useState(false);
    //controls search bar display, set true for edit mode and false for display only



    const handleClick = () => {
        console.log("SHREEEED IT DUUUUUUDE!!!")
    }

    const markers = resorts.map((resort) => {
        return (
            <Marker 
                key={resort.refId} 
                onClick={handleClick} 
                optimized={true} 
                icon={{url:"https://i.imgur.com/ypeOzou.png", scale: 0.1, scaledSize: new window.google.maps.Size(50, 50)}}  
                position={{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)}}
            />
        );
    });

    const filterLocations = (latHi,latLo,lngHi,lngLo) => {
        console.log(resorts);
        console.log("39.12,84.8858208");
        console.log(latHi,latLo,lngHi,lngLo);
        console.log("Lat", latHi > Number("39.1508879") && Number("39.1508879") > latLo);
        console.log("Lng", lngHi > Number("-84.8858208") && Number("-84.8858208") > lngLo);
        let filtered = resorts.filter(resort => (latHi > resort.location.lat && resort.location.lat > latLo && lngHi > resort.location.lng && resort.location.lng > lngLo))
        console.log(filtered);
    }

    const onMapLoad = (map) => {
        //sets myMap state with map object
        console.log("setting myMap...");
        setMyMap(map);
    };

    const onMapIdle = (map) => {
        console.log("Map Idle...");
        console.log(map.getBounds());
        let bounds = map.getBounds();
        
        filterLocations(bounds.Ya.hi, bounds.Ya.lo, bounds.Ma.hi, bounds.Ma.lo);
        // (latHi,latLo,lngHi,lngLo)

    };

    const handleMapClick = () => {
        console.log("Map being clicked");
        if (editStatus) {
            setEditStatus(false);
        }
    }

    console.log(typeof selected.lat,typeof selected.lng);
    if (lng && lat) {
        console.log("loaded");
        // const defaultLat = 39.7392;
        // const defaultLng = -104.9903;
        return (

            <div className="google-map">
                <SearchBar setSelected={setSelected} selected={selected} editStatus={editStatus} setEditStatus={setEditStatus}/>
                {/* <PlacesAutocomplete setSelected={setSelected} /> */}
                <GoogleMap
                    // ref={testMap} 
                    zoom={9}
                    center={selected}
                    mapContainerClassName="map-container"
                    id={"a5b17b69dbe1a9d9"}
                    options={{
                        styles: mapStyles.darkStyle,
                        disableDefaultUI: true,
                        zoomControl: true,
                    }}
                    // onBoundsChanged={console.log("bounds changed")}
                    onLoad={onMapLoad}
                    onIdle={() => onMapIdle(myMap)}
                    onMouseDown = {handleMapClick}
                >
                    {markers}
                    {selected && <Marker position={selected} icon={{url:"https://cdn-icons-png.flaticon.com/512/2503/2503562.png", scaledSize: new window.google.maps.Size(50, 50),}}/>}

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


