import axios from 'axios';
import { useEffect, useState, useMemo } from "react";
import { useLoadScript} from "@react-google-maps/api";
import { useSelector, useDispatch } from 'react-redux';
//Services
import conditionsService from '../service/conditions.js'

//Components
import Map from "./map/Map.js"
import SidePanel from "./results-panel/SidePanel.js";
import Sheet from 'react-modal-sheet';
import ModalContainer from './modals/ModalContainer';
import LoadingSpinner from "./LoadingSpinner.js";
import BottomPanel from './results-panel/BottomPanel.js';
//Images
import { FaLocationArrow } from 'react-icons/fa';


function Home({profileImage}) {
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    const [ libraries ] = useState(['places']);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
        libraries,
    });
    const [resorts, setResorts] = useState(false);
    const [resortsSorted, setResortsSorted] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [sort, setSort] = useState(
        {
            title:"A to Z",
            titleLong:"Alphabetical A to Z",
            id: 0
        },
    );
    const [lng, setLng] = useState(false);
    const [lat, setLat] = useState(false);
    const center  = useMemo(() => getLocation(), []);

    function showPosition(position) {
        //if user accepts geolocation, sets lat/lng to user location
        setLng(Number(position.coords.longitude));
        setLat(Number(position.coords.latitude));
    }
    
    function defaultPosition(err) {
        //if user declines geolocation, sets lat/lng to Denver, CO
        console.log("User chose to not allow location, Geolocation is not supported by this browser.")
        setLng(-104.9903);
        setLat(39.7392);
    }

    function getLocation() {
        //attempts to pull users location and set as lat/lng states
        //if err, sets default as denver lat/lng
        navigator.geolocation.getCurrentPosition(showPosition, defaultPosition);
    }

    const getData = async () => {
        if (user) {
            let config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
            }}
            const data = await conditionsService.getConditionsAll(user);
            setResorts(data);
            } catch (err) {
                console.log("ERROR WITH MARKER DATA,", err);
            }
        }
    };

    useEffect(() => {
        getData(); 
    },[]);


    if (!isLoaded || !resorts.length || !lat || !lng ) {
        return (
              <LoadingSpinner />
          );
    } else {
        //Desktop 
        if (window.innerWidth > 950) {
            return (
                <div className="home-dash">
                    <Map lat={lat} lng={lng} resorts={resorts} setSearchResults={setSearchResults} setSort={setSort} profileImage={profileImage}/>
                    <SidePanel searchResults={searchResults} sortData={sort} resorts={resorts} setLng={setLng} setLat={setLat}/>
                    <ModalContainer profileImage={profileImage} resorts={resorts}/>
                </div>
            );
        //Mobile 
        } else {
            return (
                <div className="home-dash">
                    {/* <SearchBar/> */}
                    <Map lat={lat} lng={lng} resorts={resorts} setSearchResults={setSearchResults} setSort={setSort} profileImage={profileImage}/>
                    <BottomPanel searchResults={searchResults} sortData={sort} resorts={resorts} setLng={setLng} setLat={setLat}/>
                    <ModalContainer profileImage={profileImage} resorts={resorts}/>
                    {/* <button onClick={() => setOpen(true)}>Open sheet</button> */}
                </div>
            );
        }
    }
}

export default Home;


