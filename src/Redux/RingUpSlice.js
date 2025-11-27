import { createSlice } from "@reduxjs/toolkit";

export const RingUpSlice = createSlice({
  name: "ring-up",
  initialState: [],
  reducers: {
    addNewItem: (state, action) => {
      const newItem = action.payload;

      // Find if item already exists (check by id first, then by name)
      const existingItemIndex = state.findIndex((item) => {
        if (newItem.id && item.id) {
          return item.id === newItem.id;
        }
        return item.name === newItem.name;
      });

      if (existingItemIndex !== -1) {
        // Item already exists, increase quantity by 1
        state[existingItemIndex].qty += 1;
      } else {
        // Item doesn't exist, add it with quantity 1 (or preserve existing qty if provided)
        state.push({
          ...newItem,
          qty: newItem.qty || 1,
        });
      }
    },
    increaseQyt: (state, action) => {
      const itemIdentifier = action.payload; // Can be id or name or the full item object
      
      const itemIndex = state.findIndex((item) => {
        // Support multiple ways to identify the item
        if (typeof itemIdentifier === "object" && itemIdentifier.id && item.id) {
          return item.id === itemIdentifier.id;
        }
        if (typeof itemIdentifier === "object" && itemIdentifier.name) {
          return item.name === itemIdentifier.name;
        }
        if (item.id && itemIdentifier === item.id) {
          return true;
        }
        return item.name === itemIdentifier;
      });

      if (itemIndex !== -1) {
        state[itemIndex].qty += 1;
      }
    },
    decreaseQyt: (state, action) => {
      const itemIdentifier = action.payload; // Can be id or name or the full item object
      
      const itemIndex = state.findIndex((item) => {
        // Support multiple ways to identify the item
        if (typeof itemIdentifier === "object" && itemIdentifier.id && item.id) {
          return item.id === itemIdentifier.id;
        }
        if (typeof itemIdentifier === "object" && itemIdentifier.name) {
          return item.name === itemIdentifier.name;
        }
        if (item.id && itemIdentifier === item.id) {
          return true;
        }
        return item.name === itemIdentifier;
      });

      if (itemIndex !== -1) {
        state[itemIndex].qty -= 1;
        
        // Remove item if quantity reaches 0 or below
        if (state[itemIndex].qty <= 0) {
          state.splice(itemIndex, 1);
        }
      }
    },
    removeItem: (state, action) => {
      const itemIdentifier = action.payload; // Can be id or name or the full item object
      
      const itemIndex = state.findIndex((item) => {
        // Support multiple ways to identify the item
        if (typeof itemIdentifier === "object" && itemIdentifier.id && item.id) {
          return item.id === itemIdentifier.id;
        }
        if (typeof itemIdentifier === "object" && itemIdentifier.name) {
          return item.name === itemIdentifier.name;
        }
        if (item.id && itemIdentifier === item.id) {
          return true;
        }
        return item.name === itemIdentifier;
      });

      if (itemIndex !== -1) {
        state.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      return [];
    },
  },
});

export const { addNewItem, decreaseQyt, increaseQyt, removeItem, clearCart } = RingUpSlice.actions;

export default RingUpSlice.reducer;
