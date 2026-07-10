import Restaurant from "../models/Restaurant.js";

export const createRestaurant = async (req, res) => {
  try {
    const { name, description, address, phone, image } = req.body;

    // Check if the logged-in user already owns a restaurant
    const existingRestaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "You already have a restaurant.",
      });
    }

    // Create restaurant
    const restaurant = await Restaurant.create({
      owner: req.user._id,
      name,
      description,
      address,
      phone,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully.",
      data: restaurant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the restaurant.",
    });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get restaurants",
    });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get restaurant",
    });
  }
};


export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found or you don't have permission",
      });
    }


    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurant._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      data: updatedRestaurant,
    });


  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update restaurant",
    });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found or you don't have permission",
      });
    }

    await restaurant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete restaurant",
    });
  }
};