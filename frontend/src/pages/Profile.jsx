import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../Css/profile.css";


function Profile() {


const { user, logout } = useContext(AuthContext);

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

desc="Track your food deliveries"

onClick={()=>navigate("/my-orders")}

/>







<ProfileItem

icon="❤️"

title="Favorite Restaurants"

desc="Your saved restaurants"

onClick={()=>navigate("/favorites")}

/>






<ProfileItem

icon="📍"

title="Delivery Addresses"

desc="Manage your locations"

onClick={()=>navigate("/addresses")}

/>







<ProfileItem

icon="💳"

title="Payment Methods"

desc="Manage payments"

onClick={()=>navigate("/payments")}

/>







<ProfileItem

icon="🔔"

title="Notifications"

desc="Your latest updates"

onClick={()=>navigate("/notifications")}

/>








<ProfileItem

icon="⚙️"

title="Settings"

desc="Account preferences"

onClick={()=>navigate("/settings")}

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