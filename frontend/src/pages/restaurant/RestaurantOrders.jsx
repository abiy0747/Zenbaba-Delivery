import React, { useEffect, useState } from "react";

import "../../Css/restaurant.css";


import {
    FaShoppingBag,
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaCheck,
    FaClock,
    FaTruck
} from "react-icons/fa";


import {
    getRestaurantOrders,
    updateOrderStatus
} from "../../services/orderService";





function RestaurantOrders(){


    const [orders,setOrders] = useState([]);

    const [loading,setLoading] = useState(true);

    const [filter,setFilter] = useState("all");

    const [error,setError] = useState("");






    // ==========================
    // LOAD ORDERS
    // ==========================


    const loadOrders = async()=>{


        try{


            setLoading(true);


            const response = await getRestaurantOrders();



            if(response?.data){


    const sortedOrders = [...response.data].sort(

        (a,b)=>

        new Date(b.createdAt) -

        new Date(a.createdAt)

    );


    setOrders(sortedOrders);


}

            else{


                setOrders([]);


            }



        }


        catch(error){


            console.log(error);


            setError(

                error.response?.data?.message ||

                "Failed to load orders"

            );


        }


        finally{


            setLoading(false);


        }



    };







    useEffect(()=>{


        loadOrders();


    },[]);









    // ==========================
    // STATUS UPDATE
    // ==========================


    const changeStatus = async(

        id,

        status

    )=>{


        try{


            await updateOrderStatus(

                id,

                status

            );


            await loadOrders();



        }


        catch(error){


            console.log(error);


            alert(

                error.response?.data?.message ||

                "Status update failed"

            );


        }



    };









    // ==========================
    // FILTER
    // ==========================


    const filteredOrders =


        filter === "all"

        ?

        orders


        :

        orders.filter(

            order=>

            order.orderStatus === filter

        );









    if(loading){


        return(

            <div className="restaurant-loading">


                <h3>
                    Loading Orders...
                </h3>


            </div>

        );


    }









    return(



        <div className="restaurant-dashboard restaurant-orders-page">





            {/* HEADER */}


            <div className="restaurant-header">


                <div>


                    <h1>

                        Restaurant Orders

                    </h1>


                    <p>

                        Manage customer orders

                    </p>


                </div>



            </div>








            {
                error &&

                <div className="dashboard-error">

                    {error}

                </div>

            }









            {/* FILTER */}



            <div className="dashboard-section">


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

                        All Orders

                    </option>



                    <option value="pending">

                        Pending

                    </option>




                    <option value="accepted">

                        Accepted

                    </option>




                    <option value="preparing">

                        Preparing

                    </option>




                    <option value="ready_for_pickup">

                        Ready For Pickup

                    </option>




                    <option value="delivered">

                        Delivered

                    </option>




                </select>



            </div>









            {/* ORDERS */}



            <div className="dashboard-section">





                {

                    filteredOrders.length === 0


                    ?


                    (

                        <div className="empty-orders">


                            <FaShoppingBag/>


                            <h3>

                                No Orders Found

                            </h3>



                            <p>

                                New customer orders will appear here

                            </p>


                        </div>


                    )



                    :



                    (


                    filteredOrders.map(order=>(



                        <div

                            className="order-management-card"

                            key={order._id}

                        >





                            <div className="order-header">


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








                            <div className="customer-info">



                                <p>

                                    <FaUser/>

                                    {

                                    order.customer?.name ||

                                    "Customer"

                                    }

                                </p>



                                <p>

                                    <FaPhone/>

                                    {

                                    order.phone ||

                                    order.customer?.phone

                                    }

                                </p>




                                <p>

                                    <FaMapMarkerAlt/>

                                    {

                                    order.deliveryAddress

                                    }

                                </p>


                            </div>









                            <div className="order-items">



                                {

                                    order.items.map(item=>(


                                        <div

                                        key={item._id}

                                        className="order-item-row"

                                        >



                                            <span>


                                            {

                                            item.menuItem?.name

                                            }


                                            </span>



                                            <span>


                                            x

                                            {item.quantity}


                                            </span>



                                        </div>



                                    ))

                                }



                            </div>









                            <div className="order-footer">



                                <strong>


                                    Total:

                                    {" "}

                                    {order.totalAmount}

                                    {" "}

                                    ETB


                                </strong>









                                <div className="order-actions">






                                {

                                    order.orderStatus === "pending"

                                    &&


                                    <button

                                    className="accept-btn"

                                    onClick={()=>


                                    changeStatus(

                                        order._id,

                                        "accepted"

                                    )


                                    }

                                    >


                                    <FaCheck/>

                                    Accept


                                    </button>



                                }








                                {

                                    order.orderStatus === "accepted"

                                    &&


                                    <button

                                    className="prepare-btn"

                                    onClick={()=>


                                    changeStatus(

                                        order._id,

                                        "preparing"

                                    )


                                    }

                                    >


                                    <FaClock/>

                                    Prepare


                                    </button>


                                }









                                {

                                    order.orderStatus === "preparing"

                                    &&


                                    <button

                                    className="ready-btn"

                                    onClick={()=>


                                    changeStatus(

                                        order._id,

                                        "ready_for_pickup"

                                    )


                                    }

                                    >


                                    <FaTruck/>

                                    Ready


                                    </button>



                                }







                                </div>




                            </div>







                        </div>



                    ))

                    )


                }




            </div>





        </div>



    );



}



export default RestaurantOrders;