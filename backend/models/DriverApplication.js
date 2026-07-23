import mongoose from "mongoose";


const driverApplicationSchema = new mongoose.Schema(

{

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
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


vehicleType:{
type:String,
enum:[
"motorcycle",
"car",
"bicycle"
],
required:true
},


vehicleNumber:{
type:String,
required:true
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



const DriverApplication =
mongoose.model(
"DriverApplication",
driverApplicationSchema
);



export default DriverApplication;