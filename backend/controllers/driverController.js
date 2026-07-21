import Driver from "../models/Driver.js";



// ==========================================
// Create Driver Profile
// ==========================================

export const createDriverProfile = async(req,res)=>{

try{


const {
phone,
vehicleType,
vehicleNumber
}=req.body;



const existing = await Driver.findOne({

user:req.user.id

});


if(existing){

return res.status(400).json({

success:false,

message:"Driver profile already exists"

});

}




const driver = await Driver.create({

user:req.user.id,

phone,

vehicleType,

vehicleNumber

});




res.status(201).json({

success:true,

message:"Driver profile created",

driver

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Server error"

});


}

};









// ==========================================
// Get My Driver Profile
// ==========================================

export const getMyDriverProfile = async(req,res)=>{


try{


const driver = await Driver.findOne({

user:req.user.id

})
.populate("user","name email phone");



if(!driver){

return res.status(404).json({

success:false,

message:"Driver profile not found"

});

}



res.status(200).json({

success:true,

driver

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Server error"

});


}


};









// ==========================================
// Update Driver Profile
// ==========================================

export const updateDriverProfile = async(req,res)=>{


try{


const driver = await Driver.findOne({

user:req.user.id

});



if(!driver){

return res.status(404).json({

success:false,

message:"Driver profile not found"

});

}




const {

phone,

vehicleType,

vehicleNumber

}=req.body;




driver.phone = phone || driver.phone;

driver.vehicleType = vehicleType || driver.vehicleType;

driver.vehicleNumber = vehicleNumber || driver.vehicleNumber;



await driver.save();




res.status(200).json({

success:true,

message:"Driver profile updated",

driver

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Server error"

});


}


};









// ==========================================
// Driver Online / Offline
// ==========================================

export const toggleAvailability = async(req,res)=>{


try{


const driver = await Driver.findOne({

user:req.user.id

});



if(!driver){

return res.status(404).json({

success:false,

message:"Driver not found"

});

}




driver.isAvailable = !driver.isAvailable;



driver.status = driver.isAvailable

? "available"

: "inactive";




await driver.save();




res.status(200).json({

success:true,

message:"Availability updated",

driver

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Server error"

});


}


};









// ==========================================
// Admin Get All Drivers
// ==========================================

export const getAllDrivers = async(req,res)=>{


try{


const drivers = await Driver.find()

.populate(

"user",

"name email phone"

);



res.status(200).json({

success:true,

count:drivers.length,

drivers

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Server error"

});


}


};