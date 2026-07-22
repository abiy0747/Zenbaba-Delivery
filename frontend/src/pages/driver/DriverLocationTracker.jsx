import { useEffect } from "react";
import axios from "axios";


function DriverLocationTracker({ deliveryId }) {


useEffect(()=>{


if(!deliveryId){
    console.log("No active delivery for GPS");
    return;
}



let watchId;



const startTracking = ()=>{


if(!navigator.geolocation){

console.log(
"Geolocation not supported"
);

return;

}



watchId = navigator.geolocation.watchPosition(

async(position)=>{


const latitude =
position.coords.latitude;


const longitude =
position.coords.longitude;



console.log(
"📍 Driver GPS:",
latitude,
longitude
);



try{


await axios.put(
"http://localhost:5000/api/delivery/location",

{
deliveryId,
latitude,
longitude
},

{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}

);



console.log(
"✅ Location sent"
);



}catch(error){

console.log(
"Location sending error:",
error.response?.data || error.message
);

}



},



(error)=>{


console.log(
"GPS Error:",
error.message
);


},



{


enableHighAccuracy:true,

timeout:10000,

maximumAge:5000


}

);



};



startTracking();




return()=>{


if(watchId){

navigator.geolocation.clearWatch(
watchId
);

console.log(
"GPS tracking stopped"
);

}


};



},[deliveryId]);





return null;


}


export default DriverLocationTracker;