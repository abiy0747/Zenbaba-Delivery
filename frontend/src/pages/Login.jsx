import React, { useState, useEffect, useContext } from "react";
import "../Css/login.css";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function Login({ onClose, onSwitchToRegister }) {

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();


  const initialState = {
    email: "",
    password: "",
  };


  const [form, setForm] = useState(initialState);

  const [loading, setLoading] = useState(false);



  const resetForm = () => {
    setForm(initialState);
  };



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

console.log("LOGIN CLICKED");
    try {

      setLoading(true);


     const data = await loginUser(
  form.email,
  form.password
);

console.log("BACKEND RESPONSE:", data);

      console.log("LOGIN RESPONSE:", data);



      if(data.success){


        const token = data.data.tokens.accessToken;

        const user = data.data.user;



        login({

          name: user.name,

          email: user.email,

          role: user.role,

          token: token

        });

      console.log("USER DATA:", data.data.user);
console.log("TOKEN DATA:", data.data.tokens);

        resetForm();



        if(onClose){
          onClose();
        }



        navigate("/");


      }


    } catch(error){


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Login failed"
      );


    } finally {

      setLoading(false);

    }

  };




  useEffect(()=>{

    resetForm();

  },[]);





  return (

    <div

      className="login-overlay"

      onClick={()=>{

        resetForm();

        if(onClose){
          onClose();
        }

      }}

    >


      <div

        className="login-box"

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




        <h2 className="login-title">

          Welcome Back

        </h2>





        <form onSubmit={handleSubmit}>


          <input

            className="login-input"

            name="email"

            type="email"

            placeholder="Email"

            value={form.email}

            onChange={handleChange}

            required

          />





          <input

            className="login-input"

            name="password"

            type="password"

            placeholder="Password"

            value={form.password}

            onChange={handleChange}

            required

          />






          <button

            className="login-btn"

            type="submit"

            disabled={loading}

          >

            {loading ? "Logging in..." : "Login"}

          </button>



        </form>






        <div className="divider">

          <span>

            OR

          </span>

        </div>






        <button

          className="google-btn"

          onClick={()=>{


            login({

              name:"Google User",

              email:"googleuser@gmail.com",

              role:"customer"

            });



            resetForm();


            onClose();


          }}

        >

          Continue with Google


        </button>








        <p className="login-footer">


          Don't have an account?{" "}


          <span

            className="login-link"

            onClick={()=>{

              resetForm();

              onSwitchToRegister();

            }}

          >

            Sign Up


          </span>


        </p>




      </div>


    </div>


  );

}


export default Login;