import React,{useEffect,useState} from "react";

import {useNavigate} from "react-router-dom";

import "../../Css/restaurant.css";

import {getMyMenu} from "../../services/menuService";



function RestaurantDashboard(){


const navigate=useNavigate();


const [menuItems,setMenuItems]=useState([]);




useEffect(()=>{

loadMenu();

},[]);





const loadMenu=async()=>{


try{


const res =
await getMyMenu();



if(res.success){

setMenuItems(res.data);

}



}catch(error){

console.log(
"MENU LOAD ERROR",
error.response?.data || error.message
);


}



};







return(

<div className="restaurant-dashboard">



<div className="restaurant-header">

<h1>
🍽️ Restaurant Dashboard
</h1>

<p>
Manage your restaurant
</p>


</div>





<div className="dashboard-cards">


<div className="dashboard-card">

<h2>
🍔
</h2>

<h3>
Menu Items
</h3>

<p>
{menuItems.length}
</p>

</div>



<div className="dashboard-card">

<h2>
📦
</h2>

<h3>
Orders
</h3>

<p>
0
</p>

</div>



</div>








<div className="dashboard-actions">


<button
onClick={()=>navigate("/add-menu")}
>
➕ Add Food
</button>



<button
onClick={()=>navigate("/restaurant-menu")}
>
🍔 Manage Menu
</button>



<button
onClick={()=>navigate("/restaurant-orders")}
>
📦 Orders
</button>


</div>







<h2>
My Menu
</h2>




<div className="dashboard-menu-grid">


{

menuItems.map(item=>(


<div
key={item._id}
className="dashboard-menu-card"
>


<img

src={
item.image ||
"https://via.placeholder.com/300"
}

/>



<h3>
{item.name}
</h3>


<p>
ETB {item.price}
</p>


<p>
{item.category}
</p>



<button

onClick={()=>navigate(
`/edit-menu/${item._id}`
)}

>

✏️ Edit

</button>



</div>


))


}



</div>




</div>


);


}


export default RestaurantDashboard;