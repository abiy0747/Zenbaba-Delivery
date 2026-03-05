import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "80px 20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ddd" }}>
              <span>{item.name}</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                style={{ width: "50px", padding: "5px" }}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              />
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)} style={{ padding: "5px 10px", backgroundColor: "#FF6B6B", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Remove
              </button>
            </div>
          ))}
          <h3 style={{ marginTop: "20px" }}>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={clearCart} style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#0f0e0e", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;