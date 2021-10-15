import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import Map from "./Shipping";
import { withRouter } from "react-router-dom";
import Compeleted from "./Compeleted";
import OrderCancel from "./Cancel";
import All from "./All";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";


const OrderListDetail = (props) => {

  const [data, setData] = useState({ rows: [] });
  const [search, setSearch] = useState("");
  const [hidden, setHidden] = useState(false);
  const [hiddenID, sethiddenID] = useState();
  const [address, setaddress] = useState();
  const [delate, setdeldata] = useState();
  const [Value, setValue] = useState();
  const [alllength,setalllength]= useState();
  const [shipping, setshipping] = useState();
  const Shipping = props.location.pathname === "/OrderList/shipping";
  const compeleted = props.location.pathname === "/OrderList/compeleted";
  const Cancel = props.location.pathname === "/OrderList/Cancel";

  async function DelToSever(orderId) {
    const fetchDeldata = axios.post(`http://localhost:5000/Orders/api/del/${orderId}`, {
      data: { orderId: orderId },
    });
    setdeldata(fetchDeldata)
  }
  const ListToSever = async (orderId) => {
    const product = await axios(
      "http://localhost:5000/Orders/api/OrderListDeatail"
    );
    const address = await axios("http://localhost:5000/Orders/api/address");
    setaddress(address.data.filter((i) => i.orderId === orderId));
    sethiddenID(product.data.rows.filter((i) => i.orderId === orderId));
  };

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios("http://localhost:5000/Orders/api/OrderList");
      setData(result.data);
    };
    FetchData();

  }, [delate]);

  useEffect(() => {

    const ship = data.rows.filter((i) => (i.OrderStatus === '2'))
    const compelet = data.rows.filter((i) => (i.OrderStatus === '1'))
    console.log(ship)
    setshipping(ship.length)
    setalllength(compelet.length)
  }, [data]);

  return (
    <>
      <input
        type="search"
        className="search"
        onChange={(event) => setSearch(event.target.value)}
        placeholder="您可以透過訂單編號 商品金額及付款方式搜尋"
      ></input>
      <div className="wrap">
        <ul className="wrap-ul">
          <li>訂單編號</li>
          <li>訂購時間</li>
          <li>總額</li>
          <li>付款方式</li>
          <li>訂單狀態</li>
          <li>訂單詳情</li>
          <li>取消</li>
        </ul>
        {search ? (
          data.rows
            .filter(
              (item) =>
                item.orderId.toString().includes(search) ||
                item.PayMentMethod.match(search) ||
                item.Total.toString().includes(search)
            )
            .map((item, index) => (
              <>
                <ul key={index + 2} className="wrap-ul">
                  <li>{item.orderId}</li>
                  <li>{item.created_at}</li>
                  <li>$ {item.Total}</li>
                  <li>{item.PayMentMethod}</li>
                  {item.OrderStatus === '1' ? (
                    <li>交易進行中</li>
                  ) : item.OrderStatus === '2' ? (
                    <li> 交易取消 </li>
                  ) : (
                        <li>交易完成</li>
                      )}
                  <li className="productdetail">
                    <button
                      className="button-two CartListButton hover-shadow"
                      value={item.orderId}
                      onClick={(e) => ((
                        setHidden(!hidden),
                        ListToSever(item.orderId),
                        setValue(e.target.value)
                      ))}
                    >
                      點我查看
                  </button>
                  </li>
                  {item.OrderStatus === '1' ? (
                    <li>
                      <span
                        className="icon"
                        onClick={() => {
                          DelToSever(item.orderId);
                        }}
                      >
                        <FaTrashAlt />
                      </span>
                    </li>
                  ) : item.OrderStatus === '2' ? (
                    <li> 交易取消</li>
                  ) : (
                        <li> 交易完成如需退貨請洽客服中心</li>
                      )}
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
                      (<ul key={index + index} className="wrap-ul-hidden">
                        <li>{item.ItemName}</li>
                        <li>$ {item.ItemNamePrice}</li>
                        <li>{item.itemQuantity}</li>
                        <li>{item.itemType}</li>
                      </ul>)) : <LoadingSpinner />}
                    <span className="info">物流詳細資訊</span>
                    <ul key={2} className="wrap-ul-hidden-title">
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
        ) : Shipping ? (
          <Map
            key={6262}
            address={address}
            data={data}
            search={search}
            hidden={hidden}
            hiddenID={hiddenID}
            Value={Value}
            ListToSever={ListToSever}
            DelToSever={DelToSever}
          />
        ) : compeleted ? (
          <Compeleted
            key={66}
            address={address}
            data={data}
            search={search}
            hidden={hidden}
            hiddenID={hiddenID}
            Value={Value}
            ListToSever={ListToSever}
            DelToSever={DelToSever}
          />
        ) : Cancel ? (
          <OrderCancel
            address={address}
            key={88}
            data={data}
            search={search}
            hidden={hidden}
            hiddenID={hiddenID}
            Value={Value}
            ListToSever={ListToSever}
            DelToSever={DelToSever}
          />
        ) : (
                  <All
                    address={address}
                    key={623232}
                    data={data}
                    search={search}
                    hidden={hidden}
                    hiddenID={hiddenID}
                    Value={Value}
                    ListToSever={ListToSever}
                    DelToSever={DelToSever}
                  />
                )}
      </div>

      <div className="notice-list">
        <ul className="notice-list-ul">
          <span className="article-caption-list">注意事項</span>
          <br />
          <li>
            ※您最近一年內的購買記錄共計<span>{alllength}</span>筆，退貨
            <span>{shipping}</span>次。
          </li>
          <li>
            ※尚未出貨的網路訂單可點選
            <img
              src="//www.orbis.com.tw/assets/default/i/icon-delete.gif"
              alt="取消"
            />
            按鈕，即可取消該筆訂單。
          </li>
          <li>
            ※狀態為「已出貨」之商品，不可取消訂單，如需換退貨請依照退貨辦法進行辦理。
          </li>
          <li>
            ※在您主動取消訂單後，將自動喪失首次購物100元現金折扣，取消前請特別注意。
          </li>
        </ul>
      </div>
    </>
  );
};

export default withRouter(OrderListDetail);
