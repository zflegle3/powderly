
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import usePlacesAutocomplete, { getGeocode, getLatLng} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput, 
    ComboboxPopover, 
    ComboboxList,
    CombobocOption,
} from "@reach/combobox";
//Components
import SearchBar from "./SearchBar.js"
import Map from "./Map.js"
import DataDash from "./DataDash.js"
import { useEffect, useState } from "react"
import axios from 'axios';


function Home(props) {
    const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API, libraries: ["places"]})
    const [resorts, setResorts] = useState(false);
    // console.log(props.lat, props.lng);

    useEffect(() => {
        const getMarkers = async () => {
            const markersIn = await axios.get("http://localhost:8080/locations/all")
                .catch(function (err) {
                    console.log("ERROR WITH MARKER DATA,", err)
                });
            setResorts(markersIn.data);
        }

        getMarkers(); 
    },[]);


    if (!isLoaded || !resorts) {
        console.log("loading map and resort data")
        return (
              <div>Loading Screen</div>
            //   Add loading component here
          );
    } else {
        return (
            <div className="home-dash">
                {/* <SearchBar/> */}
                <Map lat={props.lat} lng={props.lng} resorts={resorts}/>
                <DataDash/>
            </div>
        );
    }
}

export default Home;


