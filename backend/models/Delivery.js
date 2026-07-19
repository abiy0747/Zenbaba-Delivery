import mongoose from "mongoose";


const deliverySchema = new mongoose.Schema(
{

  order:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Order",
    required:true,
  },


  driver:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Driver",
  },


  status:{
    type:String,
    enum:[
      "waiting",
      "accepted",
      "picked_up",
      "on_the_way",
      "delivered",
      "cancelled"
    ],
    default:"waiting",
  },


},
{
 timestamps:true,
}
);



const Delivery = mongoose.model(
"Delivery",
deliverySchema
);


export default Delivery;