import axios from "axios";


const API = axios.create({

baseURL:"http://localhost:5000/api/drivers",

});



// Add token automatically

API.interceptors.request.use((config)=>{


const token = localStorage.getItem("token");


if(token){

config.headers.Authorization =
`Bearer ${token}`;

}


return config;


});





// Get driver profile

export const getMyDriverProfile = async()=>{


const res = await API.get("/me");


return res.data;


};





// Update driver availability

export const updateDriverStatus = async(isAvailable)=>{


const res = await API.put(
"/status",
{
isAvailable
}
);


return res.data;


};