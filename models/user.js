const mongoose = require("mongoose");
mongoose.set({strictQuery:true})
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true
    },
    age:Number,
    gender:{type:String, enum:["male", "female"], default:"male"},   
}, {timestamps:true});

const userModel = new mongoose.model('User', userSchema);

module.exports = userModel;

