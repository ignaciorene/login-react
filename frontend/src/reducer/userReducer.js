import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Features/authService";

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

//Register user
export const register = createAsyncThunk('userdata/signup', async (user, thunkAPI)=>{
    try{
        return await authService.register(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Login user
export const login = createAsyncThunk('userdata/login', async (user, thunkAPI)=>{
    try{
        return await authService.login(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout
export const logout=createAsyncThunk('userdata/logout', async ()=>{
    await authService.logout()
})

export const userDataSlice = createSlice({
    name:'userData',
    initialState:{
        user:user ? user : null,
        isError: false,
        isSuccess: false,
        isLoading:false,
        message:''
    },
    reducers:{
        newUser: (state,action)=>{
        },
        changeUser: (state,action)=>{
        },
        deleteUser: (state)=>{
            state.user=null
            state.user = null
            state.isError=false
            state.isLoading=false
            state.isSuccess=false
            state.message=''
        },
        reset: (state)=>{
            state.user = null
            state.isError=false
            state.isLoading=false
            state.isSuccess=false
            state.message=''
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(register.pending, (state)=>{
                state.isLoading=true
            })
            .addCase(register.fulfilled, (state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(register.rejected, (state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.user=null
            })
            .addCase(login.pending, (state)=>{
                state.isLoading=true
            })
            .addCase(login.fulfilled, (state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(login.rejected, (state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.user=null
            })
            .addCase(logout.fulfilled, (state)=>{
                state.user=null
            })
    }
})

export const {newUser,changeUser,deleteUser,reset}=userDataSlice.actions

export default userDataSlice.reducer