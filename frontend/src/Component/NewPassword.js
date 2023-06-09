import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const NewPassword = ()=>{
    const [userPassword,setUserPassword]=useState()
    const [confirmUserPassword,setConfirmUserPassword]=useState()
    const [newPasswordConfirmed,setNewPasswordConfirmed]=useState(false)
    const [passwordWarning,setPasswordWarning]=useState(false)
    const [passwordMatchWarning,setMatchpasswordWarning]=useState(false)

    const dispatch=useDispatch()

    const newPassword=(e)=>{
        e.preventDefault()

        setPasswordWarning(false)
        setMatchpasswordWarning(false)

        const passwordLength=userPassword?.length

        if(passwordLength<8 || passwordLength==null){
            setPasswordWarning(true)
        }

        if(userPassword!==confirmUserPassword){
            setMatchpasswordWarning(true)
        }

        if(userPassword===confirmUserPassword && passwordLength>=8){
            dispatch()
            setNewPasswordConfirmed(true)
        }

    }

    return(
        <>
            {!newPasswordConfirmed && (
                <>
                <div>Create new password</div>
                <form>
                    <label>New password</label>
                    <input type="password" onChange={(e)=>setUserPassword(e.target.value)} required />

                    <label>Confirm new password</label>
                    <input type="password" onChange={(e)=>setConfirmUserPassword(e.target.value)} required />
                    {passwordWarning && <p  >Password needs to be 8 characters or more</p>}
                    {passwordMatchWarning && <p  >Passwords do not match</p>}

                    <button type="submit" onClick={newPassword}>Change password</button>
                </form>
                </>
            )}
            {newPasswordConfirmed && (
                <>
                    <div>
                        <div>Your password has change!</div>
                        
                        <Link to='/Login'>
                        <button>Login</button>
                    </Link>
                    </div>
                </>
            )}
            
        </>
    )
}

export default NewPassword