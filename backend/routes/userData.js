const express = require('express')
const router = express.Router()
const {getUserData, setUserData, updateUserData, deleteUserData} = require('../controllers/userDataController')

router.route('/').get(getUserData).post(setUserData)
router.route('/:id').delete(deleteUserData).put(updateUserData)

module.exports = router