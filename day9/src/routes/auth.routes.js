const express = require('express')
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router();
const crypto = require("crypto")





// to hit register api use --> /api/auth/register
authRouter.post("/register",async (req,res)=>{ 
    
    const {email,name,password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email});

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User Already Exists with this Email Address"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name,
        email,
        password:hash
    }) 

    const token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"User Registered Successfully",
        user,
        token
    })
})


// to hit protected api use --> /api/auth/protected 
authRouter.post("/protected",async (req,res)=>{
    console.log(req.cookies)
    res.status(200).json({
        message:"Protected Route"
    })
})

//to hit login api use --> /api/auth/login
//this type of function(usually known as callback function) are known as controller, which are used for api handling 
authRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({
            message:"User Not Found"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"User Logged In Successfully",
        user
    })
})








module.exports = authRouter;