const asyncHandler=require('express-async-handler')

// Get user data
// @route GET /api/userdata
// @access Private
const getUserData= asyncHandler(async (req, res)=>{
    res.status(200).json({message:'Get user'})
})

// Set user data
// @route POST /api/userdata/
// @access Private
const setUserData= asyncHandler( async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({message:'Set user'})
})

// Put user data
// @route PUT /api/userdata/:id
// @access Private
const updateUserData= asyncHandler( async (req, res)=>{
    res.status(200).json({message:`Update user ${req.params.id}`})
})

// delete user data
// @route DELETE /api/userdata/:id
// @access Private
const deleteUserData= asyncHandler( async (req, res)=>{
    res.status(200).json({message:`Delete user ${req.params.id}`})
})

module.exports ={
    getUserData,
    setUserData,
    updateUserData,
    deleteUserData
}