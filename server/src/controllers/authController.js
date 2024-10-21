import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const customError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  
  export const register= async (req,res)=>{

    const { name, email, password, whatsappNumber } = req.body;
  
    try {
  
      
      const signInResponse = await User.create({
        name,
        email,
        password,
        whatsappNumber
      });
  
      res.status(200).json("This is a new user: " + signInResponse);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// @desc Login user
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // CHECK IF THE USER EXISTS
  
      const user = await User.findOne({
       email ,
      });
  
      if (!user) return res.status(400).json({ message: "Invalid Credentials!" });
  
      // CHECK IF THE PASSWORD IS CORRECT
  
  
    
      // GENERATE COOKIE TOKEN AND SEND TO THE USER
  
      // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
      const age = 1000 * 60 * 60 * 24 * 7;
  
      const token = jwt.sign(
        {
          isAdmin: false,
        },
        "5347",
        { expiresIn: age }
      );
  
      const { password: userPassword, ...userInfo } = user;
  
      res.cookie("token", token, {
        httpOnly:true
    }).status(200)
      .json(userInfo);

      
     
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to login!" });
    }
  };

// @desc Get user data
export const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user;
    res.status(200).json({
        id: _id,
        name,
        email
    });
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const getUsers= async (req,res)=>{
    const response = await User.find();
    res.status(200).json(response)
}