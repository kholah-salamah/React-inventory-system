import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
const Table = (props) => {
  const {
    cols,
    data,
    onSort,
    sortColumn,
    user,
    options,
    onFilterChange,
  } = props;
  return (
    <table className="table  table-hover">
      <TableHeader
        cols={cols}
        onSort={onSort}
        sortColumn={sortColumn}
        options={options}
        onFilterChange={onFilterChange}
      />
      <TableBody data={data} cols={cols} user={user} />
    </table>
  );
};

export default Table;
