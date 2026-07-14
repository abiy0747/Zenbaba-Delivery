import { createContext, useContext, useEffect, useState } from "react";

import {
  getMyCart,
  addToCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../services/cartService";


const CartContext = createContext();


export const useCart = () => useContext(CartContext);



export function CartProvider({ children }) {


  const [cartItems, setCartItems] = useState([]);

  // NEW: store selected cart items
  const [selectedItems, setSelectedItems] = useState([]);




  //-----------------------------------
  // Load Cart
  //-----------------------------------

  const loadCart = async () => {


    const token = localStorage.getItem("token");


    if (!token) {

      setCartItems([]);

      setSelectedItems([]);

      return;

    }



    try {


      const res = await getMyCart();


      console.log("CART RESPONSE:", res);



      if (res.success) {


        const items = res.data.items || [];


        setCartItems(items);



        // keep selected items after refresh
        setSelectedItems((previous)=>{

          return previous.filter(
            selected =>
              items.some(
                item =>
                  item.menuItem._id === selected.menuItem._id
              )
          );

        });


      }



    } catch(error){


      console.log(
        "LOAD CART ERROR:",
        error.response?.data || error.message
      );


      setCartItems([]);

      setSelectedItems([]);


    }


  };





  //-----------------------------------
  // Load on startup
  //-----------------------------------


  useEffect(()=>{


    loadCart();



    const refreshCart = ()=>{

      loadCart();

    };



    window.addEventListener(
      "login",
      refreshCart
    );



    return ()=>{


      window.removeEventListener(
        "login",
        refreshCart
      );


    };


  },[]);







  //-----------------------------------
  // Add Item
  //-----------------------------------


  const addItem = async(menuItemId)=>{


    try{


      const res = await addToCart(menuItemId);


      console.log(
        "ADD ITEM:",
        res
      );


      await loadCart();


      return true;



    }catch(error){


      console.log(
        "ADD ERROR:",
        error.response?.data || error.message
      );


      return false;


    }


  };








  //-----------------------------------
  // Increase
  //-----------------------------------


  const increaseQuantity = async(item)=>{


    try{


      await updateCart(
        item.menuItem._id,
        item.quantity + 1
      );


      await loadCart();



    }catch(error){

      console.log(error);

    }


  };








  //-----------------------------------
  // Decrease
  //-----------------------------------


  const decreaseQuantity = async(item)=>{


    try{


      if(item.quantity === 1){


        await removeCartItem(
          item.menuItem._id
        );


      }else{


        await updateCart(
          item.menuItem._id,
          item.quantity - 1
        );


      }



      await loadCart();



    }catch(error){


      console.log(error);


    }


  };








  //-----------------------------------
  // Remove
  //-----------------------------------


  const removeItem = async(item)=>{


    try{


      await removeCartItem(
        item.menuItem._id
      );


      // remove from selection also

      setSelectedItems(previous=>
        previous.filter(
          selected =>
          selected.menuItem._id !== item.menuItem._id
        )
      );


      await loadCart();



    }catch(error){

      console.log(error);

    }


  };









  //-----------------------------------
  // Clear Cart
  //-----------------------------------


  const clearMyCart = async()=>{


    try{


      await clearCart();


      setSelectedItems([]);


      await loadCart();



    }catch(error){


      console.log(error);


    }


  };








  //-----------------------------------
  // NEW: Select / Unselect Item
  //-----------------------------------


  const toggleSelectItem = (item)=>{


    setSelectedItems(previous=>{


      const exists = previous.find(

        selected =>
        selected.menuItem._id === item.menuItem._id

      );



      if(exists){


        return previous.filter(

          selected =>
          selected.menuItem._id !== item.menuItem._id

        );


      }



      return [
        ...previous,
        item
      ];



    });


  };









  //-----------------------------------
  // NEW: Clear selected
  //-----------------------------------


  const clearSelectedItems = ()=>{

    setSelectedItems([]);

  };









  //-----------------------------------
  // Count
  //-----------------------------------


  const cartCount = cartItems.reduce(

    (sum,item)=>
    sum + item.quantity,

    0

  );









  //-----------------------------------
  // Full cart total
  //-----------------------------------


  const totalPrice = cartItems.reduce(

    (sum,item)=>

    sum +
    (
      (item.menuItem?.price || 0)
      *
      item.quantity
    ),

    0

  );










  //-----------------------------------
  // NEW: Selected total
  //-----------------------------------


  const selectedTotalPrice =
    selectedItems.reduce(

      (sum,item)=>

      sum +
      (
        (item.menuItem?.price || 0)
        *
        item.quantity
      ),

      0

    );








  return (

    <CartContext.Provider

      value={{

        cartItems,

        selectedItems,


        cartCount,


        totalPrice,

        selectedTotalPrice,



        loadCart,


        addItem,

        increaseQuantity,

        decreaseQuantity,

        removeItem,

        clearMyCart,


        toggleSelectItem,

        clearSelectedItems,


      }}

    >

      {children}

    </CartContext.Provider>


  );


}