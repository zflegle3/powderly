// import axios from "axios";
// import { useState, useEffect } from 'react';
// import {
//     Link,
//     useNavigate
// } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {login, reset} from "../../features/auth/authSlice";
// import {validateUsernameEmail } from "../../features/auth/validation";
// import { addFocus, removeFocus} from '../../custom-styles/style';

import gsap from "gsap";
import { useEffect } from "react";
import snowflake from "../images/snowflake.png"

// //Components
// import PasswordInput from "./PasswordInput";
// // import LoadingSpinner from "../LoadingSpinner";


function Logo({size}) {

    const spinnyBoi = () => {
        gsap.to(`.logo-spinner`, {
            duration: 3,
            rotation: 720,
            ease: "power1",
            repeatDelay: 2,
            repeat: -1,
        });
    
    }

    useEffect(() => {
        //resets auth state anytime dependencies change
        spinnyBoi();
      },[]);

    return(
        <div className={`logo ${size}`}>
            <h1>P</h1>
            <img src={snowflake} alt="snowflake rotating" className="logo-spinner"></img>
            <h1>wderly</h1>
        </div>
    )
} 

export default Logo;