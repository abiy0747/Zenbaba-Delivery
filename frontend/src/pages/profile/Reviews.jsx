import { useEffect, useState } from "react";
import ProfilePage from "./ProfilePage";


function Reviews(){

useEffect(()=>{

window.scrollTo(0,0);

},[]);



const [reviews] = useState([

{
id:1,
type:"restaurant",
name:"Zenbaba Restaurant",
food:"Chicken Burger",
rating:5,
comment:"Amazing food and fast service"
},


{
id:2,
type:"driver",
name:"Driver Abebe",
rating:4,
comment:"Very friendly and delivered on time"
}

]);



return (

<ProfilePage

title="Reviews & Ratings"

icon="⭐"

description="Rate restaurants and drivers after your deliveries."

>



{/* Rating Summary */}

<div className="setting-section">


<h2>
⭐ Your Rating Activity
</h2>



<div className="reward-card">


<h1>
4.8 ⭐
</h1>


<p>
Average Rating Given
</p>


</div>



</div>







{/* Previous Reviews */}

<div className="setting-section">


<h2>
📝 Your Reviews
</h2>



{

reviews.map((item)=>(


<div
className="address-card"
key={item.id}
>



<div>


<h3>

{
item.type==="restaurant"
?
"🍔 "
:
"🏍️ "
}

{item.name}

</h3>



{
item.food &&

<p>
🍽️ {item.food}
</p>

}



<p>
{item.comment}
</p>



<p>

{"⭐".repeat(item.rating)}

</p>



</div>



</div>


))

}



</div>







{/* Pending Reviews */}

<div className="setting-section">


<h2>
Waiting For Review
</h2>



<div className="address-card">


<div>

<h3>
🍕 Pizza Order
</h3>


<p>
Delivered yesterday
</p>


</div>



<button className="add-address">

Rate Now ⭐

</button>


</div>



</div>



</ProfilePage>

);

}


export default Reviews;