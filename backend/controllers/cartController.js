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