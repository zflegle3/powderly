import { useState } from "react";
import { DateTime } from 'luxon'
import {cToF, kphToMph, cmToIn} from "../../features/units"
//Images
import { ReactComponent as PartlyCloudy } from "../../images/weather-icons/static/cloudy-day-3.svg";
import { ReactComponent as Cloudy } from "../../images/weather-icons/static/cloudy.svg";
import { ReactComponent as Thunder } from "../../images/weather-icons/static/cloudy.svg";
import { ReactComponent as SnowShowers } from "../../images/weather-icons/static/snowy-1.svg";
import { ReactComponent as LightSnow } from "../../images/weather-icons/static/snowy-4.svg";
import { ReactComponent as ModSnow } from "../../images/weather-icons/static/snowy-5.svg";
import { ReactComponent as HeavySnow } from "../../images/weather-icons/static/snowy-6.svg";
import { ReactComponent as RainShowers } from "../../images/weather-icons/static/rainy-1.svg";
import { ReactComponent as LightRain } from "../../images/weather-icons/static/rainy-4.svg";
import { ReactComponent as ModRain } from "../../images/weather-icons/static/rainy-5.svg";
import { ReactComponent as HeavyRain } from "../../images/weather-icons/static/rainy-6.svg";
import { ReactComponent as Clear } from "../../images/weather-icons/static/day.svg";
import { ReactComponent as Bug } from "../../images/weather-icons/static/night.svg";
import { ReactComponent as Default } from "../../images/weather-icons/static/cloudy-day-1.svg";




function ForecastDateItem({forecastData, expandStatus, position, setExpandSelected}) {
    const [dateOut] = useState(DateTime.fromISO(forecastData.date, { zone: "UTC"}));
    // const [dateOut, setDateOut] = useState(DateTime.fromISO(forecastData.date.toISOString()));

    const weekdayShort = (day) => {
        switch (day) {
            case 1:
              return "Mon"
            case 2:
                return "Tue"
            case 3:
                return "Wed"
            case 4:
                return "Thu"
            case 5:
                return "Fri"
            case 6:
                return "Sat"
            case 7:
                return "Sun"
            default:
          }
    }

    // const weekdayLong = (day) => {
    //     switch (day) {
    //         case 1:
    //             return "Monday"
    //         case 2:
    //             return "Tuesday"
    //         case 3:
    //             return "Wedneday"
    //         case 4:
    //             return "Thursday"
    //         case 5:
    //             return "Friday"
    //         case 6:
    //             return "Saturday"
    //         case 7:
    //             return "Sunday"
    //         default:
    //       }
    // }

    const expandForecastDisplay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandSelected(position);
    };

    const getImage = (weatherDesc) => {
        switch (weatherDesc) {
            case 'light snow':
                return <LightSnow/>;
            case 'mod. snow':
                return <ModSnow/>;
            case 'snow shwrs':
                return <SnowShowers/>;
            case 'heavy snow':
                return <HeavySnow/>;
            case 'cloudy':
                return <Cloudy/>;
            case 'some clouds':
                return <PartlyCloudy/>;
            case 'light rain':
                return <LightRain/>;
            case 'mod. rain':
                return <ModRain/>;
            case 'heavy rain':
                return <HeavyRain/>;
            case 'rain shwrs':
                return <RainShowers/>;
            case 'risk thun- der':
                return <Thunder/>;
            case 'clear':
                return <Clear/>;
            case '':
                return <Bug/>;
            default:
              return <Default/>;
          }

    }

    if (expandStatus) {
        return (
            <div className="forecast-item expanded" id={`date-item-${position}`} onClick={expandForecastDisplay}>
                <div className="forecast-header">
                    <p className='forecast-date'>{dateOut.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
                    <div className='forecast-primary'>
                        {getImage(forecastData.descriptions[1])}
                        <p>{cmToIn(forecastData.snowfall)}"</p>
                    </div>
                    <div className='forecast-secondary'>

                        <div className='forecast-detail-item'>
                            <p>High/Low:</p>
                            <p>{cToF(forecastData.tempHigh)} / {cToF(forecastData.tempLow)} °F</p>
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
                            <p>{forecastData.humidity}%</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="forecast-item compact" id={`date-item-${position}`} onClick={expandForecastDisplay}>
                <div className="forecast-header">
                <p className='forecast-date'>{weekdayShort(dateOut.toUTC().weekday)}</p>
                    <div className='forecast-primary'>
                        {getImage(forecastData.descriptions[1])}
                        <p>{cmToIn(forecastData.snowfall)}"</p>
                    </div>
                </div>
            </div>
        );
    };
  };
  
  export default ForecastDateItem;