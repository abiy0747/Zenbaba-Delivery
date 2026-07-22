import { useEffect } from "react";
import ProfilePage from "./ProfilePage";


function Rewards(){

useEffect(()=>{

window.scrollTo(0,0);

},[]);



return (

<ProfilePage

title="Rewards & Offers"

icon="🎁"

description="Earn points and enjoy special discounts."

>


<div className="setting-section">


<h2>
⭐ Zenbaba Points
</h2>


<div className="reward-card">


<h1>
250
</h1>


<p>
Available Points
</p>


</div>



</div>





<div className="setting-section">


<h2>
🎉 Available Rewards
</h2>



<div className="address-card">


<div>

<h3>
50 ETB Discount
</h3>


<p>
Requires 500 points
</p>


</div>



<button className="locked-button">

Locked 🔒

</button>


</div>




<div className="address-card">


<div>

<h3>
🚚 Free Delivery
</h3>


<p>
Requires 300 points
</p>


</div>


<button className="locked-button">

Locked 🔒

</button>


</div>



</div>





<div className="setting-section">


<h2>
Coupon Codes
</h2>


<div className="address-card">


<p>
No active coupons available
</p>


</div>


</div>



</ProfilePage>

);

}


export default Rewards;