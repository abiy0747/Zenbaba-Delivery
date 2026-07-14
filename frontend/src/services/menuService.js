import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/menu",
});
  

// Attach JWT token automatically

API.interceptors.request.use((config)=>{


const token = localStorage.getItem("token");


if(token){

config.headers.Authorization =
`Bearer ${token}`;

}


return config;


});


export const getMenus = async () => {
  const res = await API.get("/");
  return res.data;
};

export const getMyMenu = async()=>{


const res = await API.get(
"/my-menu"
);


return res.data;


};

export const createMenu = async(data)=>{


const res = await API.post(
"/",
data
);


return res.data;


};

export const updateMenu = async(id,data)=>{

const res = await API.put(
`/${id}`,
data
);

return res.data;

};



export const deleteMenu = async(id)=>{


const res = await API.delete(
`/${id}`
);


return res.data;


};

export const getMenuById = async(id)=>{


const res = await API.get(
`/${id}`
);


return res.data;


};