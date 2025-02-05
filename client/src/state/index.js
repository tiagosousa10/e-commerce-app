import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: { //create actions
    setItems: (state,action) => {
      state.items = action.payload; // action.payload = items
    },

    addToCart: (state,action) => {
      state.cart = [...state.cart, action.payload]; //means add the item to the cart
    },

    removeFromCart: (state,action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id); // return the cart without the item
    },

    increaseCount : (state,action) => {
      state.cart = state.cart.map((item) => {
        if(item.id === action.payload.id){
          item.count++;
        }

        return item;
      })
    },

    decreaseCount : (state,action) => {
      state.cart = state.cart.map((item) => {
        if(item.id === action.payload.id && item.count > 1){ // if the count is greater than 1
          item.count--;
        }

        return item;
      })
    },

    setIsCartOpen : (state,action) => {
      state.isCartOpen = !action.payload //toggle the cart
    }
  }
})


export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen
} = cartSlice.actions;


export default cartSlice.reducer;
