import {
    Link,
    useParams
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

import PasswordInput from "../auth/PasswordInput"
import { FaRegCheckCircle, FaCheck, FaRegTimesCircle } from 'react-icons/fa';


function PasswordChange({togglePasswordChange, newPassword, setNewPassword, currentPassword, setCurrentPassword}) {

    async function resetPassword(e) {
        e.preventDefault();
        //validate passwords have correct format
        let passwordIn = document.getElementById("pass-in").value;
        resetErrors();
        //validate password meets criteria
        // if (checkNewPass(passwordIn)) {
        //     //validate password is different from previous
        //     if (await checkPassDb(id, passwordIn)) {
        //         //update user data with new password in db
        //         let payload = {
        //             id: id,
        //             token: token,
        //             password: passwordIn
        //         }
        //         let responseUpdate = await axios.post("http://localhost:8080/user/resetpass", payload);
        //         if (responseUpdate.data.updateStatus) {
        //             //submit status conditionally renders confirmation once complete
        //             setSubmitStatus(true);
        //         } else {
        //             document.querySelector(".form-item-container.pass-in").classList.add("invalid");
        //             document.getElementById("pass-error").textContent = "There was an error updating the password. Please try again.";
        //         }
        //     } else {
        //         document.querySelector(".form-item-container.pass-in").classList.add("invalid");
        //         document.getElementById("pass-error").textContent = "New password must not match a previous password";
        //     }
        // } else {
        //     document.querySelector(".form-item-container.pass-in").classList.add("invalid");
        //     document.getElementById("pass-error").textContent = "Password does not meet criteria";
        // }
    }

    const checkNewPass = (passwordIn) => {
        let passTest = true;
        let passErrorLen = document.getElementById("pass-error-signin-length");
        let passErrorUp = document.getElementById("pass-error-signin-upper");
        let passErrorNum = document.getElementById("pass-error-signin-number");
        let passErrorSp = document.getElementById("pass-error-signin-special");
        //8 characters
        if(passwordIn.length < 8) {
            passTest = false;
            passErrorLen.classList = "";
        } else {
            passErrorLen.classList = "valid";
        }
        //uppercase
        if(!passwordIn.match(/[A-Z]/g)) {
            passTest = false;
            passErrorUp.classList = "";
        } else {
            passErrorUp.classList = "valid";
        }
        //number
        if(!passwordIn.match(/[0-9]/g)) {
            passTest = false;
            passErrorNum.classList = "";
        } else {
            passErrorNum.classList = "valid";
        }
        // special character
        if(!passwordIn.match(/[!@#\$%\^&\*]/g)) {
            passTest = false;
            passErrorSp.classList = "";
        } else {
            passErrorSp.classList = "valid";
        }
        return passTest;
    };

    async function checkPassDb (idIn, passIn) {
        const responsePass = await axios.post("http://localhost:8080/user/read/password", {id: idIn, password: passIn});
        return responsePass.data.passMatch;
    }

    

    const addFocus = (e) => {
        e.target.parentElement.parentElement.classList.add("focus");
    }

    const removeFocus = (e) => {
        e.target.parentElement.parentElement.classList.remove("focus");
    }

    
    const resetErrors = () => {
        let passItem = document.querySelector(".form-item-container.pass-in");
        if (passItem.classList.contains("invalid")) {
            passItem.classList.remove("invalid");
            document.getElementById("pass-error").textContent = "Password Error";
        }
    }

    return (
        <>
            <button onClick={togglePasswordChange}>Cancel Change Password</button>

            <div className={`form-item-container pass-current`}>
                <label htmlFor="pass-current">current password</label>
                <div className="input-container pass-in">
                    <input type="password" id="pass-current" name="pass-current" placeholder="Current password" onFocus={addFocus} onBlur={removeFocus} onChange={e => setCurrentPassword(e.target.value)}></input>
                </div>
                <p id="pass-error-current">Password Error</p>
            </div> 

            <div className={`form-item-container pass-in`}>
                <label htmlFor="pass-new">new password</label>
                <div className="input-container pass-in">
                    <input type="password" id="pass-new" name="pass-new" placeholder="New password" onFocus={addFocus} onBlur={removeFocus} onChange={e => setNewPassword(e.target.value)}></input>
                </div>
                <p id="pass-error">Password Error</p>
            </div> 

            <div className="pass-error-container">
                <div id="pass-error-signin-length">
                    <div>
                        <FaRegCheckCircle />
                    </div>
                    <p>have at least 8 characters</p>
                </div>
                <div id="pass-error-signin-upper">
                    <div>
                        <FaRegCheckCircle />
                    </div>
                    <p >have at least 1 Upper characters</p>
                </div>
                <div id="pass-error-signin-number">
                    <div>
                        <FaRegCheckCircle />
                    </div>
                    <p >have at least 1 number</p>
                </div>
                <div id="pass-error-signin-special">
                    <div>
                        <FaRegCheckCircle />
                    </div>
                    <p >have at least 1 special character (i.e. ! @ # $ % ^ & *)</p>
                </div>
            </div>
        
        </>
    )
}


export default PasswordChange;