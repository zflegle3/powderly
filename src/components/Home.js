
import { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import { useLoadScript} from "@react-google-maps/api";
// import {sortData} from "../features/sort.js";
//Components
import Map from "./Map.js"
import DataDash from "./DataDash.js"
import SidePanel from "./SidePanel.js";
import Sheet from 'react-modal-sheet';
import ModalContainer from './modals/ModalContainer';


function Home({profileImage}) {
    const [ libraries ] = useState(['places']);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
        libraries,
    });
    const [resorts, setResorts] = useState(false);
    const [resortsSorted, setResortsSorted] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [sort, setSort] = useState(
        {
            title:"A to Z",
            titleLong:"Alphabetical A to Z",
            id: 0
        },
    );
    const center  = useMemo(() => getLocation(), []);
    const [lng, setLng] = useState(false);
    const [lat, setLat] = useState(false);


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

    function getLocation() {
        //attempts to pull users location and set as lat/lng states
        //if err, sets default as denver lat/lng
        // console.log("getting location")
        navigator.geolocation.getCurrentPosition(showPosition, defaultPosition);
    }

    const getData = async () => {
        const dataIn = await axios.get("http://localhost:8080/conditions/all")
            .catch(function (err) {
                console.log("ERROR WITH MARKER DATA,", err)
            });
        setResorts(dataIn.data);
    }

    useEffect(() => {
        getData(); 
    },[]);


    if (!isLoaded || !resorts || !lat || !lng ) {
        // console.log("loading map and resort data")
        return (
              <div>Loading Screen</div>
            //   Add loading component here
          );
    } else {
        //Desktop 
        if (window.innerWidth > 760) {
            return (
                <div className="home-dash">
                    <Map lat={lat} lng={lng} resorts={resorts} setSearchResults={setSearchResults} setSort={setSort} profileImage={profileImage}/>
                    <SidePanel searchResults={searchResults} sortData={sort} resorts={resorts}/>
                    <ModalContainer profileImage={profileImage} resorts={resorts}/>
                </div>
            );
        //Mobile 
        } else {
            return (
                <div className="home-dash">
                    {/* <SearchBar/> */}
                    <Map lat={lat} lng={lng} resorts={resorts} setSearchResults={setSearchResults} profileImage={profileImage}/>
                    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                        <Sheet.Container>
                            <Sheet.Header />
                            <Sheet.Content>{/* Your sheet content goes here */}</Sheet.Content>
                        </Sheet.Container>
    
                        <Sheet.Backdrop />
                    </Sheet>
                    <button onClick={() => setOpen(true)}>Open sheet</button>
                    <DataDash/>
                </div>
            );
          
        }

    }
}

export default Home;


