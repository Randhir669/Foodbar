export const addToCart = (item) => ({
  type: 'ADD_TO_CART',
  payload: item,
});

export const removeallfromCart = (item) => ({
  type: 'Remove_All_from__CART',
  
});

export const removeFromCart = (itemid) => ({
  type: 'REMOVE_FROM_CART',
  payload: itemid,
});

export const addUser = (user) => ({
  type: 'ADD_USER',
  payload: user,
});

export const addconfirmorder = (item) => ({
  type: 'confirm_Order',
  payload: item,
});


    