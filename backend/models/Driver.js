import mongoose from "mongoose";


const driverSchema = new mongoose.Schema(

{

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true,
unique:true
},


phone:{
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


isAvailable:{
type:Boolean,
default:true
},


status:{
type:String,
enum:[
"available",
"busy",
"inactive"
],
default:"available"
}

},

{
timestamps:true
}

);



const Driver = mongoose.model(
"Driver",
driverSchema
);


export default Driver;