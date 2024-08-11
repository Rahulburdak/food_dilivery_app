const { default: mongoose } = require("mongoose");

const diliverypartnerModel=new mongoose.Schema({
    name:String,
    
    password:String,
    phn:String,
    city:String,
    address:String

})
export const diliverypartnerSchema=mongoose.models.diliverpartner || mongoose.model("diliverpartner",diliverypartnerModel)