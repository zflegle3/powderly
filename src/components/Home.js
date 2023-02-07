
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
//Components
import SearchBar from "./SearchBar.js"
import Map from "./Map.js"
import DataDash from "./DataDash.js"

function Home(props) {
    const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API})

    console.log(props.lat, props.lng);




    if (!isLoaded) {
        return (
              <div>Loading Screen</div>
          );

    } else {
        return (
            <div className="home-dash">
            <div>Home Dashboard</div>
            <SearchBar/>
            <Map lat={props.lat} lng={props.lng}/>
            <DataDash/>
    
            </div>
        );
    }
}

export default Home;
