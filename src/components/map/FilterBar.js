// import { GoogleMap, MarkerF, getBounds, Marker, Size } from "@react-google-maps/api"
// import { useMemo } from "react";
import { useState, useEffect, useRef } from "react";
// import { ReactComponent as Greaticon } from '../svgs/bestIcon.svg';
// import IconPng from "../svgs/bestIcon.png";
// import mapStyles from "../custom-styles/mapStyles";
// import PlacesAutocomplete from "./PlacesAutocomplete.js";
// import SearchBar from "./SearchBar.js"


function FilterBar({resorts, lat, lng, setSort}) {
    const [filters, setFilters] = useState([
        {
            title:"A to Z",
            titleLong:"alphabetical A to Z",
            id: 1,
            status: "selected",
        },
        {
            title:"Z to A",
            titleLong:"alphabetical Z to A",
            id: 2,
            status: "",
        },
        {
            title:"Rating",
            titleLong:"current conditions rating",
            id: 3,
            status: "",
        },
        {
            title:"Favorites",
            titleLong:"your favorite resorts",
            id: 4,
            status: "",
        },
        {
            title:"Fresh Snow",
            titleLong:"fresh snowall total (in.)",
            id: 5,
            status: "",
        },
        {
            title:"24 hr Snow",
            titleLong:"snowfall total within 24 hrs (in.)",
            id: 6,
            status: "",
        },
        {
            title:"72 hrs Snow",
            titleLong:"snowfall total within 72 hrs (in.)",
            id: 7,
            status: "",
        },
        {
            title:"Peak Depth",
            titleLong:"snow depth at resort peak (in.)",
            id: 8,
            status: "",
        },
        {
            title:"Base Depth",
            titleLong:"snow depth at resort base (in.)",
            id: 9,
            status: "",
        },

    ]);

    const handleBtnClick = (e) => {
        e.preventDefault();
        //reset status of all filters
        let filtersTemp = [...filters];
        filtersTemp.forEach(filter => filter.status = "");
        //find selected filter and add status
        let selectedFilter = filters.filter(filterObj => filterObj.id === Number(e.target.id))[0];
        filtersTemp[selectedFilter.id-1].status = "selected";
        setSort(selectedFilter);
        setFilters(filtersTemp);
    }

    let filterBtns = filters.map((item) => {
        return(<button key={item.id} className={`filter-btn ${item.status}`} id={item.id} onClick={handleBtnClick}>{item.title}</button>)
    })

    return (

        <div className="filter-bar">
            {filterBtns}
        </div>
    );
  }
  
  export default FilterBar;