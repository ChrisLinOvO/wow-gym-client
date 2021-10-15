import React from "react";
import { connect } from "react-redux";

import {
  shopCleanFilter,
  shopShowFilterTag,
} from "../../redux/shop/shop-action";

const FilterTag = ({ children, dispatch, tag }) => (
  <span
    onClick={() => {
      dispatch(shopShowFilterTag(tag));
      dispatch(shopCleanFilter(tag));
    }}
  >
    {children}
  </span>
);

export default connect(null)(FilterTag);
