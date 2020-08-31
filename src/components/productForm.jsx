import React, { Component } from "react";
import getCategories from "../services/fakeCategoryService";
import Form from "../common/form";
import joi from "joi-browser";
import { addProduct, products } from "../services/productService";

class ProductsForm extends Form {
  state = {
    data: {
      name: "",
      categoryId: 1,
    },
    errors: {},
    categories: [],
  };
  populateProduct() {
    //Editing an existant product
    const productIdParam = this.props.match.params.id;
    if (productIdParam === "new") return;
    const productId = parseInt(productIdParam);

    const product = products.find((p) => p._id === productId);

    // We should map the existant product to match the state data properties
    this.setState({ data: this.mapExestantProduct(product) });
    // this.setState({ data: product });
  }
  mapExestantProduct = (product) => {
    return {
      name: product.name,
      categoryId: product.category._id,
    };
  };
  componentDidMount() {
    let categories = getCategories();
    this.setState({ categories });
    this.populateProduct();
  }

  schema = {
    name: joi.string().required(),
    categoryId: joi.number().integer().required(),
  };

  doSubmit = async () => {
    // call server

    addProduct(this.state.data);
    this.props.history.push("/products");
  };

  render() {
    const { categories } = this.state;
    return (
      <React.Fragment>
        <h1 className="headline">Products</h1>
        <form onSubmit={this.handleSubmmit} className="form-style">
          {this.renderinput("name", "ProductName", "text")}
          {this.renderSelect(
            "categoryId",
            "Category",
            "_id",
            "name",
            "number",
            categories
          )}

          {this.renderButton("Add Product")}
        </form>
      </React.Fragment>
    );
  }
}

export default ProductsForm;
