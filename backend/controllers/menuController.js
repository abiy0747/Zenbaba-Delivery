import Menu from "../models/Menu.js";
import Restaurant from "../models/Restaurant.js";


// ===============================
// CREATE MENU ITEM (Restaurant)
// ===============================

export const createMenuItem = async (req,res)=>{

try{


const {
name,
description,
price,
image,
category
}=req.body;



const restaurant =
await Restaurant.findOne({
owner:req.user._id
});



if(!restaurant){

return res.status(404).json({

success:false,
message:"Restaurant not found"

});

}



const menuItem =
await Menu.create({

restaurant:restaurant._id,

name,
description,
price,
image,
category

});



res.status(201).json({

success:true,

message:"Menu item created successfully",

data:menuItem

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Failed to create menu item"

});


}

};





// ===============================
// CUSTOMER GET ALL MENU
// ===============================

export const getMenuItems = async(req,res)=>{

try{


const menuItems =
await Menu.find()
.populate(
"restaurant",
"name"
);



res.json({

success:true,

data:menuItems

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};







// ===============================
// RESTAURANT GET OWN MENU
// ===============================

export const getMyMenu = async(req,res)=>{


try{


const restaurant =
await Restaurant.findOne({

owner:req.user._id

});



if(!restaurant){

return res.status(404).json({

success:false,

message:"Restaurant not found"

});

}




const menuItems =
await Menu.find({

restaurant:restaurant._id

})
.populate(
"restaurant",
"name"
);



res.json({

success:true,

data:menuItems

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


};







// ===============================
// GET SINGLE MENU
// ===============================

export const getMenuItemById = async(req,res)=>{


try{


const menuItem =
await Menu.findById(req.params.id)
.populate(
"restaurant",
"name"
);



if(!menuItem){

return res.status(404).json({

success:false,

message:"Menu not found"

});

}



res.json({

success:true,

data:menuItem

});



}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};







// ===============================
// UPDATE MENU
// ===============================

export const updateMenuItem = async(req,res)=>{


try{


const restaurant =
await Restaurant.findOne({

owner:req.user._id

});



const menu =
await Menu.findOne({

_id:req.params.id,

restaurant:restaurant._id

});



if(!menu){

return res.status(404).json({

success:false,

message:"Menu not found"

});

}



const updated =
await Menu.findByIdAndUpdate(

menu._id,

req.body,

{
new:true
}

);



res.json({

success:true,

data:updated

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};






// ===============================
// DELETE MENU
// ===============================

export const deleteMenuItem = async(req,res)=>{


try{


const restaurant =
await Restaurant.findOne({

owner:req.user._id

});



const menu =
await Menu.findOne({

_id:req.params.id,

restaurant:restaurant._id

});



if(!menu){

return res.status(404).json({

success:false,

message:"Menu not found"

});

}



await menu.deleteOne();



res.json({

success:true,

message:"Deleted"

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};