import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";

import { favoriteItemsSelect } from "../../redux/cart/cart-selector";
// Action
import { likeCartItem, unlikeCartItem } from "../../redux/cart/cart-action";

const Favorite = ({
  item,
  likeCartItem,
  unlikeCartItem,
  cartFavoriteItems,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // console.log("fire");
    cartFavoriteItems && setIsFavorited(!!cartFavoriteItems[item.itemId]);
  }, [cartFavoriteItems, item.itemId]);

  const toFavHandler = () => {
    likeCartItem(item);
    // console.log("Like " + itemId);
    setIsFavorited(true);
  };
  const unFavHandler = () => {
    unlikeCartItem(item);
    // console.log("unlike " + itemId);
    setIsFavorited(false);
  };
  return (
    <>
      {isFavorited ? (
        <div
          style={{ color: "rgb(216, 71, 173)", cursor: "pointer" }}
          onClick={unFavHandler}
        >
          <Icon icon={ic_favorite} size={24} />
        </div>
      ) : (
        <div
          style={{ color: "rgb(216, 71, 173)", cursor: "pointer" }}
          onClick={toFavHandler}
        >
          <Icon icon={ic_favorite_border} size={24} />
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  likeCartItem: (item) => dispatch(likeCartItem(item)),
  unlikeCartItem: (item) => dispatch(unlikeCartItem(item)),
});

const mapStateToProps = createStructuredSelector({
  cartFavoriteItems: favoriteItemsSelect,
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
