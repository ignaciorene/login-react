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
    const [userMail,setUserMail]=useState(false)
    const [userPassword,setUserPassword]=useState(false)
    const [emailWarningStyle,setEmailWarningStyle]=useState(false)
    const [passwordWarningStyle,setPasswordWarningStyle]=useState(false)

    //Verifies the user inputs, and only access the Main component if all data is OK
    const submitLogin=(e)=>{
        e.preventDefault()

        setEmailWarningStyle(false)
        setPasswordWarningStyle(false)

        if(userPassword!=correctPassword){
            setPasswordWarningStyle(true)
        }

        if(userMail!=correctEmail){
            setEmailWarningStyle(true)
        }

        if(userPassword===correctPassword && userMail===correctEmail){
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
                <input type="email" placeholder="example@example.com" onChange={(e)=>setUserMail(e.target.value)} required/>
                {emailWarningStyle && <p style={{color:'red'}}>Email is not registered</p>}
                <label>Password</label>
                <input type="password" onChange={(e)=>setUserPassword(e.target.value)} required/>
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