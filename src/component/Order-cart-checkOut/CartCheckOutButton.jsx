import React, { useState, useEffect } from 'react'
import './CartCheckOutButton.scss'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { cartItemsSelect, favoriteItemsSelect, SelectTotal } from '../../redux/cart/cart-selector';
import { withRouter } from 'react-router-dom';


const CartCheckOutButton = ({ history, addToSever, additemToSever, SelectTotal }) => {


    const [cubon, setcubon] = useState(0)
    const [payType, setpayType] = useState('信用卡')
    const back = () => {
        history.push('/CartList', {
            pay: history.location.state.pay,
            cubon: history.location.state.cubon
        })

    }


    useEffect(() => {
        setcubon(history.location.state.cubon)
    }, [cubon, history.location.state.cubon])
    useEffect(() => {
        setpayType(history.location.state.pay)
    }, [history.location.state.pay, payType])
    
    return (
        <div className="content-right">
            <div>總計：</div>
            <h3>NT : {SelectTotal}</h3>
            <div>折扣：{cubon}</div>
            <div>總計：NT {SelectTotal - cubon}</div>
            <ul className="content-right-button" >
                <button class="CartListButton wobble-vertical" onClick={() => back()}>修改付款方式</button>
                <button class="CartListButton wobble-vertical" type="submit" onClick={() => ((addToSever, additemToSever))}>結帳</button>
            </ul>

        </div >
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: cartItemsSelect,
    cartFavoriteItems: favoriteItemsSelect,
    SelectTotal: SelectTotal

});


export default withRouter(connect(mapStateToProps)(CartCheckOutButton))