import React from "react";
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { update } from "../reducer/userReducer";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner"

const ChangeUserData=()=>{

    //This states are use in the style of the warnings, that will show up when user leaves empty inputs or information is wrong
    const [emailWarning,setEmailWarning]=useState(false)
    const [emailMatchWarning,setEmailMatchWarning]=useState(false)
    const [passwordWarning,setPasswordWarning]=useState(false)
    const [passwordMatchWarning,setPasswordMatchWarning]=useState(false)
    const [ageWarning,setAgeWarning]=useState(false)
    const [nameWarning,setNameWarning]=useState(false)
    const [inputEmpty,setInputEmpty]=useState(false)
    const [existingUser,setExistingUser]=useState(false)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    //Bring data from reducer
    const {user, isLoading,isError, message}=useSelector((state)=>state.userData)

    //handle changes in user
    useEffect(()=>{
        setExistingUser(false)

        if(isError){
            console.log(message)
            setExistingUser(true)
        }

        //if user is not login i will send user to login page
        if(!user){
            navigate('/Login')
        }

    },[user, isError, message, navigate])

    //Verifies the user inputs, and only changes the user data if everything is OK
    const changeUserData=(e)=>{
        e.preventDefault()

        const changeName=document.getElementById('change-name').value
        const changeAge=document.getElementById('change-age').value
        const changeEmail=document.getElementById('change-email').value
        const changeEmailConfirm=document.getElementById('change-email-confirm').value
        const changePassword=document.getElementById('change-password').value
        const changePasswordConfirm=document.getElementById('change-password-confirm').value

        setEmailWarning(false)
        setEmailMatchWarning(false)
        setPasswordMatchWarning(false)
        setPasswordWarning(false)
        setAgeWarning(false)
        setNameWarning(false)
        setInputEmpty(false)
        setExistingUser(false)


        const passwordLength=changePassword?.length

        if(passwordLength<8 || passwordLength==null){
            setPasswordWarning(true)
        }

        if(changePassword!==changePasswordConfirm){
            setPasswordMatchWarning(true)
        }

        if(changeEmail!==changeEmailConfirm){
            setEmailMatchWarning(true)
        }

        if(!changeEmail?.includes('@')){
            setEmailWarning(true)
        }

        if(changeAge<1){
            setAgeWarning(true)
        }

        if(changeName?.startsWith(' ')){
            setNameWarning(true)
        }

        if(!changeName || !changeAge || !changeEmail || !changeEmailConfirm || !changePassword || !changePasswordConfirm){
            setInputEmpty(true)
        }

        if(passwordLength>=8 && changePassword===changePasswordConfirm && changeEmail && changeEmail===changeEmailConfirm && changeAge>0 && !changeName?.startsWith(' ') && changeName && !isError){
            const userData={
                username:changeName,
                userage:changeAge,
                usermail:changeEmail,
                userpassword:changePassword,
                validuser:true
            }

            dispatch(update(userData))

        }
        
    }

    if(isLoading){
        return <Spinner />
    }
    
    return(
        <>
            
                <div className="main-container">
                    
                    <form>
                        <div className="form-title">Change user information</div>

                        <div className="form-group">
                            <label>Name</label>
                            <input id="change-name" type="text" required/>
                            {nameWarning && <p style={{color:'red'}}>Name is not valid</p>}
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input id="change-age" type="number" required/>
                            {ageWarning && <p style={{color:'red'}}>Age is not valid</p>}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input id="change-email" type="email" placeholder="example@example.com" required/>
                        </div>

                        <div className="form-group">
                            <label>Confirm email</label>
                            <input id="change-email-confirm" type="email" placeholder="example@example.com" required/>
                            {emailMatchWarning && <p style={{color:'red'}}>Email do not match</p>}
                            {emailWarning && <p style={{color:'red'}}>Email is not valid</p>}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input id="change-password" type="password" minLength="8" required/>
                        </div>

                        <div className="form-group">
                            <label>Confirm password</label>
                            <input id="change-password-confirm" type="password" minLength="8" required/>
                        </div>

                        {passwordWarning && <p style={{color:'red'}}>Password needs to be 8 characters or more</p>}
                        {passwordMatchWarning && <p style={{color:'red'}}>Password do not match</p>}
                        
                        {inputEmpty && <p style={{color:'red'}}>You need to complete all the information in order to make changes</p>}
                        
                        {existingUser && <p style={{color:'red'}}>User email already exists</p>}

                        <button type="submit" onClick={changeUserData}>Confirm changes</button>
                        <Link to='/Main'>
                            <button>Return to Menu</button>
                        </Link>
                    </form>
                </div>
        
        </>
    )
}

export default ChangeUserData