const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const User = require('../models/userModel')

//Generate JWT
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

// Authenticate a user
// @route POST /api/userdata/login
// @access Public
const loginUser= asyncHandler(async (req, res)=>{
    const {usermail,userpassword}=req.body
    
    //check user email
    const user=await User.findOne({usermail})
    
    if(user && (await bcrypt.compare(userpassword, user.userpassword))){
        res.json({
            _id: user.id,
            username: user.username,
            userage: user.userage,
            usermail: user.usermail,
            validuser: user.validuser,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// Get user data
// @route GET /api/userdata/getuser
// @access Private
const getUserData= asyncHandler(async (req, res)=>{
    const {_id, username,userage,usermail,validuser}=await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        username,
        userage,
        usermail,
        validuser
    })
})

// Set user data
// @route POST /api/userdata/signup
// @access Public
const setUserData= asyncHandler( async (req, res)=>{
    const {username,userage,usermail,userpassword,validuser}=req.body

    if(!username || !userage || !usermail || !userpassword || !validuser){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exist
    const userExist = await User.findOne({usermail})

    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(userpassword, salt)

    //Create user
    const user=await User.create({
        username,
        userage,
        usermail,
        userpassword: hashedPassword,
        validuser
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            userage: user.userage,
            usermail: user.usermail,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// Put user data
// @route PUT /api/userdata/updateuser/:id
// @access Public
const updateUserData = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const userEmail = user.usermail;
  
    // Check for user
    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }
  
    const { username, userage, usermail, userpassword, validuser } = req.body;
  
    if (!username || !userage || !usermail || !userpassword || !validuser) {
      res.status(400);
      throw new Error('Please add all fields');
    }
  
    // Check if user exists
    const userExist = await User.findOne({ usermail });
  
    if (userExist && usermail !== userEmail) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userpassword, salt);
  
    // Update user
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: username,
        userage: userage,
        usermail: usermail,
        userpassword: hashedPassword,
        validuser: validuser,
      },
      { new: true } // return the updated user
    );
  
    res.status(200).json(updateUser);
  });  

// delete user data
// @route DELETE /api/userdata/deleteuser/:id
// @access Public
const deleteUserData = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(400);
      throw new Error('User not valid');
    }
  
    await User.deleteOne({ _id: req.params.id });
  
    res.status(200).json({ id: req.params.id });
  });  

module.exports ={
    loginUser,
    getUserData,
    setUserData,
    updateUserData,
    deleteUserData
}