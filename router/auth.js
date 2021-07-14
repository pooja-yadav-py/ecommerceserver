const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


require("../db/connection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`hello this is home page from router.js`);
});

//signup route

router.post("/signup", async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  if (!email || !firstname || !lastname || !password) {
    return res.status(420).json({ error: "plz filled the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    }

    const user = new User({ email, firstname, lastname, password });

     const userRegister = await user.save();

    res.status(201).json({ message: "user registered successfully" });

  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/login", async (req,res)=>{
  try{
    let token;
   const {email, password} = req.body;
   if(!email || !password){
     return res.status(400).json({error: "Plz Filled the data"});
   }
   const userLogin = await User.findOne({ email: email });

   if(userLogin){
    const isMatch = await bcrypt.compare(password,userLogin.password); 

     token = await userLogin.generateAuthToken();
    console.log(token);

    res.cookie("jwtoken", token,{
      expires:new Date(Date.now() + 25892000000),
      httpOnly:true
    })
    if(!isMatch){
      res.status(400).json({ error: "Invalid Credientials pass" });
    }else{
      res.json({ message: "user Signin Successfully" });
    }
   }else{
     res.status(400).json({ error: "Invalid Credientials  " });
   }
  
   
  } catch(err){
    console.log(err);
  }
})

module.exports = router;
