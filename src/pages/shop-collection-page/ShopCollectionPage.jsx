import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../component/loading-spinner/LoadingSpinner";
import ShopItem from "../../component/shop-item/ShopItem";
import {
  shopCollectionsSelect,
  shopIsFetchingSelect,
  shopUrlSelect,
} from "../../redux/shop/shop-selector";
import { shopFetchStart } from "../../redux/shop/shop-action";
import FilterBar from "../../component/filter-bar/FilterBar";

import "./ShopCollectionPage.scss";
import Footer from "../../component/footer/Footer";

const ShopCollectionPage = ({
  collections,
  shopFetchStart,
  isFetching,
  shopUrl,
}) => {
  const collection = useParams().collection;
  const itemType = useParams().itemType;
  // console.log(collection, itemType);

  useEffect(() => {
    if (collection === "men" || collection === "women") {
      document.body.style = "background: #ecedef;";
    } else {
      document.body.style = "background: #e3e3e3;";
    }
    shopFetchStart(collection, itemType);

    // ComponentWillUnMount
    return () => (document.body.style = "background: white;");
  }, [collection, shopFetchStart, itemType]);
  return (
    <div className="collection-page">
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="collection-title">
            {collection === "men"
              ? "男士服飾系列"
              : collection === "women"
              ? "女士服飾系列"
              : "高蛋白食品系列"}
          </h1>
          <div className="filter-bar-container">
            <FilterBar
              filterCollection={shopUrl[collection]}
              title={"篩選條件"}
              collection={collection}
            />
            <FilterBar
              filterPrice={["由低至高", "由高至低"]}
              title={"價格排序"}
            />
          </div>
          <div className="collection-container">
            {collections.map((item) => (
              <ShopItem key={item.itemId} item={item} />
            ))}
          </div>
        </>
      )}
      {/* {isFetching ? null : <Footer /> } */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: shopCollectionsSelect,
  isFetching: shopIsFetchingSelect,
  shopUrl: shopUrlSelect,
});
const mapDispatchToProps = (dispatch) => ({
  shopFetchStart: (url, typeUrl) => dispatch(shopFetchStart(url, typeUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCollectionPage);
