import axios from "axios";


const API = axios.create({

baseURL:"http://localhost:5000/api/delivery",

});



API.interceptors.request.use((config)=>{


const token = localStorage.getItem("token");


if(token){

config.headers.Authorization =
`Bearer ${token}`;

}


return config;


});




// Available deliveries

export const getAvailableDeliveries = async()=>{


const res = await API.get(
"/available"
);


return res.data;


};




// Accept delivery

export const acceptDelivery = async(id)=>{


const res = await API.post(
`/accept/${id}`
);


return res.data;


};
