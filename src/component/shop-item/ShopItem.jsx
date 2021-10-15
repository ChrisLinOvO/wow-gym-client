import React from "react";
import Slider from "react-slick";
import { withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./shopitem.scss";

import CustomButton from "../custom-button/Custom-button";
import { NextArrow, PrevArrow } from "../../assets/slider-arrow-utils";

// Action-----------------
import { addItemToCart } from "../../redux/cart/cart-action";
import Favorite from "../favorite-icon/Favorite";

// Component----------------------
const ShopItem = ({ addItemToCart, history, item }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  const collectionPram = useParams().collection;
  const { itemId, name, img1, img2, img3, price, flavor } = item;
  return (
    <div className="shop-item">
      <Slider {...settings}>
        <div>
          <img
            className="shop-item-slider-img"
            src={img1}
            alt=""
            onClick={() => {
              history.push(`/shopitem/${collectionPram}/${itemId}`);
            }}
          />
        </div>
        <div>
          <img
            className="shop-item-slider-img"
            src={img2}
            alt=""
            onClick={() => {
              history.push(`/shopitem/${collectionPram}/${itemId}`);
            }}
          />
        </div>
        <div>
          <img
            className="shop-item-slider-img"
            src={img3}
            alt=""
            onClick={() => {
              history.push(`/shopitem/${collectionPram}/${itemId}`);
            }}
          />
        </div>
      </Slider>
      <div className="shop-item-info">
        <p>{name}</p>
        <span>({flavor})</span>
        <div className="shop-fav-container">
          <Favorite item={item} />
        </div>
        <p className="shop-item-price">${price}</p>
        <CustomButton
          onClick={() => {
            // console.log(addItemToCart(item));
            addItemToCart(item);
          }}
        >
          加入購物車
        </CustomButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
});

export default withRouter(connect(null, mapDispatchToProps)(ShopItem));
