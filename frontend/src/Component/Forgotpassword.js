import React from "react";
import { useState } from "react";

const ForgotPassword = ()=>{

    const correctMail='ignacio@gmail.com'
    
    const [userEmail,setUserEmail]=useState()
    const [emailWarning,setEmailWarning]=useState(false)
    const [confirmedEmail,setConfirmedEmail]=useState(false)

    const submitRequest=()=>{
        if(userEmail!=correctMail){
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
                        <input type="email" placeholder="example@example.com" onChange={(e)=>setUserEmail(e.target.value)} required/>
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