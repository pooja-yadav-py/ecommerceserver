const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require("express");
// const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
dotenv.config({ path: './.env' });
require('./db/connection');


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

//we link the router files to make our route easy
app.use(require('./router/auth'));


const PORT = process.env.PORT || 5000;


// if(process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"));
//     const path = require("path");
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     })
//}

app.listen(PORT,()=>{
    console.log(`your port is running on ${PORT}`);
});







