import { FaTemperatureLow, FaTint, FaSnowflake, FaWind, FaSort, FaPlus, FaStar, FaRegStar, FaLocationArrow, FaCrosshairs } from 'react-icons/fa';
import { useState } from "react";
import { DateTime } from 'luxon'


function ForecastDateItem({forecastData}) {
    const [dateOut, setDateOut] = useState(DateTime.fromISO(forecastData.date));
    // const [dateOut, setDateOut] = useState(DateTime.fromISO(forecastData.date.toISOString()));

    const weekdayShort = (day) => {
        switch (day) {
            case 1:
              return "Mon"
              break;
            case 2:
                return "Tue"
                break;
            case 3:
                return "Wed"
                break;
            case 4:
                return "Thu"
                break;
            case 5:
                return "Fri"
                break;
            case 6:
                return "Sat"
                break;
            case 7:
                return "Sun"
                break;
            default:
          }
    }

    console.log(forecastData.date);
    // console.log(forecastData.date.toISOString());
    return (
        <div className="forecast-item">
            <div className="forecast-header">
                <p>{weekdayShort(dateOut.weekday)}</p>
            </div>
        </div>
    );
  }
  
  export default ForecastDateItem;