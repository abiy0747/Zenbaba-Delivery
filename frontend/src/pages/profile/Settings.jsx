import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../Css/settings.css";

import { useEffect } from "react";
function Settings(){
useEffect(()=>{

  window.scrollTo(0,0);

},[]);
const {user} = useContext(AuthContext);

const navigate = useNavigate();


return (

<div className="settings-page">


<div className="settings-card">


{/* Header */}

<div className="settings-header">

<button
className="back-button"
onClick={()=>navigate("/profile")}
>
← Back to Profile
</button>


<h1>
⚙️ Account Settings
</h1>


<p>
Manage your Zenbaba account information
</p>

</div>





{/* Personal Information */}

<div className="setting-section">


<h2>
👤 Personal Information
</h2>



<label>
Full Name
</label>

<input
value={user?.name || ""}
readOnly
/>



<label>
Email Address
</label>

<input
value={user?.email || ""}
readOnly
/>



<label>
Phone Number
</label>

<input
value={user?.phone || "Not added"}
readOnly
/>



</div>






{/* Security */}

<div className="setting-section">


<h2>
🔐 Security
</h2>


<button
className="locked-button"
>
Change Password 🔒
</button>


</div>





{/* Account */}

<div className="setting-section">


<h2>
⚙️ Preferences
</h2>


<button
className="locked-button"
>
Notification Settings 🔒
</button>



<button
className="locked-button"
>
Language Settings 🔒
</button>



</div>





</div>


</div>

);


}


export default Settings;