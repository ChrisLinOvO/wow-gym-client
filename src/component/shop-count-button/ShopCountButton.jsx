import React, { useState } from "react";
import { connect } from "react-redux";
import { Icon } from "react-icons-kit";
import { u25C0 as leftBtn } from "react-icons-kit/noto_emoji_regular/u25C0";
import { u25B6 as rightBtn } from "react-icons-kit/noto_emoji_regular/u25B6";

import CustomButton from "../custom-button/Custom-button";
// Action
import { addQuantity } from "../../redux/cart/cart-action";

import "./ShopCountButton.scss";

const ShopCountButton = ({ cartItem, addQuantity }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="shop-count-btn-container">
      <div className="count-btn-container">
        <Icon
          onClick={() => (quantity === 1 ? null : setQuantity(quantity - 1))}
          icon={leftBtn}
          size={30}
          style={{ color: "#1178b8", cursor: "pointer" }}
        />
        <span>{quantity}</span>
        <Icon
          onClick={() => setQuantity(quantity + 1)}
          icon={rightBtn}
          size={30}
          style={{ color: "#1178b8", cursor: "pointer" }}
        />
      </div>
      <CustomButton shopCount onClick={() => addQuantity(cartItem, quantity)}>
        加入購物車
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addQuantity: (item, qty) => dispatch(addQuantity(item, qty)),
});

export default connect(null, mapDispatchToProps)(ShopCountButton);
