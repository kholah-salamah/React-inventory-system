import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import Enable from "../common/enable";

class ProductsTable extends Component {
  adminEnableColumn = {
    key: "enable", // avoiding mapping error
    lablel: "Available",
    content: (item) => (
      <Enable
        enabled={item.enabled}
        onEnableToggle={() => this.props.onEnable(item)}
      />
    ),
  };
  adminDeleteColumn = {
    key: "delete",
    lablel: "Delete",
    content: (item, user) => (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => this.props.onDelete(item)}
      >
        <i class="fa fa-trash-o" aria-hidden="true"></i>
      </button>
    ),
  };

  render() {
    console.log("Product Table render");
    const { paginatedProducts, onSort, sortColumn, user } = this.props;

    let cols = [
      {
        path: "name",
        lablel: "ProductNAME",
        content: (item) => (
          <Link to={`/products/${item._id}`}>{item.name} </Link>
        ),
      },
      { path: "category.name", lablel: "ProductCategory", sortable: true },
    ];

    if (user.role.name === "Admin")
      cols.push(this.adminDeleteColumn, this.adminEnableColumn);

    return (
      <Table
        cols={cols}
        data={paginatedProducts}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default ProductsTable;
