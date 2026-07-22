import Delivery from "../models/Delivery.js";

export const updateDriverLocation = async (req, res) => {
  try {

    const { deliveryId, latitude, longitude } = req.body;

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return res.status(404).json({
        message: "Delivery not found",
      });
    }

    delivery.driverLocation = {
      latitude,
      longitude,
      updatedAt: new Date(),
    };

    await delivery.save();

    // ============================
    // SOCKET.IO
    // ============================

    const io = req.app.get("io");

    io.to(deliveryId).emit("driverLocation", {
      latitude,
      longitude,
    });

    console.log(
      "📡 Driver location sent:",
      deliveryId,
      latitude,
      longitude
    );

    res.json({
      message: "Location updated",
      location: delivery.driverLocation,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};