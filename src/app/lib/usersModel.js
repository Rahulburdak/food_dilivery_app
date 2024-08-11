const { default: mongoose} = require("mongoose");


const userModel=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phn:String,
    city:String,
    address:String

})
export const userSchema=  mongoose.models.users || mongoose.model('users',userModel) 