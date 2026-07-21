import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  getMyDriverProfile,
  updateDriverStatus,
} from "../../services/driverService";

import {
  getAvailableDeliveries,
  acceptDelivery,
  getMyDeliveries,
  pickUpDelivery,
  startDelivery,
  completeDelivery,
} from "../../services/deliveryService";

import "../../Css/driverDashboard.css";


function DriverDashboard() {

  const { user } = useContext(AuthContext);


  const [driver, setDriver] = useState(null);

  const [deliveries, setDeliveries] = useState([]);

  const [myDeliveries, setMyDeliveries] = useState([]);

  const [online, setOnline] = useState(false);



  useEffect(() => {

    loadDriver();

    loadAvailableDeliveries();

    loadMyDeliveries();

  }, []);



  // =========================
  // LOAD DRIVER PROFILE
  // =========================

  const loadDriver = async () => {

    try {

      const data = await getMyDriverProfile();

      setDriver(data.driver);

      setOnline(data.driver.isAvailable);


    } catch(err){

      console.log(err);

    }

  };




  // =========================
  // AVAILABLE DELIVERIES
  // =========================

  const loadAvailableDeliveries = async () => {

    try{

      const data = await getAvailableDeliveries();

      setDeliveries(data.deliveries || []);


    }catch(err){

      console.log(err);

    }

  };




  // =========================
  // MY DELIVERIES
  // =========================

  const loadMyDeliveries = async()=>{

    try{

      const data = await getMyDeliveries();

      setMyDeliveries(data.deliveries || []);


    }catch(err){

      console.log(err);

    }

  };





  const refresh = ()=>{

    loadDriver();

    loadAvailableDeliveries();

    loadMyDeliveries();

  };






  // =========================
  // ONLINE / OFFLINE TOGGLE
  // =========================

  const toggleStatus = async()=>{

    try{


      await updateDriverStatus();


      setOnline(prev=>!prev);


      refresh();



    }catch(err){

      console.log(err);

    }

  };






  // =========================
  // ACCEPT DELIVERY
  // =========================

  const handleAcceptDelivery = async(id)=>{

    try{

      await acceptDelivery(id);

      refresh();


    }catch(err){

      console.log(err);

    }

  };







  // =========================
  // PICKUP
  // =========================

  const handlePickup = async(id)=>{

    try{

      await pickUpDelivery(id);

      refresh();


    }catch(err){

      console.log(err);

    }

  };







  // =========================
  // START DELIVERY
  // =========================

  const handleStartDelivery = async(id)=>{

    try{

      await startDelivery(id);

      refresh();


    }catch(err){

      console.log(err);

    }

  };








  // =========================
  // COMPLETE DELIVERY
  // =========================

  const handleComplete = async(id)=>{

    try{

      await completeDelivery(id);

      refresh();


    }catch(err){

      console.log(err);

    }

  };








  return (

    <div className="driver-dashboard">


      <h1>
        🏍️ Driver Dashboard
      </h1>





      {/* DRIVER PROFILE */}

      <div className="driver-profile">


        <div>


          <h2>

            {
            driver?.user?.name ||
            user?.name ||
            "Driver"
            }

          </h2>



          <p>

            Status:

            <span className={online ? "online":"offline"}>

              {
              online
              ? " Online"
              : " Offline"
              }

            </span>


          </p>


        </div>





        {/* TOGGLE */}


        <label className="status-toggle">


          <input

          type="checkbox"

          checked={online}

          onChange={toggleStatus}

          />


          <span className="slider"></span>


        </label>




      </div>









      {/* AVAILABLE DELIVERIES */}


      <h2>
        Available Deliveries
      </h2>




      <div className="delivery-grid">


      {
      deliveries.length===0

      ?

      <p>
        No available deliveries.
      </p>


      :


      deliveries.map(item=>(


      <div
      className="delivery-card"
      key={item._id}
      >


        <h3>
          Order #{item._id.slice(-5)}
        </h3>



        <p>
          <b>Restaurant:</b>
          {" "}
          {item.order?.restaurant?.name}
        </p>



        <p>
          <b>Customer:</b>
          {" "}
          {item.order?.customer?.name}
        </p>



        <p>
          <b>Address:</b>
          {" "}
          {item.order?.deliveryAddress || "No address"}
        </p>



        <p>
          <b>
          ETB {item.order?.totalAmount}
          </b>
        </p>



        <button
        onClick={()=>handleAcceptDelivery(item._id)}
        >

          Accept Delivery

        </button>



      </div>


      ))

      }



      </div>









      {/* MY DELIVERIES */}



      <h2>
        My Deliveries
      </h2>





      <div className="delivery-grid">


      {


      myDeliveries.length===0


      ?


      <p>
        No assigned deliveries.
      </p>


      :



      myDeliveries.map(item=>(



      <div

      className="delivery-card"

      key={item._id}

      >




      <h3>

      Order #{item._id.slice(-5)}

      </h3>





      <p>

      <b>
      Restaurant:
      </b>

      {" "}

      {item.order?.restaurant?.name}

      </p>






      <p>

      <b>
      Customer:
      </b>

      {" "}

      {item.order?.customer?.name}

      </p>







      <p>

      <b>
      Status:
      </b>

      {" "}

      <span className={`status ${item.status}`}>

      {item.status.replaceAll("_"," ")}

      </span>


      </p>







      {
      item.status==="accepted" &&

      <button
      onClick={()=>handlePickup(item._id)}
      >

      Pick Up Order

      </button>

      }







      {
      item.status==="picked_up" &&

      <button
      onClick={()=>handleStartDelivery(item._id)}
      >

      Start Delivery

      </button>

      }







      {
      item.status==="out_for_delivery" &&

      <button
      onClick={()=>handleComplete(item._id)}
      >

      Complete Delivery

      </button>

      }








      {
      item.status==="delivered" &&

      <button disabled>

      Delivered ✓

      </button>

      }




      </div>



      ))

      }




      </div>




    </div>


  );

}



export default DriverDashboard;