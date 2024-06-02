const catchAsync = require("../utils/catchAsync");
const User = require('../models/userModel')
const axios = require('axios');
const handlers = require('./handlers');
const AppError = require("../utils/AppError");

// exports.getCity = async pinCode => {
//     const options = {
//         method: 'GET',
//         url: 'https://indian-zipcodes.p.rapidapi.com/api/data',
//         params: {pincode: pinCode},
//         headers: {
//           'X-RapidAPI-Key': 'dbdcfcc58emshee09a6ebb71df76p15d33ajsnde298f7b64f7',
//           'X-RapidAPI-Host': 'indian-zipcodes.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await axios.request(options);
//         return response.data[0].taluka;
//     } catch (error) {
//         console.error(error);
//         return undefined
//     }
// }


exports.getAllUsers = handlers.getAll(User)

exports.createUser = catchAsync(async (req,res,next) => {
    const newUser = new User(req.body)
    console.log(newUser)
    // newUser.city = await getCity(newUser.zipCode)
    const savedUser = await newUser.save()

    res.status(200).json({
        status:"success",
        data:savedUser
    })
})

exports.getUser = handlers.getOne(User)

exports.updateUser = catchAsync(async (req,res,next) => {
    const obj = {}
    const {name, email, zipCode} = req.body
    if(name){obj.name = name}
    if(email){obj.email = email}
    if(zipCode){obj.zipCode = zipCode}
    const user = await User.findByIdAndUpdate(req.params.userId, obj, {new: true})
    if (user){
        res.status(200).json({
            status:'success',
            data:{user}
        })
    }
})

exports.deleteUser = catchAsync(async (req,res,next) => {
    const doc = await User.findByIdAndDelete(req.params.userId)
    if (!doc){
        return next(new AppError("No document found to delete", 404))
    }
    res.status(204).json({
        status:"success"
    })
})