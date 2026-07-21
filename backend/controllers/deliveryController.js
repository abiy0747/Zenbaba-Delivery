import Delivery from "../models/Delivery.js";
import Driver from "../models/Driver.js";
import Order from "../models/Order.js";



// ==========================================
// GET AVAILABLE DELIVERIES
// All drivers can see waiting orders
// ==========================================

export const getAvailableDeliveries = async (req, res) => {

try {


const deliveries = await Delivery.find({

status:"waiting",

driver:null

})
.populate({

path:"order",

populate:[

{
path:"restaurant",
select:"name address phone"
},

{
path:"customer",
select:"name phone"
}

]

})
.sort({

createdAt:-1

});



res.status(200).json({

success:true,

count:deliveries.length,

deliveries

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
// ACCEPT DELIVERY
// First driver wins
// ==========================================

export const acceptDelivery = async(req,res)=>{

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




if(driver.status !== "available"){

return res.status(400).json({

success:false,

message:"Driver is not available"

});

}




const delivery = await Delivery.findOneAndUpdate(

{

_id:req.params.deliveryId,

status:"waiting",

driver:null

},

{

driver:driver._id,

status:"accepted",

acceptedAt:new Date()

},

{

new:true

}

);



if(!delivery){

return res.status(400).json({

success:false,

message:"Delivery already accepted"

});

}





driver.status="busy";

driver.isAvailable=false;


await driver.save();




await delivery.populate({

path:"order",

populate:[

{
path:"restaurant",
select:"name address phone"
},

{
path:"customer",
select:"name phone"
}

]

});




res.status(200).json({

success:true,

message:"Delivery accepted successfully",

delivery

});




}catch(error){

console.log("Accept delivery error:",error);


res.status(500).json({

success:false,

message:"Server error"

});


}


};










// ==========================================
// GET DRIVER DELIVERIES
// ==========================================

export const updateDeliveryStatus = async (req, res) => {

try {

const { status } = req.body;

req.params.deliveryId = req.params.id;

switch (status) {

case "picked_up":
return pickUpDelivery(req, res);

case "out_for_delivery":
return startDelivery(req, res);

case "delivered":
return completeDelivery(req, res);

default:
return res.status(400).json({
success:false,
message:"Invalid delivery status"
});

}

} catch (error) {

console.log("Update delivery status error:", error);

res.status(500).json({
success:false,
message:"Server error"
});

}

};

export const getMyDeliveries = async(req,res)=>{

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





const deliveries = await Delivery.find({

driver:driver._id

})
.populate({

path:"order",

populate:[

{
path:"restaurant",
select:"name address phone"
},

{
path:"customer",
select:"name phone"
}

]

})
.sort({

createdAt:-1

});




res.status(200).json({

success:true,

count:deliveries.length,

deliveries

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
// PICK UP ORDER
// Driver takes food from restaurant
// ==========================================

export const pickUpDelivery = async(req,res)=>{

try{


const driver = await Driver.findOne({

user:req.user.id

});



const delivery = await Delivery.findById(

req.params.deliveryId

);



if(!delivery){

return res.status(404).json({

success:false,

message:"Delivery not found"

});

}




if(

delivery.driver.toString()
!==driver._id.toString()

){

return res.status(403).json({

success:false,

message:"Not your delivery"

});

}





if(delivery.status !== "accepted"){

return res.status(400).json({

success:false,

message:"Delivery cannot be picked up"

});

}





delivery.status="picked_up";

delivery.pickedUpAt=new Date();


await delivery.save();





res.status(200).json({

success:true,

message:"Order picked up successfully",

delivery

});




}catch(error){


console.log("Pickup error:",error);


res.status(500).json({

success:false,

message:"Server error"

});


}

};











// ==========================================
// START DELIVERY
// Driver leaves restaurant
// ==========================================

export const startDelivery = async(req,res)=>{

try{


const driver = await Driver.findOne({

user:req.user.id

});



const delivery = await Delivery.findById(

req.params.deliveryId

);



if(!delivery){

return res.status(404).json({

success:false,

message:"Delivery not found"

});

}




if(

delivery.driver.toString()
!==driver._id.toString()

){

return res.status(403).json({

success:false,

message:"Not your delivery"

});

}





if(delivery.status !== "picked_up"){

return res.status(400).json({

success:false,

message:"Pickup required first"

});

}





delivery.status="out_for_delivery";


await delivery.save();




await Order.findByIdAndUpdate(

delivery.order,

{

orderStatus:"out_for_delivery"

}

);




res.status(200).json({

success:true,

message:"Delivery started",

delivery

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
// COMPLETE DELIVERY
// ==========================================

export const completeDelivery = async(req,res)=>{

try{


const driver = await Driver.findOne({

user:req.user.id

});



const delivery = await Delivery.findById(

req.params.deliveryId

);



if(!delivery){

return res.status(404).json({

success:false,

message:"Delivery not found"

});

}




if(

delivery.driver.toString()
!==driver._id.toString()

){

return res.status(403).json({

success:false,

message:"Not your delivery"

});

}




if(delivery.status !== "out_for_delivery"){

return res.status(400).json({

success:false,

message:"Delivery is not out for delivery"

});

}





delivery.status="delivered";

delivery.deliveredAt=new Date();


await delivery.save();





await Order.findByIdAndUpdate(

delivery.order,

{

orderStatus:"delivered"

}

);






driver.status="available";

driver.isAvailable=true;


await driver.save();






res.status(200).json({

success:true,

message:"Delivery completed successfully",

delivery

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
// ADMIN GET ALL DELIVERIES
// ==========================================

export const getAllDeliveries = async(req,res)=>{

try{


const deliveries = await Delivery.find()

.populate({

path:"driver",

populate:{

path:"user",

select:"name phone"

}

})


.populate({

path:"order",

populate:[

{
path:"restaurant",
select:"name address"
},

{
path:"customer",
select:"name phone"
}

]

})


.sort({

createdAt:-1

});




res.status(200).json({

success:true,

count:deliveries.length,

deliveries

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Server error"

});


}


};