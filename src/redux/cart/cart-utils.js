export const addShopItemToCart = (cartItems, addItem, itemQuantity = 1) => {
  const existCartItem = cartItems.find(
    (cartItem) => cartItem.itemId === addItem.itemId
  );
  if (existCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.itemId === addItem.itemId
        ? { ...cartItem, quantity: cartItem.quantity + itemQuantity }
        : cartItem
    );
  }
  return [...cartItems, { ...addItem, quantity: itemQuantity }];
};

export const removeCartItem = (cartItems, itemId) => {
  return cartItems.filter((item) => item.itemId !== itemId);
};

export const unlikeCartItem = (cartFavoriteItems, item) => {
  delete cartFavoriteItems[item.itemId];
  return { ...cartFavoriteItems };
};
// Object.values(cartFavoriteItems).filter(
//   (cartItem) => cartItem.itemId !== item.itemId
// );
export const RedeuceCartItem = (cartItems, cartItemsToReduce) => {
  const existCartItem = cartItems.find(
    (cartItem) => cartItem.itemId === cartItemsToReduce.itemId
  );
  if (existCartItem === 1) {
    return cartItems.filter((cart => cart.itemId !== cartItemsToReduce.itemId))
  }
  return cartItems.map(
    cartItem => cartItem.itemId === cartItemsToReduce.itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  )
};




export const ChangeFavr = (cartItems, item) => {
  return cartItems.filter((i) => i.itemId !== item.itemId);
};


// item 傳入的參數

export const FavCartItem = (cartFavoriteItems, item) => {



  const test = Object.values(cartFavoriteItems)

  const existCartItem = test.find(
    (cartFavoriteItems) => cartFavoriteItems.itemId === item.itemId
  );
  if (existCartItem) {
    return Object.values(cartFavoriteItems)
  } else {
    return [...Object.values(cartFavoriteItems), { ...item }]
  }
};


export const delFavCartItem = (cartFavoriteItems, item) => {
  const test = Object.values(cartFavoriteItems)
  return test.filter((i) => i.itemId !== item.itemId);
}

