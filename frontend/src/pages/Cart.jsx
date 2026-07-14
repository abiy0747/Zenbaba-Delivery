// src/pages/Cart.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import "../Css/Cart.css";


function Cart() {


const {

cartItems,

selectedItems,

selectedTotalPrice,

increaseQuantity,

decreaseQuantity,

removeItem,

clearMyCart,

toggleSelectItem,

}=useCart();



const navigate=useNavigate();


const [message,setMessage]=useState("");

const [type,setType]=useState("");




const showMessage=(msg,status="success")=>{


setMessage(msg);

setType(status);


setTimeout(()=>{

setMessage("");

},3000);


};








const handleCheckout=()=>{


if(selectedItems.length===0){


showMessage(

"Please select items before checkout",

"error"

);


return;

}



navigate("/checkout");


};









return (

<div className="cart-page">



{
message &&

<div className={`cart-toast ${type}`}>

{message}

</div>

}







<div className="cart-container">





<h1 className="cart-title">

Your Cart 🛒

</h1>



<p className="cart-subtitle">

Select your favorite meals and continue checkout

</p>








{

cartItems.length===0 ?


<div className="empty-cart">


<h2>

Your cart is empty

</h2>


<p>

Add delicious food from restaurants

</p>


</div>



:


<>



<div className="cart-grid">



{


cartItems.map(item=>(


<div

className="cart-card"

key={item.menuItem._id}

>




<div className="select-box">


<input


type="checkbox"


checked={

selectedItems.some(

selected=>

selected.menuItem._id===item.menuItem._id

)

}


onChange={()=>toggleSelectItem(item)}


/>


<span>

Select

</span>



</div>








<img

src={

item.menuItem.image ||

"https://via.placeholder.com/150"

}

alt={item.menuItem.name}

className="food-image"

/>







<h3>

{item.menuItem.name}

</h3>






<p className="restaurant">


🍽️ {item.menuItem.restaurant?.name}


</p>







<h4>


ETB {Number(item.menuItem.price).toFixed(2)}


</h4>









<div className="quantity-box">


<button

onClick={()=>decreaseQuantity(item)}

>

−

</button>



<span>

{item.quantity}

</span>



<button

onClick={()=>increaseQuantity(item)}

>

+

</button>



</div>








<button


className="remove-btn"


onClick={()=>removeItem(item)}


>


Remove

</button>







</div>



))


}




</div>









<div className="cart-summary">


<h2>

Selected Total

</h2>


<h1>

ETB {selectedTotalPrice.toFixed(2)}

</h1>






<div className="cart-buttons">


<button

className="clear-btn"

onClick={clearMyCart}

>

Clear Cart

</button>






<button

className="checkout-btn"

onClick={handleCheckout}

>

Checkout Selected

</button>



</div>



</div>




</>


}



</div>


</div>


);


}



export default Cart;