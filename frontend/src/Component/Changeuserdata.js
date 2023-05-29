import React from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { changeUser } from "../reducer/userReducer";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

const ChangeUserData=()=>{

    const [newUserName,setNewUserName]=useState()
    const [newUserAge,setNewUserAge]=useState()
    const [newUserMail,setNewUserMail]=useState()
    const [newConfirmUserMail,setNewConfirmUserMail]=useState()
    const [newUserPassword,setNewUserPassword]=useState()
    const [newConfirmUserPassword,setNewConfirmUserPassword]=useState()

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
        return state.login.validuser
    })

    //Verifies the user inputs, and only changes the user data if everything is OK
    const changeUserData=(e)=>{
        e.preventDefault()

        setEmailWarning(false)
        setEmailMatchWarning(false)
        setPasswordMatchWarning(false)
        setPasswordWarning(false)
        setAgeWarning(false)
        setNameWarning(false)
        setInputEmpty(false)


        const passwordLength=newUserPassword?.length

        if(passwordLength<8 || passwordLength==null){
            console.log('contrasena es corta')
            setPasswordWarning(true)
        }

        if(newUserPassword!=newConfirmUserPassword){
            console.log('contrasena no coincide')
            setPasswordMatchWarning(true)
        }

        if(newUserMail!=newConfirmUserMail){
            console.log('mail no coincide')
            setEmailMatchWarning(true)
        }

        if(!newUserMail?.includes('@') || !newConfirmUserMail?.includes('@')){
            console.log('mail no tiene @')
            setEmailWarning(true)
        }

        if(newUserAge<1){
            setAgeWarning(true)
        }

        if(newUserName?.startsWith(' ')){
            setNameWarning(true)
        }

        if(!newUserName || !newConfirmUserMail || !newUserAge || !newUserPassword || !newConfirmUserMail || !newConfirmUserPassword){
            setInputEmpty(true)
        }

        if(passwordLength>=8 && newUserPassword===newConfirmUserPassword && newUserMail && newUserMail===newConfirmUserMail && newUserAge>0 && !newUserName?.startsWith(' ') && newUserName){
            dispatch(changeUser({
                username:newUserName,
                userage:newUserAge,
                usermail:newUserMail,
                userpassword:newUserPassword
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
                        <input type="text" onChange={(e)=>setNewUserName(e.target.value)} required/>
                        {nameWarning && <p style={{color:'red'}}>Name is not valid</p>}

                        <label>Age</label>
                        <input type="number" onChange={(e)=>setNewUserAge(e.target.value)} required/>
                        {ageWarning && <p style={{color:'red'}}>Age is not valid</p>}

                        <label>Email</label>
                        <input type="email" placeholder="example@example.com" onChange={(e)=>setNewUserMail(e.target.value)} required/>

                        <label>Confirm email</label>
                        <input type="email" placeholder="example@example.com" onChange={(e)=>setNewConfirmUserMail(e.target.value)} required/>
                        {emailMatchWarning && <p style={{color:'red'}}>Email do not match</p>}
                        {emailWarning && <p style={{color:'red'}}>Email is not valid</p>}

                        <label>Password</label>
                        <input type="password" minLength="8" onChange={(e)=>setNewUserPassword(e.target.value)} required/>

                        <label>Confirm password</label>
                        <input type="password" minLength="8" onChange={(e)=>setNewConfirmUserPassword(e.target.value)} required/>
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