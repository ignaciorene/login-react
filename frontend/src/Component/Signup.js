import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {newUser} from "../reducer/userReducer";

const SignUp=()=>{

    const [userName,setUserName]=useState()
    const [userAge,setUserAge]=useState()
    const [userMail,setUserMail]=useState()
    const [confirmUserMail,setConfirmUserMail]=useState()
    const [userPassword,setUserPassword]=useState()
    const [confirmUserPassword,setConfirmUserPassword]=useState()
    const [confirmSignUp,setConfirmSignUp]=useState()

    const [emailWarning,setEmailWarning]=useState(false)
    const [emailMatchWarning,setMatchemailWarning]=useState(false)
    const [passwordWarning,setPasswordWarning]=useState(false)
    const [passwordMatchWarning,setMatchpasswordWarning]=useState(false)
    const [ageWarning,setAgeWarning]=useState(false)
    const [nameWarning,setNameWarning]=useState(false)
    const [inputEmpty,setInputEmpty]=useState(false)

    const dispatch=useDispatch()

    const createNewUser=(e)=>{
        e.preventDefault()

        setEmailWarning(false)
        setMatchemailWarning(false)
        setPasswordWarning(false)
        setMatchpasswordWarning(false)
        setInputEmpty(false)
        setAgeWarning(false)
        setNameWarning(false)

        const passwordLength=userPassword?.length

        if(passwordLength<8 || passwordLength==null){
            console.log('contrasena es corta')
            setPasswordWarning(true)
        }

        if(userPassword!=confirmUserPassword){
            console.log('contrasena no coincide')
            setMatchpasswordWarning(true)
        }

        if(!userMail?.includes('@') || !confirmUserMail?.includes('@')){
            setEmailWarning(true)
        }

        if(userMail!=confirmUserMail){
            console.log('mail no coincide')
            setMatchemailWarning(true)
        }

        if(userAge<1){
            setAgeWarning(true)
        }

        if(userName?.startsWith(' ')){
            setNameWarning(true)
        }

        if(!userName || !userAge || !userMail || !userPassword || !confirmUserMail || !confirmUserPassword){
            setInputEmpty(true)
        }

        if(!userName?.startsWith(' ') && userName && userAge>0 && userMail && userMail===confirmUserMail && passwordLength>=8 && userPassword===confirmUserPassword){
            dispatch(newUser({
                username:userName,
                userage:userAge,
                usermail:userMail,
                userpassword:userPassword
            }))

            setConfirmSignUp(true)
        }

        
    }

    return(
        <>
        {!confirmSignUp && (
            <div>
                <div>Sign Up</div>
                <form>

                    <label>Name</label>
                    <input type="text" onChange={(e)=>setUserName(e.target.value)} required/>
                    {nameWarning && <p style={{color:'red'}}>Name is not valid</p>}

                    <label>Age</label>
                    <input type="number" onChange={(e)=>setUserAge(e.target.value)} required/>
                    {ageWarning && <p style={{color:'red'}}>Age is not valid</p>}

                    <label>Email</label>
                    <input type="email" placeholder="example@example.com" onChange={(e)=>setUserMail(e.target.value)} required/>

                    <label>Confirm email</label>
                    <input type="email" placeholder="example@example.com" onChange={(e)=>setConfirmUserMail(e.target.value)} required/>
                    {emailWarning && <p style={{color:'red'}}>Email is not valid</p>}
                    {emailMatchWarning && <p style={{color:'red'}}>Email do not match</p>}

                    <label>Password</label>
                    <input type="password" minLength="8" onChange={(e)=>setUserPassword(e.target.value)} required/>

                    <label>Confirm password</label>
                    <input type="password" minLength="8" onChange={(e)=>setConfirmUserPassword(e.target.value)} required/>
                    {passwordWarning && <p style={{color:'red'}}>Password needs to be 8 characters or more</p>}
                    {passwordMatchWarning && <p style={{color:'red'}}>Password do not match</p>}

                    {inputEmpty && <p style={{color:'red'}}>You need to complete all the information in order to sign up</p>}

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
            <div>
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