import { GoogleMap, MarkerF, getBounds, Marker, Size, InfoWindow } from "@react-google-maps/api"
import { useMemo } from "react";
import { useState, useEffect, useRef } from "react";
import mapStyles from "../../custom-styles/mapStyles";
import SearchBar from "../SearchBar"
import FilterBar from "../FilterBar"
import { FaLocationArrow } from 'react-icons/fa';
import InfoPanel from "./InfoPanel"



import usePlacesAutocomplete, { getGeocode, getLatLng} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput, 
    ComboboxPopover, 
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
// import LocationMarker from "./LocationMarker";

function Map({resorts, lat, setLat, lng, setLng, setSearchResults, setSort, profileImage}) {
    //props.resorts
    const [myMap, setMyMap] = useState(null);
    const [selected, setSelected] = useState({lat, lng});
    const [editStatus, setEditStatus] = useState(false);
    const [infoPos, setInfoPos] = useState({lat, lng})
    const [selectedMarker, setSelectedMarker] = useState(null);
    //controls search bar display, set true for edit mode and false for display only

    const handleClick = (id, position) => {
        let selectedInfo = resorts.filter(resort => resort.refId === id)[0];
        setSelectedMarker({
            pos: position,
            name: selectedInfo.name,
            hi: selectedInfo.conditions.forecast[0].tempHigh,
            lo: selectedInfo.conditions.forecast[0].tempsLow,
            snow: selectedInfo.conditions.forecast[0].snowfall,
            wind: selectedInfo.conditions.forecast[0].windMax,
            date: new Date(selectedInfo.conditions.forecast[0].date),
        })
    }

    const handleHover = () => {
        console.log("hover");
    }

    const markers = resorts.map((resort) => {
        let rating = resort.conditions.forecast[0].rating;

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
                    onMouseover={e => handleHover()}
                    onMouseEnter={handleHover}
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
        setMyMap(map);
    };

    const onMapIdle = (map) => {
        //when map done moving, sends bounds and pulls viewport bounds
        let bounds = map.getBounds();
        filterLocations(bounds.Ua.hi, bounds.Ua.lo, bounds.Ia.hi, bounds.Ia.lo);
    };

    const handleMapClick = () => {
        console.log("Map being clicked");
        if (editStatus) {
            setEditStatus(false);
        }
        if (selectedMarker) {
            setSelectedMarker(null);
        }
    };

    const handleBtnClick = (e) => {
        //recenters map to searched location or user default location
        e.preventDefault();
        console.log("Clicked")
        myMap.panTo(selected);
        myMap.setZoom(9);
    };

    
    useEffect(() => {
        console.log("coords changed")
        //pan to new 
        if(myMap) {
            console.log(myMap)
            console.log(lat,lng);
            myMap.panTo({lat: Number(lat), lng: Number(lng)})
            myMap.setZoom(9);
        };
    },[lat,lng]);


    let infoMarkerTest = null;
    if (selectedMarker) {
        infoMarkerTest = 
        <InfoWindow
        // onLoad={onLoad}
        position={selectedMarker.pos}
        options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
        >
            <InfoPanel selectedMarker={selectedMarker}/>
            {/* <div className="info-window"  style={{
                background: `transparent`,
                border: `1px solid #ccc`,
                padding: 15
            }}>
                <h2>{selectedMarker.name}</h2>
                <p>{selectedMarker.date.toDateString()}</p>
                <p>Snow Showers</p>
                <div className="info-window-detail">

                    <div className="info-window-detail-item">
                        <div className="detail-item-header">
                            <div className="detail-item-icon">

                            </div>
                            <p>High/Low</p>
                        </div>

                    </div>

                </div>
            </div> */}
        </InfoWindow>
    }



    if (lng && lat) {
        // console.log("map loaded");
        return (

            <div className="google-map">
                <div className="controls-container">
                    <SearchBar setSelected={setSelected} selected={selected} editStatus={editStatus} setEditStatus={setEditStatus} profileImage={profileImage}/>
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
                        styles: mapStyles.lightStyle,
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
        console.log("loading");

        return (
            <div className="google-map">
                Loading Map
            </div>
        );

    }


  }
  
  export default Map;


