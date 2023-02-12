import { GoogleMap, LoadScript, MarkerF, getBounds, Marker } from "@react-google-maps/api"
import { useMemo } from "react";
import { useState, useEffect, useRef } from "react";
import { ReactComponent as Greaticon } from '../svgs/bestIcon.svg';
import IconPng from "../svgs/bestIcon.png";
import mapStyles from "../custom-styles/mapStyles"
// import LocationMarker from "./LocationMarker";

function Map({resorts, lat, lng}) {
    //props.resorts
    // const testMap = useRef();
    const [myMap, setMyMap] = useState(null);
    const [bounds, setBounds] = useState(null);



    const handleClick = () => {
        console.log("SHREEEED IT DUUUUUUDE!!!")
    }

    const markers = resorts.map((resort) => {
        return <Marker key={resort.refId} onClick={handleClick} optimized={true} icon={{url:"https://i.imgur.com/ypeOzou.png", scale: 0.1}}  position={{lat: Number(resort.location.lat), lng: Number(resort.location.lng,)}}/>
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


    if (lng && lat) {
        console.log("loaded");
        // const defaultLat = 39.7392;
        // const defaultLng = -104.9903;

        return (

            <div className="google-map">
                <GoogleMap
                    // ref={testMap} 
                    zoom={9}
                    center={{lat: lat, lng: lng}} 
                    mapContainerClassName="map-container"
                    id={"a5b17b69dbe1a9d9"}
                    options={{styles: mapStyles.lightStyle}}
                    onBoundsChanged={console.log("bounds changed")}
                    onLoad={onMapLoad}
                    onIdle={() => onMapIdle(myMap)}
                >
                    {/* <LocationMarker lat={defaultLat} lng={defaultLng} /> */}
                    {markers}
                    <Marker position={{lat: lat, lng: lng}} />


                    {/* {bounds && (
                        <>
                        <Marker
                            position={{
                            lat: bounds.north,
                            lng: bounds.west,
                            }}
                        />
                        <Marker
                            position={{
                            lat: bounds.north,
                            lng: bounds.east,
                            }}
                        />
                        <Marker
                            position={{
                            lat: bounds.south,
                            lng: bounds.west,
                            }}
                        />
                        <Marker
                            position={{
                            lat: bounds.south,
                            lng: bounds.east,
                            }}
                        />
                        </>
                    )} */}
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