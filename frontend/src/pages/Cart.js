// src/pages/Cart.js
import React, { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
  } = useContext(ShoppingCartContext);

  return (
    <div style={{ padding: "100px 20px", maxWidth: "1200px", margin: "auto" }}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p style={{ marginTop: "20px" }}>Your cart is empty.</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Food Image */}
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />

                <h3>{item.name}</h3>
                <p style={{ fontSize: "14px", color: "#555" }}>
                  Restaurant: {item.restaurant}
                </p>
                <p style={{ fontWeight: "bold" }}>Price: ${item.price.toFixed(2)}</p>

                {/* Quantity Selector */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#e2e8f0")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                  >
                    −
                  </button>
                  <span style={{ minWidth: "20px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#e2e8f0")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginTop: "15px",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#E53E3E",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#C53030")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#E53E3E")}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <h2 style={{ marginTop: "30px" }}>Total: ${totalPrice.toFixed(2)}</h2>

          <button
            onClick={clearCart}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2C7A7B",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#285E61")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2C7A7B")}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;