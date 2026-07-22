import React, { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";

import L from "leaflet";

import "../../Css/LiveTracker.css";

import socket from "../../services/socket";



// ===============================
// CUSTOM ICONS
// ===============================


const restaurantIcon = new L.Icon({

  iconUrl:
  "https://cdn-icons-png.flaticon.com/512/3448/3448609.png",

  iconSize:[40,40]

});



const driverIcon = L.divIcon({

html:`

<div class="driver-live-dot">
</div>

`,

className:"",

iconSize:[30,30],

iconAnchor:[15,15]

});



const customerIcon = new L.Icon({

  iconUrl:
  "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",

  iconSize:[40,40]

});





function LiveTracker({delivery}){


const [roadRoute,setRoadRoute]=useState([]);

const [distance,setDistance]=useState("0 KM");

const [time,setTime]=useState("0 min");


const [animatedDriver,setAnimatedDriver]=useState(null);





// ===============================
// LOCATIONS
// ===============================


const restaurantPosition=[

11.5936,

37.3908

];



const defaultDriverPosition=[

11.5960,

37.3950

];



const customerPosition=[

11.6000,

37.4000

];







// ===============================
// SOCKET REAL TIME LOCATION
// ===============================


useEffect(()=>{


if(!delivery){

console.log(
"No delivery received"
);

return;

}



console.log(
"Joining delivery:",
delivery._id
);



socket.emit(

"joinDelivery",

delivery._id

);





socket.on(

"driverLocation",

(location)=>{


console.log(
"New driver location:",
location
);



setAnimatedDriver([

location.latitude,

location.longitude

]);


}

);





return()=>{


socket.off(

"driverLocation"

);


};



},[delivery]);









// ===============================
// GET ROAD ROUTE
// ===============================


useEffect(()=>{


const getRoute=async()=>{


try{


const start =

`${restaurantPosition[1]},${restaurantPosition[0]}`;



const end =

`${customerPosition[1]},${customerPosition[0]}`;






const url =

`https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`;






const response = await fetch(url);



const data = await response.json();






if(data.routes && data.routes.length>0){



const coordinates =

data.routes[0]
.geometry
.coordinates;





const formattedRoute =

coordinates.map(point=>[

point[1],

point[0]

]);






setRoadRoute(
formattedRoute
);





setDistance(

(data.routes[0].distance / 1000)
.toFixed(1)
+
" KM"

);





setTime(

Math.ceil(

data.routes[0].duration / 60

)

+

" min"

);




}



}

catch(error){


console.log(
"Routing error:",
error
);


}



};



getRoute();



},[]);









return(


<div className="live-tracker">





<div className="tracker-header">


<h2>

🗺 Live Delivery Tracking

</h2>





<div className="tracker-info">



<div>

Distance

<strong>

{distance}

</strong>

</div>





<div>

ETA

<strong>

{time}

</strong>

</div>




</div>


</div>









<MapContainer


center={defaultDriverPosition}


zoom={15}


className="delivery-map"


>






<TileLayer


url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"


/>








<Marker


position={restaurantPosition}


icon={restaurantIcon}


>


<Popup>

🍔 Restaurant Pickup

</Popup>


</Marker>








<Marker


position={
animatedDriver || defaultDriverPosition
}


icon={driverIcon}


>


<Popup>

🏍 Driver Live Location

</Popup>


</Marker>








<Marker


position={customerPosition}


icon={customerIcon}


>


<Popup>

🏠 Customer Location

</Popup>


</Marker>








{

roadRoute.length > 0 &&


<Polyline


positions={roadRoute}


color="#2563eb"


weight={6}


/>


}








</MapContainer>







</div>


);



}



export default LiveTracker;