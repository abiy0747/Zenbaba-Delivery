import React, { useState } from "react";

function Checkout() {
  const [form, setForm] = useState({ name: "", address: "", phone: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Order confirmed for ${form.name}, delivery at ${form.address}`);
  };

  return (
    <div style={{ padding: "80px 20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}/>
        <input name="address" placeholder="Delivery Address" value={form.address} onChange={handleChange} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}/>
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}/>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#3AB795", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;