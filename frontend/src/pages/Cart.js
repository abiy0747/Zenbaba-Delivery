import React, { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Pizza Margherita", price: 12.5, quantity: 1 },
    { id: 2, name: "Burger Combo", price: 9.99, quantity: 2 },
  ]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "80px 20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #ddd" }}>
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <h3 style={{ marginTop: "20px" }}>Total: ${totalPrice.toFixed(2)}</h3>
          <button style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#FF6B6B", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;