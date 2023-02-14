
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import usePlacesAutocomplete, { getGeocode, getLatLng} from "use-places-autocomplete"
import Sheet from 'react-modal-sheet';
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
import SidePanel from "./SidePanel.js";


function Home(props) {
    const [ libraries ] = useState(['places']);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
        libraries,
    });
    const [resorts, setResorts] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [sort, setSort] = useState(null);
    // console.log(props.lat, props.lng);

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




    if (!isLoaded || !resorts) {
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
                    {/* <SearchBar/> */}
                    <Map lat={props.lat} lng={props.lng} resorts={resorts} setSearchResults={setSearchResults}/>
                    <SidePanel searchResults={searchResults}/>
                </div>
            );
        //Mobile 
        } else {
            return (
                <div className="home-dash">
                    {/* <SearchBar/> */}
                    <Map lat={props.lat} lng={props.lng} resorts={resorts} setSearchResults={setSearchResults}/>
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


