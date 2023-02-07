import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

function Map() {
    const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API})



    return (
        <div className="google-map">
            <GoogleMap 
                zoom={10} 
                center={{lat: 40.4572, lng: -106.8045}} 
                mapContainerClassName="map-container"
            >
                <MarkerF position={{lat: 40.4572, lng: -106.8045}} />
            </GoogleMap>
        </div>
        );
  }
  
  export default Map;