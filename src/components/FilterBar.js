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
            title:"A to Z",
            titleLong:"Alphabetical A to Z",
            id: 1
        },
        {
            title:"Rating",
            titleLong:"Current Conditions Rating",
            id: 1
        },
        {
            title:"Fresh Snow",
            titleLong:"Fresh Snowall total (in.)",
            id: 2
        },
        {
            title:"24 hr Snow",
            titleLong:"Snowfall total within 24 hrs (in.)",
            id: 3
        },
        {
            title:"72 hrs Snow",
            titleLong:"Snowfall total within 72 hrs (in.)",
            id: 4
        },
        {
            title:"Peak Depth",
            titleLong:"Snow depth at resort peak (in.)",
            id: 5
        },
        {
            title:"Base Depth",
            titleLong:"Snow depth at resort base (in.)",
            id: 6
        },
        {
            title:"Favorites",
            titleLong:"Your favorite resorts",
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