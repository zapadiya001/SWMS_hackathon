import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0)
  }

const removeFromCart = (itemToRemove) => {
  setCartItems((prevItems) => {
    const index = prevItems.findIndex(item => item.id === itemToRemove.id);
    if (index > -1) {
      const newCart = [...prevItems];
      newCart.splice(index, 1); // remove only one item
      return newCart;
    }
    return prevItems;
  });
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, getTotalPrice ,removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}
