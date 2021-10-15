import React from "react";

import "./sign-in-out-page.scss";

import SignIn from "../../component/sign-in/Sign-in";
import SignUp from "../../component/sign-up/Sign-up";
import Footer from "../../component/footer/Footer";

const SignInOutPage = () => (
  <div className="sign-in-and-sign-out">
    <SignIn /> 
    <SignUp />
    {/* <Footer /> */}
  </div>
);

export default SignInOutPage;
