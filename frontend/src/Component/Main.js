import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {deleteUser, reset, logout} from "../reducer/userReducer";

const Main=()=>{

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector((state)=> state.userData)

    //state to open delete menu
    const [deleteConfirmation,setDeleteConfirmation]=useState(false)

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
    const handleLogOut=()=>{
        dispatch(logout())
        dispatch(reset())

        navigate('/Login')
    }

    return(
        <>
            
                <div>
                    <div>MAIN</div>

                    <div>nombre: {user?.username}</div>
                    <div>edad: {user?.userage}</div>
                    <div>email: {user?.usermail}</div>

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

                    <button onClick={handleLogOut}>Logout</button>
                </div>
            
            {/*!validuser && <Login />*/}
        </>
    )
}

export default Main