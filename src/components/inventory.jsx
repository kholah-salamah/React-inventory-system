import React, { Component } from "react";
import _ from "lodash";
import { getInventory } from "../services/fakeInventoryService";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import InventoryTable from "./inventoryTable";
import getUnites from "./../services/unitService";

class Inventory extends Component {
  state = {
    inventory: getInventory(),
    options: getUnites(),
    pageSize: 4,
    currentPage: 1,
    sortColumn: {},
    filters: [],
  };
  handleFilterChange = (filters) => {
    console.log(filters);
    this.setState({ filters });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSort = (clonedSortColumn) => {
    this.setState({ sortColumn: clonedSortColumn });
  };

  handleFilter = (value, path) => {
    const { currentTarget: input } = value;
    let filterValue = input.value;

    if (input.dataset.type === "number") filterValue = parseInt(filterValue);

    console.log(filterValue, path);
    this.setState({
      inputFilterValue: filterValue,
      filterColumn: path,
      sortColumn: {},
    });
  };
  render() {
    const {
      inventory,
      pageSize,
      currentPage,
      sortColumn,
      options,
      filters,
    } = this.state;

    const filtered = filters[0]
      ? inventory.filter((invObj) => {
          let acc = true;
          filters.forEach((fObj) => {
            if (fObj.operator) {
              switch (fObj.operator) {
                case "sw":
                  let filterByName = _.get(invObj, fObj.path)
                    .toLowerCase()
                    .startsWith(fObj.value.toLowerCase());
                  acc = acc && filterByName;
                  break;
                case "inc":
                  let filterByIncludes = _.get(invObj, fObj.path)
                    .toLowerCase()
                    .includes(fObj.value.toLowerCase());
                  acc = acc && filterByIncludes;
                  break;
                case "ew":
                  let filterByEndWith = _.get(invObj, fObj.path)
                    .toLowerCase()
                    .endsWith(fObj.value.toLowerCase());
                  acc = acc && filterByEndWith;
                  break;
              }
            } else {
              let filterByUnit =
                fObj.value === _.get(invObj, fObj.path) ? true : false;
              acc = acc && filterByUnit;
            }
          });

          return acc;
        })
      : inventory;
    const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]);

    const paginatedInventory = paginate(sorted, currentPage, pageSize);

    return (
      <React.Fragment>
        <h3 className="inventory-headline">Inventory Table</h3>
        <div className="row transaction-row">
          <div className="col-12  col-sm-12   col-md-6  offset-md-3  offset-lg-3 col-lg-6">
            <h6 className="inventory-items-count">
              Showing {paginatedInventory.length} products of {inventory.length}
            </h6>
            <InventoryTable
              paginatedInventory={paginatedInventory}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
              options={options}
              onFilterChange={this.handleFilterChange}
            />

            <Pagination
              pageSize={pageSize}
              currentPage={currentPage}
              itemsCount={inventory.length}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Inventory;
