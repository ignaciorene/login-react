import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = ()=>{
    
    const [emailWarning,setEmailWarning]=useState(false)
    const [confirmedEmail,setConfirmedEmail]=useState(false)

    const submitRequest=()=>{

        const inputEmail=document.getElementById('forgotpassword-email').value

        if(inputEmail!=='correctMail'){
            setEmailWarning(true)
        }else{
            setConfirmedEmail(true)
        }
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
                        {emailWarning && <p style={{color:'red'}}>This email is not registered</p>}

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