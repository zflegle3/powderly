//used for making http requests, sending data back, setting data to local storage
import axios from "axios";

const API_URL = "http://localhost:8080";

//Register new user
const register = async(userData) => {
    const response = await axios.post(API_URL+"/user/create", userData);
    if (response.data) {
        //sets local storage for protected routes
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

//Login existing user
const login = async(userData) => {
    const response = await axios.post("http://localhost:8080/user/login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

//Logout user
const logout = async() => { 
    localStorage.removeItem("user");
};

//Update existing user
const update= async(userData) => {
    const response = await axios.put("http://localhost:8080/user/update/id", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    //returns user to update auth state
    return response.data;
};

//Delete existing user
const remove = async(userId) => {
    const response = await axios.delete("http://localhost:8080/user/delete/" + userId);
    localStorage.removeItem("user");
};


//Update existing user Image
const updateImage= async(userData) => {
    //sends userData.image as form data and userData.id as parameter 
    const formData = new FormData();
    formData.append("profileImage", userData.image);
    const response = await axios.post("http://localhost:8080/upload/"+userData.id, formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
            // an encoding type that allows files to be sent through a POST req.
        }
    });
    console.log(response.data);
    //updated user data returned as a response
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    //returns user to update auth state
    return response.data;
};


//Update existing user Image
const addFavorite= async(userData) => {
    const response = await axios.post("http://localhost:8080/user/add/favorite", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    //returns user to update auth state
    return response.data;
};

//Update existing user Image
const removeFavorite= async(userData) => {
    const response = await axios.post("http://localhost:8080/user/remove/favorite", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    //returns user to update auth state
    return response.data;
};


const authService = { register, login, logout, update, remove, updateImage, addFavorite, removeFavorite }
export default authService;