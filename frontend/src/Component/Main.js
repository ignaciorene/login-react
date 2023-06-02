import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset, logout, deleteUser} from "../reducer/userReducer";

const Main=()=>{

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector((state)=> state.userData)

    //state to open delete menu
    const [deleteConfirmation,setDeleteConfirmation]=useState(false)

    //handle changes in user
    useEffect(()=>{

        //if user is not login i will send user to login page
        if(!user){
            navigate('/Login')
        }
        
    },[user, navigate])

    //this brings the confirmation message to delete account
    const deleteAccount=()=>{
        setDeleteConfirmation(true)
    }

    //handle the deletion of user
    const handleDeleteUser=()=>{
        dispatch(deleteUser(user._id))
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
            
                <div className="main-container">
                    <div className="main-box">
                        <div className="main-box-title">USER DATA</div>

                        <div className="main-box-content">
                            <div className="main-box-content-container">
                                <div className="main-box-content-title">Name:</div> 
                                <div className="main-box-content-result">{user?.username}</div>
                            </div>
                            
                            <div className="main-box-content-container">
                                <div className="main-box-content-title">Age:</div>
                                <div className="main-box-content-result">{user?.userage}</div>
                            </div>

                            <div className="main-box-content-container">
                                <div className="main-box-content-title">Email:</div>
                                <div className="main-box-content-result">{user?.usermail}</div>
                            </div>
                            
                        </div>
            
                    </div>
                    
                        <Link to='/Changeuserdata'>
                            <button>Change data</button>
                        </Link>

                    <button onClick={handleLogOut}>Logout</button>

                    {!deleteConfirmation && (
                            <button onClick={deleteAccount}>Delete account</button>
                        )}

                    <div className="main-box">
                        {deleteConfirmation && (
                            <div className="delete-box">
                            <h2>Do you want to delete the user?</h2>
                            <div className="delete-box-buttonContainer">
                            <button onClick={handleDeleteUser}>Yes, delete user</button>
                            <button onClick={handleCancelDelete}>Cancel</button>
                            </div>
                            </div>
                        )}
                    </div>
                    
                </div>
        </>
    )
}

export default Main