// import { GoogleMap, MarkerF, getBounds, Marker, Size } from "@react-google-maps/api"
// import { useMemo } from "react";
import { useState, useEffect, useRef } from "react";
// import { ReactComponent as Greaticon } from '../svgs/bestIcon.svg';
// import IconPng from "../svgs/bestIcon.png";
// import mapStyles from "../custom-styles/mapStyles";
// import PlacesAutocomplete from "./PlacesAutocomplete.js";
// import SearchBar from "./SearchBar.js"


function FilterBar({resorts, lat, lng}) {
    const [filters, setFilters] = useState([
        {
            title:"Conditions Rating",
            id: 1
        },
        {
            title:"Fresh Snow",
            id: 2
        },
        {
            title:"24 hrs",
            id: 3
        },
        {
            title:"72 hrs",
            id: 4
        },
        {
            title:"Peak Depth",
            id: 5
        },
        {
            title:"Base Depth",
            id: 6
        },
        {
            title:"Favorites",
            id: 7
        },
    ]);

    const handleBtnClick = (e) => {
        e.preventDefault();
        console.log(e.target.id);
    }

    let filterBtns = filters.map((item) => {
        return(<button key={item.id} className="filter-btn" id={item.title} onClick={handleBtnClick}>{item.title}</button>)
    })

    return (

        <div className="filter-bar">
            {filterBtns}
        </div>
    );
  }
  
  export default FilterBar;