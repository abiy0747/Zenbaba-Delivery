import Delivery from "../models/Delivery.js";
import Driver from "../models/Driver.js";



// Get available deliveries
export const getAvailableDeliveries = async (req,res)=>{


try{


const deliveries = await Delivery.find({

status:"waiting",

driver:null

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

});



res.status(200).json({

success:true,

data:deliveries

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Failed to get deliveries."

});


}


};








// Driver accepts delivery
export const acceptDelivery = async(req,res)=>{


try{


const delivery = await Delivery.findById(
req.params.id
);



if(!delivery){


return res.status(404).json({

success:false,

message:"Delivery not found."

});


}






if(delivery.driver){


return res.status(400).json({

success:false,

message:"Delivery already accepted."

});


}





const driver = await Driver.findOne({

user:req.user._id

});




if(!driver){


return res.status(404).json({

success:false,

message:"Driver profile not found."

});


}







delivery.driver = driver._id;

delivery.status = "accepted";



await delivery.save();







driver.isAvailable = false;

driver.status="busy";


await driver.save();






res.status(200).json({

success:true,

message:"Delivery accepted successfully.",

data:delivery

});





}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Failed to accept delivery."

});


}


};