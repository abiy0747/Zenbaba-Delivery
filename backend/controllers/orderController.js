import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Restaurant from "../models/Restaurant.js";
import Delivery from "../models/Delivery.js";
// Create Order (Selected Cart Items Only)
export const createOrder = async (req, res) => {

  try {


    const {
      deliveryAddress,
      phone,
      selectedItems
    } = req.body;



    // Check selected items

    if (!selectedItems || selectedItems.length === 0) {

      return res.status(400).json({

        success:false,

        message:"No items selected."

      });

    }




    // Get user cart

    const cart = await Cart.findOne({

      user:req.user._id

    }).populate("items.menuItem");





    if (!cart || cart.items.length === 0) {


      return res.status(400).json({

        success:false,

        message:"Your cart is empty."

      });


    }







    // Find selected items from cart

    const orderedItems = cart.items.filter(cartItem =>


      selectedItems.some(selected =>

        selected.menuItem ===
        cartItem.menuItem._id.toString()

      )


    );







    if(orderedItems.length === 0){


      return res.status(400).json({

        success:false,

        message:"Selected items not found in cart."

      });


    }









    // Restaurant from first selected item

    const restaurant = await Restaurant.findById(

      orderedItems[0].menuItem.restaurant

    );





    if(!restaurant){


      return res.status(404).json({

        success:false,

        message:"Restaurant not found."

      });


    }









    let totalAmount = 0;







    const orderItems = orderedItems.map(item=>{


      totalAmount +=

      item.menuItem.price *

      item.quantity;





      return {

        menuItem:item.menuItem._id,

        quantity:item.quantity,

        price:item.menuItem.price

      };


    });









    // Create order


    const order = await Order.create({

      customer:req.user._id,

      restaurant:restaurant._id,

      items:orderItems,

      totalAmount,

      deliveryAddress,

      phone,
      orderStatus:"preparing",

    });









    // REMOVE ONLY ORDERED ITEMS

    cart.items = cart.items.filter(cartItem =>


      !selectedItems.some(selected =>


        selected.menuItem ===

        cartItem.menuItem._id.toString()


      )


    );







    await cart.save();









    res.status(201).json({

      success:true,

      message:"Order placed successfully.",

      data:order

    });







  } catch(error){


    console.error(error);



    res.status(500).json({

      success:false,

      message:"Failed to create order."

    });



  }


};


// Customer - Get My Orders
export const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      customer: req.user._id,
    })
      .populate("restaurant", "name address phone")
      .populate("items.menuItem", "name price image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get orders.",
    });

  }
};


// Customer/Admin/Restaurant
export const getSingleOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("customer", "name phone email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get order.",
    });

  }
};



// Restaurant Owner
export const getRestaurantOrders = async (req, res) => {
  try {

    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

    const orders = await Order.find({
      restaurant: restaurant._id,
    })
      .populate("customer", "name phone")
      .populate("items.menuItem", "name");

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get restaurant orders.",
    });

  }
};

// Restaurant updates order status
// Restaurant updates order status

export const updateOrderStatus = async (req, res) => {

try {


const { orderStatus } = req.body;



const order = await Order.findById(req.params.id);



if(!order){

return res.status(404).json({

success:false,

message:"Order not found"

});

}





const validTransitions = {


pending:[
"accepted",
"cancelled"
],


accepted:[
"preparing"
],


preparing:[
"ready_for_pickup"
],


ready_for_pickup:[],


driver_assigned:[
"out_for_delivery"
],


out_for_delivery:[
"delivered"
],


delivered:[],


cancelled:[]


};






const currentStatus = order.orderStatus;



if(!validTransitions[currentStatus].includes(orderStatus)){


return res.status(400).json({

success:false,

message:
`Cannot change order from ${currentStatus} to ${orderStatus}`

});

}





order.orderStatus = orderStatus;



await order.save();








// =====================================
// CREATE DELIVERY WHEN READY
// =====================================

if(orderStatus === "ready_for_pickup"){



const existingDelivery = await Delivery.findOne({

order:order._id

});




if(!existingDelivery){



await Delivery.create({

order:order._id,

driver:null,

status:"waiting"

});


}



}






res.status(200).json({

success:true,

message:"Order status updated",

data:order

});





}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Failed to update order"

});


}


};

// Customer cancels pending order
export const cancelOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.orderStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending orders can be cancelled.",
      });
    }

    order.orderStatus = "cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      data: order,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to cancel order.",
    });

  }
};