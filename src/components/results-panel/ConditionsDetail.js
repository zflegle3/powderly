import Timeline from "../calendar/Timeline";
import { FaTemperatureLow, FaTint, FaSnowflake, FaWind, FaSort, FaPlus, FaStar, FaRegStar, FaLocationArrow, FaCrosshairs } from 'react-icons/fa';
import { useState } from "react";
import ForecastDateItem from "./ForecastDateItem";

function ConditionsDetail({resortData}) {
    const [displayStatus, setDisplayStatus]  = useState(false);

    let cmToIn = 2.54;
    //format data for display
    let baseDepth = (resortData.conditions.current.baseDepth/cmToIn).toFixed(1);
    let topDepth = (resortData.conditions.current.topDepth/cmToIn).toFixed(1);
    let snow24 = (resortData.conditions.current.snow24/cmToIn).toFixed(1);
    let snow72 = (resortData.conditions.current.snow24/cmToIn).toFixed(1);
    let desc = resortData.conditions.current.description;
    if (desc.length < 1) {
        desc = "Snow Condition Unknown"
    };
    let fresh = resortData.conditions.current.freshSnow;
    if (fresh !== "-") {
        fresh = fresh/cmToIn.toFixed(1);
    } else {
        fresh = (0).toFixed(1);
    }

    const expandCollapse = () => {
        if (displayStatus) {
            console.log("close")
            setDisplayStatus(false)
        } else {
            console.log("open")
            setDisplayStatus(true);
        }
    }

    let forecast = resortData.conditions.forecast.map(forecast => {
        return <ForecastDateItem forecastData={forecast}/>
    })



    return (
        <div className="resort-conditions-detail">

            <p className="section-title">current:</p>

            <div className="resort-conditions-current">

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                            <FaSnowflake />
                        </div>
                    <div className="detail-item-header">
                        <p>Fresh Snow</p>
                        <p>{fresh} in.</p>
                    </div>
                </div>

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                            <FaSnowflake />
                        </div>
                    <div className="detail-item-header">
                        <p>24 hrs.</p>
                        <p>{snow24} in.</p>
                    </div>
                </div>

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                            <FaSnowflake />
                        </div>
                    <div className="detail-item-header">
                        <p>72 hrs.</p>
                        <p>{snow72} in.</p>
                    </div>
                </div>

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                            <FaSnowflake />
                        </div>
                    <div className="detail-item-header">
                        <p>Base/Peak</p>
                        <p>{baseDepth}/{topDepth} in.</p>
                    </div>
                </div>

                {/* <div className="lifts-detail">
                    <p>{resortData.lifts.open}/{resortData.lifts.total}</p>
                    <p>Lifts Open</p>
                </div> */}

            </div>

            <p className="section-title">history:</p>

            <div className="resort-conditions-calendar">
                <Timeline dataIn={resortData.conditions.history}/>
            </div>

            <p className="section-title">forecast:</p>

            <div className="resort-conditions-forecast">
                {forecast}
            </div>


        </div>
    );
  }
  
  export default ConditionsDetail;