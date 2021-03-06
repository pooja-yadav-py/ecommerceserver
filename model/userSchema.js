const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }   
})

//we are hashing the password
userSchema.pre('save', async function(next){
    
 if(this.isModified('password')){
     this.password = await bcrypt.hash(this.password,12);
 }
 next();
});

//we are generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        return token;
    }catch(err){
        console.log(err);
    }
}


const User = mongoose.model('user',userSchema);
module.exports = User;