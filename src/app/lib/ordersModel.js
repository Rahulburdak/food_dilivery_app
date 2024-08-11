import mongoose, { Mongoose } from "mongoose";

export const orderModel= new mongoose.Schema({
    user_Id:mongoose.Schema.Types.ObjectId,
    restro_Id:mongoose.Schema.Types.ObjectId,
    food_items:String,
    diliverBoy_Id:mongoose.Schema.Types.ObjectId,
    status:String,
    amount:String

})
export const orderSchema=mongoose.models.orders || mongoose.model('orders',orderModel)