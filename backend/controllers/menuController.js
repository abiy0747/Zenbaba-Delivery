import Menu from "../models/Menu.js";
import Restaurant from "../models/Restaurant.js";

export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    // Find the restaurant owned by the logged-in user
    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

    // Create the menu item
    const menuItem = await Menu.create({
      restaurant: restaurant._id,
      name,
      description,
      price,
      image,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Menu item created successfully.",
      data: menuItem,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create menu item.",
    });
  }
};

export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find().populate(
      "restaurant",
      "name"
    );

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get menu items.",
    });
  }
};

export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id).populate(
      "restaurant",
      "name"
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get menu item.",
    });
  }
};

export const updateMenuItem = async (req, res) => {
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

    const menuItem = await Menu.findOne({
      _id: req.params.id,
      restaurant: restaurant._id,
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found.",
      });
    }

    const updated = await Menu.findByIdAndUpdate(
      menuItem._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Menu updated successfully.",
      data: updated,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update menu item.",
    });
  }
};


export const deleteMenuItem = async (req, res) => {
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

    const menuItem = await Menu.findOne({
      _id: req.params.id,
      restaurant: restaurant._id,
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found.",
      });
    }

    await menuItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete menu item.",
    });
  }
};