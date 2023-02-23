import { useSelector, useDispatch } from 'react-redux';
import { FaSort, FaPlus, FaStar, FaRegStar, FaLocationArrow, FaSearchLocation, FaCrosshairs } from 'react-icons/fa';
import { useState } from "react";
import gsap from "gsap";
//Components
import ConditionsDetail from "./ConditionsDetail";
import FavoriteIcon from "./FavoriteIcon";


function ConditionsDisplay({resortData, favoriteStatus, setLng, setLat}) {
    const [displayStatus, setDisplayStatus]  = useState(false);
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

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

    const expandCollapse = (e) => {
        e.preventDefault();
        if (displayStatus) {
            minusToPlus();
            setDisplayStatus(false);
        } else {
            plusToMinus();
            setDisplayStatus(true);
        }
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

    const focusLocation = () => {
        setLng(resortData.location.lng);
        setLat(resortData.location.lat);
    }


    if (displayStatus) {
        return (
            <div className="resort-conditions-display" >
                <div className="resort-conditions-header">

                    <button className="expand-collapse-btn" onClick={expandCollapse}>

                        <div className="expand-collapse-icon">
                            <div className={`bar-1-${resortData.refId}`}></div>
                            <div className={`bar-2-${resortData.refId}`}></div>
                            {/* <div className={`bar-3-${resortData.refId}`}></div> */}
                        </div>
        
                        <p className={`rating-${ratingVal}`}>{resortData.conditions.forecast[0].rating} </p>
        
                        <p className="resort-name">{resortData.name}</p>

                    </button>

                    <div className="header-icon" onClick={focusLocation}>
                        <FaSearchLocation/>
                    </div>

                    <FavoriteIcon resortData={resortData} favoriteStatus={favoriteStatus}/>
    
                </div>

                <ConditionsDetail resortData={resortData} />

            </div>
        );

    } else {
        return (
            <div className="resort-conditions-display">
                <div className="resort-conditions-header">
    
                    <button className="expand-collapse-btn" onClick={expandCollapse}>

                        <div className="expand-collapse-icon" >
                            <div className={`bar-1-${resortData.refId}`}></div>
                            <div className={`bar-2-${resortData.refId}`}></div>
                            {/* <div className={`bar-3-${resortData.refId}`}></div> */}
                        </div>

                        <p className={`rating-${ratingVal}`}>{resortData.conditions.forecast[0].rating}</p>

                        <p className="resort-name">{resortData.name}</p>

                    </button>

                    <div className="header-icon" onClick={focusLocation}>
                        <FaSearchLocation/>
                    </div>

                    <FavoriteIcon resortData={resortData} favoriteStatus={favoriteStatus}/>
    
                </div>


            </div>
        );
    }

  }
  
  export default ConditionsDisplay;