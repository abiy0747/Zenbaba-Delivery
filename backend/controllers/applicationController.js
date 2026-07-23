import DriverApplication from "../models/DriverApplication.js";
import RestaurantApplication from "../models/RestaurantApplication.js";

import Driver from "../models/Driver.js";
import Restaurant from "../models/Restaurant.js";

import User from "../models/User.js";





/*
=====================================
 CREATE DRIVER APPLICATION
=====================================
*/

export const createDriverApplication = async (req,res)=>{

try{


const existingApplication =
await DriverApplication.findOne({

user:req.user._id,

status:"pending"

});


if(existingApplication){

return res.status(400).json({

message:"You already have a pending driver application"

});

}




const application =
await DriverApplication.create({

user:req.user._id,

phone:req.body.phone,

city:req.body.city,

vehicleType:req.body.vehicleType,

vehicleNumber:req.body.vehicleNumber

});





res.status(201).json({

message:"Driver application submitted successfully",

application

});



}catch(error){


res.status(500).json({

message:error.message

});


}

};









/*
=====================================
 CREATE RESTAURANT APPLICATION
=====================================
*/


export const createRestaurantApplication = async(req,res)=>{


try{


const existingApplication =
await RestaurantApplication.findOne({

user:req.user._id,

status:"pending"

});



if(existingApplication){


return res.status(400).json({

message:"You already have a pending restaurant application"

});


}





const application =
await RestaurantApplication.create({

user:req.user._id,

restaurantName:req.body.restaurantName,

phone:req.body.phone,

city:req.body.city,

address:req.body.address,

category:req.body.category,

openingTime:req.body.openingTime,

closingTime:req.body.closingTime,

description:req.body.description

});





res.status(201).json({

message:"Restaurant application submitted successfully",

application

});



}catch(error){


res.status(500).json({

message:error.message

});


}


};









/*
=====================================
 GET DRIVER APPLICATIONS
 ADMIN
=====================================
*/


export const getDriverApplications = async(req,res)=>{


try{


const applications =

await DriverApplication.find()

.populate(
"user",
"name email phone role"
)

.sort({

createdAt:-1

});



res.json(applications);



}catch(error){


res.status(500).json({

message:error.message

});


}


};









/*
=====================================
 GET RESTAURANT APPLICATIONS
 ADMIN
=====================================
*/


export const getRestaurantApplications = async(req,res)=>{


try{


const applications =

await RestaurantApplication.find()

.populate(
"user",
"name email phone role"
)

.sort({

createdAt:-1

});



res.json(applications);



}catch(error){


res.status(500).json({

message:error.message

});


}


};









/*
=====================================
 APPROVE DRIVER APPLICATION
=====================================
*/


export const approveDriverApplication = async(req,res)=>{


try{


const application =

await DriverApplication.findById(req.params.id);



if(!application){


return res.status(404).json({

message:"Application not found"

});


}




// Change user role

await User.findByIdAndUpdate(

application.user,

{

role:"driver"

}

);




// Prevent duplicate driver profile

const existingDriver =

await Driver.findOne({

user:application.user

});



let driver;



if(existingDriver){


driver = existingDriver;


}else{


driver = await Driver.create({

user:application.user,

phone:application.phone,

vehicleType:application.vehicleType,

vehicleNumber:application.vehicleNumber

});


}





application.status="approved";


await application.save();





res.json({

message:"Driver approved successfully",

driver

});




}catch(error){


res.status(500).json({

message:error.message

});


}


};









/*
=====================================
 APPROVE RESTAURANT APPLICATION
=====================================
*/


export const approveRestaurantApplication = async(req,res)=>{


try{


const application =

await RestaurantApplication.findById(req.params.id);



if(!application){


return res.status(404).json({

message:"Application not found"

});


}





// Change user role

await User.findByIdAndUpdate(

application.user,

{

role:"restaurant"

}

);







// Prevent duplicate restaurant

const existingRestaurant =

await Restaurant.findOne({

owner:application.user

});



let restaurant;



if(existingRestaurant){


restaurant = existingRestaurant;


}else{


restaurant = await Restaurant.create({

owner:application.user,

name:application.restaurantName,

description:application.description,

address:application.address,

phone:application.phone

});


}






application.status="approved";


await application.save();





res.json({

message:"Restaurant approved successfully",

restaurant

});




}catch(error){


res.status(500).json({

message:error.message

});


}


};









/*
=====================================
 REJECT DRIVER APPLICATION
=====================================
*/


export const rejectDriverApplication = async(req,res)=>{


try{


const application =

await DriverApplication.findById(req.params.id);



if(!application){

return res.status(404).json({

message:"Application not found"

});

}



application.status="rejected";


await application.save();



res.json({

message:"Driver application rejected"

});



}catch(error){


res.status(500).json({

message:error.message

});


}


};









/*
=====================================
 REJECT RESTAURANT APPLICATION
=====================================
*/


export const rejectRestaurantApplication = async(req,res)=>{


try{


const application =

await RestaurantApplication.findById(req.params.id);



if(!application){

return res.status(404).json({

message:"Application not found"

});

}



application.status="rejected";


await application.save();



res.json({

message:"Restaurant application rejected"

});



}catch(error){


res.status(500).json({

message:error.message

});


}


};