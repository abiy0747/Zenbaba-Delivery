import React, { useEffect, useState } from "react";
import "../../Css/restaurant.css";

import {
  FaUtensils,
  FaShoppingBag,
  FaMoneyBillWave,
  FaChartLine,
  FaPlus,
  FaEdit,
  FaTrash,
  FaClipboardList
} from "react-icons/fa";


import { getMyMenu } from "../../services/menuService";

import AddEditMenuModal from "./AddEditMenuModal";

import DeleteModal from "./DeleteModal";

import { useNavigate } from "react-router-dom";

function RestaurantDashboard(){

    
const navigate = useNavigate();
  const [menuItems,setMenuItems] = useState([]);

  const [orders,setOrders] = useState([]);


  const [loading,setLoading] = useState(true);


  const [error,setError] = useState("");



  const [showFoodModal,setShowFoodModal] = useState(false);


  const [showDeleteModal,setShowDeleteModal] = useState(false);



  const [selectedFood,setSelectedFood] = useState(null);







  // ===============================
  // LOAD MENU
  // ===============================


  const loadMenu = async()=>{


    try{


      setLoading(true);


      const response = await getMyMenu();



      if(response?.data){


        setMenuItems(response.data);


      }

      else if(Array.isArray(response)){


        setMenuItems(response);


      }

      else{


        setMenuItems([]);


      }



    }


    catch(error){


      console.log(error);


      setError(

        error.response?.data?.message ||

        "Unable to load menu"

      );


    }


    finally{


      setLoading(false);


    }


  };







  useEffect(()=>{


    loadMenu();


  },[]);








  // ===============================
  // MODAL HANDLERS
  // ===============================


  const openAddModal=()=>{


    setSelectedFood(null);


    setShowFoodModal(true);


  };





  const openEditModal=(food)=>{


    setSelectedFood(food);


    setShowFoodModal(true);


  };






  const openDeleteModal=(food)=>{


    setSelectedFood(food);


    setShowDeleteModal(true);


  };







  const closeFoodModal=()=>{


    setShowFoodModal(false);


    setSelectedFood(null);


  };






  const closeDeleteModal=()=>{


    setShowDeleteModal(false);


    setSelectedFood(null);


  };









  // ===============================
  // STATISTICS
  // ===============================



  const totalFoods = menuItems.length;


  const availableFoods =

    menuItems.filter(

      item=>item.isAvailable !== false

    ).length;





  const revenue =

    orders.reduce(

      (sum,item)=>

      sum + (item.totalAmount || 0),

      0

    );









  if(loading){


    return(

      <div className="restaurant-loading">

        <h3>
          Loading Dashboard...
        </h3>

      </div>

    );


  }









  return(



    <div className="restaurant-dashboard">






      {/* HEADER */}



      <div className="restaurant-header">



        <div>


          <h1>

            Restaurant Dashboard

          </h1>


          <p>

            Manage your restaurant business

          </p>


        </div>






       <div
style={{
display:"flex",
gap:"15px"
}}
>


<button

className="add-food-btn"

onClick={() => navigate("/restaurant-orders")}

>

<FaClipboardList/>

Orders

</button>




<button

className="add-food-btn"

onClick={openAddModal}

>

<FaPlus/>

Add Food

</button>


</div>





      </div>









      {
        error &&

        <div className="dashboard-error">

          {error}

        </div>

      }









      {/* STAT CARDS */}



      <div className="restaurant-stats">



        <div className="stat-card">


          <div className="stat-icon">

            <FaUtensils/>

          </div>


          <div>

            <h3>
              {totalFoods}
            </h3>


            <p>
              Total Foods
            </p>


          </div>


        </div>






        <div className="stat-card">


          <div className="stat-icon">

            <FaShoppingBag/>

          </div>


          <div>

            <h3>
              {orders.length}
            </h3>


            <p>
              Orders
            </p>


          </div>


        </div>






        <div className="stat-card">


          <div className="stat-icon">

            <FaMoneyBillWave/>

          </div>


          <div>


            <h3>

              {revenue} ETB

            </h3>


            <p>
              Revenue
            </p>


          </div>


        </div>






        <div className="stat-card">


          <div className="stat-icon">

            <FaChartLine/>

          </div>



          <div>


            <h3>
              {availableFoods}
            </h3>


            <p>
              Available
            </p>


          </div>



        </div>



      </div>









      {/* MENU */}



      <div className="dashboard-section">


        <div className="section-title">


          <h2>

            My Menu

          </h2>


        </div>






        {
          menuItems.length===0 ?


          (

            <div className="empty-menu">

              <FaUtensils/>

              <h3>
                No Food Items
              </h3>


              <p>
                Add your first meal
              </p>


            </div>


          )



          :



          (

          <div className="food-grid">


            {

              menuItems.map(food=>(


                <div

                  className="food-card"

                  key={food._id}

                >




                  <img

                    src={

                      food.image ||

                      "https://via.placeholder.com/300"

                    }

                    alt={food.name}

                  />






                  <div className="food-info">



                    <h3>

                      {food.name}

                    </h3>




                    <p>

                      {food.description}

                    </p>




                    <strong>

                      {food.price} ETB

                    </strong>





                    <div className="food-actions">



                      <button

                        className="edit-btn"

                        onClick={()=>

                          openEditModal(food)

                        }

                      >

                        <FaEdit/>

                        Edit

                      </button>






                      <button

                        className="delete-btn"

                        onClick={()=>


                          openDeleteModal(food)

                        }

                      >

                        <FaTrash/>

                        Delete


                      </button>



                    </div>



                  </div>



                </div>



              ))

            }



          </div>


          )


        }




      </div>









      {/* MODALS */}



      <AddEditMenuModal


        isOpen={showFoodModal}


        closeModal={closeFoodModal}


        selectedFood={selectedFood}


        refreshMenu={loadMenu}


      />







      <DeleteModal


        isOpen={showDeleteModal}


        closeModal={closeDeleteModal}


        selectedFood={selectedFood}


        refreshMenu={loadMenu}


      />





    </div>


  );



}



export default RestaurantDashboard;