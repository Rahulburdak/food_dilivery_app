const { default: mongoose } = require("mongoose");

const foodModel= new mongoose.Schema({
    foodname:String,
    price:String,
    image:String,
    description:String,
    restro_id:mongoose.Schema.Types.ObjectId
})
export const foodSchema= mongoose.models.foods || mongoose.model("foods",foodModel)