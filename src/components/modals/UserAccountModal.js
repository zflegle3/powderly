import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {closeModal} from "../../features/modals/modalSlice"
import { update, logout, resetUser, remove } from '../../features/auth/authSlice';
import { FaRegMoon, FaSun  } from 'react-icons/fa';
import {checkNewUserName, checkFirstName, checkLastName, checkNewEmail, checkNewPass, checkPassDb} from "../../features/auth/validation";
import { addFocus, removeFocus} from '../../custom-styles/style';
//Componenets
import PasswordChange from './PasswordChange';


function UserAccountModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)
    //passStatus determines if user is editing their password
    //true for editing, false for not editing 
    const [passStatus, setPassStatus] = useState(false);
    //input variables from user 
    const [firstIn, setFirstIn] = useState(user.first_name);
    const [lastIn, setLastIn] = useState(user.family_name);
    const [usernameIn, setUsernameIn] = useState(user.username);
    const [emailIn, setEmailIn] = useState(user.email);
    const [themeIn, setThemeIn] = useState(user.theme);
    const [favoritesIn, setFavoritesIn] = useState(user.favorites);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");


    const close = (e) => {
        //open/close modal via redux state
        e.preventDefault();
        dispatch(closeModal())
    }

    const deleteUser = (e) => {
        e.preventDefault();
        //send alert to conform
        if (window.confirm("Are you sure you want to delete your account?")) {
            console.log("delete user", user._id);
            dispatch(remove(user._id)); //deletes user from db
            dispatch(logout()); //removes user from local storage
            dispatch(resetUser()); //resets redux state
            dispatch(closeModal()); //resets redux state
            navigate("/"); //navigates to login
        } else {
            console.log("keep user");
        }   
    }

    const onLogout = () => {
        //logs out user using redux state and navigates to login page
        dispatch(logout());
        dispatch(resetUser());
        dispatch(closeModal());
        navigate("/");
    }

    const togglePasswordChange = (e) => {
        //toggles pass status to hide/show password form
        e.preventDefault();
        console.log("change password")
        if (passStatus) {
            setPassStatus(false)
        } else {
            setPassStatus(true)
        }
    }


    const submitChanges = async (e) => {
        e.preventDefault();
        console.log("submit account changes");
        //Reset any error text values
        resetErrors();
        //VALIDATE INPUTS
        //First and Last names - not empty 
        let firstNameValid = true;
        if (firstIn !== user.first_name) {
            firstNameValid = checkFirstName(firstIn);
        } 
        let lastNameValid = true;
        if (lastIn !== user.family_name) {
            lastNameValid = checkLastName(lastIn);
        } 
        //Username
        let usernameValid = true;
        if (usernameIn !== user.username) {
            usernameValid = await checkNewUserName(usernameIn);
        } 
        //Email
        let emailValid = true;
        if (emailIn !== user.email) {
            emailValid = await checkNewEmail(emailIn);
        } 
        //Password Current
        let currentPasswordValid = true;
        if (passStatus) {
            if (currentPassword.length > 0) {
                if (await checkPassDb(user._id,currentPassword)) {
                    //returns true if current password does not match id password
                    document.querySelector(".form-item-container.pass-current").classList.add("invalid");
                    document.getElementById("pass-error-current").textContent = "Invalid credentials";
                    currentPasswordValid= false;
                }
            } else {
                document.querySelector(".form-item-container.pass-current").classList.add("invalid");
                document.getElementById("pass-error-current").textContent = "Cannot be empty";
                currentPasswordValid= false;
            }
        }
        //Password New
        let newPasswordValid = true;
        if (passStatus) {
            //matching passwords
            if (currentPassword !== newPassword) {
                newPasswordValid = checkNewPass(newPassword);
            } else {
                document.querySelector(".form-item-container.pass-in").classList.add("invalid");
                document.getElementById("pass-error").textContent = "Password must be different from current password";
                newPasswordValid = false;
            }
        }
        //if all conditions are met, dispatch update
        //create new user payload
        if (firstNameValid && lastNameValid && usernameValid && emailValid && currentPasswordValid && newPasswordValid) {
            console.log("updating user...");
            let newUserPayload;
            if (passStatus) {
                newUserPayload = {
                    id: user._id,
                    first_name: firstIn,
                    family_name: lastIn,
                    username: usernameIn,
                    email: emailIn,
                    password: newPassword,
                    favorites: favoritesIn,
                    theme: document.querySelector('input[name="color-theme"]:checked').value,
                }
    
            } else {
                //not updating password
                newUserPayload = {
                    id: user._id,
                    first_name: firstIn,
                    family_name: lastIn,
                    username: usernameIn,
                    email: emailIn,
                    password: null,
                    favorites: favoritesIn,
                    theme: document.querySelector('input[name="color-theme"]:checked').value,
                }
            }
            //dispatch user update put call
            console.log(newUserPayload);
            dispatch(update(newUserPayload));
        }
    }


    const resetErrors = () => {
        let userFirstNameItem = document.querySelector(".form-item-container.name-first");
        if (userFirstNameItem.classList.contains("invalid")) {
            userFirstNameItem.classList.remove("invalid");
            document.getElementById("name-first-error").textContent = "First name error";
        }
        let userLastNameItem = document.querySelector(".form-item-container.name-last");
        if (userLastNameItem.classList.contains("invalid")) {
            userLastNameItem.classList.remove("invalid");
            document.getElementById("name-last-error").textContent = "Last name error";
        }
        let usernameItem = document.querySelector(".form-item-container.user-name-in");
        if (usernameItem.classList.contains("invalid")) {
            usernameItem.classList.remove("invalid");
            document.getElementById("user-name-error").textContent = "Username Error";
        }
        let emailItem = document.querySelector(".form-item-container.email-in");
        if (emailItem.classList.contains("invalid")) {
            emailItem.classList.remove("invalid");
            document.getElementById("email-error").textContent = "Email Error";
        }
        if (passStatus) {
            let passItem = document.querySelector(".form-item-container.pass-in");
            if (passItem.classList.contains("invalid")) {
                passItem.classList.remove("invalid");
                document.getElementById("pass-error").textContent = "Password Error";
            }
            let passCurrItem = document.querySelector(".form-item-container.pass-current");
            if (passCurrItem.classList.contains("invalid")) {
                passCurrItem.classList.remove("invalid");
                document.getElementById("pass-error-current").textContent = "Password Error";
            }
        }
    }


    //FORM CONDITIONAL RENDERING FUNCTIONS
    //Password Form
    let passChange = <div className='btn-container'>
            <button onClick={togglePasswordChange}>Change Password</button>
            <button onClick={deleteUser}>Delete Account</button>
        </div>;
    if (passStatus) {
        passChange = <PasswordChange currentPassword={currentPassword} setCurrentPassword={setCurrentPassword} newPassword={newPassword} setNewPassword={setNewPassword} togglePasswordChange={togglePasswordChange}/>;
    }
    //Favorite buttons
    let favorites = <p>You have not selected any favorite resorts yet.</p>
    if (favoritesIn.length >0) {
        favorites = favoritesIn.map(favorite => {
            <button>
                <p>X</p>
                <p>Breckenridge</p>
            </button>
        })
    };
    //Radio Button checked
    useEffect(() => {
        if (themeIn === "light") {
            document.getElementById("light").checked = true;
        } else {
            document.getElementById("dark").checked = true;
        }
    },[]);


    return (
        <div className="user-account-modal" >
            <div className='modal-header'>
                <div className='header-text'>
                    <h1>Account Information</h1>
                    <p>Manage your personal details and preferences here</p>
                </div>
                <button onClick={close}>
                    X
                </button>
            </div>

            <form className='account-settings-form'>

                <h2 className='modal-section-header'>Profile Details</h2>

                <div className='profile-image-container'>

                    <div className='account-img'></div>

                    <div className='account-img-upload'>
                        <h2>Update your profile picture</h2>
                        <p>Upload a photo under 2 MB</p>
                        <label htmlFor="image-upload" className="custom-file-upload">
                            <input id="image-upload" type="file"/>
                            Choose a File
                        </label>
                        
                    </div>

                </div>
                
                <div className='form-input-container'>

                    <div className='names-container'>

                        <div className="form-item-container name-first">
                            <label htmlFor="name-first">first name</label>
                            <div className="input-container">
                                <input type="text" id="name-first" name="name-first" value={firstIn} onFocus={addFocus} onBlur={removeFocus} onChange={e => setFirstIn(e.target.value)}></input>
                            </div>
                            <p id="name-first-error">first name error</p>
                        </div>

                        <div className="form-item-container name-last">
                            <label htmlFor="name-last">last name</label>
                            <div className="input-container">
                                <input type="text" id="name-last" name="name-last" value={lastIn} onFocus={addFocus} onBlur={removeFocus} onChange={e => setLastIn(e.target.value)} ></input>
                            </div>
                            <p id="name-last-error">last name error</p>
                        </div>

                    </div>

                    <div className="form-item-container user-name-in">
                        <label htmlFor="user-name-in">username</label>
                        <div className="input-container">
                            <input type="text" id="user-name-in" name="user-name-in" value={usernameIn} onFocus={addFocus} onBlur={removeFocus} onChange={e => setUsernameIn(e.target.value)} ></input>
                        </div>
                        <p id="user-name-error">username error</p>
                    </div>

                    <div className="form-item-container email-in">
                        <label htmlFor="email-in">email</label>
                        <div className="input-container">
                            <input type="email-in" id="email" name="email-in" value={emailIn} onFocus={addFocus} onBlur={removeFocus} onChange={e => setEmailIn(e.target.value)} ></input>
                        </div>
                        <p id="email-error">email error</p>
                    </div>


                    <div className='password-container'>
                        {passChange}
                    </div>

                </div>

                <h2 className='modal-section-header'>Preferences</h2>
                <p className="color-theme-label">map color theme</p> 
                <ul className='color-theme-container'> 
                    <li>
                        <input type="radio" id="light" value="light" name="color-theme"></input>
                        <label htmlFor="light">
                            <div>
                                <FaSun/>
                            </div>
                            <p>Light Mode</p>
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="dark" value="dark" name="color-theme"></input>
                        <label htmlFor="dark">
                            <div>
                                <FaRegMoon/>
                            </div>
                            <p>Dark Mode</p>
                        </label>
                    </li>
                </ul>

                <p className="color-theme-label">favorites</p> 
                <div className='favorites-container'>
                    {favorites}
                    {/* <button>
                        <p>X</p>
                        <p>Breckenridge</p>
                    </button>
                    <button>
                        <p>X</p>
                        <p>Steamboat</p>
                    </button>
                    <button>
                        <p>X</p>
                        <p>Copper Mountain</p>
                    </button> */}
                    
                </div>

                <button className='submit-form' onClick={submitChanges}>Submit</button>

            </form>

            <button className='user-logout' onClick={onLogout}>Logout</button>
        </div>
    );
    
}

export default UserAccountModal;