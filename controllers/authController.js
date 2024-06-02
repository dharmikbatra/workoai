const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel')
const userController = require('../controllers/userController')
const {promisify} = require('util');
const AppError = require('../utils/AppError');

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}


const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + 24*60*60*1000*process.env.JWT_COOKIE_EXPIRY),
        httpOnly:true   // to prevent cross site scripting attacks
    }
    user.password = undefined


    res.cookie('jwt',token, cookieOptions)
    res.locals.user = user

    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}

exports.signup = catchAsync(async (req,res,next) => {
    const newUser = new User({
        name:req.body.name,
        email: req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        zipCode:req.body.zipCode
    })
    // newUser.city = await userController.getCity(newUser.zipCode)
    const savedUser = await newUser.save()


    createSendToken(savedUser,201,res)

})

exports.signin = catchAsync(async (req,res,next) => {
    const {email, password} = req.body
    if (!email || !password){
        return next(new AppError('Please provide email and password', 400))
    }
    const user = await User.findOne({email:email}).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401))
    }
    createSendToken(user,200,res)
})

exports.protect = catchAsync(async (req,res,next) => {
    let token = ''
    if (req.headers.authorization  && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies.jwt){
        token = req.cookies.jwt
    }

    if(!token){
        return next(new AppError('You are not logged in, Please log in to get access', 401))
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.id)
    if (!currentUser){
        return next(new AppError('The user belonging to this token, does no exist', 401))
    }

    if (currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError("user recently changed password", 401))
    }

    req.user = currentUser
    res.locals.user = currentUser
    next()
})


