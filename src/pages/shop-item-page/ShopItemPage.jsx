import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useParams } from "react-router-dom";

import "./shopItemPage.scss";

import ShopItemDetail from "../../component/shop-item-detail/ShopItemDetail";
import {
  shopItemDetailSelect,
  shopIsFetchingSelect,
} from "../../redux/shop/shop-selector";
import { shopItemStart } from "../../redux/shop/shop-action";
import LoadingSpinner from "../../component/loading-spinner/LoadingSpinner";
import Footer from "../../component/footer/Footer";

const ShopItemPage = ({ isFetching, shopItemStart }) => {
  const itemId = useParams().itemId;
  useEffect(() => {
    // console.log(shopItem);
    //   ShopItem pass to action
    shopItemStart(itemId);
  }, [itemId, shopItemStart]);

  return (
    <div className="shop-item-page">
      <div className="shop-item-container">
        {isFetching ? <LoadingSpinner /> : <ShopItemDetail />}
      </div>
      {/* {isFetching ? null : <Footer /> } */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  shopItem: shopItemDetailSelect,
  isFetching: shopIsFetchingSelect,
});

const mapDispatchToProps = (dispatch) => ({
  shopItemStart: (itemId) => dispatch(shopItemStart(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopItemPage);
