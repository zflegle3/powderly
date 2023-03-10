import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
//Token used to access protected routes
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//Register new user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try{
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Login existing user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try{
        return await authService.login(user);
    } catch (error) {
        // console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Logout existing user
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
})

//Update existing user
export const update = createAsyncThunk("auth/update", async (user, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await authService.update(user,token);
    } catch (error) {
        // console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Delete existing user
export const remove = createAsyncThunk("auth/remove", async (id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await authService.remove(id, token); 
    } catch (error) {
        // console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update existing user image
export const updateImage = createAsyncThunk("auth/updateImage", async (userData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await authService.updateImage(userData, token);
    } catch (error) {
        // console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update user, Add new favorite
export const addFavorite = createAsyncThunk("auth/addFavorite", async (userData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await authService.addFavorite(userData, token);
    } catch (error) {
        // console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update user, Remove favorite
export const removeFavorite = createAsyncThunk("auth/removeFavorite", async (userData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await authService.removeFavorite(userData, token);
    } catch (error) {
        // console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            //REGISTER NEW USER
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload; 
                state.message = "login successful";
                //returned user data as payload from register function
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                //rejectwithvalue returns message as payload in catch above
                state.user = null;
            })

            //LOGIN EXISTING USER
            .addCase(login.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = "We were unable to verify login credentials you entered";  
                state.user = null;
            })

            //LOGOUT EXISTING USER
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })

            //UPDATE EXISTING USER DETAILS
            .addCase(update.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "Account information successfully updated";
                state.user = action.payload; //updated user data returned
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = "We were unable to update your account";
            })

            //DELETE EXISTING USER 
            .addCase(remove.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(remove.fulfilled, (state, action) => {
                state.user = null;
                state.isSuccess = true;
                state.isError = false;
                state.message = "Account successfully deleted"; 
                alert("Account successfully deleted");
            })
            .addCase(remove.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                alert("Unable to delete account");
            })

            //UPDATE EXISTING USER IMAGE
            .addCase(updateImage.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(updateImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "New profile image successfully uploaded";  
                state.user = action.payload; //updated user data returned
            })
            .addCase(updateImage.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = "We were unable to update your profile image";  
            })

            //ADDING FAVORITE TO USER
            .addCase(addFavorite.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "Favorite successfully added";  
                state.user = action.payload; //updated user data returned
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = "We were unable to add the favorite to user";  
            })

            //ADDING FAVORITE TO USER
            .addCase(removeFavorite.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "Favorite successfully removed";  
                state.user = action.payload; //updated user data returned
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = "We were unable to remove the favorite from user";  
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer