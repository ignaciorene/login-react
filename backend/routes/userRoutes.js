const express = require('express')
const router = express.Router()
const {loginUser, getUserData, setUserData, updateUserData, deleteUserData} = require('../controllers/userDataController')
const {protect} = require('../middleware/authMiddleware')

router.route('/login').post(loginUser)
router.route('/signup').post(setUserData)
router.route('/getuser').get(protect,getUserData)
router.route('/updateuser/:id').put(protect,updateUserData)
router.route('/deleteuser/:id').delete(protect,deleteUserData)

module.exports = router