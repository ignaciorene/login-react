import React from "react";
import { useState } from "react";

const ForgotPassword = ()=>{

    const correctMail='ignacio@gmail.com'
    
    const [emailWarning,setEmailWarning]=useState(false)
    const [confirmedEmail,setConfirmedEmail]=useState(false)

    const submitRequest=()=>{

        const inputEmail=document.getElementById('forgotpassword-email').value

        if(inputEmail!==correctMail){
            console.log('mail no registrado')
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
                </div>
            )}

        </>
    )
}

export default ForgotPassword