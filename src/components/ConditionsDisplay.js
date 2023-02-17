import Timeline from "./calendar/Timeline";
import ConditionsDetail from "./ConditionsDetail";
import { FaSort, FaPlus, FaStar, FaRegStar, FaLocationArrow, FaCrosshairs } from 'react-icons/fa';
import { useState } from "react";
import gsap from "gsap";


function ConditionsDisplay({resortData}) {
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
            console.log("close");
            minusToPlus();
            setDisplayStatus(false);
        } else {
            console.log("open");
            plusToMinus();
            setDisplayStatus(true);
        }
    }

    const plusToMinus = () => {
        gsap.to(`.bar-1-${resortData.refId}`, {
            duration: 0.5,
            rotation: 360,
            delay: 0.2,
        });
        gsap.to(`.bar-2-${resortData.refId}`, {
            duration: 0.5,
            rotation: 360,
            delay: 0.2,
        });

    }

    const minusToPlus = () => {
        //Rotate
        gsap.to(`.bar-1-${resortData.refId}`, {
            duration: 0.5,
            rotation: 0,
        });
        gsap.to(`.bar-2-${resortData.refId}`, {
            duration: 0.5,
            rotation: 90,
        });
    }


    let ratingVal = "na"
    if (Number(resortData.conditions.forecast[0].rating) > 7.5) {
        ratingVal = "best";
    } else if (Number(resortData.conditions.forecast[0].rating) > 5) {
        ratingVal = "good";
    } else if (Number(resortData.conditions.forecast[0].rating) > 2.5) {
        ratingVal = "ok";
    } else if (Number(resortData.conditions.forecast[0].rating) > 0) {
        ratingVal = "bad";
    } 


    if (displayStatus) {
        return (
            <div className="resort-conditions-display">
                <div className="resort-conditions-header">
    
                    <div className="expand-collapse-btn" onClick={expandCollapse}>
                        <div className={`bar-1-${resortData.refId}`}></div>
                        <div className={`bar-2-${resortData.refId}`}></div>
                        {/* <div className={`bar-3-${resortData.refId}`}></div> */}
                    </div>
    
                    <p className={`rating-${ratingVal}`}>{resortData.conditions.forecast[0].rating}</p>
    
                    <p className="resort-name">{resortData.name}</p>

                    <div className="header-icon" onClick={expandCollapse}>
                        <FaCrosshairs/>
                    </div>

                    <div className="header-icon" onClick={expandCollapse}>
                        <FaRegStar/>
                    </div>
    
                </div>

                {/* <div className="resort-conditions-calendar">
                    <Timeline dataIn={resortData.conditions.history}/>
                </div> */}

                <ConditionsDetail resortData={resortData} />

            </div>
        );

    } else {
        return (
            <div className="resort-conditions-display">
                <div className="resort-conditions-header">
    
                    <div className="expand-collapse-btn" onClick={expandCollapse}>
                        <div className={`bar-1-${resortData.refId}`}></div>
                        <div className={`bar-2-${resortData.refId}`}></div>
                        {/* <div className={`bar-3-${resortData.refId}`}></div> */}
                    </div>
    
                    <p className={`rating-${ratingVal}`}>{resortData.conditions.forecast[0].rating}</p>
    
                    <p className="resort-name">{resortData.name}</p>

                    <div className="header-icon" onClick={expandCollapse}>
                        <FaCrosshairs/>
                    </div>

                    <div className="header-icon" onClick={expandCollapse}>
                        <FaRegStar/>
                    </div>
    
                </div>


            </div>
        );
    }

  }
  
  export default ConditionsDisplay;