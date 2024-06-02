const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.route('/signup').post(authController.signup)
router.route('/signin').post(authController.signin)


router.use(authController.protect)
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router
    .route('/:userId')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


module.exports = router