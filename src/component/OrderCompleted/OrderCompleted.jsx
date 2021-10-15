import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { FaRegListAlt } from "react-icons/fa";

import './OrderCompleted.scss'
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const OrderCompleted = ({ history }) => {
    // console.log(match.params.orderId)
    const [data, setData] = useState([]);
    const [item, setitem] = useState([]);
    const [Value, setValue] = useState();
    const [address, setaddress] = useState();

    useEffect(() => {
        const FetchData = async () => {
            const result = await axios(
                `http://localhost:5000/Orders/api/OrderCompeleted`,
                {
                    method: 'GET',
                    credentials: 'include', // 需傳送 Cookie 必須開啟
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }),
                },
            )
            setData(result.data)
        }
        FetchData()
    }, []);

    useEffect(() => {
        const ListToSever = async () => {
            const product = await axios(
                "http://localhost:5000/Orders/api/OrderListDeatail"
            );
            const address = await axios("http://localhost:5000/Orders/api/address");

            setitem(product.data.rows.filter((i) => i.orderId === Value));
            setaddress(address.data.filter((i) => i.orderId === Value));

        };
        ListToSever();
    }, [Value])

    useEffect(() => {
        data.forEach((i) => (
            setValue(i.orderId)
        ))
    }, [data])

    console.log(address);

    return (
        <>
            <div className="CompeletedTitle">
                <div className="title-cotainer">

                    <ol className="title-ol">
                        <li className="icon">
                            <FaRegListAlt />
                        </li>
                        <li>購物完成</li>
                    </ol>
                    <h3>Order Completed</h3>
                </div>
            </div>
            <div className="Compeletedcontainer">
                <ul className="step">
                    <li className="step1-active-ac">
                    </li>
                    <li className="step2-active-ac">
                    </li>
                    <li className="step3-active-ac">
                    </li>
                </ul>
                <div className="content-com">
                    <div className="content-wrap">
                        <h3>Order Compeleted</h3>
                        <span className="content-Cartlist-title">Order Detail</span>
                        <div className="compeleted-bottom-container">

                            <ul className="content-wrap-ul-compeleted">
                                <li>訂單編號</li>
                                <li>總計</li>
                                <li>付款方式</li>
                                <li>運送地址</li>
                            </ul>
                            {data.map((list, index) => (
                                <>
                                    <ul key={index + "6"} className="content-wrap-ul-compeleted">
                                        <li>{list.orderId}</li>
                                        <li>$ {list.Total}</li>
                                        <li>{list.PayMentMethod}</li>
                                        {address ? address.map((i) => (
                                            <li>{i.City + i.district + i.address}</li>
                                        )) : <LoadingSpinner></LoadingSpinner>}
                                    </ul>
                                </>
                            ))}
                        </div>
                        <div className="compeleted-bottom-container">
                        <span className="content-Cartlist-title">Product Detail</span>
                            <ul className="content-wrap-ul-compeleted-bottom">
                                <li>商品名稱</li>
                                <li>商品價格</li>
                                <li>商品數量</li>
                                <li>商品種類</li>
                            </ul>
                            {item.map((list, index) => (
                                <>
                                    <ul key={index + "6"} className="content-wrap-ul-compeleted-bottom">
                                        <li>{list.ItemName}</li>
                                        <li>$ {list.ItemNamePrice}</li>
                                        <li>{list.itemQuantity}</li>
                                        <li>{list.itemType}</li>
                                    </ul>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <div className="button-two CartListButton hover-shadow " onClick={() => (history.push('/OrderList'))}>歷史訂單</div>
                        <div className="button-two CartListButton hover-shadow" onClick={() => (history.push('/'))}>返回首頁</div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default withRouter(OrderCompleted)



