import { FaTemperatureLow, FaTint, FaSnowflake, FaWind, FaSort, FaPlus, FaStar, FaRegStar, FaLocationArrow, FaCrosshairs } from 'react-icons/fa';
import { useState } from "react";
import { DateTime } from 'luxon'
import { ReactComponent as PartlyCloudy } from "../../images/weather-icons/static/cloudy-day-1.svg";
import {cToF, kphToMph, cmToIn} from "../../features/units"


function ForecastDateItem({forecastData, expandStatus, position, setExpandSelected}) {
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

    const weekdayLong = (day) => {
        switch (day) {
            case 1:
              return "Monday"
              break;
            case 2:
                return "Tuesday"
                break;
            case 3:
                return "Wedneday"
                break;
            case 4:
                return "Thursday"
                break;
            case 5:
                return "Friday"
                break;
            case 6:
                return "Saturday"
                break;
            case 7:
                return "Sunday"
                break;
            default:
          }
    }

    const expandForecastDisplay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandSelected(position);
    };



    if (expandStatus) {
        return (
            <div className="forecast-item expanded" id={`date-item-${position}`} onClick={expandForecastDisplay}>
                <div className="forecast-header">
                    <p className='forecast-date'>{weekdayLong(dateOut.weekday)}</p>
                    <div className='forecast-primary'>
                        <PartlyCloudy />
                        {/* <p>{cToF(forecastData.snowfall)}"</p> */}
                        <p>{6.9}"</p>
                    </div>
                    <div className='forecast-secondary'>

                        <div className='forecast-detail-item'>
                            <p>High/Low:</p>
                            <p>{cToF(forecastData.tempHigh)} / {cToF(forecastData.tempsLow)} °F</p>
                        </div>

                        <div className='forecast-detail-item'>
                            <p>Feels Like:</p>
                            <p>{cToF(forecastData.windChillHigh)} / {cToF(forecastData.windChillLow)} °F</p>
                        </div>

                        <div className='forecast-detail-item'>
                            <p>Wind:</p>
                            <p>{kphToMph(forecastData.windMax)} mph</p>
                        </div>

                        <div className='forecast-detail-item'>
                            <p>Humidity:</p>
                            <p>{50}%</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="forecast-item compact" id={`date-item-${position}`} onClick={expandForecastDisplay}>
                <div className="forecast-header">
                <p className='forecast-date'>{weekdayShort(dateOut.weekday)}</p>
                    <div className='forecast-primary'>
                        <PartlyCloudy />
                        <p>{4.1}"</p>
                    </div>
                </div>
            </div>
        );
    };
  };
  
  export default ForecastDateItem;