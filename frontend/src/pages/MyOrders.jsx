import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getMyOrders,
  cancelOrder,
} from "../services/orderService";

import "../Css/MyOrders.css";


function MyOrders() {


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);


  const [showModal, setShowModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);


  const [toast, setToast] = useState("");



  // Load Orders

  const loadOrders = async () => {

    try {

      const res = await getMyOrders();


      if (res.success) {

        setOrders(res.data);

      }


    } catch(error) {

      console.log(
        "LOAD ORDERS ERROR:",
        error.response?.data || error.message
      );

      showToast("Failed to load orders");


    } finally {

      setLoading(false);

    }

  };





  useEffect(() => {

    loadOrders();

  }, []);







  // Toast Message

  const showToast = (message) => {

    setToast(message);


    setTimeout(() => {

      setToast("");

    },3000);


  };








  // Open Cancel Modal

  const openCancelModal = (order) => {

    setSelectedOrder(order);

    setShowModal(true);

  };









  // Cancel Order

  const confirmCancel = async () => {


    if(!selectedOrder) return;



    try {


      const res = await cancelOrder(
        selectedOrder._id
      );



      if(res.success){


        showToast(
          "Order cancelled successfully"
        );


        setShowModal(false);


        setSelectedOrder(null);



        loadOrders();


      }



    } catch(error){


      console.log(
        "CANCEL ERROR:",
        error.response?.data || error.message
      );


      showToast(
        "Unable to cancel order"
      );


    }


  };








  // Loading UI

  if(loading){

    return (

      <div className="orders-loading">

        <div className="loader"></div>

        <p>
          Loading your orders...
        </p>

      </div>

    );

  }





  return (

    <div className="orders-page">


      {/* Toast */}

      {
        toast && (

          <div className="toast">

            ✓ {toast}

          </div>

        )
      }



      <div className="orders-container">


        <h1 className="orders-title">

          My Orders

        </h1>



        <p className="orders-subtitle">

          Track your food delivery orders

        </p>





        {
          orders.length === 0 ? (

            <div className="empty-orders">

              <h2>
                No orders yet 🍽️
              </h2>

              <p>
                Start ordering your favorite food.
              </p>


              <Link to="/">

                <button className="primary-btn">

                  Browse Restaurants

                </button>

              </Link>


            </div>


          ) : (


            <div className="orders-list">


              {
                orders.map((order)=>(

                  <div
                    className="order-card"
                    key={order._id}
                  >


                    <div className="order-header">


                      <div>

                        <h3>

                          Order #
                          {order._id.slice(-6)}

                        </h3>


                        <span className={
                          `status ${order.orderStatus}`
                        }>

                          {order.orderStatus}

                        </span>


                      </div>



                      <h3 className="price">

                        ETB {order.totalAmount.toFixed(2)}

                      </h3>


                    </div>

                                        <div className="order-body">


                      <h4>
                        Items
                      </h4>


                      <div className="order-items">


                        {
                          order.items.map((item)=>(

                            <div
                              className="order-item"
                              key={item._id}
                            >


                              <span>

                                {item.menuItem?.name || "Food Item"}

                              </span>


                              <span>

                                × {item.quantity}

                              </span>


                            </div>

                          ))
                        }


                      </div>





                      <div className="delivery-box">


                        <p>

                          📍

                          <strong>
                            Address:
                          </strong>

                          {" "}

                          {order.deliveryAddress}

                        </p>




                        <p>

                          📞

                          <strong>
                            Phone:
                          </strong>

                          {" "}

                          {order.phone}

                        </p>



                      </div>




                    </div>







                    <div className="order-actions">


                      <Link
                        to={`/orders/${order._id}`}
                      >

                        <button className="secondary-btn">

                          View Details

                        </button>


                      </Link>





                      {
                        order.orderStatus === "pending" && (

                          <button

                            className="cancel-btn"

                            onClick={()=>
                              openCancelModal(order)
                            }

                          >

                            Cancel Order

                          </button>

                        )
                      }


                    </div>



                  </div>


                ))
              }



            </div>


          )
        }



      </div>







      {/* Cancel Confirmation Modal */}


      {
        showModal && (

          <div className="modal-overlay">


            <div className="cancel-modal">


              <h2>

                Cancel Order?

              </h2>



              <p>

                Are you sure you want to cancel this order?

              </p>


              <p className="warning-text">

                This action cannot be undone.

              </p>




              <div className="modal-buttons">


                <button

                  className="secondary-btn"

                  onClick={()=>{

                    setShowModal(false);

                    setSelectedOrder(null);

                  }}

                >

                  No, Keep Order

                </button>





                <button

                  className="cancel-btn"

                  onClick={confirmCancel}

                >

                  Yes, Cancel

                </button>



              </div>


            </div>



          </div>

        )
      }



    </div>

  );


}



export default MyOrders;