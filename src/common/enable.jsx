import React, { Component } from "react";
class Enable extends Component {
  render() {
    let classes = "fa fa-check";
    if (!this.props.enabled) classes = "fa fa-times";
    return (
      <React.Fragment>
        <i
          className={classes}
          aria-hidden="true"
          onClick={this.props.onEnableToggle}
          style={{ cursor: "pointer" }}
        ></i>
      </React.Fragment>
    );
  }
}

export default Enable;
