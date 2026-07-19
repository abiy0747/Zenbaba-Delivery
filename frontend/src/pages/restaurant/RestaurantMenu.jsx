import React, { useEffect, useState } from "react";
import "../../Css/restaurant.css";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUtensils
} from "react-icons/fa";

import { getMyMenu } from "../../services/menuService";



function RestaurantMenu() {


  const [menuItems,setMenuItems] = useState([]);

  const [filteredItems,setFilteredItems] = useState([]);

  const [search,setSearch] = useState("");

  const [filter,setFilter] = useState("all");

  const [loading,setLoading] = useState(true);

  const [selectedFood,setSelectedFood] = useState(null);



  // =========================
  // LOAD MENU
  // =========================


  const loadMenu = async()=>{


    try{


      setLoading(true);


      const response = await getMyMenu();



      let data = [];


      if(response?.data){

        data = response.data;

      }

      else if(Array.isArray(response)){

        data = response;

      }



      setMenuItems(data);

      setFilteredItems(data);



    }

    catch(error){


      console.log(
        "Menu loading error:",
        error
      );


    }

    finally{


      setLoading(false);


    }


  };





  useEffect(()=>{


    loadMenu();


  },[]);








  // =========================
  // SEARCH + FILTER
  // =========================


  useEffect(()=>{


    let result = [...menuItems];



    if(search){


      result = result.filter(food=>

        food.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      );


    }





    if(filter==="available"){


      result =
      result.filter(
        food=>food.isAvailable !== false
      );


    }




    if(filter==="unavailable"){


      result =
      result.filter(
        food=>food.isAvailable === false
      );


    }




    setFilteredItems(result);



  },[
    search,
    filter,
    menuItems
  ]);







  // =========================
  // ACTIONS
  // =========================


  const handleAddFood = ()=>{


    console.log(
      "Open Add Food Modal"
    );


  };





  const handleEdit = (food)=>{


    setSelectedFood(food);


    console.log(
      "Edit:",
      food
    );


  };






  const handleDelete = (food)=>{


    console.log(
      "Delete:",
      food
    );


  };








  if(loading){


    return(

      <div className="restaurant-loading">

        <h3>
          Loading Menu...
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
            My Menu
          </h1>


          <p>
            Manage your restaurant food items
          </p>


        </div>




        <button
          className="add-food-btn"
          onClick={handleAddFood}
        >


          <FaPlus/>

          Add Food


        </button>




      </div>








      {/* SEARCH AREA */}



      <div className="dashboard-section">


        <div
          style={{
            display:"flex",
            gap:"15px",
            flexWrap:"wrap"
          }}
        >



          <div
            style={{
              flex:1,
              minWidth:"250px",
              display:"flex",
              alignItems:"center",
              gap:"10px",
              background:"#f1f5f9",
              padding:"12px 18px",
              borderRadius:"12px"
            }}
          >


            <FaSearch/>


            <input

              value={search}

              onChange={
                e=>setSearch(
                  e.target.value
                )
              }

              placeholder="Search food..."

              style={{
                border:"none",
                outline:"none",
                background:"transparent",
                width:"100%"
              }}

            />


          </div>





          <select

            value={filter}

            onChange={
              e=>setFilter(
                e.target.value
              )
            }

            style={{
              padding:"12px",
              borderRadius:"10px",
              border:"1px solid #ddd"
            }}

          >

            <option value="all">
              All Foods
            </option>


            <option value="available">
              Available
            </option>


            <option value="unavailable">
              Unavailable
            </option>


          </select>



        </div>



      </div>









      {/* MENU LIST */}




      <div className="dashboard-section">



        {

          filteredItems.length === 0 ?



          (

            <div className="empty-menu">


              <FaUtensils/>


              <h3>
                No Food Found
              </h3>


              <p>
                Add your restaurant meals
              </p>



            </div>


          )



          :



          (

            <div className="food-grid">



              {

                filteredItems.map(food=>(


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
                            handleEdit(food)
                          }

                        >


                          <FaEdit/>

                          Edit


                        </button>





                        <button

                          className="delete-btn"

                          onClick={()=>
                            handleDelete(food)
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





    </div>



  );


}



export default RestaurantMenu;