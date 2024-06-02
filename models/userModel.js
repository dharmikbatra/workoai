const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const AppError = require("../utils/AppError")
const axios = require('axios');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Please enter a valid email Id"],
        unique:true
    },
    name:{
        type:String,
        required:[true,"Please fill the name - required entry"]
    },
    age:{
        type:Number
    },
    zipCode:{
        type:Number
    },
    password:{
        type:String,
        required:[true, "Password is must to make any user entry"]
    },
    confirmPassword:{
        type:String,
        validate:{
            validator:function(el) {
                return el === this.password
            },
            message:"passwords are not same"
        }
    },
    city:{
        type:String
    }
}, {
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

userSchema.methods.correctPassword = async function(candidatepassword, userpassword){
    return await bcrypt.compare(candidatepassword, userpassword)
}


userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
    if (this.passwordChangedAt){
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime()/1000,
            10
        )
        return JWTTimeStamp < changedTimeStamp
    }

    //false means not changed
    return false;
}
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('save', async function(next){
    const options = {
        method: 'GET',
        url: 'https://indian-zipcodes.p.rapidapi.com/api/data',
        params: {pincode: this.zipCode},
        headers: {
          'X-RapidAPI-Key': 'dbdcfcc58emshee09a6ebb71df76p15d33ajsnde298f7b64f7',
          'X-RapidAPI-Host': 'indian-zipcodes.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        this.city = response.data[0].taluka;
    } catch (error) {
        next(new AppError("unable to find city", 501))
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User
// virtual parameter city