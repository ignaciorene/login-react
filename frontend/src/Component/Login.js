import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducer/userReducer";
import Spinner from "./Spinner";

const Login=()=>{
    //This states are use in case of error of the inputs
    const [emailWarningStyle,setEmailWarningStyle]=useState(false)
    const [passwordWarningStyle,setPasswordWarningStyle]=useState(false)

    const dispatch=useDispatch()
    const navigate = useNavigate(); // Hook to access navigation history

    //Bring data from reducer
    const {user, isLoading,isSuccess,isError,message}=useSelector((state)=>state.userData)

    //Handle the changes on reducer data and backend request
    useEffect(()=>{
        if(isError){
            console.log(message)
        }

        if(isSuccess){
            navigate('/Main')
        }

    },[user,isError,isSuccess,message,dispatch,navigate])

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
            <form>
                <div className="form-title">LOG IN</div>
                <div className="form-group">
                <label>Mail</label>
                    <input id="login-email" type="email" placeholder="example@example.com" required/>
                    {emailWarningStyle && <p>Email is not registered</p>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input id="login-password" type="password" required/>
                    {passwordWarningStyle && <p>Password is incorrect</p>}
                </div>
                
                <Link to='/Main'>
                    <button type="submit" onClick={submitLogin}>Log In</button>
                </Link>
            </form>
            <div className="login-subform">
                <Link to='/'>
                    <p>Forgot password? create a new one here...</p>
                </Link>
                <Link to='/Signup'>
                    <p>Don't have an account? Sign Up here...</p>
                </Link>
            </div>
        </>
    )
}

export default Login