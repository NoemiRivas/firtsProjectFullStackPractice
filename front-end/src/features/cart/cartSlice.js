import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], //--productos del carrito(inicial vacio)
  totalQuantity: 0, //--total de productos
  totalAmount: 0, //--suma
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ///agregar productos
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.totalQuantity++;
      state.totalAmount += product.price;
    },
    ///eliminar productos todos
    removeItem: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item._id === productId);

      if (product) {
        if (product.quantity > 1) {
          product.quantity--;
          state.totalQuantity--;
          state.totalAmount -= product.price;
        } else {
          state.items = state.items.filter((item) => item._id !== productId);
          state.totalQuantity--;
          state.totalAmount -= product.price;
        }
      }
    },
    ///agragar productos
    increaseItem: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item._id === productId);
    
        if (product.quantity < 10) {
          product.quantity++;
          state.totalQuantity++;
          state.totalAmount += product.price;
        }
      
    },
    ///remover productos uno a uno
    removeItemsById: (state, action) => {
      const productId = action.payload; 
      state.items = state.items.filter((item) => item._id !== productId); 
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    ///limpiar carrito
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

///importaciones

export const { addItem, removeItem, clearCart, increaseItem, removeItemsById } =
  cartSlice.actions;
export default cartSlice.reducer;
