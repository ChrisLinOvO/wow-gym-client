import React, { useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Slider from "react-slick";

import { shopItemDetailSelect } from "../../redux/shop/shop-selector";

import ShopCountButton from "../shop-count-button/ShopCountButton";
import Favorite from "../favorite-icon/Favorite";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ShopItemDetail.scss";

const ShopItemDetail = ({ history, shopItem }) => {
  // console.log(shopItem);
  const collection = useParams().collection;
  const { name, price, flavor, img1, img2, img3 } = shopItem;
  //   const imgArr = Object.values(imgObj);
  const imgArr = [img1, img2, img3];
  const [renderImg, setImg] = useState(img1);
  const changeImg = (clickImg) => {
    setImg(clickImg);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      {/* RWD of screen < 576px will hidden */}
      <div className="shop-item-imgs-container">
        <div className="shop-item-img-group-container">
          {imgArr.map((img) => (
            <img
              key={Math.random() * 1000}
              className={img === renderImg ? "seletBorder" : ""}
              src={img}
              alt=""
              onClick={() => changeImg(img)}
            />
          ))}
        </div>
        <img className="shop-item-img" src={renderImg} alt="" />
      </div>
      {/* ------------------------- */}

      <div className="shop-item-info-container">
        <div className="collection-fav-container">
          <h3
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/shop/${collection}`)}
          >
            {collection.toUpperCase()}
          </h3>
        </div>

        {/* RWD of screen < 576px will show */}
        <div className="shop-item-detail-slider">
          <Slider {...settings}>
            <div className="shop-item-detail-slider-img-container">
              <img className="shop-item-detail-slider-img" src={img1} alt="" />
            </div>
            <div className="shop-item-detail-slider-img-container">
              <img className="shop-item-detail-slider-img" src={img2} alt="" />
            </div>
            <div className="shop-item-detail-slider-img-container">
              <img className="shop-item-detail-slider-img" src={img3} alt="" />
            </div>
          </Slider>
        </div>
        {/* ------------------------- */}

        <div>
          <div className="title-fav-container">
            <h1>{name}</h1>
            <Favorite item={shopItem} />
          </div>
          <span className="shop-detail-flavor">{flavor}</span>
          <h2>$ {price}</h2>
          <ShopCountButton cartItem={shopItem} />
        </div>

        {collection === "food" ? (
          <h4>
            乳清蛋白粉是純度最高的蛋白粉
            <br />
            同時脂肪和碳水化合物含量很低
            <br />
            低於大多數其他乳清蛋白粉
            <br />
            Impact 蛋白粉有助於肌肉的增長和維持
            <br />
            幫您實現最佳健身和瘦身效果！
          </h4>
        ) : (
          <h4>
            還有什麼比更適合假日的休閒氛圍呢？
            <br />
            穿上這款精心設計商品，感受輕鬆
            <br />
            面料為高級棉質，穿著舒適
            <br />
            力求展現運動風範，搭配個性細節
            <br />
            以個性元素詮釋經典風範！
          </h4>
        )}
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  shopItem: shopItemDetailSelect,
});

export default withRouter(connect(mapStateToProps)(ShopItemDetail));
