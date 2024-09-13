import React, { createContext, useEffect, useState } from 'react'

export const CartContext=createContext()

const CartProvider = ({children}) => {
  const [cart,setCart] =useState([])
  const [itemQuantity , setItemQuantity]= useState(0)
  const [total, settotal] = useState(0)


  useEffect(()=>{
    const total = cart.reduce((accumulator, currentItem)=>{
      return accumulator+currentItem.price*currentItem.quantity

    },0)
    settotal(total)
  })

  //update item Quantity
  useEffect(()=>{
    if(cart){
      const quantity = cart.reduce((accumulator,currentItem)=>{
        return accumulator + currentItem.quantity;
      },0)
      setItemQuantity(quantity)
    }

  })


const addToCart = (product,id) =>{
    // console.log(`Product${product.title}`)
    const newItem ={...product,quantity:1}
    const cartItem = cart.find((item)=>{
      return item.id===id;
    })
    if(cartItem){
      const newCart = [...cart].map((item)=>{
        if(item.id === id){
          return{...item, quantity:cartItem.quantity+1}
        }else{
          return item
        }
      })
      setCart(newCart)
    }else{
      setCart([...cart,newItem])
    }
}

// remove from cart
const removeFromCart =(id)=>{
  const newCart = cart.filter((item)=>{
    return item.id !==id;
  })
  setCart(newCart)
}

//clear cart

const clearCart =()=>{
  setCart([])
}

//increase quantity

const increaseQuantity =(id)=>{
  const cartItem = cart.find((item)=>item.id === id)
  addToCart(cartItem ,id) 
}

//decrease quantity
const decreaseQuantity =(id)=>{
  const cartItem = cart.find((item)=>{
    return item.id == id
  })
  if(cartItem){
    const newCart = cart.map((item)=>{
      if(item.id == id){
        return {...item , quantity:cartItem.quantity-1}
      }else{
        return item
      }
    })
    setCart(newCart)
  }
  if(cartItem.quantity <2){
    removeFromCart(id)
  }

}

  return (
   <CartContext.Provider value={{addToCart , cart ,removeFromCart,clearCart, increaseQuantity,decreaseQuantity, itemQuantity,total}}>
    {children}
   </CartContext.Provider>
  )
}

export default CartProvider
