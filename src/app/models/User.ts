import {Schema, model} from 'mongoose';
import {genSalt, hash } from 'bcryptjs';

// get the salt value from .env file
const salt_Round : number | any = process.env.SALT_ROUND;

let addressInfo = new Schema({
    addressLine1 : String,
    addressLine2 : String,
    city : String,
    pin: String
})

let UserSchema  = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique  :true
    },
    password : {
        type  : String,
        required : true,
        trim : true,
        maxlength : 12
    },
    mobile : {
        type : String,
        required : true,
        trim : true,
    },
    dob : {
        type : Date,
        required : true,
        trim : true,
    },
    role : {
        type : String,
        required : true,
        trim : true,
        default : 'User'
    },
    addressInfo : addressInfo
})

// To hash a password with bcryptjs

UserSchema.pre('save', function(next){
    const user:any = this;

    if(user.isModified("password")) {
        const saltRound  =  parseInt(salt_Round);
        genSalt(saltRound, (err,salt)=>{
            hash(user.password, salt, (err, hash:any) => {
                if(err) {
                    throw err;
                } else {
                    user.password = hash;
                    next();
                }
            })
        })
    } else {
        next();
    }
})

export const User = model('User', UserSchema)