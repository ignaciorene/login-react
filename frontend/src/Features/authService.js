import axios from 'axios'

const API_URL_SIGNUP='/api/userdata/signup'
const API_URL_LOGIN='/api/userdata/login'

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

//Logout user
const logout=async ()=>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService