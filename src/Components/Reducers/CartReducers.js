// reducers/cartReducer.js
const initialState = {
  cartItems: [], // This array stores the items in the cart
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Implement logic to add an item to the cart
      /*   return {
           ...state,
           cartItems: [...state.cartItems, action.payload],
         };*/
         debugger
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its count
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          cart: updatedCartItems[existingItemIndex].cart + 1,
        };

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // If it's a new item, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    case 'REMOVE_FROM_CART':
        const itemIdToRemove = action.payload;
        const itemToRemoveIndex = state.cartItems.findIndex(
          (item) => item.id === itemIdToRemove.id
        );
      debugger
        if (itemToRemoveIndex !== -1) {
          debugger
          const updatedCartItems = state.cartItems.map((item) =>
          item.id === itemIdToRemove.id && item.cart > 0
            ? { ...item, cart: item.cart - 1 }
            : item
            ).filter((item) => item.cart > 0);
            
          return {
            ...state,
            cartItems: updatedCartItems,
          };
        }

    default:
      return state;
  }
};

export default cartReducer;
