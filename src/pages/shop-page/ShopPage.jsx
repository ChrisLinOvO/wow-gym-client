import React, { useEffect } from "react";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";

import "./shoppage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { NextArrow, PrevArrow } from "../../assets/slider-arrow-utils";
import { shopPageStart } from "../../redux/shop/shop-action";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  shopIsFetchingSelect,
  shopPageCollectionsSelect,
} from "../../redux/shop/shop-selector";
import LoadingSpinner from "../../component/loading-spinner/LoadingSpinner";
import CustomButton from "../../component/custom-button/Custom-button";
import ShopPageItem from "../../component/shop-page-item/ShopPageItem";

// Component-----------
const ShopPage = ({ shopPageCollections, shopPageStart, isFetching }) => {
  const history = useHistory();
  useEffect(() => {
    document.body.style = "background: #ecedef;";
    shopPageStart();

    // ComponentWillUnMount
    return () => (document.body.style = "background: white;");
  }, [shopPageStart]);
  //Hrader slider setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    // responsive: [
    //     {
    //         breakpoint: 768, //max-width
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //         }
    //     }
    // ]
  };

  // shop Collections setting
  const shopItemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768, //max-width
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576, //max-width
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="shop-page">
      {isFetching || !shopPageCollections.length ? (
        <LoadingSpinner />
      ) : (
        <div className="shop-slider-container">
          <Slider {...settings}>
            <Link className="img-info" to="/shop/men">
              <h3>??????????????????</h3>
              <img src="https://i.ibb.co/gSqbYg5/head-men.jpg" alt="" />
            </Link>
            <Link className="img-info" to="/shop/women">
              <h3>??????????????????</h3>
              <img src="https://i.ibb.co/YZ2DvqF/head-women.jpg" alt="" />
            </Link>
            <Link className="img-info" to="/shop/food">
              <h3>?????????????????????</h3>
              <img src="https://i.ibb.co/Lg3Pp0V/head-food.jpg" alt="" />
            </Link>
          </Slider>
          <div className="shop-page-newitem-title-container">
            <div />
            <p>????????????</p>
            <div />
          </div>
          <Slider {...shopItemSettings}>
            {shopPageCollections.map((collection) => (
              <ShopPageItem key={`${collection.id}a`} collection={collection} />
            ))}
          </Slider>
          <div style={{ height: "30px" }} />

          {/* collection section */}
          {/* Men */}
          <div className="shop-collection-section">
            <div className="img-container">
              <img src="https://i.ibb.co/ScLBjzX/shop-page-men.jpg" alt="" />
            </div>
            <div className="content">
              <h1>??????????????????</h1>
              <p>??????????????????????????????????????????????????????</p>
              <p>?????????????????????????????????????????????</p>
              <CustomButton
                onClick={() => history.push("/shop/men")}
                style={{ width: "100px" }}
              >
                ????????????
              </CustomButton>
            </div>
          </div>
          {/* Women */}
          <div className="shop-collection-section media-style">
            <div className="content">
              <h1>??????????????????</h1>
              <p>???????????????????????????????????????????????????????????????????????????</p>
              <p>???????????????????????????????????????</p>
              <CustomButton
                onClick={() => history.push("/shop/women")}
                style={{ width: "100px" }}
              >
                ????????????
              </CustomButton>
            </div>
            <div className="img-container">
              <img src="https://i.ibb.co/1KMwdkj/shop-page-women.jpg" alt="" />
            </div>
          </div>
          <div className="shop-collection-section">
            <div className="img-container">
              <img src="https://i.ibb.co/59ZGjHR/shop-page-food.jpg" alt="" />
            </div>
            <div className="content">
              <h1>?????????????????????</h1>
              <p>??????????????????????????????????????????</p>
              <p>??????????????????????????????</p>
              <CustomButton
                onClick={() => history.push("/shop/food")}
                style={{ width: "100px" }}
              >
                ????????????
              </CustomButton>
            </div>
          </div>
        </div>
      )}
      {/* {isFetching ? null : <Footer /> } */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: shopIsFetchingSelect,
  shopPageCollections: shopPageCollectionsSelect,
});

const mapDispatchToProps = (dispatch) => ({
  shopPageStart: () => dispatch(shopPageStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
