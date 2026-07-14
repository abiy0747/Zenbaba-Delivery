import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../services/orderService";
import { useCart } from "../context/CartContext";

import "../Css/Checkout.css";


function Checkout() {


const navigate = useNavigate();


const {

selectedItems,

clearSelectedItems,

} = useCart();





const [form,setForm] = useState({

name:"",

address:"",

phone:"",

paymentMethod:"telebirr",

mobileNumber:"",

cardNumber:"",

cardExpiry:"",

cardCVC:"",

});





const [loading,setLoading] = useState(false);


const [message,setMessage] = useState("");

const [messageType,setMessageType] = useState("");






const showMessage=(msg,type="success")=>{


setMessage(msg);

setMessageType(type);


setTimeout(()=>{

setMessage("");

},3000);


};








const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









const handleSubmit=async(e)=>{


e.preventDefault();





if(selectedItems.length===0){


showMessage(

"No items selected for checkout",

"error"

);


setTimeout(()=>{

navigate("/cart");

},1500);


return;


}







if(!/^09\d{8}$/.test(form.phone)){


showMessage(

"Enter valid Ethiopian phone number",

"error"

);


return;


}







if(

form.paymentMethod==="telebirr"

&&

!/^09\d{8}$/.test(form.mobileNumber)

){


showMessage(

"Enter valid Telebirr number",

"error"

);


return;


}







try{


setLoading(true);






const orderData={


deliveryAddress:form.address,


phone:form.phone,


selectedItems:selectedItems.map(item=>(

{

menuItem:item.menuItem._id,

quantity:item.quantity

}

))


};







const res=await createOrder(orderData);





if(res.success){


showMessage(

"Order placed successfully 🎉"

);





clearSelectedItems();





setTimeout(()=>{


navigate("/my-orders");


},1500);



}





}catch(error){



console.log(error);



showMessage(

error.response?.data?.message ||

"Order failed",

"error"

);



}finally{


setLoading(false);


}



};









return (


<div className="checkout-page">



{
message &&

<div className={`checkout-toast ${messageType}`}>

{message}

</div>

}







<div className="checkout-card">





<h1>

Checkout

</h1>



<p className="checkout-subtitle">

Complete your order details

</p>





<div className="selected-box">


Selected Items:

<strong>

{selectedItems.length}

</strong>


</div>








<form onSubmit={handleSubmit}>


<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

required

/>





<input

name="address"

placeholder="Delivery Address"

value={form.address}

onChange={handleChange}

required

/>







<input

name="phone"

placeholder="Phone Number 0912345678"

value={form.phone}

onChange={handleChange}

required

/>








<label>

Payment Method

</label>





<select

name="paymentMethod"

value={form.paymentMethod}

onChange={handleChange}

>


<option value="telebirr">

Telebirr

</option>


<option value="card">

Card Payment

</option>


<option value="cod">

Cash On Delivery

</option>



</select>








{
form.paymentMethod==="telebirr" &&


<input

name="mobileNumber"

placeholder="Telebirr Number"

value={form.mobileNumber}

onChange={handleChange}

required

/>

}








{
form.paymentMethod==="card" &&

<>


<input

name="cardNumber"

placeholder="Card Number"

value={form.cardNumber}

onChange={handleChange}

/>




<input

name="cardExpiry"

placeholder="MM/YY"

value={form.cardExpiry}

onChange={handleChange}

/>




<input

name="cardCVC"

placeholder="CVC"

value={form.cardCVC}

onChange={handleChange}

/>


</>


}








<button

disabled={loading}

>


{

loading ?

"Placing Order..."

:

"Confirm Order"

}


</button>







</form>




</div>




</div>


);


}


export default Checkout;