//Make the requests to the API and export the functions to use in the reducer or someplace else
import axios from 'axios'

const API_URL_SIGNUP='/api/userdata/signup'
const API_URL_LOGIN='/api/userdata/login'
const API_URL_DELETE='api/userdata/deleteuser/'
const API_URL_UPDATE='api/userdata/updateuser/'

//Register user
const register =async (userData) =>{
    const response = await axios.post(API_URL_SIGNUP, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login =async (userData) =>{
    const response = await axios.post(API_URL_LOGIN, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Delete user
const deleteUser=async (id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL_DELETE + id,config)

    return response.data
}

//Update user
const update=async (userData,id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL_UPDATE + id,userData,config)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout user
const logout=async ()=>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    deleteUser,
    update,
    logout
}

export default authService