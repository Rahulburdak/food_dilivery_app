const { default: mongoose} = require("mongoose");


const resorentModel= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    location:String,
    phn:String

});
    

export const resorentSchema=mongoose.models.restorents
|| mongoose.model("restorents",resorentModel)