// src/pages/Checkout.js
import React, { useState } from "react";

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "telebirr", // default
    mobileNumber: "", // for Telebirr
    cardNumber: "",   // for Card Payment
    cardExpiry: "",
    cardCVC: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation for Ethiopian phone numbers
    if (!/^09\d{8}$/.test(form.phone)) {
      alert("Please enter a valid Ethiopian phone number (e.g., 0912345678)");
      return;
    }

    if (form.paymentMethod === "telebirr" && !/^09\d{8}$/.test(form.mobileNumber)) {
      alert("Please enter a valid Telebirr mobile number (e.g., 0912345678)");
      return;
    }

    if (form.paymentMethod === "card") {
      if (!/^\d{16}$/.test(form.cardNumber)) {
        alert("Please enter a valid 16-digit card number");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) {
        alert("Enter expiry in MM/YY format");
        return;
      }
      if (!/^\d{3,4}$/.test(form.cardCVC)) {
        alert("Enter a valid 3 or 4-digit CVC");
        return;
      }
    }

    // Simulate order submission
    if (form.paymentMethod === "telebirr") {
      alert(
        `Telebirr payment request sent to ${form.mobileNumber}.\nPlease approve it on your phone.`
      );
    } else if (form.paymentMethod === "card") {
      alert(`Card payment processed for ${form.name}`);
    } else {
      alert(`Order confirmed for ${form.name}, pay cash on delivery.`);
    }
  };

  return (
    <div style={{ padding: "80px 20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Checkout</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}
      >
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          name="phone"
          placeholder="Phone Number (e.g., 0912345678)"
          value={form.phone}
          onChange={handleChange}
          required
          maxLength={10}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />

        {/* Payment Method */}
        <label style={{ marginTop: "10px", fontWeight: "bold" }}>Payment Method:</label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        >
          <option value="telebirr">Telebirr</option>
          <option value="card">Card Payment</option>
          <option value="cod">Cash on Delivery</option>
        </select>

        {/* Telebirr Inputs */}
        {form.paymentMethod === "telebirr" && (
          <>
            <input
              name="mobileNumber"
              placeholder="Telebirr Mobile Number (e.g., 0912345678)"
              value={form.mobileNumber}
              onChange={handleChange}
              required
              maxLength={10}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <p style={{ fontSize: "12px", color: "#555" }}>
              After submitting, a Telebirr payment request will be sent to your mobile.
            </p>
          </>
        )}

        {/* Card Payment Inputs */}
        {form.paymentMethod === "card" && (
          <>
            <input
              name="cardNumber"
              placeholder="Card Number (16 digits)"
              value={form.cardNumber}
              onChange={handleChange}
              required
              maxLength={16}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <input
              name="cardExpiry"
              placeholder="Expiry (MM/YY)"
              value={form.cardExpiry}
              onChange={handleChange}
              required
              maxLength={5}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <input
              name="cardCVC"
              placeholder="CVC"
              value={form.cardCVC}
              onChange={handleChange}
              required
              maxLength={4}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
          </>
        )}

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            backgroundColor: "#3AB795",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;