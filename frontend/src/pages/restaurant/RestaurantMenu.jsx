import React, {useEffect,useState} from "react";
import "../../Css/restaurant.css";
import {useNavigate} from "react-router-dom";
import {
 getMyMenu
} from "../../services/menuService";

import {
deleteMenu
} from "../../services/menuService";
function RestaurantMenu(){

const navigate = useNavigate();
const [menu,setMenu]=useState([]);


useEffect(()=>{

loadMenu();

},[]);



const loadMenu=async()=>{


try{


const res = await getMyMenu();


if(res.success){

setMenu(res.data);

}


}catch(error){

console.log(error);

}


};


const handleDelete=async(id)=>{


const confirmDelete =
window.confirm(
"Are you sure you want to delete this food?"
);


if(!confirmDelete) return;


await deleteMenu(id);


loadMenu();


};


return(

<div className="restaurant-dashboard">


<div className="restaurant-header">

<h1>
🍔 My Menu
</h1>

<p>
Manage your restaurant food items
</p>


</div>





<div className="dashboard-actions">


<button
onClick={()=>navigate("/add-menu")}
>
+ Add New Food
</button>

</div>






<div className="dashboard-cards">


{

menu.map((item)=>(


<div
className="dashboard-card"
key={item._id}
>


<img

src={
item.image ||
"https://via.placeholder.com/200"
}

alt={item.name}

style={{
width:"150px",
height:"150px",
borderRadius:"20px",
objectFit:"cover"
}}

/>



<h3>

{item.name}

</h3>


<p>

ETB {item.price}

</p>



<button
onClick={()=>
navigate(`/edit-menu/${item._id}`)
}
>
Edit
</button>



<button
onClick={()=>handleDelete(item._id)}
>
Delete
</button>



</div>


))


}


</div>


</div>


);


}


export default RestaurantMenu;