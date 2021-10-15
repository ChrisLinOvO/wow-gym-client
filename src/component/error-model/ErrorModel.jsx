import React from "react";
import { CSSTransition } from "react-transition-group";
import CustomButton from "../custom-button/Custom-button";

import "./ErrorModel.scss";
import { connect } from "react-redux";
import {
  userSignUpRestart,
  userLoginRestart,
} from "../../redux/user/user-action";

const ErrorModel = ({
  unValid,
  returnHome,
  children,
  userSignUpRestart,
  signUp,
  userLoginRestart,
}) => {
  return (
    <CSSTransition
      in={unValid}
      timeout={200}
      classNames="pop-up-center"
      mountOnEnter
      unmountOnExit
    >
      <div className="error-model-container">
        <div className="gradient-bar" />
        <h3>{children}</h3>
        <CustomButton
          errorModel
          onClick={() => {
            signUp ? userSignUpRestart() : userLoginRestart();
            if (!returnHome) return;
            returnHome();
          }}
        >
          確定
        </CustomButton>
      </div>
    </CSSTransition>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userSignUpRestart: () => dispatch(userSignUpRestart()),
  userLoginRestart: () => dispatch(userLoginRestart()),
});

export default connect(null, mapDispatchToProps)(ErrorModel);
