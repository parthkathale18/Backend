const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"User with this Email Address Already Exists"],
        
    },
    password:String
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;