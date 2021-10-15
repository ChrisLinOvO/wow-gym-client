import React from "react";
import { connect } from "react-redux";

import "./checkout-item.scss";

import {
  cleanCheckout,
  addItemToCart,
  decreaseCheckout,
} from "../../redux/cart/cart-action";

const CheckoutItem = ({
  cartItem,
  cleanCheckout,
  addItemToCart,
  decreaseCheckout,
}) => {
  const { name, quantity, price, img1 } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={img1} alt="" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decreaseCheckout(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="price">{quantity * price}</span>
      <span className="remove-button" onClick={() => cleanCheckout(cartItem)}>
        &#10006;
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  cleanCheckout: (cartItem) => dispatch(cleanCheckout(cartItem)),

  addItemToCart: (cartItem) => dispatch(addItemToCart(cartItem)),
  decreaseCheckout: (cartItem) => dispatch(decreaseCheckout(cartItem)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
