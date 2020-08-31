import React, { Component } from "react";
import BooleanCheck from "../common/booleanCheck";
import Table from "../common/table";
class TransactionTable extends Component {
  cols = [
    { path: "product.name", lablel: "Product Name", sortable: true },
    { path: "product.category.name", lablel: "Category", sortable: true },
    { path: "unit.name", lablel: "Unit", sortable: true },
    {
      path: "date",
      lablel: "Date",
      format: "yyyy-MM-dd HH:mm",
      sortable: true,
    },
    { path: "quantity", lablel: "Quantity", sortable: true },
    {
      key: "like",
      lablel: "Operation",
      content: (item) => <BooleanCheck isAdded={item.isAdded} />,
    },
  ];

  render() {
    const { paginatedTransactions, onSort, sortColumn } = this.props;
    return (
      <React.Fragment>
        <Table
          cols={this.cols}
          data={paginatedTransactions}
          onSort={onSort}
          sortColumn={sortColumn}
        />
      </React.Fragment>
    );
  }
}

export default TransactionTable;
