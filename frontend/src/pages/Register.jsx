import React, { useState } from "react";
import "../Css/register.css";
import { registerUser, loginUser } from "../services/authService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Register({ onClose, onSwitchToLogin }) {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const initialState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer"
  };


  const [form, setForm] = useState(initialState);


  const handleChange = (e)=>{

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  const resetForm = ()=>{
    setForm(initialState);
  };



  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      console.log("REGISTER DATA:", form);


      // 1. CREATE ACCOUNT
      const registerResponse = await registerUser(form);


      console.log(
        "REGISTER RESPONSE:",
        registerResponse
      );


      if(registerResponse.success){


        // 2. LOGIN AUTOMATICALLY
        const loginResponse = await loginUser(
          form.email,
          form.password
        );


        console.log(
          "AUTO LOGIN RESPONSE:",
          loginResponse
        );



        if(loginResponse.success){


          const user = loginResponse.data.user;

          const token =
          loginResponse.data.tokens.accessToken;



          // 3. SAVE USER + TOKEN
          login({

            name:user.name,
            email:user.email,
            phone:user.phone,
            role:user.role,
            token:token

          });



          resetForm();


          // 4. CLOSE REGISTER POPUP
          onClose();


          // 5. GO HOME
          navigate("/");


        }


      }else{


        alert(
          registerResponse.message ||
          "Register failed"
        );


      }



    }catch(error){


      console.log(
        "REGISTER ERROR:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Register failed"
      );

    }


  };





return (

<div
className="register-overlay"
onClick={()=>{
resetForm();
onClose();
}}
>


<div
className="register-box"
onClick={(e)=>e.stopPropagation()}
>


<button
className="close-btn"
onClick={()=>{
resetForm();
onClose();
}}
>
✕
</button>



<h2 className="register-title">
Create Account
</h2>



<form onSubmit={handleSubmit}>


<input
className="register-input"
name="name"
placeholder="Full Name"
value={form.name}
onChange={handleChange}
required
/>



<input
className="register-input"
name="email"
type="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
required
/>



<input
className="register-input"
name="phone"
placeholder="Phone Number"
value={form.phone}
onChange={handleChange}
required
/>



<input
className="register-input"
name="password"
type="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
required
/>





<button
className="register-btn"
type="submit"
>
Sign Up
</button>


</form>



<p className="register-footer">

Already have an account?

<span
className="register-link"
onClick={()=>{
resetForm();
onSwitchToLogin();
}}
>
 Login
</span>

</p>



</div>

</div>

);


}


export default Register;