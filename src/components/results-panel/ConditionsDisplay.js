import { FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from "react";
import gsap from "gsap";
//Components
import ConditionsDetail from "./ConditionsDetail";
import FavoriteIcon from "./FavoriteIcon";


function ConditionsDisplay({resortData, favoriteStatus, setLng, setLat, setOpen}) {
    const [displayStatus, setDisplayStatus]  = useState(false);

    let desc = resortData.conditions.current.description;
    if (desc.length < 1) {
        desc = "Snow Condition Unknown"
    };

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
        e.stopPropagation();
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

    const focusLocation = (e) => {
        e.stopPropagation();
        setLng(resortData.location.lng);
        setLat(resortData.location.lat);
        //closes bottom panel for mobile devices
        if (window.innerWidth < 950) {
            setOpen(false);
        }
    }


    if (displayStatus) {
        return (
            <div className="resort-conditions-display" onClick={expandCollapse}>

                <div className="resort-conditions-header">

                    <FavoriteIcon resortData={resortData} favoriteStatus={favoriteStatus}/>

                    <div className='location' onClick={focusLocation}>
                        <div className="header-icon" >
                            <FaMapMarkerAlt/>
                        </div>
                        <p>{resortData.location.region}, {resortData.location.country}</p>
                    </div>

                    <div className='rating'>
                        <p className={`rating-${ratingVal} value`}>{resortData.conditions.forecast[0].rating} </p>
                        <p className={`rating-${ratingVal} desc`}>{desc}</p>
                    </div>

                    <button className="expand-collapse-btn" onClick={expandCollapse}>
                        <div className="expand-collapse-icon">
                            <div className={`bar-1-${resortData.refId}`}></div>
                            <div className={`bar-2-${resortData.refId}`}></div>
                        </div>
                    </button>
    
                </div>

                <ConditionsDetail resortData={resortData} />

            </div>
        );

    } else {
        return (
            <div className="resort-conditions-display" onClick={expandCollapse}>

                <div className="resort-conditions-header">

                    <FavoriteIcon resortData={resortData} favoriteStatus={favoriteStatus}/>

                    <div className='location' onClick={focusLocation}>
                        <div className="header-icon">
                            <FaMapMarkerAlt/>
                        </div>
                        <p>{resortData.location.region}, {resortData.location.country}</p>
                    </div>

                    <div className='rating'>
                        <p className={`rating-${ratingVal} value`}>{resortData.conditions.forecast[0].rating} </p>
                        <p className={`rating-${ratingVal} desc`}>{desc}</p>
                    </div>

                    <button className="expand-collapse-btn" onClick={expandCollapse}>
                        <div className="expand-collapse-icon">
                            <div className={`bar-1-${resortData.refId}`}></div>
                            <div className={`bar-2-${resortData.refId}`}></div>
                        </div>
                    </button>
    
                </div>

            </div>
        );
    }

  }
  
  export default ConditionsDisplay;