import React, { Component } from "react";
import { getProduct } from "./productService";
class Main extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        {getProduct().map((c) => (
          <li key={c._id}>
            {" "}
            {c._id} ,{c.name},{c.unit.name},{c.category.name}
          </li>
        ))}
      </React.Fragment>
    );
  }
}

export default Main;
