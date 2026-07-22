import { useEffect } from "react";
import ProfilePage from "./ProfilePage";


function Notifications(){

useEffect(()=>{
window.scrollTo(0,0);
},[]);


return (

<ProfilePage

title="Notifications"

icon="🔔"

description="Your latest updates."

>


<div className="setting-section">

<h2>
Notifications Center
</h2>


<p>
No new notifications.
</p>


</div>


</ProfilePage>

);

}


export default Notifications;