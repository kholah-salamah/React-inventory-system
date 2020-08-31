import React, { Component } from "react";
class BooleanCheck extends Component {
  render() {
    const { isAdded } = this.props;
    let classes = isAdded ? " fa fa-plus-circle" : " fa fa-minus-square";
    return <i className={classes} aria-hidden="true"></i>;
  }
}

export default BooleanCheck;
