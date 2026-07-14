import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getSingleOrder } from "../services/orderService";

import "../Css/OrderDetails.css";


function OrderDetails() {


  const { id } = useParams();

  const navigate = useNavigate();


  const [order,setOrder] = useState(null);

  const [loading,setLoading] = useState(true);





  const loadOrder = async()=>{


    try{


      const res = await getSingleOrder(id);


      if(res.success){

        setOrder(res.data);

      }


    }catch(error){


      console.log(
        "ORDER DETAILS ERROR:",
        error.response?.data || error.message
      );


    }finally{


      setLoading(false);


    }


  };







  useEffect(()=>{


    loadOrder();


  },[]);








  if(loading){


    return (

      <div className="details-loading">

        <div className="loader"></div>

        <p>
          Loading order...
        </p>

      </div>

    );


  }








  if(!order){


    return (

      <div className="not-found">

        <h2>
          Order not found
        </h2>


        <button

          onClick={()=>navigate("/my-orders")}

          className="back-btn"

        >

          Back to Orders

        </button>


      </div>

    );


  }








const steps=[

"pending",

"accepted",

"preparing",

"ready_for_pickup",

"driver_assigned",

"out_for_delivery",

"delivered"

];







const currentIndex = steps.indexOf(
  order.orderStatus
);









return (


<div className="details-page">



<div className="details-container">





<div className="details-header">


<h1>

Order Details

</h1>


<p>

Order #

{order._id.slice(-6)}

</p>


</div>







{/* Status Timeline */}



<div className="tracking-box">


<h2>

Delivery Status

</h2>




<div className="timeline">


{

steps.map((step,index)=>(


<div

key={step}

className={

index <= currentIndex

?

"step active"

:

"step"

}

>


<div className="circle">

{index+1}

</div>


<span>

{step.replaceAll("_"," ")}

</span>


</div>


))

}



</div>


</div>








{/* Restaurant */}


<div className="info-card">


<h2>

Restaurant

</h2>


<p>

{order.restaurant?.name}

</p>


<p>

{order.restaurant?.address}

</p>



</div>









{/* Items */}



<div className="info-card">


<h2>

Items

</h2>



{

order.items.map(item=>(


<div

className="detail-item"

key={item._id}

>


<div>


<h4>

{item.menuItem?.name}

</h4>


<p>

Quantity:

{item.quantity}

</p>


</div>




<strong>

ETB {

item.price *

item.quantity

}

</strong>



</div>



))

}




</div>









{/* Delivery */}



<div className="info-card">


<h2>

Delivery Information

</h2>


<p>

📍 {order.deliveryAddress}

</p>


<p>

📞 {order.phone}

</p>


</div>









<div className="total-box">


<h2>

Total:

ETB {order.totalAmount}

</h2>


</div>






<button

className="back-btn"

onClick={()=>navigate("/my-orders")}

>

← Back to Orders

</button>







</div>


</div>


);



}



export default OrderDetails;