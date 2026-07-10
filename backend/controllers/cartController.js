import Cart from "../models/Cart.js";
import Menu from "../models/Menu.js";


// Add item to cart
export const addToCart = async (req, res) => {
  try {

    const { menuItemId, quantity } = req.body;


    const menuItem = await Menu.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }


    let cart = await Cart.findOne({
      user: req.user._id,
    });


    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }


    const existingItem = cart.items.find(
      item => item.menuItem.toString() === menuItemId
    );


    if (existingItem) {

      existingItem.quantity += quantity;

    } else {

      cart.items.push({
        menuItem: menuItemId,
        quantity,
      });

    }


    await cart.save();


    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });


  } catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to add item to cart"
    });

  }
};

export const getMyCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate(
      "items.menuItem",
      "name price image category"
    );


    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      });
    }


    res.status(200).json({
      success: true,
      data: cart,
    });


  } catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to get cart"
    });

  }
};


export const updateCartItem = async (req,res)=>{
  try{

    const {quantity}=req.body;


    const cart = await Cart.findOne({
      user:req.user._id
    });


    if(!cart){
      return res.status(404).json({
        success:false,
        message:"Cart not found"
      });
    }


    const item = cart.items.find(
      item => item.menuItem.toString() === req.params.itemId
    );


    if(!item){
      return res.status(404).json({
        success:false,
        message:"Item not found in cart"
      });
    }


    item.quantity = quantity;


    await cart.save();


    res.status(200).json({
      success:true,
      message:"Cart updated",
      data:cart
    });


  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to update cart"
    });

  }
};

export const removeCartItem = async(req,res)=>{
  try{


    const cart = await Cart.findOne({
      user:req.user._id
    });


    if(!cart){
      return res.status(404).json({
        success:false,
        message:"Cart not found"
      });
    }


    cart.items = cart.items.filter(
      item => item.menuItem.toString() !== req.params.itemId
    );


    await cart.save();


    res.status(200).json({
      success:true,
      message:"Item removed",
      data:cart
    });


  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to remove item"
    });

  }
};

export const clearCart = async (req,res)=>{
  try{

    const cart = await Cart.findOne({
      user:req.user._id
    });


    if(!cart){
      return res.status(404).json({
        success:false,
        message:"Cart not found"
      });
    }


    cart.items=[];

    await cart.save();


    res.status(200).json({
      success:true,
      message:"Cart cleared"
    });


  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to clear cart"
    });

  }
};