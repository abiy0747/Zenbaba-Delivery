import { useNavigate } from "react-router-dom";
import "../../Css/settings.css";


function ProfilePage({
    title,
    icon,
    description,
    children
}){

const navigate = useNavigate();


return (

<div className="settings-page">


<div className="settings-card">


<button
className="back-button"
onClick={()=>navigate("/profile")}
>
← Back to Profile
</button>



<div className="settings-header">

<h1>
{icon} {title}
</h1>


<p>
{description}
</p>


</div>



{/* PAGE CONTENT */}
{children}



</div>


</div>

);

}


export default ProfilePage;