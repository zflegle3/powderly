import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
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
    console.log("logging in")
    try{
        return await authService.login(user);
    } catch (error) {
        console.log(error);
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
    console.log("updating user");
    try{
        return await authService.update(user);
    } catch (error) {
        console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update existing user
export const remove = createAsyncThunk("auth/remove", async (id, thunkAPI) => {
    console.log("deleting user");
    try{
        return await authService.remove(id); 
    } catch (error) {
        console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload; 
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
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(update.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                alert("Account information successfully updated");
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = "We were unable to update your account";  
                state.user = null;
            })
            .addCase(remove.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(remove.fulfilled, (state, action) => {
                state.user = null;
                alert("Account deleted");
            })
            .addCase(remove.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                alert("Unable to delete account");
            })
    }
})

export const { resetUser } = authSlice.actions
export default authSlice.reducer