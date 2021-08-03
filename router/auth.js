const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Authenticate = require('../middleware/authenticate');


require("../db/connection");
const User = require("../model/userSchema");

//signup route

router.post("/signup", async (req, res) => {
  const { email,firstname,lastname,password } = req.body;
  if (!email || !firstname || !lastname || !password) {
    return res.status(420).json({ error: "plz filled the field properly" });
  }

  const userExist = await User.findOne({ email: email });
  try{
    if(userExist){
      return res.status(422).json({ error: "Email already Exist" });
    }
    
    const user = new User({ email, firstname, lastname, password });

    const userRegister = await user.save();

   res.status(201).json({ message: "user registered successfully"});
  }catch(err){
  console.log(err);
  }
});
  
  

//login route
router.post("/login", async (req,res) => {
  const {email, password} = req.body;
  if(!email || !password){
         return res.status(400).json({ error: "Plz Filled the data"});
  }
 console.log(req.body);
 const userLogin = await User.findOne({ email:email });
  if(userLogin){
      const isMatch = await bcrypt.compare(password,userLogin.password); 
      token = await userLogin.generateAuthToken();
      if(!isMatch){
              res.status(400).json({ error: "Invalid Credientials pass" });
            }else{
              res.status(200).json({ message: "user Signin Successfully", result : userLogin,token:token});
            }
      }else{
          res.status(400).json({ error: "Invalid Credientials  " });
          }

});
module.exports = router;
