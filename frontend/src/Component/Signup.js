import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {register, reset} from "../reducer/userReducer";
import Spinner from "./Spinner";

const SignUp=()=>{

    const [confirmSignUp,setConfirmSignUp]=useState()

    const [emailWarning,setEmailWarning]=useState(false)
    const [emailMatchWarning,setMatchemailWarning]=useState(false)
    const [passwordWarning,setPasswordWarning]=useState(false)
    const [passwordMatchWarning,setMatchpasswordWarning]=useState(false)
    const [ageWarning,setAgeWarning]=useState(false)
    const [nameWarning,setNameWarning]=useState(false)
    const [inputEmpty,setInputEmpty]=useState(false)

    const dispatch=useDispatch()

    //Bring data from reducer
    const {user, isLoading, isError, isSuccess, message}=useSelector((state)=>state.userData)

    //Handle the changes on reducer data and backend request
    useEffect(()=>{
        if(isError){
            alert(message)
            setConfirmSignUp(false)
        }

        if(isSuccess){
            setConfirmSignUp(true)
        }

        dispatch(reset())

    },[user,isError,isSuccess,message,dispatch])

    //Verifies inputs and signup user if data is valid
    const createNewUser=(e)=>{

        const signupName=document.getElementById('signup-name').value
        const signupAge=document.getElementById('signup-age').value
        const signupEmail=document.getElementById('signup-email').value
        const signupConfirmEmail=document.getElementById('signup-confirm-email').value
        const signupPassword=document.getElementById('signup-password').value
        const signupConfirmPassword=document.getElementById('signup-confirm-password').value

        e.preventDefault()

        setEmailWarning(false)
        setMatchemailWarning(false)
        setPasswordWarning(false)
        setMatchpasswordWarning(false)
        setInputEmpty(false)
        setAgeWarning(false)
        setNameWarning(false)

        const passwordLength=signupPassword?.length

        if(passwordLength<8 || passwordLength==null){
            setPasswordWarning(true)
        }

        if(signupPassword!==signupConfirmPassword){
            setMatchpasswordWarning(true)
        }

        if(!signupEmail?.includes('@')){
            setEmailWarning(true)
        }

        if(signupEmail!==signupConfirmEmail){
            setMatchemailWarning(true)
        }

        if(signupAge<1){
            setAgeWarning(true)
        }

        if(signupName?.startsWith(' ')){
            setNameWarning(true)
        }

        if(!signupName || !signupAge || !signupEmail || !signupPassword || !signupConfirmEmail || !signupConfirmPassword){
            setInputEmpty(true)
        }

        //if everything is ok, then dispatch the data
        if(!signupName?.startsWith(' ') && signupName && signupAge>0 && signupEmail && signupEmail===signupConfirmEmail && passwordLength>=8 && signupPassword===signupConfirmPassword){
            const userData={
                username:signupName,
                userage:signupAge,
                usermail:signupEmail,
                userpassword:signupPassword,
                validuser:true
            }
            dispatch(register(userData))
        }

        
    }

    //while is loading show this
    if(isLoading){
        return <Spinner />
    }

    return(
        <>
        {!confirmSignUp && (
            <div className="main-container">
                <form>
                    <div className="form-title">Sign Up</div>

                    <div className="form-group">
                        <label>Name</label>
                        <input id="signup-name" type="text" required/>
                        {nameWarning && <p  >Name is not valid</p>}
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input id="signup-age" type="number" required/>
                        {ageWarning && <p  >Age is not valid</p>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input id="signup-email" type="email" placeholder="example@example.com" required/>
                    </div>

                    <div className="form-group">
                        <label>Confirm email</label>
                        <input id="signup-confirm-email" type="email" placeholder="example@example.com" required/>
                        {emailWarning && <p  >Email is not valid</p>}
                        {emailMatchWarning && <p  >Email do not match</p>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input id="signup-password" type="password" minLength="8" required/>
                    </div>

                    <div className="form-group">
                    <label>Confirm password</label>
                        <input id="signup-confirm-password" type="password" minLength="8" required/>
                    </div>
                    {passwordWarning && <p  >Password needs to be 8 characters or more</p>}
                    {passwordMatchWarning && <p  >Password do not match</p>}
                    {inputEmpty && <p  >You need to complete all the information in order to sign up</p>}

                    <button type="submit" onClick={createNewUser}>Sign Up</button>
                </form>
                <div>
                    <Link to='/'>
                        <p>Already have an account? click here to Log in...</p>
                    </Link>
                </div>
            </div>
        )}
        {confirmSignUp && (
            <div className="main-container">
                <div>WELCOME!</div>
                <div>We have send you instructions to confirm your register at your email! </div>
                <Link to='/Login'>
                    <button>Log In</button>
                </Link>
            </div>
        )}
            
        </>
    )
}

export default SignUp