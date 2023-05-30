const asyncHandler=require('express-async-handler')

const User = require('../model/userModel')

// Get user data
// @route GET /api/userdata
// @access Private
const getUserData= asyncHandler(async (req, res)=>{
    const user = await User.find()

    res.status(200).json(user)
})

// Set user data
// @route POST /api/userdata/
// @access Private
const setUserData= asyncHandler( async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await User.create({
        text: req.body.text,
    })

    res.status(200).json({message:'Set user'})
})

// Put user data
// @route PUT /api/userdata/:id
// @access Private
const updateUserData= asyncHandler( async (req, res)=>{
    const user= await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updateUser)
})

// delete user data
// @route DELETE /api/userdata/:id
// @access Private
const deleteUserData= asyncHandler( async (req, res)=>{

    const user=await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    await user.remove()

    res.status(200).json({id:req.params.id})
})

module.exports ={
    getUserData,
    setUserData,
    updateUserData,
    deleteUserData
}