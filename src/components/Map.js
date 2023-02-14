import { GoogleMap, MarkerF, getBounds, Marker, Size } from "@react-google-maps/api"
import { useMemo } from "react";
import { useState, useEffect, useRef } from "react";
import { ReactComponent as Greaticon } from '../svgs/bestIcon.svg';
import IconPng from "../svgs/bestIcon.png";
import mapStyles from "../custom-styles/mapStyles";
import SearchBar from "./SearchBar"
import FilterBar from "./FilterBar"

import usePlacesAutocomplete, { getGeocode, getLatLng} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput, 
    ComboboxPopover, 
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
// import LocationMarker from "./LocationMarker";

function Map({resorts, lat, lng, setSearchResults}) {
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
        let filtered = resorts.filter(resort => (latHi > resort.location.lat && resort.location.lat > latLo && lngHi > resort.location.lng && resort.location.lng > lngLo));
        setSearchResults(filtered);
    }

    const onMapLoad = (map) => {
        //sets myMap state with map object
        setMyMap(map);
    };

    const onMapIdle = (map) => {
        //when map done moving, sends bounds and pulls viewport bounds
        let bounds = map.getBounds();
        filterLocations(bounds.Ya.hi, bounds.Ya.lo, bounds.Ma.hi, bounds.Ma.lo);
    };

    const handleMapClick = () => {
        // console.log("Map being clicked");
        if (editStatus) {
            setEditStatus(false);
        }
    }


    if (lng && lat) {
        // console.log("map loaded");
        return (

            <div className="google-map">
                <div className="controls-container">
                    <SearchBar setSelected={setSelected} selected={selected} editStatus={editStatus} setEditStatus={setEditStatus}/>
                    <FilterBar />
                </div>

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


