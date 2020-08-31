import React, { Component } from "react";
import Table from "../common/table";

class InventoryTable extends Component {
  cols = [
    {
      path: "product.name",
      lablel: "Product",
      sortable: false,
      type: "string",
      filterable: {
        operator: "sw",
      },
    },
    {
      path: "unit.name",
      lablel: "Unit",
      sortable: false,
      filterable: {
        options: this.props.options,
        filterPath: "unit._id",
        keyField: "_id",
        valueField: "name",
      },
    },
    { path: "numberInstock", lablel: "Stock", sortable: true },
  ];

  render() {
    const {
      paginatedInventory,
      sortColumn,
      onSort,

      options,
      onFilterChange,
    } = this.props;
    return (
      <React.Fragment>
        <Table
          cols={this.cols}
          data={paginatedInventory}
          onSort={onSort}
          sortColumn={sortColumn}
          options={options}
          onFilterChange={onFilterChange}
        />
      </React.Fragment>
    );
  }
}

export default InventoryTable;
