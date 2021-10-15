import React from 'react'
import './CartList.scss'
import { FaRegListAlt } from 'react-icons/fa';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { cartItemsSelect, favoriteItemsSelect } from '../../redux/cart/cart-selector';
import { withRouter } from 'react-router-dom';
import CartListButton from './CartListButton/CartListButton'
import FavoriteItem from './FavoriteItems/FavoriteItems.jsx'
import CartItems from './CartItems/CartItems.jsx'

const CartList = ({ cartItems, cartFavoriteItems }) => {
    // console.log(cartItems)

    return (
        <>
        <div className="CartList">
            <div className="CartList-title">
                <div className="title-cotainer">
                    <ol className="title-ol">
                        <li className="icon"><FaRegListAlt /></li>
                        <li>購物車</li>
                    </ol>
                    <h3>CartList</h3>
                </div>
            </div>
            <div className="container">
                <ul className="step">
                    <li className="step1-active">
                    </li>
                    <li className="step2-active">
                    </li>
                    <li className="step3-active">
                    </li>
                </ul>
                <div className="CartListcontent">
                    <div className="content-wrap">
                        <h3>CartList</h3>
                        <span className="content-Cartlist-title">CartList Detail</span>
                        <ul className="content-wrap-ul">
                            <li>商品圖片</li>
                            <li>商品名稱</li>
                            <li>類型</li>
                            <li>價錢</li>
                            <li>數量</li>
                            <li>小計</li>
                            <li>功能</li>
                        </ul>
                        <CartItems cartItems={cartItems} />
                        <div className="fav-content-wrap">
                            <span className="content-Cartlist-title">Favorite Detail</span>
                            <ul className="fav-wrap-ul">
                                <li>商品圖片</li>
                                <li>商品名稱</li>
                                <li>商品類型</li>
                                <li>商品價錢</li>
                                <li>功能</li>
                            </ul>
                            <FavoriteItem cartFavoriteItems={cartFavoriteItems} />
                        </div>
                    </div>
                    <CartListButton cartItems={cartItems} />
                </div>
            </div>
            </div>
        </>
    )
}


const mapStateToProps = createStructuredSelector({
    cartItems: cartItemsSelect,
    cartFavoriteItems: favoriteItemsSelect,
});

export default withRouter(connect(mapStateToProps)(CartList))