import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../Css/profile.css";


function Profile() {


const { user, logout } = useContext(AuthContext);

const role = user?.role || localStorage.getItem("role");

const navigate = useNavigate();





if(!user){

return (

<div className="login-screen">

<div className="login-card">


<h2>

Welcome to Zenbaba 🍽️

</h2>


<p>

Please login to access your profile

</p>



<button

onClick={()=>navigate("/")}

>

Go Home

</button>


</div>


</div>

);


}






const handleLogout = ()=>{


logout();

navigate("/");


};









return (

<div className="luxury-profile-page">





<div className="profile-wrapper">





{/* TOP HEADER */}



<div className="profile-header">


<p>

Zenbaba Account

</p>


<h1>

My Profile

</h1>


</div>










{/* PROFILE CARD */}



<div className="luxury-profile-card">





<div className="avatar-container">


<div className="avatar-ring">


<div className="avatar">


👤


</div>


</div>


</div>








<div className="user-info">


<h2>

{user.name}

</h2>



<p>

{user.email}

</p>



<span className="role">

{user.role}

</span>



{

user.phone &&

<p className="phone">

📱 {user.phone}

</p>

}



</div>






</div>









{/* STATS */}



<div className="profile-stats">


<div>

<h2>

0

</h2>

<p>

Orders

</p>

</div>



<div>

<h2>

0

</h2>

<p>

Favorites

</p>

</div>




<div>

<h2>

0

</h2>

<p>

Reviews

</p>

</div>



</div>









{/* MENU */}



<div className="luxury-menu">



<h2>

Account

</h2>





<ProfileItem
icon="📦"
title="My Orders"
desc="Track active orders and view order history"
onClick={()=>navigate("/my-orders")}
/>





<ProfileItem
icon="📍"
title="Delivery Addresses"
desc="Manage home, work and delivery locations"
onClick={()=>navigate("/addresses")}
/>


<ProfileItem
icon="💳"
title="Payment Methods"
desc="Manage payments and transaction history"
onClick={()=>navigate("/payments")}
/>


<ProfileItem
icon="🎁"
title="Rewards & Offers"
desc="Coupons, discounts and loyalty points"
onClick={()=>navigate("/rewards")}
/>


<ProfileItem
icon="⭐"
title="Reviews & Ratings"
desc="Rate restaurants and drivers"
onClick={()=>navigate("/reviews")}
/>


<ProfileItem
icon="🏍️"
title="Delivery Preferences"
desc="Delivery notes and contact preferences"
onClick={()=>navigate("/delivery-preferences")}
/>


<ProfileItem
icon="🔔"
title="Notifications"
desc="Manage order and promotional alerts"
onClick={()=>navigate("/notifications")}
/>


<ProfileItem
icon="🔐"
title="Security"
desc="Password and account protection"
onClick={()=>navigate("/security")}
/>


<ProfileItem
icon="⚙️"
title="Settings"
desc="Manage your account information"
onClick={()=>navigate("/settings")}
/>


<ProfileItem
icon="📞"
title="Help Center"
desc="Support, FAQ and customer service"
onClick={()=>navigate("/help-center")}
/>






</div>









<button

className="luxury-logout"

onClick={handleLogout}

>

Logout

</button>






</div>


</div>


);


}









function ProfileItem({

icon,

title,

desc,

onClick

}){


return(


<div

className="luxury-item"

onClick={onClick}

>


<div className="item-icon">

{icon}

</div>





<div className="item-text">


<h3>

{title}

</h3>


<p>

{desc}

</p>


</div>





<div className="item-arrow">

›

</div>



</div>


);


}




export default Profile;