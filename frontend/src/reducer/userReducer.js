import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    name:'userData',
    initialState:{
        username:'',
        userage:0,
        usermail:'',
        userpassword:'',
        validuser:false
    },
    reducers:{
        newUser: (state,action)=>{
            state.username = action.payload.username
            state.userage=action.payload.userage
            state.usermail=action.payload.usermail
            state.userpassword=action.payload.userpassword
            state.validuser=true
        },
        changeUser: (state,action)=>{
            state.username = action.payload.username
            state.userage=action.payload.userage
            state.usermail=action.payload.usermail
            state.userpassword=action.payload.userpassword
            state.validuser=true
        },
        deleteUser: (state)=>{
            state.username=''
            state.userage=0
            state.usermail=''
            state.userpassword=''
            state.validuser=false
        }
    }
})

export const {newUser,changeUser,deleteUser}=userDataSlice.actions

export default userDataSlice.reducer