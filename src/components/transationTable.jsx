import React, { Component } from "react";
import BooleanCheck from "../common/booleanCheck";
import Table from "../common/table";
class TransactionTable extends Component {
  cols = [
    { path: "product.name", lablel: "ProductName", sortable: true },
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
        {/* <table className="table">
          <thead>
            <tr>
              <th>ProductName</th>
              <th>ProductCategory</th>
              <th>Unit</th>
              <th>date</th>
              <th>Quantity</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((t) => (
              <tr key={t._id}>
                <td>{t.product.name}</td>
                <td>{t.product.category.name}</td>
                <td>{t.unit.name}</td>
                <td>{t.date.toString()}</td>
                <td>{t.quantity}</td>
                <td>
                  <BooleanCheck isAdded={t.isAdded} />
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </React.Fragment>
    );
  }
}

export default TransactionTable;
