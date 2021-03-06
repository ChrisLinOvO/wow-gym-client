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
    const fetchDeldata = axios.post(`https://wow-gym.herokuapp.com/Orders/api/del/${orderId}`, {
      data: { orderId: orderId },
    });
    setdeldata(fetchDeldata)
  }
  const ListToSever = async (orderId) => {
    const product = await axios(
      "https://wow-gym.herokuapp.com/Orders/api/OrderListDeatail"
    );
    const address = await axios("https://wow-gym.herokuapp.com/Orders/api/address");
    setaddress(address.data.filter((i) => i.orderId === orderId));
    sethiddenID(product.data.rows.filter((i) => i.orderId === orderId));
  };

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios("https://wow-gym.herokuapp.com/Orders/api/OrderList");
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
        placeholder="??????????????????????????? ?????????????????????????????????"
      ></input>
      <div className="wrap">
        <ul className="wrap-ul">
          <li>????????????</li>
          <li>????????????</li>
          <li>??????</li>
          <li>????????????</li>
          <li>????????????</li>
          <li>????????????</li>
          <li>??????</li>
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
                    <li>???????????????</li>
                  ) : item.OrderStatus === '2' ? (
                    <li> ???????????? </li>
                  ) : (
                        <li>????????????</li>
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
                      ????????????
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
                    <li> ????????????</li>
                  ) : (
                        <li> ??????????????????????????????????????????</li>
                      )}
                </ul>
                {hidden && Number(Value) === item.orderId ? (
                  <div className="wrap-ul-hidden-container">
                    <span className="info">??????????????????</span>
                    <ul className="wrap-ul-hidden-title">
                      <li>????????????</li>
                      <li>????????????</li>
                      <li>????????????</li>
                      <li>????????????</li>
                    </ul>
                    {hiddenID ? hiddenID.map((item, index) =>
                      (<ul key={index + index} className="wrap-ul-hidden">
                        <li>{item.ItemName}</li>
                        <li>$ {item.ItemNamePrice}</li>
                        <li>{item.itemQuantity}</li>
                        <li>{item.itemType}</li>
                      </ul>)) : <LoadingSpinner />}
                    <span className="info">??????????????????</span>
                    <ul key={2} className="wrap-ul-hidden-title">
                      <li>??????</li>
                      <li>??????</li>
                      <li>??????</li>
                      <li>??????</li>
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
          <span className="article-caption-list">????????????</span>
          <br />
          <li>
            ??????????????????????????????????????????<span>{alllength}</span>????????????
            <span>{shipping}</span>??????
          </li>
          <li>
            ???????????????????????????????????????
            <img
              src="//www.orbis.com.tw/assets/default/i/icon-delete.gif"
              alt="??????"
            />
            ????????????????????????????????????
          </li>
          <li>
            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </li>
          <li>
            ????????????????????????????????????????????????????????????100?????????????????????????????????????????????
          </li>
        </ul>
      </div>
    </>
  );
};

export default withRouter(OrderListDetail);
