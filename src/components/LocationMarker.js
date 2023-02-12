import {Icon} from '@iconify/react'
import locationIcon from "@iconify/icons-mdi/fire-alert"
import { GoogleMap, useLoadScript, MarkerF, getBounds, Marker } from "@react-google-maps/api"

const LocationMarker = ({lat, lng, onClick}) => {
    return (
        <div className="location-marker" onClick={onClick}>
            <Icon icon={locationIcon} className='location-icon' />
        </div>

        <Marker></Marker>
    )
};

export default LocationMarker