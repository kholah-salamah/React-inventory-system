import React, { Component } from "react";
import { indexOf } from "lodash";

class TableHeader extends Component {
  state = {
    filters: [
      // { path: "", value: "",operator:"" },
      // { path: "", value: "",operator:"" },
    ],
  };
  onColumnFilterChange = (filterValue, path, operator) => {
    const { currentTarget } = filterValue;
    let usedValue = currentTarget.value;
    if (currentTarget.dataset.type === "number")
      usedValue = parseInt(usedValue);

    let cloned = [...this.state.filters];

    let filterColumn = cloned.find((f) => f.path === path);

    if (usedValue) {
      //add/edit
      if (filterColumn) {
        filterColumn.value = usedValue;
        filterColumn.path = path;
        filterColumn.operator = operator;
      } else
        cloned.push({
          value: usedValue,
          path: path,
          operator: operator,
        });
    } else {
      //remove
      if (filterColumn) cloned.splice(indexOf(filterColumn), 1);
    }
    this.setState({ filters: cloned });
    this.props.onFilterChange(cloned);
  };

  raisSortColumn = (col) => {
    // checking column is it the same ? if yes just change order otherwise set column to the new one and order to :"asc"
    //setting just the column & order ==> sortColumn

    if (col.key) return;
    if (col.sortable) {
      let clonedSortColumn = { ...this.props.sortColumn };
      if (clonedSortColumn.column === col.path) {
        clonedSortColumn.order =
          clonedSortColumn.order === "asc" ? "desc" : "asc";
      } else {
        clonedSortColumn.column = col.path;
        clonedSortColumn.order = "asc";
      }
      this.props.onSort(clonedSortColumn);
    }
  };
  renderSortIcon = (col) => {
    const { sortColumn } = this.props;
    if (!col.sortable) return;
    // to banned from all cols
    if (col.path !== sortColumn.column) return null;
    if (sortColumn.order === "asc")
      return (
        <i className="fa fa-sort-amount-asc  sort-icon" aria-hidden="true"></i>
      );
    return (
      <i className="fa fa-sort-amount-desc sort-icon  " aria-hidden="true"></i>
    );
  };
  render() {
    const { cols } = this.props;
    const shouldAddFilterRow = cols.find((col) => col.filterable); // returns true

    return (
      <thead>
        <tr>
          {cols.map((col) => (
            <th
              className="clickable"
              key={col.path || col.key}
              onClick={() => this.raisSortColumn(col)}
            >
              {col.lablel}
              {this.renderSortIcon(col)}
            </th>
          ))}
        </tr>

        {shouldAddFilterRow && (
          <tr>
            {cols.map((col) => {
              {
                return col.filterable ? (
                  <th key={col.path}>
                    {col.type === "string" && (
                      <input
                        className="form-control custom-form-control"
                        name="productName"
                        data-type="text"
                        onChange={(input) =>
                          this.onColumnFilterChange(
                            input,
                            col.path,
                            col.filterable.operator
                          )
                        }
                      />
                    )}

                    {col.filterable.options && (
                      <select
                        className="form-control custom-form-control"
                        name="unitId"
                        data-type="number"
                        onChange={(input) =>
                          this.onColumnFilterChange(
                            input,
                            col.filterable.filterPath || col.path,
                            col.filterable.operator
                          )
                        }
                      >
                        <option value=""></option>
                        {col.filterable.options.map((item) => (
                          <option
                            key={item[col.filterable.keyField]}
                            value={item[col.filterable.keyField]}
                          >
                            {item[col.filterable.valueField]}
                          </option>
                        ))}
                      </select>
                    )}
                  </th>
                ) : (
                  <th key={col.path}></th>
                );
              }
            })}
          </tr>
        )}
      </thead>
    );
  }
}

export default TableHeader;
