import usePlacesAutocomplete, { getGeocode, getLatLng} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput, 
    ComboboxPopover, 
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";


const PlacesAutocomplete = ({ setSelected, setEditStatus, setLocation }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        //convert address to lat/lng
        const results = await getGeocode({address});
        const {lat,lng} = await getLatLng(results[0]);
        //sets new map location
        setSelected({lat, lng});
        //updates search bar status
        setEditStatus(false);
        //updates search bar text
        setLocation(address);
    }

    return(
        <Combobox className="combo-box" onSelect={handleSelect}>
            <ComboboxInput 
                className="combo-box-input" 
                placeholder="Search any location..."
                value={value} 
                onChange = {e => setValue(e.target.value)} 
                disabled={!ready}
            />
            <ComboboxPopover>
                <ComboboxList className="combo-box-list">
                    {status === "OK" && data.map(({place_id, description}) => 
                        <ComboboxOption className="combo-box-option" key={place_id} value={description}/>
                    )}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
}

export default PlacesAutocomplete;