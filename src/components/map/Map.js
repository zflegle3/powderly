import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { useState, useEffect } from "react";
import mapStyles from "../../custom-styles/mapStyles";
import SearchBar from "./SearchBar"
import FilterBar from "./FilterBar"
import { FaLocationArrow } from 'react-icons/fa';
import InfoPanel from "./InfoPanel"
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';



// import usePlacesAutocomplete, { getGeocode, getLatLng} from "use-places-autocomplete"
// import {
//     Combobox,
//     ComboboxInput, 
//     ComboboxPopover, 
//     ComboboxList,
//     ComboboxOption,
// } from "@reach/combobox";
// import LocationMarker from "./LocationMarker";

function Map({resorts, lat, setLat, lng, setLng, setSearchResults, setSort, profileImage}) {
    const [myMap, setMyMap] = useState(null); //map reference instance
    const [selected, setSelected] = useState({lat, lng}); //User or searched location
    const [selectedMarker, setSelectedMarker] = useState(null); //Places info window on selected marker
    const {user } = useSelector((state) => state.auth);


    const handleClick = (id, position) => {
        let selectedInfo = resorts.filter(resort => resort.refId === id)[0];
        setSelectedMarker({
            pos: position,
            name: selectedInfo.name,
            hi: selectedInfo.conditions.forecast[0]?.tempHigh,
            lo: selectedInfo.conditions.forecast[0]?.tempLow,
            snow: selectedInfo.conditions.forecast[0]?.snowfall,
            wind: selectedInfo.conditions.forecast[0]?.windMax,
            date: DateTime.fromISO(selectedInfo.conditions.forecast[0]?.date, { zone: "UTC"}),
            humidity: selectedInfo.conditions.forecast[0]?.humidity,
        })
    }

    const markers = resorts.map((resort) => {
        let rating = resort.conditions.forecast[0]?.rating ?? 0;

        if (rating > 7.5) {
            return (
                <Marker 
                    key={resort.refId} 
                    id={resort.refId} 
                    onClick={e => handleClick(resort.refId,{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)})} 
                    optimized={true} 
                    icon={{url:"https://i.imgur.com/PR6meRZ.png", scaledSize: new window.google.maps.Size(50, 50)}}  
                    position={{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)}}
                    showInfo={false}
                    // onMouseover={e => handleHover()}
                    // onMouseEnter={handleHover}
                >
                </Marker>
            );
        } else if (rating > 5) {
            return (
                <Marker 
                    key={resort.refId}
                    id={resort.refId}  
                    onClick={e => handleClick(resort.refId,{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)})} 
                    optimized={true} 
                    icon={{url:"https://i.imgur.com/QBGAEs4.png", scaledSize: new window.google.maps.Size(40, 40)}}  
                    position={{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)}}
                />
            )
        } else if (rating > 2.5) {
            return (
                <Marker 
                    key={resort.refId} 
                    id={resort.refId} 
                    onClick={e => handleClick(resort.refId,{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)})} 
                    optimized={true} 
                    icon={{url:"https://i.imgur.com/j1V6upn.png", scaledSize: new window.google.maps.Size(30, 30)}}  
                    position={{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)}}
                    labelContent= "ABCD"
                />
            )
        } else if (rating > 0) {
            return (
                <Marker 
                    key={resort.refId} 
                    onClick={e => handleClick(resort.refId,{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)})} 
                    optimized={true} 
                    icon={{url:"https://i.imgur.com/pJYtoxS.png", scaledSize: new window.google.maps.Size(20, 20)}}  
                    position={{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)}}
                />
            )
        } else {
            return (
                <Marker 
                    key={resort.refId}
                    id={resort.refId} 
                    onClick={e => handleClick(resort.refId,{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)})} 
                    optimized={true} 
                    icon={{url:"https://i.imgur.com/d9hNHHW.png", scaledSize: new window.google.maps.Size(20, 20)}}  
                    position={{lat: Number(resort.location.lat), lng: Number(resort.location.lng)}}
                />
            )
        }
    });

    const filterLocations = (latHi,latLo,lngHi,lngLo) => {
        let filtered = resorts.filter(resort => (latHi > resort.location.lat && resort.location.lat > latLo && lngHi > resort.location.lng && resort.location.lng > lngLo));
        setSearchResults(filtered);
    }

    const onMapLoad = (map) => {
        //sets myMap state with map object
        console.log("map loaded...", map);
        setMyMap(map);
    };

    const onMapIdle = (map) => {
        //when map done moving, sends bounds and pulls locations within bounds
        let bounds = map.getBounds();
        let ne = bounds.getNorthEast(); // Coords of the northeast corner
        let sw = bounds.getSouthWest(); // Coords of the southwest corner
        filterLocations(ne.lat(), sw.lat(), ne.lng(), sw.lng());
    };

    const handleMapClick = () => {
        if (selectedMarker) {
            setSelectedMarker(null);
        }
    };

    const handleBtnClick = (e) => {
        //recenters map to searched location or user default location
        e.preventDefault();
        myMap.panTo(selected);
        myMap.setZoom(9);
    };

    
    useEffect(() => {
        //Updates map focus and zoom on recenter button
        console.log("map lat/lng change", myMap, lat,lng);
        if(myMap) {
            myMap.panTo({lat: Number(lat), lng: Number(lng)})
            myMap.setZoom(9);
        };
    },[lat,lng]);

    useEffect(() => {
        console.log("map selected change", myMap);
        //resets zoom on searched location
        if(myMap) {
            myMap.setZoom(9);
        };
    },[selected]);


    let infoMarkerTest = null;
    if (selectedMarker) {
        infoMarkerTest = 
        <InfoWindow
        // onLoad={onLoad}
        position={selectedMarker.pos}
        options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
        >
            <InfoPanel selectedMarker={selectedMarker}/>
        </InfoWindow>
    }

    let mapTheme = mapStyles.lightStyle;
    if (user.theme === "dark") {
        mapTheme = mapStyles.darkStyle;
    };

    if (lng && lat) {
        return (

            <div className="google-map">
                <div className="controls-container">
                    <SearchBar setSelected={setSelected} selected={selected} profileImage={profileImage}/>
                    <FilterBar setSort={setSort}/>
                </div>

                <button className="recenter-btn" onClick={handleBtnClick} >
                    <FaLocationArrow />
                </button>

                <GoogleMap
                    // ref={mapRef} 
                    zoom={9}
                    center={selected}
                    mapContainerClassName="map-container"
                    id={"a5b17b69dbe1a9d9"}
                    options={{
                        styles: mapTheme,
                        disableDefaultUI: true,
                        zoomControl: true,
                    }}
                    onLoad={onMapLoad}
                    onIdle={() => onMapIdle(myMap)}
                    onMouseDown = {handleMapClick}
                >
                    {markers}
                    {selected && <Marker position={selected} icon={{url:"https://cdn-icons-png.flaticon.com/512/2503/2503562.png", scaledSize: new window.google.maps.Size(50, 50),}}/>}
                    {infoMarkerTest}

                </GoogleMap>


            </div>
        );
    } else {

        return (
            <div className="google-map">
                Loading Map
            </div>
        );

    }


  }
  
  export default Map;


