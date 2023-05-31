import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { newUser } from "../reducer/userReducer";

const Login=()=>{

    const dispatch=useDispatch()
    const navigate = useNavigate(); // Hook to access navigation history

    //example data TODO: replace with database
    const correctName='Ignacio'
    const correctAge=21
    const correctEmail='ignacio@gmail.com'
    const correctPassword='12345'

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

        if(loginPassword!==correctPassword){
            setPasswordWarningStyle(true)
        }

        if(loginEmail!==correctEmail){
            setEmailWarningStyle(true)
        }

        if(loginPassword===correctPassword && loginEmail===correctEmail){
            console.log('usuario y contrasena correctos')
            dispatch(newUser({
                username:correctName,
                userage:correctAge,
                usermail:correctEmail,
                userpassword:correctPassword
            }))

            navigate('/Main') // redirect the user to '/Main'
        }
        
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