import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';




const Map = ({ data, hiddenID, ListToSever, history, DelToSever, address }) => {
    const [hidden, setHidden] = useState(false);
    const [Value, setValue] = useState();


    return (
        data.rows.filter((i) => (i.OrderStatus === '1')).map((item, index) => (
            <>
                <ul key={index} className="wrap-ul">
                    <li><span>{item.orderId}</span></li>
                    <li>{item.created_at}</li>
                    <li>$ {item.Total}</li>
                    <li>{item.PayMentMethod}</li>
                    {item.OrderStatus === '1' ? <li>交易進行中</li> : item.OrderStatus === '2' ? <li> 交易取消 </li> : <li>交易完成</li>}
                    <li className="productdetail">
                        <button className="button-two CartListButton curl-bottom-left" value={item.orderId} onClick={(e) => ((setHidden(!hidden), ListToSever(item.orderId), setValue(e.target.value)))}>點我查看</button>
                    </li>
                    {item.OrderStatus === '1' ? <button onClick={() => { DelToSever(item.orderId) }} className="motumb-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                        <li>
                            <FaTrashAlt />
                        </li>
                    </button> : item.OrderStatus === '2' ? <li> 交易取消</li> : <li> 交易完成如需退貨請洽<span className="service" onClick={() => history.push('/customerservice')}>客服中心</span></li>}
                </ul>
                {hidden && Number(Value) === item.orderId ? (
                    <div className="wrap-ul-hidden-container">
                        <span className="info">商品詳細資訊</span>
                        <ul className="wrap-ul-hidden-title">
                            <li>商品名稱</li>
                            <li>商品價格</li>
                            <li>商品數量</li>
                            <li>商品種類</li>
                        </ul>
                        {hiddenID ? hiddenID.map((item, index) =>
                            (<ul key={index} className="wrap-ul-hidden">
                                <li>{item.ItemName}</li>
                                <li>{item.ItemNamePrice}</li>
                                <li>{item.itemQuantity}</li>
                                <li>{item.itemType}</li>
                            </ul>)) : <LoadingSpinner />}
                        <span className="info">物流詳細資訊</span>
                        <ul key={index + 51515} className="wrap-ul-hidden-title">
                            <li>姓名</li>
                            <li>地址</li>
                            <li>手機</li>
                            <li>信箱</li>
                        </ul>
                        {address ? address.map((item, index) =>
                            (
                                <ul key={index} className="wrap-ul-hidden">
                                    <li>{item.UserName}</li>
                                    <li>{item.City + item.district + item.address}</li>
                                    <li>{item.mobile}</li>
                                    <li>{item.email}</li>
                                </ul>)) : <LoadingSpinner />}
                    </div>
                ) : ''}
            </>
        ))
    )
}

export default Map;