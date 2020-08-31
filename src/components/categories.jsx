import React, { Component } from "react";
import * as APIcategories from "../services/fakeCategoryService";

class categories extends Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    let categories = APIcategories.getCategories();
    this.setState({ categories });
    // console.log(categories);
  }
  render() {
    return (
      <React.Fragment>
        {this.state.categories.map((c) => (
          <li key={c._id}>
            {" "}
            {c._id} ,{c.name},{c.unit.name},{c.category.name}
          </li>
        ))}
      </React.Fragment>
    );
  }
}

export default categories;
