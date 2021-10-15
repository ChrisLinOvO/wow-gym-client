import React from "react";

import "./ErrorBoundary.scss";

class ErrorBoundary extends React.Component {
  state = {
    hasErrored: false,
  };

  static getDerivedStateFromError(error) {
    // process error
    return { hasErrored: true };
  }
  componentDidCatch(error, info) {
    console.log(error);
  }
  render() {
    if (this.state.hasErrored)
      return (
        <div className="errorImageOverlay">
          <div className="errorImageContainer" />
          <p>This page is broken !</p>
        </div>
      );
    return this.props.children;
  }
}

export default ErrorBoundary;
