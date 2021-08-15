const mongoose = require('mongoose');

const createProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    companyName:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    selectedFile:{
        type:String,
        required: true
    },
    userId:{
        type:String,
        required: true
    }
})

const CreateProduct = mongoose.model('createproduct',createProductSchema);
module.exports = CreateProduct;