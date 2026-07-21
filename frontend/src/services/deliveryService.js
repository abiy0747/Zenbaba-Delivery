import axios from "axios";


const API = axios.create({

baseURL:"http://localhost:5000/api/delivery"

});



API.interceptors.request.use((config)=>{


const token = localStorage.getItem("token");


if(token){

config.headers.Authorization =
`Bearer ${token}`;

}


return config;


});





export const getAvailableDeliveries = async()=>{


const res = await API.get(
"/available"
);


return res.data;


};






export const acceptDelivery = async(id)=>{


const res = await API.put(

`/${id}/accept`

);


return res.data;


};



export const getMyDeliveries = async()=>{


const res = await API.get(

"/my"

);


return res.data;


};


// Pickup order

export const pickUpDelivery = async(id)=>{

const res = await API.put(
`/${id}/pickup`
);

return res.data;

};




// Start delivery

export const startDelivery = async(id)=>{

const res = await API.put(
`/${id}/start`
);

return res.data;

};




// Complete delivery

export const completeDelivery = async(id)=>{

const res = await API.put(
`/${id}/complete`
);

return res.data;

};