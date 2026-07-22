import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },

    status: {
      type: String,
      enum: ["waiting", "accepted", "picked_up", "out_for_delivery", "delivered"],
      default: "waiting",
    },

    acceptedAt: {
      type: Date,
      default: null,
    },

    pickedUpAt: {
      type: Date,
      default: null,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    driverLocation:{

    latitude:{
        type:Number,
        default:null
    },

    longitude:{
        type:Number,
        default:null
    },

    updatedAt:{
        type:Date,
        default:null
    }

},
  },
  {
    timestamps: true,
  }
);

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;