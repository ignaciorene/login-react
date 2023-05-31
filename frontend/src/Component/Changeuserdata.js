import React from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { changeUser } from "../reducer/userReducer";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

const ChangeUserData=()=>{

    //This states are use in the style of the warnings, that will show up when user leaves empty inputs or information is wrong
    const [emailWarning,setEmailWarning]=useState(false)
    const [emailMatchWarning,setEmailMatchWarning]=useState(false)
    const [passwordWarning,setPasswordWarning]=useState(false)
    const [passwordMatchWarning,setPasswordMatchWarning]=useState(false)
    const [ageWarning,setAgeWarning]=useState(false)
    const [nameWarning,setNameWarning]=useState(false)
    const [inputEmpty,setInputEmpty]=useState(false)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    //I bring the data from the Redux store to verifies the user is login
    const validuser=useSelector((state)=>{
        return state.userData.validuser
    })

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

        if(passwordLength>=8 && changePassword===changePasswordConfirm && changeEmail && changeEmail===changeEmailConfirm && changeAge>0 && !changeName?.startsWith(' ') && changeName){
            dispatch(changeUser({
                username:changeName,
                userage:changeAge,
                usermail:changeEmail,
                userpassword:changePassword
            }))

            navigate('/Main')
        }
        
    }
    
    return(
        <>
            {validuser && (
                <div>
                    <div>Change your information</div>
                    <form>

                        <label>Name</label>
                        <input id="change-name" type="text" required/>
                        {nameWarning && <p style={{color:'red'}}>Name is not valid</p>}

                        <label>Age</label>
                        <input id="change-age" type="number" required/>
                        {ageWarning && <p style={{color:'red'}}>Age is not valid</p>}

                        <label>Email</label>
                        <input id="change-email" type="email" placeholder="example@example.com" required/>

                        <label>Confirm email</label>
                        <input id="change-email-confirm" type="email" placeholder="example@example.com" required/>
                        {emailMatchWarning && <p style={{color:'red'}}>Email do not match</p>}
                        {emailWarning && <p style={{color:'red'}}>Email is not valid</p>}

                        <label>Password</label>
                        <input id="change-password" type="password" minLength="8" required/>

                        <label>Confirm password</label>
                        <input id="change-password-confirm" type="password" minLength="8" required/>
                        {passwordWarning && <p style={{color:'red'}}>Password needs to be 8 characters or more</p>}
                        {passwordMatchWarning && <p style={{color:'red'}}>Password do not match</p>}

                        {inputEmpty && <p style={{color:'red'}}>You need to complete all the information in order to make changes</p>}

                        <button type="submit" onClick={changeUserData}>Confirm changes</button>
                        <Link to='/Main'>
                            <button>Cancel</button>
                        </Link>
                    </form>
                </div>
            )}
            {!validuser && <Login />}
        </>
    )
}

export default ChangeUserData