import React, { useState } from "react";

import {
  FaTrash,
  FaTimes,
  FaExclamationTriangle
} from "react-icons/fa";


import {
  deleteMenu
} from "../../services/menuService";





function DeleteModal({

  isOpen,

  closeModal,

  selectedFood,

  refreshMenu

}) {



  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");








  if(!isOpen){

    return null;

  }









  const handleDelete = async()=>{


    try{


      setLoading(true);

      setError("");





      await deleteMenu(

        selectedFood._id

      );






      await refreshMenu();





      closeModal();





    }


    catch(error){



      console.log(error);



      setError(

        error.response?.data?.message ||

        "Failed to delete food item"

      );



    }


    finally{


      setLoading(false);


    }



  };









  return(



    <div className="modal-overlay">





      <div className="delete-modal">






        <div className="delete-icon">


          <FaExclamationTriangle/>


        </div>







        <h2>

          Delete Food Item?

        </h2>








        <p>


          Are you sure you want to delete


          <strong>

            {" "}

            {selectedFood?.name}

            {" "}

          </strong>


          ?


          This action cannot be undone.



        </p>









        {

          error &&


          <div className="dashboard-error">


            {error}


          </div>


        }









        <div className="delete-actions">





          <button

            className="cancel-delete-btn"

            onClick={closeModal}

            disabled={loading}

          >


            <FaTimes/>


            Cancel


          </button>








          <button

            className="confirm-delete-btn"

            onClick={handleDelete}

            disabled={loading}

          >


            <FaTrash/>




            {

              loading

              ?

              "Deleting..."

              :

              "Delete"


            }



          </button>






        </div>






      </div>






    </div>



  );



}



export default DeleteModal;