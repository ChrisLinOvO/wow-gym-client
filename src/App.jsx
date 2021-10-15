import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./component/header/Header";
//首頁----------
import HomePage from "./pages/home-page/HomePage"
//footer---------
import Footer from "./component/footer/Footer"

//課程----------
import Courses from "./pages/courses-page/Courses";
import Coaches from "./pages/coaches-page/Coaches";

//會員中心
import UserCenter from "./pages/user-center-page/user-center-page"
// 訂單----------
import OrderList from "./pages/orders-list-page/OrderList";
import OrderListDetail from "./component/OrderList/OrderListDetail";
import CartList from "./component/Order-CartList/CartList.jsx";
import CheckOutPage from "./component/Order-CheckOutPage/CheckOutPage";
import OrderCompleted from "./component/OrderCompleted/OrderCompleted";
import CreditCardPage from "./component/Order-CreditCardPage/CreditCardPage";

//討論區-----------
import Articles from "./pages/articles-page/Articles";
import ArticlesAdd from "./pages/articles-add-page/ArticlesAdd";
import ArticlesPreview from "./pages/articles-preview-page/ArticlesPreview";
import ArticlesEdit from "./pages/articles-edit-page/ArticlesEdit";
import ArticlesUpdate from "./pages/articles-update-page/ArticlesUpdate";
//客服中心-----------
import ServiceCenter from "./pages/ServiceCenter-page/ServiceCenter";

// Component------
import LoadingSpinner from "./component/loading-spinner/LoadingSpinner";
import ErrorBoundary from "./component/error-boundary/ErrorBoundary";

// Redux
import { userListStart } from "./redux/user/user-action";
import { employeeListStart } from "./redux/employee/employee-action";

import "./App.scss";
import UserEdit from "./component/user-edit/user-edit";
// import Footer from "./component/footer/Footer";

// React lazy -------------------------
const SignInOutPage = lazy(() =>
  import("./pages/sign-in-out-page/Sign-in-out-page")
);
const ShopPage = lazy(() => import("./pages/shop-page/ShopPage"));
const ShopCollectionPage = lazy(() =>
  import("./pages/shop-collection-page/ShopCollectionPage")
);
const ShopItemPage = lazy(() => import("./pages/shop-item-page/ShopItemPage"));
// const CheckOutPage = lazy(() => import("./pages/checkout-page/Checkout-page"));

// Zora employee Page
const EmployeeFormPage = lazy(() =>
  import("./pages/employee-form-page/EmployeeFormPage")
);
const EmployeeCenterPage = lazy(() =>
  import("./pages/employee-center-page/EmployeeCenterPage")
);
const EmployeeSignInOutPage = lazy(() =>
  import("./pages/employee-sign-in-out-page/employee-sign-in-out-page")
);
// -----------

// APP component
const App = ({ userListStart, employeeListStart }) => {
  useEffect(() => {
    userListStart();
    employeeListStart();
  }, [userListStart, employeeListStart]);

  return (
    <>
      <div>
        <Header />
        <div className="space" />
        
              <Route exact path="/" component={HomePage} />
        <main>
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <Route exact path="/shopping" component={ShopPage} />
                <Route
                  exact
                  path="/shop/:collection?/:itemType?"
                  component={ShopCollectionPage}
                />
                <Route
                  path="/shopitem/:collection/:itemId"
                  component={ShopItemPage}
                />
                <Route path="/login" component={SignInOutPage} />

                {/* Lola */}
                <Route path="/employeeform" component={EmployeeFormPage} />
                <Route
                  path={`/employeecenter/:employeeId`}
                  component={EmployeeCenterPage}
                />
                <Route path="/employeelogin" component={EmployeeSignInOutPage} />

                {/* 育琳 */}
                <Route path="/courses" component={Courses} />
                <Route path="/coaches" component={Coaches} />
                {/* ＣhrisLin */}
                <Route exact path="/articles" component={Articles} />
                <Route path="/articles/:articleId" component={ArticlesPreview} />
                <Route path="/articlesAdd" component={ArticlesAdd} />
                <Route path="/articlesEdit" component={ArticlesEdit} />
                <Route path="/articlesUpdate/:articleId" component={ArticlesUpdate} />
                {/* 會員 */}
                <Route path="/user" component={UserCenter} />
                {/* Darren測試用 */}
                <Route path="/OrderList" component={OrderList} />
                <Route path="/CartList" component={CartList} />
                <Route path="/OrderListDetail" component={OrderListDetail} />
                <Route path="/CheckOutPage" component={CheckOutPage} />
                <Route path="/OrderCompleted" component={OrderCompleted} />
                <Route path="/UserEdit" component={UserEdit} />
                <Route path="/CreditCardPage" component={CreditCardPage} />
                {/* Jason */}
                <Route path="/ServiceCenter" component={ServiceCenter} />

              </Suspense>
            </ErrorBoundary>
          </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  userListStart: () => dispatch(userListStart()),
  employeeListStart: () => dispatch(employeeListStart()),
});
export default connect(null ,mapDispatchToProps)(App);