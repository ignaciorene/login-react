import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {deleteUser} from "../reducer/userReducer";
import Login from "./Login";

const Main=()=>{

    const dispatch=useDispatch()
    const navigate=useNavigate()

    //state to open delete menu
    const [deleteConfirmation,setDeleteConfirmation]=useState(false)
    
    //Bring from the store of redux all the data of the user
    const username=useSelector((state)=>{
        return state.login.username
    })
    const userage=useSelector((state)=>{
        return state.login.userage
    })
    const usermail=useSelector((state)=>{
        return state.login.usermail
    })
    const validuser=useSelector((state)=>{
        return state.login.validuser
    })

    //this brings the confirmation message to delete account
    const deleteAccount=()=>{
        setDeleteConfirmation(true)
    }

    //handle the deletion of user
    const handleDeleteUser=()=>{
        dispatch(deleteUser())
        navigate('/Login')
    }

    const handleCancelDelete=()=>{
        setDeleteConfirmation(false)
    }

    //When user signs out
    const handleSignOut=()=>{
        dispatch(deleteUser())

        navigate('/Login')
    }

    return(
        <>
            {validuser && (
                <div>
                    <div>MAIN</div>

                    <div>nombre: {username}</div>
                    <div>edad: {userage}</div>
                    <div>email: {usermail}</div>

                    <div>Change your data</div>
                    <Link to='/Changeuserdata'>
                        <button>Change data</button>
                    </Link>

                    <div>Delete account</div>

                    {deleteConfirmation && (
                        <div>
                        <p>Are you sure to delete the user?</p>
                        <button onClick={handleDeleteUser}>Yes, delete user</button>
                        <button onClick={handleCancelDelete}>Cancel</button>
                        </div>
                    )}
                    {!deleteConfirmation && (
                        <button onClick={deleteAccount}>Delete account</button>
                    )}

                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            )}
            {!validuser && <Login />}
        </>
    )
}

export default Main