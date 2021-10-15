import React, { useState } from "react";
import "./user-center-page.scss";

// Component-------------------------------
import UserEdit from "../../component/user-edit/user-edit";
import UserCourses from "../../component/user-courses/UserCourses";
import ArticlesEdit from "../articles-edit-page/ArticlesEdit";
import ServiceRecord from "../../component/ServiceRecord/ServiceRecord";
import OrderList from "../orders-list-page/OrderList";

//Redux userData---------------1
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector";
//---------------

// Pages------------------------------------
function UserCenterPage(props) {
  const [nav, setNav] = useState("個人資料修改");
  //---------------2
  const { currentUserData } = props
  console.log(currentUserData);
  //該使用者的id
  //  const currentUserId = currentUserData ? currentUserData.id : ''
  //---------------
  return (
    <>
      <div className="user-center-page-wrapper">
        <div className="user-sidebar">
          <p className="sidebar-title">會員中心</p>

          {/* <ul class="drop-down-menu">
            <li>
              <a href="#">關於我們</a>
              <ul>
                <li>
                  <a href="#">服務據點</a>
                </li>
                <li>
                  <a href="#">服務客戶</a>
                </li>
                <li>
                  <a href="#">服務地區</a>
                </li>
                <li>
                  <a href="#">徵才資訊</a>
                </li>
              </ul>
            </li>
          </ul> */}

          <ul className="list-unstyled">
            <li>
              <button
                className="nav-button"
                onClick={() => setNav("個人資料修改")}
              >
                個人資料修改
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => setNav("我的課程")}>
                我的課程
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => setNav("文章管理")}>
                文章管理
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => setNav("歷史訂單")}>
                歷史訂單
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={() => setNav("客訴紀錄")}>
                客訴紀錄
              </button>
            </li>
          </ul>
        </div>
        <div className="user-right">
          {nav === "個人資料修改" && <UserEdit />}
          {nav === "我的課程" && <UserCourses />}
          {nav === "文章管理" && <ArticlesEdit />}
           {nav === "歷史訂單" && <OrderList />} 
          {nav === "客訴紀錄" && <ServiceRecord 
            currentUserData={currentUserData}
          />}
          {/* {nav === '' &&  </>  } */}
          {/* 依照state的字串，去顯示component */}
        </div>
      </div>
    </>
  );
}

//---------------
const mapStateToProps = createStructuredSelector({
  currentUserData: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(UserCenterPage));
//---------------