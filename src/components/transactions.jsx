import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import _ from "lodash";
import getInventoryTransactions from "../services/fakeInventoryTransaction";

import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import OperationFilter from "../common/operationFilter";
import { getOperationTypes } from "../services/fakeRoleService";
import TransactionTable from "./transationTable";
class Transactions extends Component {
  state = {
    transactions: getInventoryTransactions(),
    operationTypes: [],
    pageSize: 2,
    currentPage: 1,
    sortColumn: { column: "quantity", order: "asc" },
    selectedOperation: { operation: "All Operations", _id: "" },
  };
  componentDidMount() {
    // console.log("Cdm");
    const operationTypes = [
      { operation: "All Operations", _id: "" },
      ...getOperationTypes(),
    ];
    this.setState({ operationTypes }); // Cause Rendering
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleItemSelect = (operation) => {
    // added dirctly into state object
    this.setState({ selectedOperation: operation, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      transactions,
      pageSize,
      currentPage,
      selectedOperation,
      sortColumn,
    } = this.state;
    // when selecting all oerations ==>( 0 & whatever = 0 )
    const filter =
      selectedOperation && selectedOperation._id
        ? transactions.filter((t) => t.isAdded === selectedOperation.isAdded)
        : transactions;

    const sorted = _.orderBy(filter, [sortColumn.column], [sortColumn.order]);

    const paginatedTransactions = paginate(sorted, currentPage, pageSize);
    //console.log("render", selectedOperation, filter);
    return (
      <React.Fragment>
        <h3 className="headline">TransactionsTable</h3>
        <div className="row transaction-row">
          <div className="col-12  col-sm-12 col-md-3 col-lg-3 ">
            <Link
              type="button"
              className="btn btn-primary  btn-small-style"
              to="/transactionsForm"
            >
              Add Transaction
            </Link>

            <OperationFilter
              items={this.state.operationTypes}
              selectedItem={this.state.selectedOperation}
              onItemSelect={this.handleItemSelect}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-9  table-container">
            <TransactionTable
              paginatedTransactions={paginatedTransactions}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              pageSize={pageSize}
              currentPage={currentPage}
              itemsCount={transactions.length}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Transactions;
