import { useState } from "react";
import { FaSearch, FaInfo } from 'react-icons/fa';


function SearchBar() {
    const {location, setLocation} = useState("Default Location");
    const {date, setDate} = useState("Default Date");
    const [editStatus, setEditStatus] = useState(false);//set true for edit mode

    

    const editSearch = () => {
        //changes edit status to edit inputs
        console.log("Open search edits");
        setEditStatus(true);

    }

    const submitSearch = () => {
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
                    <div className="search-submit" onClick={submitSearch}>
                        <FaSearch />
                    </div>
                    <div className="search-display" onClick={editSearch}>
                        <p>Default Location</p>
                        <p>Tue, Mar 4 at 9:41 pm</p>
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
                    <div className="search-submit" onClick={submitSearch}>
                        <FaSearch />
                    </div>
                    <form className="search-form" onClick={editSearch}>
                        <input className="location-in" type="text" name="location" onChange={ e => setLocation(e.target.value)}></input>
                        <input className="date-in" type="date" name="location"></input>
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