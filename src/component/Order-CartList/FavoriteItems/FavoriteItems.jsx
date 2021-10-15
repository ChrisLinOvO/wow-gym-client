/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './FavoriteItems.scss'
import { FaTrashAlt} from 'react-icons/fa';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { removeItemFromCart, addItemToCart, ReduceItem, ChangeFavr, unlikeCartItem, delFavCartItem } from '../../../redux/cart/cart-action';
import { favoriteItemsSelect } from '../../../redux/cart/cart-selector';
const FavoriteItem = ({ cartFavoriteItems, unlikeCartItem ,delFavCartItem}) => {

    return (
        <>
            {
                cartFavoriteItems ? Object.values(cartFavoriteItems).map((item, index) => (
                    <ul key={index} className="fav-wrap-ul">
                        <li><img className="objectFit" src={item.img1} /></li>
                        <li>{item.name}</li>
                        <li>{item.itemType}</li>
                        <li>$ {item.price}</li>
                        <ul className="icon-list">
                            <a className="icon" onClick={() => delFavCartItem(item)} ><FaTrashAlt /></a>
                            {/* <a className="icon" onClick={() => ChangeFavr(item)}><FaStar /></a> */}
                        </ul>
                    </ul>
                ))
                    : <ul className="content-wrap-ul-ls">
                        <li>尚無喜愛商品</li>
                    </ul>

            }
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    cartFavoriteItems: favoriteItemsSelect,
});


const mapDispatchToProps = (dispatch) => ({
    removeItemFromCart: (itemId) => dispatch(removeItemFromCart(itemId)),
    addItemToCart: (itemId) => dispatch(addItemToCart(itemId)),
    ReduceItem: (itemId) => dispatch(ReduceItem(itemId)),
    ChangeFavr: (itemId) => dispatch(ChangeFavr(itemId)),
    unlikeCartItem: (item) => dispatch(unlikeCartItem(item)),
    delFavCartItem: (item) => dispatch(delFavCartItem(item)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItem)