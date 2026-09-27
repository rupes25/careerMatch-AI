const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fName:{
        type:String,
        required:[true,"Full Name is required."],
        trim:true,
        minLength:[5,"Full name should be larger than 5 characters"],
        maxLength:[30,"Full name should be smaller than 30 characters"],
        match: [/^[A-Za-z]+(?:\s[A-Za-z]+)*$/,"Full name can contain only letters and spaces",]

    },
    username:{
        type:String,
        required:[true,"Username is required."],
        trim:true,
        minLength:[5,"Username should be larger than 5 characters"],
        maxLength:[30,"Username should be smaller than 30 characters"],
        unique:[true,"Username alredy exists."],
        lowercase:true

    },
    email:{
        type:String,
        required:[true,"Email is required."],
        trim:true,
        lowercase:true,
        unique:[true,"Email alredy exists."],
         match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],

    },
    password:{
        type:String,
        required:[true,"Password is required."],
        trim:true,
        minLength:[8,"Password should be larger than 8 characters"],
    }
},{timestamps:true});

const userModel = mongoose.model("userDetails",userSchema);

module.exports = userModel;