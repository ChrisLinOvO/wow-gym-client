import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./header.scss";
import ErrorModel from "../error-model/ErrorModel";

// Component-------------------------------
import { ReactComponent as Logo } from "../../assets/logo.svg";
import CartIcon from "../cart-icon/Cart-icon";
import CartDropdown from "../cart-dropdown/Cart-dropdown";
import HeaderDropdown from "../header-dropdown/HeaderDropdown";
import CustomButton from "../custom-button/Custom-button";

// Select
import { cartHiddenSelect } from "../../redux/cart/cart-selector";
import { navBarSelect } from "../../redux/nav-bar/navBar-action";
import { currentUserSelect, userSignInUnVaildSelect } from "../../redux/user/user-selector";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";

// redux action-------------------------------
import { userLogoutStart, NavBarOnClick } from "../../redux/user/user-action";
import { employeeLogout } from "../../redux/employee/employee-action";
import { shopShowFilterTag } from "../../redux/shop/shop-action";



const Header = ({
  navBarSelect,
  shopShowFilterTag,
  currentUser,
  userLogoutStart,
  currentEmployee,
  employeeLogout,
  NavBarOnClick,
  userSignInUnVaild,
}) => {
  const [subDiv, setSubDiv] = useState(false);
  const history = useHistory();

  const path = history.location.pathname
  // console.log(history.location.pathname)

  const next = () => {

    history.push("/")

  }


  return (
    <div className="header">
      <div className="header-spacing">
        <div
          className={`hamburger-btn ${subDiv ? "hamburger-clicked" : ""}`}
          onClick={() => setSubDiv(!subDiv)}
        >
          <div className="" />
          <div className="" />
          <div className="" />
        </div>
      </div>
      <div className="main">

        <Link to="/" className="logo-container">
          <Logo className="logo" />
        </Link>
        <div
          className="options"
          onMouseOver={() => {
            if (subDiv) return;
          }}
        // onMouseLeave={() => setSubDiv(false)}
        >
          <Link
            to="/shopping"
            className="option"
            onClick={() => {
              shopShowFilterTag("選擇篩選");
              setSubDiv(false);
            }}
            onMouseEnter={() => {
              navBarSelect("shop");
              if (subDiv) return;
              setSubDiv(true);
            }}
          >
            精選商城
          </Link>

          <Link
            to="/courses"
            className="option"
            onClick={() => {
              shopShowFilterTag("選擇篩選");
              setSubDiv(false);
            }}
            onMouseEnter={() => {
              navBarSelect("courses");
              if (subDiv) return;
              setSubDiv(true);
            }}
          >
            課程資訊
          </Link>
          <Link
            to="/articles"
            className="option"
            onClick={() => {
              setSubDiv(false);
              NavBarOnClick(path)
            }}
            onMouseEnter={() => {
              navBarSelect("articles");
              if (subDiv) return;
              setSubDiv(true);
            }}
          >
            心得討論
          </Link>
          <Link
            to="/ServiceCenter"
            className="option"
            onClick={() => {
              shopShowFilterTag("選擇篩選");
              setSubDiv(false);
            }}
            onMouseEnter={() => setSubDiv(false)}
          >
            客服中心
          </Link>


          <Link
            to={currentUser
              ? `/user`
              : `/login`
            }
            className="option"
            onClick={() => {
              setSubDiv(false);
              NavBarOnClick(path)
            }}
            onMouseEnter={() => {
              navBarSelect("user");
              if (subDiv) return;
              setSubDiv(false);
            }}
          >
            會員中心
          </Link>

          <Link
            to={
              currentEmployee
                ? `/employeecenter/${currentEmployee.Eid}`
                : "/employeelogin"
            }
            className="option"
            onMouseEnter={() => setSubDiv(false)}
          >
            教練中心
          </Link>
        </div>
      </div>
      <div className="sub sub-cart" onMouseOver={() => setSubDiv(false)}>
        {currentEmployee !== null ? (
          <CustomButton
            onClick={() => {
              employeeLogout();
              history.push("/");
            }}
          >
            教練登出
          </CustomButton>
        ) : (
            ""
          )}

        {currentUser ? (
          <>
            <span className="current-user-title">
              嗨! {currentUser.memberName}
            </span>
            <CustomButton signin unMobileMode onClick={() => (userLogoutStart(), next())}>
              登出
            </CustomButton>
          </>
        ) : currentEmployee ? ''
            : <CustomButton
              signin
              unMobileMode
              onClick={() => history.push("/login")}
            >
              登入
            </CustomButton>}
        <CartIcon />
      </div>
      <HeaderDropdown setSubDiv={setSubDiv} subDiv={subDiv} />
      <CartDropdown />
    </div >
  );
};
// redux mapState & mapDispatch
const mapStateToProps = createStructuredSelector({
  hidden: cartHiddenSelect,
  currentUser: currentUserSelect,
  currentEmployee: currentEmployeeSelect,
  userSignInUnVaild: userSignInUnVaildSelect,

});
const mapDispatchToProps = (dispatch) => ({
  navBarSelect: (select) => dispatch(navBarSelect(select)),
  shopShowFilterTag: (tag) => dispatch(shopShowFilterTag(tag)),
  userLogoutStart: () => dispatch(userLogoutStart()),
  employeeLogout: () => dispatch(employeeLogout()),
  NavBarOnClick: (currentUser) => dispatch(NavBarOnClick(currentUser)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
