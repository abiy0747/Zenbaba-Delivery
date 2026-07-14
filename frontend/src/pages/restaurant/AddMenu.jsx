import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

import "../../Css/restaurant.css";

import {
createMenu
} from "../../services/menuService";



function AddMenu(){


const navigate = useNavigate();


const [form,setForm]=useState({

name:"",
description:"",
price:"",
category:"Burger",
image:""

});



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const handleSubmit=async(e)=>{


e.preventDefault();


try{


const res = await createMenu(form);



if(res.success){


alert("Menu item created successfully");


navigate("/restaurant-menu");


}



}catch(error){


console.log(error);


alert(
error.response?.data?.message ||
"Failed to create menu"
);


}



};





return(

<div className="restaurant-dashboard">


<div className="restaurant-header">

<h1>
➕ Add Food Item
</h1>

<p>
Create a new menu item
</p>

</div>




<form

onSubmit={handleSubmit}

style={{

maxWidth:"500px",

margin:"auto",

background:"white",

padding:"30px",

borderRadius:"25px"

}}

>



<input

name="name"

placeholder="Food name"

value={form.name}

onChange={handleChange}

required

style={inputStyle}

/>




<textarea

name="description"

placeholder="Description"

value={form.description}

onChange={handleChange}

style={inputStyle}

/>




<input

name="price"

type="number"

placeholder="Price"

value={form.price}

onChange={handleChange}

required

style={inputStyle}

/>





<select

name="category"

value={form.category}

onChange={handleChange}

style={inputStyle}

>


<option>Burger</option>

<option>Pizza</option>

<option>Drink</option>

<option>Dessert</option>

<option>Chicken</option>

<option>Other</option>


</select>





<input

name="image"

placeholder="Image URL"

value={form.image}

onChange={handleChange}

style={inputStyle}

/>






<button

style={{

...buttonStyle,

width:"100%"

}}

>

Create Food

</button>




</form>


</div>


);


}



const inputStyle={


width:"100%",


padding:"12px",


marginBottom:"15px",


borderRadius:"10px",


border:"1px solid #ddd"


};




const buttonStyle={


padding:"15px",


background:"#2563eb",


color:"white",


border:"none",


borderRadius:"20px",


cursor:"pointer",


fontWeight:"bold"


};



export default AddMenu;