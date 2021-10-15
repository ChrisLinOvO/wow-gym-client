import React from 'react'
import './OrdessrList.scss'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa';
import OrderListDetail from '../../component/OrderList/OrderListDetail.jsx'
import UserCenterPage from '../user-center-page/user-center-page';


const OrderList = () => {
  return (
    <>

      <div className="orderlist">

        <div className="OrderDetail-title">
          <div className="title-cotainer">
            <ol className="title-ol">
              <li className="icon"><FaHome /></li>
              <li>訂單紀錄</li>
            </ol>
            <h3>OrderListDetail</h3>
          </div>
        </div>

        <div className="container">
          <div className="Orderarticle">
            <ul className="order-menu">
              <li>
                <Link to="/OrderList">
                  <div className='btn-holder'>
                    <button className="btn btn-3 hover-border-5">
                      <span> 全部訂單</span>
                    </button>
                  </div>
                </Link>
              </li>
              <li>  <Link to="/OrderList/shipping">
                <div className='btn-holder'>
                  <button className="btn btn-3 hover-border-5">
                    <span>       出貨中
                                        </span>
                  </button>
                </div></Link>
              </li>
              <li><Link to="/OrderList/compeleted">
                <div className='btn-holder'>
                  <button className="btn btn-3 hover-border-5">
                    <span>完成
                                    </span>
                  </button>
                </div></Link>
              </li>
              <li> <Link to="/OrderList/Cancel">
                <div className='btn-holder'>
                  <button className="btn btn-3 hover-border-5">
                    <span> 取消</span>
                  </button>
                </div></Link>
              </li>
            </ul>
            <OrderListDetail />
          </div>
        </div>
      </div>

    </>
  )
}
export default OrderList