import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {closeModal} from "../../features/modals/modalSlice"
import { logout, resetUser,  } from '../../features/auth/authSlice';



function UserAccountModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)


    const close = (e) => {
        e.preventDefault();
        dispatch(closeModal())
    }

    // const navigateSettings = (e) => {
    //     console.log(e.target.id);
    //     setFormDisplay(e.target.id);
    // }

    const deleteUser = () => {
        //send alert to conform
        console.log("delete user");
    }

    const onLogout = () => {
        //logs out user using redux state and navigates to login page
        dispatch(logout());
        dispatch(resetUser());
        navigate("/");
      }

    return (
        <div className="user-account-modal" >
            <h1>Your Account Preferences</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={close}>Close Modal</button>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
    
}

export default UserAccountModal;