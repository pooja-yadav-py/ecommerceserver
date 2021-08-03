const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const cors = require('cors');
dotenv.config({ path: './.env' });
require('./db/connection');

app.use(express.json());

app.use(cors());

//we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`your port is running on ${PORT}`);
});







