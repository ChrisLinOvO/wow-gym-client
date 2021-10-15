import React from "react";
import { connect } from "react-redux";
import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { createStructuredSelector } from "reselect";

import {
  likeCountSelect,
  cartHiddenSelect,
} from "../../redux/cart/cart-selector";
import { taggleCartDropdown } from "../../redux/cart/cart-action";

import "./LikeIcon.scss";

const LikeIcon = ({ likeCount, taggleCartDropdown, hidden }) => (
  <div
    style={{ color: "#1178B8" }}
    className="like-icon"
    onMouseOver={() => {
      if (hidden) return;
      taggleCartDropdown();
    }}
  >
    <Icon icon={ic_favorite} size={36} />
    <span className="like-count">{likeCount}</span>
  </div>
);

const mapStateToProps = createStructuredSelector({
  likeCount: likeCountSelect,
  hidden: cartHiddenSelect,
});

const mapDispatchToProps = (dispatch) => ({
  taggleCartDropdown: () => dispatch(taggleCartDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeIcon);
