import React, { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(ShoppingCartContext);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

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
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            {cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <h3>{item.name}</h3>
                <p>Restaurant: {item.restaurant}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FF4C4C",
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

          <h2 style={{ marginTop: "30px" }}>Total: ${totalPrice.toFixed(2)}</h2>
          <button
            onClick={clearCart}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#3AB795",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;