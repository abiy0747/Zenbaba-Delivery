// src/pages/Cart.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
  } = useContext(ShoppingCartContext);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div
      style={{
        padding: "100px 20px",
        maxWidth: "1200px",
        margin: "auto",
        backgroundColor: "#1a2a2f", // 🔥 DARK BACKGROUND
        color: "white",            // 🔥 TEXT VISIBLE
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Your Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Your cart is empty.
        </p>
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
                  backgroundColor: "#243b44", // 🔥 card dark
                  borderRadius: "10px",
                  padding: "15px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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

                <p style={{ fontSize: "14px", opacity: 0.8 }}>
                  Restaurant: {item.restaurant}
                </p>

                <p style={{ fontWeight: "bold" }}>
                  Price: ${item.price.toFixed(2)}
                </p>

                {/* Quantity */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button onClick={() => decreaseQuantity(item.id)}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>
                </div>

                {/* Remove */}
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
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <h2 style={{ marginTop: "30px", textAlign: "center" }}>
            Total: ${totalPrice.toFixed(2)}
          </h2>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={clearCart}
              style={{
                padding: "12px 25px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#2C7A7B",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              style={{
                padding: "12px 25px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#3AB795",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;