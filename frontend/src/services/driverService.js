import axios from "axios";


const API = axios.create({

baseURL:"http://localhost:5000/api/drivers",

});




// Add JWT token automatically

API.interceptors.request.use((config)=>{


const token = localStorage.getItem("token");


if(token){

config.headers.Authorization =
`Bearer ${token}`;

}


return config;


});






// ==================================
// Get Driver Profile
// ==================================

export const getMyDriverProfile = async()=>{


const res = await API.get(

"/me"

);


return res.data;


};









// ==================================
// Toggle Driver Availability
// Backend:
// PUT /api/drivers/availability
// ==================================

export const updateDriverStatus = async()=>{


const res = await API.put(

"/availability"

);


return res.data;


};









// ==================================
// Create Driver Profile
// ==================================

export const createDriverProfile = async(data)=>{


const res = await API.post(

"/profile",

data

);


return res.data;


};









// ==================================
// Update Driver Profile
// ==================================

export const updateDriverProfile = async(data)=>{


const res = await API.put(

"/profile",

data

);


return res.data;


};




export default API;