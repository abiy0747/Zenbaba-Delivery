import React, { useState } from "react";
import "../Css/Contact.css";

function Contact() {


const [form,setForm]=useState({

name:"",
email:"",
message:""

});


const [sent,setSent]=useState(false);



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};



const handleSubmit=(e)=>{

e.preventDefault();


setSent(true);


setForm({

name:"",
email:"",
message:""

});


setTimeout(()=>{

setSent(false);

},4000);


};



return (

<div className="contact-page">


{/* HERO */}

<section className="contact-hero">


<div>

<h1>

Contact <span>Zenbaba</span>

</h1>


<p>

Need help with your order?
Our delivery team is always ready to assist you.

</p>


</div>


<div className="delivery-icon">

🚴‍♂️

</div>


</section>





{/* CONTACT CARDS */}


<div className="contact-cards">


<div className="contact-card">

<div>

📞

</div>

<h3>

Call Us

</h3>

<p>

+251 911 234 567

</p>

</div>




<div className="contact-card">

<div>

📧

</div>

<h3>

Email

</h3>

<p>

support@zenbaba.com

</p>

</div>





<div className="contact-card">

<div>

📍

</div>

<h3>

Location

</h3>

<p>

Bahir Dar, Ethiopia

</p>

</div>



</div>








{/* FORM */}


<div className="contact-form-box">


<h2>

Send Us A Message

</h2>


<p>

Tell us how we can improve your delivery experience.

</p>



{sent &&

<div className="success-message">

✅ Message sent successfully!

</div>

}




<form onSubmit={handleSubmit}>


<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

required

/>




<input

name="email"

type="email"

placeholder="Email Address"

value={form.email}

onChange={handleChange}

required

/>





<textarea

name="message"

rows="6"

placeholder="Write your message..."

value={form.message}

onChange={handleChange}

required

/>





<button>

Send Message 🚀

</button>



</form>



</div>





</div>


);

}


export default Contact;