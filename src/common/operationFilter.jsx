import React from "react";

const OperationFilter = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group   list-group-style">
      {items.map((item) => (
        <li
          className={
            item[textProperty] === selectedItem[textProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
// defaultProps property to avoid more props in the component interface
OperationFilter.defaultProps = {
  textProperty: "operation",
  valueProperty: "_id",
};

export default OperationFilter;
