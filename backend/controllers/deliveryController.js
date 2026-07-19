import Delivery from "../models/Delivery.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Driver from "../models/Driver.js";
// Admin assigns driver
export const assignDriver = async (req, res) => {
  try {
    const { orderId, driverId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const driver = await User.findById(driverId);

    if (!driver || driver.role !== "driver") {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    // Check if this order already has a driver
const existingDelivery = await Delivery.findOne({
  order: orderId,
});

if (existingDelivery) {
  return res.status(400).json({
    success: false,
    message: "This order has already been assigned to a driver.",
  });
}


    const delivery = await Delivery.create({
      order: orderId,
      driver: driverId,
    });

    order.orderStatus = "driver_assigned";
    await order.save();

    res.status(201).json({
      success: true,
      message: "Driver assigned successfully.",
      data: delivery,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to assign driver.",
    });

  }
};

// Driver views deliveries
export const getMyDeliveries = async(req,res)=>{

try{

const deliveries = await Delivery.find({
driver:req.user._id
})
.populate("order")
.sort({
createdAt:-1
});


res.status(200).json({

success:true,
data:deliveries

});


}catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};
// Driver updates delivery status
export const updateDeliveryStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    delivery.status = status;

    if (status === "delivered") {
      delivery.deliveredAt = new Date();

      const order = await Order.findById(delivery.order);
      order.orderStatus = "delivered";
      await order.save();
    }

    await delivery.save();

    res.status(200).json({
      success: true,
      message: "Delivery updated successfully.",
      data: delivery,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update delivery.",
    });

  }
};

// Admin views all deliveries
export const getAllDeliveries = async (req, res) => {
  try {

    const deliveries = await Delivery.find()
      .populate("driver", "name phone")
      .populate("order");

    res.status(200).json({
      success: true,
      count: deliveries.length,
      data: deliveries,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get deliveries.",
    });

  }
};

// Driver views available deliveries
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

      data:deliveries

    });



  } catch(error){


    console.error(error);


    res.status(500).json({

      success:false,

      message:"Failed to get available deliveries."

    });


  }

};





// Driver accepts delivery
export const acceptDelivery = async(req,res)=>{


try{


const delivery = await Delivery.findById(req.params.id);



if(!delivery){

return res.status(404).json({

success:false,

message:"Delivery not found"

});

}




if(delivery.driver){

return res.status(400).json({

success:false,

message:"Delivery already accepted"

});

}




// Find Driver profile

const driver = await Driver.findOne({

user:req.user._id

});





if(!driver){

return res.status(404).json({

success:false,

message:"Driver profile not found"

});

}





delivery.driver = driver._id;

delivery.status = "accepted";


await delivery.save();





driver.isAvailable=false;

driver.status="busy";


await driver.save();






res.status(200).json({

success:true,

message:"Delivery accepted successfully",

data:delivery

});




}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Accept delivery failed"

});


}


};