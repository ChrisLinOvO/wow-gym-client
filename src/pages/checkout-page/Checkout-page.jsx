import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./checkout-page.scss";

import CheckoutItem from "../../component/checkout-item/Checkout-item";
// import StripeHeckoutButton from "../../components/stripe-checkout-button/Stripe-checkout-button";

import {
  cartItemsSelect,
  cartItemsTotalAmountSelect,
} from "../../redux/cart/cart-selector";

const CheckOutPage = ({ cartItems, cartTotalAmount }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block-img">
        <span>商品</span>
      </div>
      <div className="header-block-name">
        <span>名稱</span>
      </div>
      <div className="header-block">
        <span>數量</span>
      </div>
      <div className="header-block">
        <span>價格</span>
      </div>
      <div className="header-block">
        <span>小計</span>
      </div>
      <div>
        <span>移除</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.itemId + "checkout"} cartItem={cartItem} />
    ))}
    <div className="total">{`總計: $NTD ${cartTotalAmount}`}</div>
    {/* <div className="text-warning">
            Use test info in stripe checkout
            <br />
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </div>
        <StripeHeckoutButton price={cartTotalAmount} /> */}
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: cartItemsSelect,
  cartTotalAmount: cartItemsTotalAmountSelect,
});

export default connect(mapStateToProps)(CheckOutPage);
