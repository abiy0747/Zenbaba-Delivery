import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  getMyDriverProfile,
  updateDriverStatus
} from "../../services/driverService";


import {
  getAvailableDeliveries,
  acceptDelivery
} from "../../services/deliveryService";


import {
  FaMotorcycle,
  FaToggleOn,
  FaToggleOff,
  FaBox,
  FaMapMarkerAlt
} from "react-icons/fa";


import "../../Css/driverDashboard.css";



function DriverDashboard(){


const { user } = useContext(AuthContext);



const [driver,setDriver] = useState(null);

const [deliveries,setDeliveries] = useState([]);

const [online,setOnline] = useState(true);





useEffect(()=>{


loadDriver();

loadDeliveries();


},[]);






const loadDriver = async()=>{


try{


const data = await getMyDriverProfile();


setDriver(data.data);


setOnline(data.data.isAvailable);


}

catch(error){


console.log(error);


}



};







const loadDeliveries = async()=>{


try{


const data = await getAvailableDeliveries();


setDeliveries(data.data || []);


}

catch(error){


console.log(error);


}



};









const toggleStatus = async()=>{


try{


const newStatus = !online;


setOnline(newStatus);



await updateDriverStatus(newStatus);



}

catch(error){


console.log(error);


}



};









const handleAcceptDelivery = async(id)=>{


try{


await acceptDelivery(id);



loadDeliveries();



}

catch(error){


console.log(error);


}



};








return (

<div className="driver-dashboard">



<h1>
🚴 Driver Dashboard
</h1>





<div className="driver-profile">



<div className="driver-icon">

<FaMotorcycle/>

</div>





<div>


<h2>

{driver?.user?.name || user?.name || "Driver"}

</h2>



<p>

Status:

<span className={online ? "online":"offline"}>

{online ? " Online":" Offline"}

</span>


</p>



</div>







<button

className="status-btn"

onClick={toggleStatus}

>


{

online ?

<FaToggleOn/>

:

<FaToggleOff/>

}


</button>




</div>








<h2>

Available Deliveries

</h2>








<div className="delivery-grid">



{

deliveries.length === 0 ?


<p>
No available deliveries.
</p>


:

deliveries.map(item=>(



<div

className="delivery-card"

key={item._id}

>





<h3>

<FaBox/>

 Order #{item._id.slice(-5)}

</h3>





<p>

Restaurant:

<b>

{item.order?.restaurant?.name || "Restaurant"}

</b>

</p>





<p>

Customer:

{item.order?.customer?.name || "Customer"}

</p>





<p>

<FaMapMarkerAlt/>

{

item.order?.deliveryAddress ||

"No address"

}


</p>





<h3>

ETB {item.order?.totalAmount || 0}

</h3>






<button

onClick={()=>handleAcceptDelivery(item._id)}

>

Accept Delivery

</button>






</div>



))


}




</div>





</div>

);


}



export default DriverDashboard;