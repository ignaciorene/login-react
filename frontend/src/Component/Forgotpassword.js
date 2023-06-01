import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const ForgotPassword = ()=>{
    
    const [emailWarning,setEmailWarning]=useState(false)
    const [confirmedEmail,setConfirmedEmail]=useState(false)

    //Bring data from reducer
    const {user, isLoading,isError,message}=useSelector((state)=>state.userData)

    useEffect(()=>{
        if(isError){
            console.log(message)
            setEmailWarning()
        }
    },[user,isError,message])

    const submitRequest=()=>{

        const inputEmail=document.getElementById('forgotpassword-email').value

        if(inputEmail!=='correctMail'){
            setEmailWarning(true)
        }else{
            setConfirmedEmail(true)
        }
    }

    if(isLoading){
        return <Spinner />
    }
    
    return(
        <>
            {!confirmedEmail && (
                <div>
                    <div>Change your password</div>
                    <div>FEATURE UNAVAILABLE</div>
                    <form>
                        <label>Enter your mail</label>
                        <input id="forgotpassword-email" type="email" placeholder="example@example.com" required/>
                        {emailWarning && <p  >This email is not registered</p>}

                        <button type="submit" onClick={submitRequest}>Submit request</button>
                    </form>
                </div>
            )}
            {confirmedEmail && (
                <div>
                    <div>We have send you the instructions to change your password at your email!</div>
                    <div>Note: this feature is not available at the moment, just press the next button in order to change the password. Yeah, i know! is not very secure this way but this is just a practice to learn</div>
                    <Link to='/Newpassword'>
                        <button>Next</button>
                    </Link>
                </div>
            )}

        </>
    )
}

export default ForgotPassword