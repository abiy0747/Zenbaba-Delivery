import React, { useState } from "react";

import AboutUs from "./AboutUs";
import FAQ from "./FAQ";
import Menu from "./Menu";
import Hero from "./Hero";
import "../Css/Home.css";
import BecomePartner from "./BecomePartner";
function Home() {


const [darkMode,setDarkMode] = useState(false);



return (


<div className={`${darkMode ? "dark dark-theme" : ""} home`}>


{/* ================= THEME TOGGLE ================= */}


<div className="theme-toggle">


<input

type="checkbox"

id="theme-switch"

checked={darkMode}

onChange={()=>setDarkMode(!darkMode)}

/>



<label htmlFor="theme-switch">


<span className="toggle-icon">

<span className={darkMode ? "moon":"sun"}></span>


</span>


</label>



</div>





{/* ================= PREMIUM HERO ================= */}


<Hero/>







{/* ================= MENU ================= */}


<section

style={{

padding:"70px 0",

background:darkMode ? "#111":"#ffffff",

transition:"0.5s"

}}

>


<div

style={{

maxWidth:"1200px",

margin:"auto",

padding:"0 20px"

}}

>


<Menu/>


</div>


</section>





{/* ================= BECOME PARTNER ================= */}

<section

style={{

padding:"70px 0",

background:darkMode ? "#111":"#fff8e1",

transition:"0.5s"

}}

>


<div

style={{

maxWidth:"1200px",

margin:"auto",

padding:"0 20px"

}}

>


<BecomePartner/>


</div>


</section>

{/* ================= ABOUT ================= */}



<section

style={{

padding:"70px 0",

background:darkMode ? "#000":"#f5f7fb",

color:darkMode ? "white":"#111",

transition:"0.5s"

}}

>


<div

style={{

maxWidth:"1200px",

margin:"auto",

padding:"0 20px"

}}

>


<AboutUs/>


</div>


</section>








{/* ================= FAQ ================= */}



<section

id="faq"

style={{

padding:"70px 0",

background:darkMode ? "#080808":"#ffffff",

color:darkMode ? "white":"#111",

transition:"0.5s"

}}

>


<div

style={{

maxWidth:"1200px",

margin:"auto",

padding:"0 20px"

}}

>


<FAQ/>


</div>


</section>










{/* ================= PREMIUM FOOTER ================= */}

<footer className="premium-footer">


<div className="footer-container">



{/* BRAND */}

<div className="footer-brand">


<h2>

<span>Zenbaba</span> Delivery

</h2>


<p>

Fresh meals from Bahir Dar's best restaurants,
delivered fast to your door.

</p>


<div className="delivery-badge">

🚚 Fast Delivery • 🍔 Fresh Food • ⭐ Trusted

</div>


</div>





{/* CONTACT */}

<div className="footer-column">


<h3>

Contact

</h3>


<p>
📧 support@zenbaba.com
</p>


<p>
📞 +251 911 234 567
</p>


<p>
📍 Bahir Dar, Ethiopia
</p>


</div>





{/* LINKS */}

<div className="footer-column">


<h3>

Explore

</h3>


<a href="/">
Home
</a>


<a href="/menu">
Menu
</a>


<a href="#faq">
FAQ
</a>


<a href="/login">
Account
</a>


</div>







{/* SOCIAL */}

<div className="footer-column">


<h3>

Follow Us

</h3>



<div className="social-box">


<a href="#">
📘
</a>


<a href="#">
📸
</a>


<a href="#">
🐦
</a>


</div>



<button className="download-btn">

📱 Download App

</button>


</div>






</div>






<div className="footer-bottom">


<p>

© 2026 Zenbaba Delivery

</p>


<p>

Made with ❤️ in Ethiopia

</p>


</div>




</footer>









<style>

{`

*{

box-sizing:border-box;

}



html,body{

margin:0;

padding:0;

overflow-x:hidden;

}



.home{

min-height:100vh;

transition:.5s;

}





a{

text-decoration:none;

}







/* ================= TOGGLE ================= */



.theme-toggle{


position:fixed;

top:90px;

right:30px;

z-index:99999;


}





.theme-toggle input{

display:none;

}






.theme-toggle label{


width:75px;

height:38px;


background:#e5e7eb;


border-radius:50px;


display:flex;


align-items:center;


padding:5px;


cursor:pointer;


box-shadow:0 5px 20px rgba(0,0,0,.25);


transition:.4s;


}





.toggle-icon{


width:28px;

height:28px;


border-radius:50%;


background:#ffffff;


display:flex;


align-items:center;


justify-content:center;


transition:.4s;


border:2px solid #cbd5e1;


}







.theme-toggle input:checked + label{


background:#FFC107


}





.theme-toggle input:checked + label .toggle-icon{


transform:translateX(37px);


}





.sun{

width:14px;

height:14px;

background:#f59e0b;

border-radius:50%;

}





.moon{

width:16px;

height:16px;

background:#111827;

border-radius:50%;

}





@media(max-width:768px){


.theme-toggle{

top:80px;

right:20px;

}



.theme-toggle label{

width:65px;

height:34px;

}



.toggle-icon{

width:24px;

height:24px;

}



}



`}


</style>



</div>


);


}



export default Home;