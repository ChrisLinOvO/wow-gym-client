import React from "react";

import "./custom-button.scss";

const CustomButton = ({
  children,
  shopCount,
  signin,
  errorModel,
  mobileMode,
  unMobileMode,
  google,
  ...otherProps
}) => (
  <button
    className={`
    ${shopCount ? "shop-count-btn" : ""} 
    ${signin ? "sign-in-btn" : ""} 
    ${errorModel ? "error-model-btn" : ""} 
    ${unMobileMode ? "unmobile-mode" : ""} 
    ${mobileMode ? "mobile-mode" : ""} 
    ${google ? "google-signin " : ""} 
    ${google ? "google-draw-border" : "draw-border"} 
    custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
