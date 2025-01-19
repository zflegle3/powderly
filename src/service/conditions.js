//used for making http requests, sending data back, setting data to local storage
import axios from "axios";

// const API_URL = "http://localhost:8080";

// getAllConditions
// const getConditionsAll = async(userData) => {
//     console.log("fetching conditions per", userData)
//     let config = {
//         headers: {
//             Authorization: `Bearer ${userData.token}`
//     }};
//     const response = await axios.get(process.env.REACT_APP_API_URL+ "/conditions/all", config);
//     console.log('fetched conditions', response.data)
//     return response.data;
// };

const getConditionsAll = async (userData) => {
    try {
        console.log("fetching conditions per", userData);
        
        let config = {
            withCredentials: true, 
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        };

        const response = await axios.get(process.env.REACT_APP_API_URL + "/conditions/all", config);
        
        console.log('fetched conditions', response.data);
        return response.data;
    } catch (error) {
        // Log the error for debugging purposes
        console.log("Error fetching conditions:", error);

        // Optionally, you can throw an error to be handled by a higher-level function
        throw new Error("Failed to fetch conditions");
    }
};

//Register new user
// const register = async(userData) => {
//     const response = await axios.post(process.env.REACT_APP_API_URL+"/user/create", userData);
//     if (response.data) {
//         //sets local storage for protected routes
//         localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     return response.data;
// };

// //Login existing user
// const login = async(userData) => {
//     const response = await axios.post(process.env.REACT_APP_API_URL+"/user/login", userData);
//     console.log("loginResponse", response);

//     if (response.data) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//     }

//     return response.data;
// };

// //Logout user
// const logout = async() => { 
//     localStorage.removeItem("user");
// };

// //Update existing user
// const update= async(userData, token) => {
//     let config = {
//         headers: {
//             authorization: `Bearer ${token}`,
//     }}//required for protected routes
//     const response = await axios.put(process.env.REACT_APP_API_URL+"/user/update/id", userData, config);
//     if (response.data) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     //returns user to update auth state
//     return response.data;
// };

// //Delete existing user
// const remove = async(userId, token) => {
//     let config = {
//         headers: {
//             authorization: `Bearer ${token}`
//         }
//     }//required for protected routes
//     const response = await axios.delete(process.env.REACT_APP_API_URL+"/user/delete/"+userId, config);
//     localStorage.removeItem("user");
// };


// //Update existing user Image
// const updateImage= async(userData, token) => {
//     const formData = new FormData();
//     formData.append("profileImage", userData.image);
//     const response = await axios.post(process.env.REACT_APP_API_URL+"/upload/"+userData.id+"/"+token, formData,{
//         headers: {
//             'Content-Type': 'multipart/form-data'
//             // an encoding type that allows files to be sent through a POST req.
//         }
//     });
//     //updated user data returned as a response
//     if (response.data) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     //returns user to update auth state
//     return response.data;
// };


// //Update user, Add new favorite
// const addFavorite= async(userData, token) => {
//     let config = {
//         headers: {
//             authorization: `Bearer ${token}`
//         }
//     };//required for protected routes
//     const response = await axios.post(process.env.REACT_APP_API_URL+"/user/add/favorite", userData, config);
//     if (response.data) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     //returns user to update auth state
//     return response.data;
// };

// //Update user, Remove favorite
// const removeFavorite= async(userData, token) => {
//     let config = {
//         headers: {
//             authorization: `Bearer ${token}`
//         }
//     };//required for protected routes
//     const response = await axios.post(process.env.REACT_APP_API_URL+"/user/remove/favorite", userData, config);
//     if (response.data) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     //returns user to update auth state
//     return response.data;
// };


const conditionsService = { getConditionsAll }
export default conditionsService;