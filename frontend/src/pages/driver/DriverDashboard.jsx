import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  getMyDriverProfile,
  updateDriverStatus,
} from "../../services/driverService";

import {
  getAvailableDeliveries,
  acceptDelivery,
  getMyDeliveries,
  pickUpDelivery,
  startDelivery,
  completeDelivery,
} from "../../services/deliveryService";

import "../../Css/driverDashboard.css";
import LiveTracker from "./LiveTracker";
import DriverLocationTracker from "./DriverLocationTracker";
function DriverDashboard(){

const {user}=useContext(AuthContext);


const [driver,setDriver]=useState(null);
const [deliveries,setDeliveries]=useState([]);
const [myDeliveries,setMyDeliveries]=useState([]);
const [online,setOnline]=useState(false);



useEffect(()=>{

loadDriver();
loadAvailableDeliveries();
loadMyDeliveries();

},[]);





const loadDriver=async()=>{

try{

const data=await getMyDriverProfile();

setDriver(data.driver);

setOnline(data.driver.isAvailable);


}catch(err){

console.log(err);

}

};





const loadAvailableDeliveries=async()=>{

try{

const data=await getAvailableDeliveries();

setDeliveries(data.deliveries || []);


}catch(err){

console.log(err);

}

};





const loadMyDeliveries=async()=>{

try{

const data=await getMyDeliveries();

setMyDeliveries(data.deliveries || []);


}catch(err){

console.log(err);

}

};






const refresh=()=>{

loadDriver();
loadAvailableDeliveries();
loadMyDeliveries();

};






const toggleStatus=async()=>{

try{

await updateDriverStatus();

setOnline(prev=>!prev);

refresh();


}catch(err){

console.log(err);

}

};





const handleAcceptDelivery=async(id)=>{

await acceptDelivery(id);

refresh();

};



const handlePickup=async(id)=>{

await pickUpDelivery(id);

refresh();

};



const handleStartDelivery=async(id)=>{

await startDelivery(id);

refresh();

};



const handleComplete=async(id)=>{

await completeDelivery(id);

refresh();

};





return(

<div className="lux-driver-dashboard">



{
myDeliveries.length > 0 &&

<DriverLocationTracker
deliveryId={
myDeliveries[0]._id
}
/>

}
{/* HEADER */}

<div className="lux-header">


<div>

<h1>
🏍️ Zenbaba Driver
</h1>


<p>
Welcome back,
<strong>
{" "}
{driver?.user?.name || user?.name || "Driver"}
</strong>
</p>


</div>



<div className="online-box">


<span className={online?"active-dot":"inactive-dot"}>
●
</span>


<label>

{online?"Online":"Offline"}

</label>



<label className="lux-toggle">


<input

type="checkbox"

checked={online}

onChange={toggleStatus}

/>


<span></span>


</label>



</div>



</div>







{/* STATS */}


<div className="stats-container">


<div className="stat-card">

<h3>
📦
</h3>

<p>
Available
</p>

<strong>
{deliveries.length}
</strong>

</div>




<div className="stat-card">

<h3>
🚴
</h3>

<p>
Active
</p>

<strong>
{myDeliveries.filter(
d=>d.status!=="delivered"
).length}
</strong>

</div>




<div className="stat-card">

<h3>
✅
</h3>

<p>
Completed
</p>

<strong>
{myDeliveries.filter(
d=>d.status==="delivered"
).length}
</strong>

</div>




<div className="stat-card">

<h3>
💰
</h3>

<p>
Earnings
</p>

<strong>
ETB
</strong>

</div>



</div>




<LiveTracker 
    delivery={myDeliveries[0]}
/>





<h2>
🔥 Available Deliveries
</h2>




<div className="lux-grid">


{
deliveries.length===0 ?

<div className="empty">

No available deliveries

</div>


:

deliveries.map(item=>(


<div className="lux-card"
key={item._id}>


<div className="card-top">

<h3>
🍔
{item.order?.restaurant?.name}
</h3>


<span>
ETB {item.order?.totalAmount}
</span>


</div>




<p>
📍
{item.order?.deliveryAddress || "Address unavailable"}
</p>



<p>
👤
{item.order?.customer?.name}
</p>



<button

onClick={()=>handleAcceptDelivery(item._id)}

>

Accept Delivery →

</button>



</div>


))


}


</div>









<h2>
🚚 My Deliveries
</h2>



<div className="lux-grid">


{
myDeliveries.map(item=>(


<div className="lux-card"
key={item._id}>


<div className="card-top">


<h3>

🏍️ Order #{item._id.slice(-5)}

</h3>


</div>




<p>

Status:

<span className={`lux-status ${item.status}`}>

{item.status.replaceAll("_"," ")}

</span>


</p>






{
item.status==="accepted" &&

<button onClick={()=>handlePickup(item._id)}>

Pickup Order

</button>

}





{
item.status==="picked_up" &&

<button onClick={()=>handleStartDelivery(item._id)}>

Start Delivery

</button>

}





{
item.status==="out_for_delivery" &&

<button onClick={()=>handleComplete(item._id)}>

Complete

</button>

}





{
item.status==="delivered" &&

<button disabled>

Delivered ✓

</button>

}




</div>


))

}



</div>





</div>


);


}



export default DriverDashboard;