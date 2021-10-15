import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { googlePlus } from "react-icons-kit/icomoon/googlePlus";
import { Icon } from "react-icons-kit";

import "./sign-in.scss";

import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";
import { userLoginStart, userLoginRestart } from "../../redux/user/user-action";
import { createStructuredSelector } from "reselect";
import {
  userListSelect,
  userSignInUnVaildSelect,
} from "../../redux/user/user-selector";
import ErrorModel from "../error-model/ErrorModel";

class SignIn extends React.Component {

  state = {
    email: "",
    password: "",
  };

  handleSubmit = async (e) => {
  
    
    e.preventDefault();
    const { email, password } = this.state;
    const { userLoginStart } = this.props;
    userLoginStart({ memberAccount: email, memberPwd: password });

  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleIsValid = () => { };

  render() {

    const { userSignInUnVaild, history, userLoginRestart } = this.props;
    console.log("history", history)
    return (
      <div className="sign-in">
        <h2 className="sign-in-title">會員登入</h2>
        <span>輸入帳號 & 密碼登入</span>
        <form>
          <FormInput
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="Email"
            type="email"
            required
          />

          <FormInput
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
            type="Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit" onClick={this.handleSubmit}>
              登入
            </CustomButton>

            <CustomButton
              type="button"
              google
            // onClick={this.googleHandleSubmit}
            >
              <a
                href={`${process.env.REACT_APP_BACKEND_URL}/api/user/google`}
                className="google-sign-link"
              >
                <Icon icon={googlePlus} size={30} />
                <span>Google</span> 登入
              </a>
            </CustomButton>
          </div>
        </form>
        {userSignInUnVaild !== null && (
          <div
            className="unValid-backdrop"
            onClick={() => userLoginRestart()}
          />
        )}
        <ErrorModel
          unValid={userSignInUnVaild !== null && userSignInUnVaild}
          returnHome={false}
        >
          帳號或密碼錯誤喔！
        </ErrorModel>

        <ErrorModel
          unValid={userSignInUnVaild !== null && !userSignInUnVaild}
          returnHome={() => (history.goBack())}
        >
          登入成功！
        </ErrorModel>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userList: userListSelect,
  userSignInUnVaild: userSignInUnVaildSelect,
});

const mapDispatchToProps = (dispatch) => ({
  userLoginStart: (user) => dispatch(userLoginStart(user)),
  userLoginRestart: () => dispatch(userLoginRestart()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));