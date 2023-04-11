//  {Usermodel} from "../models/User.model"
require("dotenv").config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {Usermodel} = require("../models/User.model") 
const loginContoller = async(req,res)=>{
    const {password,email} = req.body;
    let userExist = await Usermodel.findOne({email});
    console.log(userExist)
    if(userExist){
        console.log(userExist)
    let passwordFromDb = userExist?.password;
    bcrypt.compare(password,passwordFromDb,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({message:"server error"})
        }else{
        console.log(result)
       if(result){
           let accessToken = jwt.sign({email,userId:userExist._id},process.env.SECRET_KEY) 
    
           res.status(200).json({message:"login successfull",accessToken}) 
       }else{
        res.status(400).json({message:"wrong credentials"})
       } 
        }
    })
    }else{
        res.status(200).json({message:"please register first"});
    }
}


 const signupContoller = async(req,res)=>{
    // search in the db first
    console.log(req.body)
    // console.log(req.body)
    let {name,email,password} = req.body
    let doesUserAlreadyexists = await Usermodel.findOne({email: email});
    console.log(doesUserAlreadyexists)
    if(!doesUserAlreadyexists){
        try {
         bcrypt.hash(password,10, async(err,hash)=>{
            if(err){
                console.log(err)
            }else{
                // console.log(hash)
                let query = await Usermodel({...req.body,password:hash});
    await query.save()
    res.status(201).json({message:"user account created successfully"})
            }
         })   
        } catch (error) {
            console.log(`error while registering the user :error is ${error}`)
            res.status(500).json({message:"server error"})
        }
    }else{
        res.status(400).json({message:"user already exists"})
    }
    }

const getAllUsersControllers = async(req,res)=>{
try {
let allUsers = await Usermodel.find({});
res.status(200).json(allUsers)
} catch (error) {
    console.log(`error while loading the data from database`,error);
    res.status(500).json({message:"server error",error})
}
}


    module.exports = {signupContoller,loginContoller,getAllUsersControllers}