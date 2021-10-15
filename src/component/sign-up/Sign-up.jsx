import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import axios from "axios";

import { createStructuredSelector } from "reselect";
import {
  userListSelect,
  currentUserSelect,
  userSignUpUnVaildSelect,
} from "../../redux/user/user-selector";
import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";
import ErrorModel from "../error-model/ErrorModel";

import {
  userListStart,
  // userLogin,
  userSignUpStart,
  userSignUpRestart,
} from "../../redux/user/user-action";

import "./Sign-up.scss";

class SingUP extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    mobile: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userSignUpStart } = this.props;
    const user = {
      memberAccount: this.state.email,
      memberPwd: this.state.password,
      memberName: this.state.name,
    };
    userSignUpStart(user);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { history, userSignUpUnVaild, userSignUpRestart } = this.props;
    return (
      <div className="sign-up">
        <h2 className="sign-up-title">會員註冊</h2>
        <span>輸入帳號&密碼&基本訊息註冊</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="Email"
            type="email"
          />

          <FormInput
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
            type="Password"
          />
          <FormInput
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            label="name"
          />
          <div className="buttons">
            <CustomButton type="submit">註冊</CustomButton>
          </div>
        </form>
        {userSignUpUnVaild !== null && (
          <div className="unValid-backdrop" onClick={userSignUpRestart} />
        )}
        <ErrorModel
          unValid={userSignUpUnVaild !== null && userSignUpUnVaild}
          returnHome={false}
          signUp
        >
          此帳號已被註冊摟！
        </ErrorModel>

        <ErrorModel
          unValid={userSignUpUnVaild !== null && !userSignUpUnVaild}
          returnHome={() => history.push("/")}
          signUp
        >
          註冊成功 !
        </ErrorModel>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userList: userListSelect,
  currentUser: currentUserSelect,
  userSignUpUnVaild: userSignUpUnVaildSelect,
});

const mapDispatchToProps = (dispatch) => ({
  userListStart: () => dispatch(userListStart()),
  userSignUpRestart: () => dispatch(userSignUpRestart()),
  // userLogin: (user) => dispatch(userLogin(user)),
  userSignUpStart: (user) => dispatch(userSignUpStart(user)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingUP));