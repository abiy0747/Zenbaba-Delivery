import React,{useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";

import "../../Css/restaurant.css";

import {
getMenuById,
updateMenu
} from "../../services/menuService";


function EditMenu(){


const {id}=useParams();

const navigate=useNavigate();



const [form,setForm]=useState({

name:"",
description:"",
price:"",
category:"",
image:""

});





useEffect(()=>{

loadMenu();

},[]);





const loadMenu=async()=>{


try{


const res=await getMenuById(id);


if(res.success){

setForm(res.data);

}


}catch(error){

console.log(error);

}


};





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const handleSubmit=async(e)=>{


e.preventDefault();



try{


const res=await updateMenu(
id,
form
);



if(res.success){


alert(
"Menu updated successfully"
);


navigate("/restaurant-menu");


}


}catch(error){

console.log(error);

}


};





return(

<div className="restaurant-dashboard">


<div className="restaurant-header">

<h1>
✏️ Edit Menu
</h1>


</div>




<form

onSubmit={handleSubmit}

style={{

background:"white",

padding:"30px",

borderRadius:"25px",

maxWidth:"500px",

margin:"auto"

}}

>


<input

name="name"

value={form.name}

onChange={handleChange}

style={inputStyle}

/>



<textarea

name="description"

value={form.description}

onChange={handleChange}

style={inputStyle}

/>




<input

name="price"

value={form.price}

onChange={handleChange}

style={inputStyle}

/>




<input

name="image"

value={form.image}

onChange={handleChange}

style={inputStyle}

/>




<button style={buttonStyle}>

Update Food

</button>



</form>


</div>


);


}



const inputStyle={

width:"100%",

padding:"12px",

marginBottom:"15px"

};



const buttonStyle={

width:"100%",

padding:"15px",

background:"#2563eb",

color:"white",

border:"none",

borderRadius:"20px"

};



export default EditMenu;