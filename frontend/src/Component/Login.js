import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducer/userReducer";
import Spinner from "./Spinner";

const Login=()=>{

    const dispatch=useDispatch()
    const navigate = useNavigate(); // Hook to access navigation history

    //Bring data from reducer
    const {user, isLoading,isSuccess,isError,message}=useSelector((state)=>state.userData)

    //Handle the changes on reducer data and backend request
    useEffect(()=>{
        if(isError){
            alert(message)
        }

        if(isSuccess){
            navigate('/Main')
        }


    },[user,isError,isSuccess,message,dispatch])

    //This states are use in case of error of the inputs
    const [emailWarningStyle,setEmailWarningStyle]=useState(false)
    const [passwordWarningStyle,setPasswordWarningStyle]=useState(false)

    //Verifies the user inputs, and only access the Main component if all data is OK
    const submitLogin=(e)=>{
        e.preventDefault()

        const loginEmail=document.getElementById('login-email').value
        const loginPassword=document.getElementById('login-password').value

        setEmailWarningStyle(false)
        setPasswordWarningStyle(false)

        const userData={
            usermail:loginEmail,
            userpassword: loginPassword
        }
        dispatch(login(userData))
        
    }

    //While is loading show this
    if(isLoading){
        return <Spinner />
    }

    return(
        <>
            <div>LOG IN</div>
            <form>
                <label>Mail</label>
                <input id="login-email" type="email" placeholder="example@example.com" required/>
                {emailWarningStyle && <p style={{color:'red'}}>Email is not registered</p>}
                <label>Password</label>
                <input id="login-password" type="password" required/>
                {passwordWarningStyle && <p style={{color:'red'}}>Password is incorrect</p>}
                <Link to='/Main'>
                    <button type="submit" onClick={submitLogin}>Log In</button>
                </Link>
            </form>
            <div>
                <Link to='/Forgotpassword'>
                    <p>Forgot password? create new password here...</p>
                </Link>
                <Link to='/Signup'>
                    <p>Don't have an account? Sign Up here...</p>
                </Link>
            </div>
        </>
    )
}

export default Login