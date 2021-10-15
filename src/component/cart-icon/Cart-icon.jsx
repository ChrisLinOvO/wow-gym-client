import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { shopping_bag } from "react-icons-kit/ikons/shopping_bag";
import { Icon } from "react-icons-kit";

import { taggleCartDropdown } from "../../redux/cart/cart-action";
import {
  cartCountSelect,
  cartHiddenSelect,
} from "../../redux/cart/cart-selector";

import "./cart-icon.scss";

const CartIcon = ({ taggleCartDropdown, cartCount, hidden }) => (
  <div
    style={{ color: "#1178B8" }}
    className="cart-icon"
    onMouseOver={() => {
      if (hidden) return;
      taggleCartDropdown();
    }}
  >
    <Icon icon={shopping_bag} size={32} />
    <span className="item-count">{cartCount}</span>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartCount: cartCountSelect,
  hidden: cartHiddenSelect,
});

const mapDispatchToProps = (dispatch) => ({
  taggleCartDropdown: () => dispatch(taggleCartDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
