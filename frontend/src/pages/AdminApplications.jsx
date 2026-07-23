import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/AdminApplications.css";


function AdminApplications(){


const [drivers,setDrivers] = useState([]);

const [restaurants,setRestaurants] = useState([]);


const token = localStorage.getItem("token");



const config = {

headers:{
Authorization:`Bearer ${token}`
}

};





// GET APPLICATIONS

const fetchApplications = async()=>{


try{


const driverRes = await axios.get(

"http://localhost:5000/api/applications/drivers",

config

);



const restaurantRes = await axios.get(

"http://localhost:5000/api/applications/restaurants",

config

);



setDrivers(driverRes.data);

setRestaurants(restaurantRes.data);



}catch(error){

console.log(error);

}


};





useEffect(()=>{


fetchApplications();


},[]);








// APPROVE DRIVER

const approveDriver = async(id)=>{


try{


await axios.put(

`http://localhost:5000/api/applications/driver/${id}/approve`,

{},

config

);



alert("Driver approved");


fetchApplications();



}catch(error){

alert(
error.response?.data?.message
);

}


};








// REJECT DRIVER

const rejectDriver = async(id)=>{


try{


await axios.put(

`http://localhost:5000/api/applications/driver/${id}/reject`,

{},

config

);



fetchApplications();



}catch(error){

console.log(error);

}


};









// APPROVE RESTAURANT

const approveRestaurant = async(id)=>{


try{


await axios.put(

`http://localhost:5000/api/applications/restaurant/${id}/approve`,

{},

config

);



alert("Restaurant approved");


fetchApplications();



}catch(error){

alert(
error.response?.data?.message
);

}


};









// REJECT RESTAURANT

const rejectRestaurant = async(id)=>{


try{


await axios.put(

`http://localhost:5000/api/applications/restaurant/${id}/reject`,

{},

config

);



fetchApplications();



}catch(error){

console.log(error);

}


};









return (

<div className="admin-app-page">





<div className="admin-header">

<h1>
⚙️ Admin Dashboard
</h1>


<p>
Manage Zenbaba partners and monitor applications
</p>


</div>








<div className="admin-stats">



<div className="stat-card">

<h3>
🏍️ Drivers
</h3>


<strong>
{drivers.length}
</strong>


<p>
Total Applications
</p>


</div>







<div className="stat-card">

<h3>
🍽️ Restaurants
</h3>


<strong>
{restaurants.length}
</strong>


<p>
Total Applications
</p>


</div>








<div className="stat-card">

<h3>
⏳ Pending
</h3>


<strong>

{
[...drivers,...restaurants]
.filter(
item=>item.status==="pending"
).length

}

</strong>


<p>
Waiting Approval
</p>


</div>







<div className="stat-card">

<h3>
✅ Approved
</h3>


<strong>

{
[...drivers,...restaurants]
.filter(
item=>item.status==="approved"
).length

}

</strong>


<p>
Active Partners
</p>


</div>



</div>









{/* DRIVER APPLICATIONS */}


<section>


<h2>
🏍️ Driver Applications
</h2>



<div className="application-grid">


{

drivers.map((driver)=>(


<div
className="application-card"
key={driver._id}
>


<h3>
{driver.user?.name || "Driver Applicant"}
</h3>



<p>
📧 {driver.user?.email}
</p>


<p>
📞 {driver.phone}
</p>


<p>
📍 {driver.city}
</p>


<p>
🏍️ {driver.vehicleType}
</p>


<p>
🚘 {driver.vehicleNumber}
</p>



<p className="status">
{driver.status}
</p>





<div className="action-buttons">


<button

className="approve"

onClick={()=>approveDriver(driver._id)}

>
Approve
</button>



<button

className="reject"

onClick={()=>rejectDriver(driver._id)}

>
Reject
</button>



</div>



</div>


))

}



</div>


</section>









{/* RESTAURANT APPLICATIONS */}


<section>


<h2>
🍽️ Restaurant Applications
</h2>




<div className="application-grid">


{

restaurants.map((restaurant)=>(


<div

className="application-card"

key={restaurant._id}

>



<h3>

{restaurant.restaurantName}

</h3>



<p>
📧 {restaurant.user?.email}
</p>


<p>
📞 {restaurant.phone}
</p>



<p>
📍 {restaurant.address}
</p>



<p>
🍴 {restaurant.category}
</p>




<p className="status">

{restaurant.status}

</p>






<div className="action-buttons">


<button

className="approve"

onClick={()=>approveRestaurant(restaurant._id)}

>
Approve
</button>



<button

className="reject"

onClick={()=>rejectRestaurant(restaurant._id)}

>
Reject
</button>



</div>





</div>


))


}



</div>



</section>






</div>


);


}


export default AdminApplications;