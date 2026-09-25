const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fName:{
        required:[true,"Full Name is required."],
        trim:true,
        minLength:[5,"Full name should be larger than 5 characters"],
        maxLength:[30,"Full name should be smaller than 30 characters"],
        match:[],

    },
    username:{
        required:[true,"Username is required."],
        trim:true,
        minLength:[5,"Username should be larger than 5 characters"],
        maxLength:[30,"Username should be smaller than 30 characters"],
        unique:[true,"Username alredy exists."]

    },
    email:{
        required:[true,"Email is required."],
        trim:true,
        unique:[true,"Email alredy exists."],
        match:[]

    },
    password:{
        required:[true,"Password is required."],
        trim:true,
        minLength:[8,"Password should be larger than 8 characters"],
    }
},{timestamps:true});

const userModel = mongoose.model("userDetails",userSchema);