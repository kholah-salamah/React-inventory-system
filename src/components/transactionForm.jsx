import React from "react";
import Form from "../common/form";
import joi from "joi-browser";
import { addInventoyTransaction } from "../services/fakeInventoryTransaction";
import getUnites from "../services/unitService";
import getProduct from "../services/productService";
import { getAdminRoles } from "../services/fakeRoleService";
import { getCurrentUSer } from "../services/fakeUserService";

class TransactionForm extends Form {
  state = {
    data: {
      productId: "",
      unitId: "",
      quantity: "",
      operation: "",
    },
    errors: {},
    products: [],
    unites: [],
    adminRoles: [],
  };

  componentDidMount() {
    console.log("CDM");
    //avoiding form error according to the hidden Admin select role element (add/withdraw)
    const user = getCurrentUSer();
    if (user.role.type !== "all") {
      // forbidden practice to dirctly modify the state this.state.data.operation = user.role._id;
      const clonedState = { ...this.state.data };
      clonedState.operation = user.role._id;
      this.setState({ data: clonedState });
    }

    let products = getProduct();
    let unites = getUnites();
    let adminRoles = getAdminRoles();

    this.setState({ products, unites, adminRoles });
  }
  schema = {
    productId: joi.number().required(),
    unitId: joi.number().integer(),
    quantity: joi.number().integer(),
    operation: joi.number(),
  };

  doSubmit = async () => {
    // call server

    addInventoyTransaction(this.state.data);

    // Reset State after submitting the form
    const user = getCurrentUSer();
    let clearFormData = {
      productId: "",
      unitId: "",
      quantity: "",
      operation: user.role._id,
    };
    this.setState({ data: clearFormData });
    //this.props.history.push("/inventory");
  };

  render() {
    const user = getCurrentUSer();
    const AdminSession = user.role.type === "all" ? true : false;
    const { products, unites, adminRoles } = this.state;

    return (
      <React.Fragment>
        <h1 className="headline">Transaction Form</h1>
        <form onSubmit={this.handleSubmmit} className="form-style">
          {this.renderSelect(
            "productId",
            "Product",
            "_id",
            "name",
            "number",
            products
          )}
          {this.renderSelect("unitId", "Unit", "_id", "name", "number", unites)}

          {AdminSession &&
            this.renderSelect(
              "operation",
              "Operation Type",
              "_id",
              "role",
              "number",
              adminRoles
            )}

          {this.renderinput("quantity", "Quantity", "number")}
          {this.renderButton("Add Transaction")}
        </form>
      </React.Fragment>
    );
  }
}

export default TransactionForm;
