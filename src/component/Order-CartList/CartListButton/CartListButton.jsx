import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { SelectTotal } from '../../../redux/cart/cart-selector';
import { withRouter } from 'react-router-dom';
import Swal from "sweetalert2";

import './CartListButton.scss'
import CreditCardPage from '../../Order-CreditCardPage/CreditCardPage';
import { currentUserSelect } from '../../../redux/user/user-selector';
const CartListButton = ({ cartItems, history, SelectTotal, currentUserSelect }) => {

    // console.log(history.location.state)
    console.log(currentUserSelect)
    const [cubon, setcubon] = useState(0)
    const [payType, setpayType] = useState(0)
    const [select, setselect] = useState('disabled')
    const [test, settest] = useState()
    const [charCode, setcharCode] = useState()
    const [visble, setvisble] = useState("none")
    const [visbletest, setvisbletest] = useState("none")
    const [credit, setcredit] = useState("none")
    const [payselected, setpayselected] = useState("none")



    const next = (cartItems) => {
        // console.log(cartItems)
        if (cartItems.length === 0) {
            Swal.fire({
                width: 400,
                height: 300,
                icon: 'warning',
                title: '請先添加商品',
            }).then(() => {
                history.push('/shopping')
            })
            return false
        } else if (payType === 0 || payType === '0') {
            setpayselected("block")
            return false
        }
        else if (!currentUserSelect) {
            Swal.fire({
                width: 400,
                height: 300,
                icon: 'warning',
                title: '請先登入會員',
            }).then(() => {
                history.push('/login')
            })
        } else {
            history.push('/CheckOutPage', {
                pay: payType,
                cubon: cubon,
                cartItems: cartItems
            })
        }
    }
    const enter = (e) => {
        // console.log("keyPress", e.charCode, e.keyCode, e.key)
        setcharCode(e.key)
    }

    useEffect(() => {
        if (charCode === 'Enter' && test === 'WOW777') {
            setvisble("block")
            setvisbletest("none")
        } else if (charCode === 'Enter' && test !== 'WOW777') {
            setvisble("none")
            setvisbletest("block")
        }
        else {
            setvisble("none")
            setvisbletest("none")
            setpayselected("none")
        }
    }, [charCode, payType, test])

    useEffect(() => {
        cartItems.length === 0 ? setselect('disabled') : setselect()
        charCode === 'Enter' && test === 'WOW777' ? setcubon(777) : setcubon(0)
    }, [cartItems.length, charCode, test])
    useEffect(() => {
        payType === '信用卡' ? setcredit("block") : setcredit("none")
    }, [payType])

    return (

        <div className="content-right">
            <div>購物車總額：</div>
            <h3>NT {SelectTotal}</h3>
            <div>折扣：{cubon}</div>
            <h4>總計：NT{SelectTotal - cubon}</h4>
            <select id="select-pay-type" name="PayType" value={payType} required="required" className="select-type" onChange={(e) => setpayType(e.target.value)}>
                <option value="0">請選擇付款方式</option>
                <option value="信用卡">信用卡</option>
                <option value="現金">現金</option>
            </select>
            <div style={{ display: payselected }} className="paysuccess">請選擇付款方式！</div>

            <div ClassName="CreditCardPage" style={{ display: credit }} ><CreditCardPage /></div>

            {/* <div>
                <select disabled={select} id="select-pay-type" value={cubon} name="PayType"  className="select-type" onChange={(e) => (setcubon(e.target.value))}>
                    <option value="">請選擇優惠券</option>
                    <option value="100">WOWGYM100</option>
                    <option value="200">WOWGYM200</option>
                    <option value="300">WOWGYM300</option>
                </select>
            </div> */}
            <div className="cubonInput">
                <input type="text" placeholder="輸入優惠券號碼" name="PayType" className="select-type"
                    onChange={(e) => (settest(e.target.value))} onKeyPress={enter}></input>
                <div className="test1">
                    <span style={{ display: visble }} className="cubunsuccess">折價成功！</span><span style={{ display: visbletest }} className="cubunflase">優惠券無效</span>
                </div>
            </div>

            <button className="CartListButton wobble-vertical " type="submit" onClick={() => next(cartItems)}>Next</button>
        </div >

    )
}
const mapStateToProps = createStructuredSelector({
    SelectTotal: SelectTotal,
    currentUserSelect: currentUserSelect
});


export default withRouter(connect(mapStateToProps)(CartListButton))