import mongoose from "mongoose";


const restaurantApplicationSchema =
new mongoose.Schema(

{


user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},


restaurantName:{
type:String,
required:true
},


phone:{
type:String,
required:true
},


city:{
type:String,
required:true
},


address:{
type:String,
required:true
},


category:{
type:String,
required:true
},


openingTime:{
type:String,
required:true
},


closingTime:{
type:String,
required:true
},


description:{
type:String,
default:""
},


status:{
type:String,
enum:[
"pending",
"approved",
"rejected"
],
default:"pending"
},


adminNote:{
type:String,
default:""
}


},

{
timestamps:true
}

);



const RestaurantApplication =
mongoose.model(
"RestaurantApplication",
restaurantApplicationSchema
);



export default RestaurantApplication;