require('dotenv').config();
const User = require('../model/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req,res) =>{
    const { name,email,password } = req.body
 try{
   const exist = await User.findOne({email})
   if(exist){
    return res.status(400).json({message:"email already in use"})
   }
   if(!name || !email || !password){
    return res.status(403).json({message:"provide all fields"})
   }
   const salt = await bcrypt.genSalt(10)
   console.log(salt);
   
   const hashPassword = await bcrypt.hash(password,salt)
   console.log(hashPassword);
   
   const newUser = new User({ name,email,password:hashPassword})
   const savedUser = await newUser.save()
   const token = await jwt.sign({id:savedUser._id},process.env.JWT_SECRET,{expiresIn:"1d"})
   return res.status(201).json({token,message:"Registered succsessfully"})

 }
 catch(error){
    return res.status(500).json({message:error.message})
 }
}

exports.login = async (req,res) =>{
    const { email,password } = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"invalid credentials"})
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(404).json({message:"invalid credentials"})
        }
        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        console.log(user._id);
        
        return res.status(200).json({token,message:"login successful"})
    }
    catch(error){
       return res.status(500).json({message:error.message})
    }
}