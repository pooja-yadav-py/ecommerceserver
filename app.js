const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require("express");
const app = express();

dotenv.config({ path: './.env' });
require('./db/connection');

app.use(express.json());
//const user = require('./model/userSchema');

//we link the router files to make our route easy
app.use(require('./router/auth'));



const PORT = process.env.PORT;

//middleware
// const middleware = (req,res,next) =>{
//     console.log(`hello my middleware`);
//     next();
// }

// app.get("/",(req,res)=>{
//   res.send(`hello this is home page`);
// });

// app.get("/shop",(req,res)=>{
//     res.send(`hello this is shop page`);
// });

// app.get("/login",(req,res)=>{
//     res.send(`hello this is login page`);
// });

// app.get("/signup",(req,res)=>{
//     res.send(`hello this is signup page`);
// });

app.listen(PORT,()=>{
    console.log(`your port is running on ${PORT}`);
});







