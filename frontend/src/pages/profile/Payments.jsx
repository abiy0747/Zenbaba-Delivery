import { useEffect } from "react";
import ProfilePage from "./ProfilePage";


function Payments(){


useEffect(()=>{
window.scrollTo(0,0);
},[]);



return (

<ProfilePage

title="Payment Methods"

icon="💳"

description="Manage your payment options."

>


<div className="setting-section">


<h2>
Saved Payments
</h2>



<div className="address-card">


<div>

<h3>
💵 Cash on Delivery
</h3>


<p>
Available for food deliveries
</p>


</div>


<span className="default-badge">
Active
</span>


</div>





<button className="add-address">

➕ Add Payment Method

</button>



</div>



</ProfilePage>

);

}


export default Payments;