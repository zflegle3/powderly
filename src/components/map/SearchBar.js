import { useState } from "react";
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import PlacesAutocomplete from "./PlacesAutocomplete.js";
import { openAccountModal } from "../../features/modals/modalSlice";



function SearchBar({setSelected, selected, profileImage}) {
    const dispatch = useDispatch();
    const [ setLocation ] = useState("Search any Location...");
    const [ date ] = useState(new Date());

    const openAccount = () => {
        //changes edit status to edit inputs
        dispatch(openAccountModal());
    }

    return (
        <div className="search-container">
            <div className="search-bar">
                <div className="search-submit">
                    <FaSearch />
                </div>
                <div className="search-display">
                <form className="search-form">
                    <PlacesAutocomplete setSelected={setSelected} setLocation={setLocation} />
                </form>
                <p>{date.toDateString()}</p>
                </div >
                <div className="account-avatar" onClick={openAccount}>
                    <img src={profileImage} alt="profile avatar" className='account-img'/>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;