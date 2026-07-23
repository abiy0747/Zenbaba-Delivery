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








  const redirectUser = (role) => {


    switch(role){


      case "restaurant":

        navigate("/restaurant-dashboard");

        break;



      case "driver":

        navigate("/driver-dashboard");

        break;



      case "admin":

  navigate("/admin-applications");

  break;



      case "customer":

      default:

        navigate("/");

        break;


    }


  };










  const handleSubmit = async (e) => {


    e.preventDefault();


    try {


      setLoading(true);



      const data = await loginUser(

        form.email,

        form.password

      );





      console.log("LOGIN RESPONSE:", data);





      if(data.success){



        const token = data.data.tokens.accessToken;


        const user = data.data.user;





        // Save authentication data

        localStorage.setItem(

          "token",

          token

        );



        localStorage.setItem(

          "role",

          user.role

        );



        localStorage.setItem(

          "user",

          JSON.stringify(user)

        );








        // Update Auth Context

        login({

          name:user.name,

          email:user.email,

          role:user.role,

          token:token

        });








        resetForm();




        if(onClose){

          onClose();

        }







        // Redirect based on role

        redirectUser(user.role);



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


            const googleUser = {


              name:"Google User",

              email:"googleuser@gmail.com",

              role:"customer"


            };



            localStorage.setItem(

              "role",

              googleUser.role

            );



            login(googleUser);



            resetForm();



            onClose();



            navigate("/");



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