import { useState } from "react";
import { FaSearch, FaInfo } from 'react-icons/fa';
import PlacesAutocomplete from "./PlacesAutocomplete.js";
import FilterBar from "./FilterBar"


function SearchBar({setSelected, selected, editStatus, setEditStatus}) {
    const [location, setLocation] = useState("Search any Location...");
    const [date, setDate] = useState(new Date());

    const editSearch = () => {
        //changes edit status to edit inputs
        console.log("Open search edits");
        setEditStatus(true);
    }

    const handleSearchBtn = () => {
        //changes edit status to edit inputs
        console.log("Close search edits");
        setEditStatus(false);
    }

    const openHelp = () => {
        //changes edit status to edit inputs
        console.log("Open Help Info");
    }

    if (!editStatus) {
        return (
            <div className="search-container">
                <div className="search-bar">
                    <div className="search-submit" onClick={handleSearchBtn}>
                        <FaSearch />
                    </div>
                    <div className="search-display" onClick={editSearch}>
                        <p>{location}</p>
                        <p>{date.toDateString()}</p>
                    </div>
                    <div className="help-submit" onClick={openHelp}>
                        <FaInfo/>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="search-container">
                <div className="search-bar">
                    <div className="search-submit" onClick={handleSearchBtn}>
                        <FaSearch />
                    </div>
                    <form className="search-form" onClick={editSearch}>
                        {/* <input className="location-in" type="text" name="location" onChange={ e => setLocation(e.target.value)}></input> */}
                        <PlacesAutocomplete setSelected={setSelected} setEditStatus={setEditStatus} setLocation={setLocation} />
                        {/* <input className="date-in" type="date" name="location"></input> */}
                    </form>
                    <div className="help-submit" onClick={openHelp}>
                    <FaInfo/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;