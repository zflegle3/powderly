import { FaTemperatureLow, FaTint, FaSnowflake, FaWind, FaSort, FaPlus, FaStar, FaRegStar, FaLocationArrow, FaCrosshairs } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { DateTime } from 'luxon'
import ForecastDateItem from './ForecastDateItem';


function ForecastDisplay({forecastData}) {
    const [expandSelected, setExpandSelected] = useState(0);


    let forecast = forecastData.map(forecast => {
        let position = forecastData.indexOf(forecast);
        let expandStatus = false;
        if (position === expandSelected) {
            expandStatus = true;
        };
        return <ForecastDateItem key={forecast.date} position={position} expandStatus={expandStatus} forecastData={forecast} setExpandSelected={setExpandSelected}/>
    })


    useEffect(() => {
        if (expandSelected) {
            document.getElementById(`date-item-${expandSelected}`).classList.add("expanded")
        }
    });


    return (
        <div className="resort-conditions-forecast">
            {forecast}
        </div>
    );
};
  
export default ForecastDisplay;