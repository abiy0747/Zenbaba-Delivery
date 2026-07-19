import React, { useEffect, useState } from "react";
import "../../Css/restaurant.css";

import {
  FaTimes,
  FaSave,
  FaUtensils
} from "react-icons/fa";


import {
  createMenu,
  updateMenu
} from "../../services/menuService";



function AddEditMenuModal({

  isOpen,

  closeModal,

  selectedFood,

  refreshMenu

}) {



  const [formData,setFormData] = useState({

    name:"",
    description:"",
    price:"",
    category:"Burger",
    image:"",
    isAvailable:true

  });



  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");






  useEffect(()=>{


    if(selectedFood){


      setFormData({

        name:selectedFood.name || "",

        description:selectedFood.description || "",

        price:selectedFood.price || "",

        category:selectedFood.category || "Burger",

        image:selectedFood.image || "",

        isAvailable:selectedFood.isAvailable !== false

      });


    }

    else{


      setFormData({

        name:"",
        description:"",
        price:"",
        category:"Burger",
        image:"",
        isAvailable:true

      });


    }


  },[selectedFood]);








  if(!isOpen){

    return null;

  }









  const handleChange=(e)=>{


    const {
      name,
      value,
      type,
      checked
    } = e.target;



    setFormData({

      ...formData,


      [name]:

      type === "checkbox"

      ?

      checked

      :

      value


    });


  };









  const handleSubmit=async(e)=>{


    e.preventDefault();



    try{


      setLoading(true);

      setError("");




      if(!formData.name || !formData.price){


        setError(

          "Food name and price are required"

        );


        return;


      }





      if(selectedFood){



        await updateMenu(

          selectedFood._id,

          formData

        );


      }

      else{


        await createMenu(

          formData

        );


      }






      await refreshMenu();



      closeModal();




    }


    catch(error){



      console.log(error);



      setError(

        error.response?.data?.message ||

        "Failed to save food item"

      );



    }


    finally{


      setLoading(false);


    }



  };









  return(



    <div className="modal-overlay">



      <div className="menu-modal">





        <div className="modal-header">



          <h2>


            <FaUtensils/>


            {

              selectedFood

              ?

              "Edit Food"

              :

              "Add Food"


            }


          </h2>





          <button

            className="close-modal"

            onClick={closeModal}

          >

            <FaTimes/>

          </button>



        </div>








        {
          error &&

          <div className="dashboard-error">

            {error}

          </div>

        }








        <form

          onSubmit={handleSubmit}

          className="menu-form"

        >





          <input

            name="name"

            value={formData.name}

            onChange={handleChange}

            placeholder="Food name"

          />







          <textarea

            name="description"

            value={formData.description}

            onChange={handleChange}

            placeholder="Description"

          />







          <input

            type="number"

            name="price"

            value={formData.price}

            onChange={handleChange}

            placeholder="Price ETB"

          />







          <select

            name="category"

            value={formData.category}

            onChange={handleChange}

          >


            <option value="Burger">
              Burger
            </option>


            <option value="Pizza">
              Pizza
            </option>


            <option value="Drink">
              Drink
            </option>


            <option value="Dessert">
              Dessert
            </option>


            <option value="Chicken">
              Chicken
            </option>


            <option value="Other">
              Other
            </option>


          </select>







          <input

            name="image"

            value={formData.image}

            onChange={handleChange}

            placeholder="Image URL"

          />








          <label className="availability-box">


            <input

              type="checkbox"

              name="isAvailable"

              checked={formData.isAvailable}

              onChange={handleChange}

            />


            Available


          </label>








          <button

            type="submit"

            className="save-food-btn"

            disabled={loading}

          >


            <FaSave/>


            {

              loading

              ?

              "Saving..."

              :

              "Save Food"


            }



          </button>







        </form>






      </div>





    </div>



  );



}



export default AddEditMenuModal;