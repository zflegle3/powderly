import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch, FaInfo, FaRegUserCircle } from 'react-icons/fa';
import PlacesAutocomplete from "./PlacesAutocomplete.js";
import FilterBar from "./FilterBar"
import {openAccountModal} from "../features/modals/modalSlice";



function SearchBar({setSelected, selected, editStatus, setEditStatus, profileImage}) {
    const dispatch = useDispatch();
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

    const openAccount = () => {
        //changes edit status to edit inputs
        console.log("Open Account Info");
        dispatch(openAccountModal());
    }

    // if (!editStatus) {
    //     return (
    //         <div className="search-container">
    //             <div className="search-bar">
    //                 <div className="search-submit" onClick={handleSearchBtn}>
    //                     <FaSearch />
    //                 </div>
    //                 <div className="search-display" onClick={editSearch}>
    //                     <p>{location}</p>
    //                     <p>{date.toDateString()}</p>
    //                 </div>
    //                 <div className="account-avatar" onClick={openAccount}>
    //                     <img src={profileImage} alt="profile avatar" className='account-img'/>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else {
        return (
            <div className="search-container">
                <div className="search-bar">
                    <div className="search-submit" onClick={handleSearchBtn}>
                        <FaSearch />
                    </div>
                    <div className="search-display">
                    <form className="search-form" onClick={editSearch}>
                        {/* <input className="location-in" type="text" name="location" onChange={ e => setLocation(e.target.value)}></input> */}
                        <PlacesAutocomplete setSelected={setSelected} setEditStatus={setEditStatus} setLocation={setLocation} />
                        {/* <input className="date-in" type="date" name="location"></input> */}
                    </form>
                    <p>{date.toDateString()}</p>
                    </div >

                    <div className="account-avatar" onClick={openAccount}>
                        <img src={profileImage} alt="profile avatar" className='account-img'/>
                    </div>
                </div>
            </div>
        );
    // }
}

export default SearchBar;