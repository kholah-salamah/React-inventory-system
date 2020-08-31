import React, { Component } from "react";
import _ from "lodash";

import moment from "moment/dist/moment.js";
//this.props.user.role.name === "admin"
class TableBody extends Component {
  renderCell = (item, col) => {
    // for rendering like and button only
    if (col.content) {
      //if (this.props.user.role.name === "admin") return null;
      return col.content(item);
    }

    let value = _.get(item, col.path);

    if (value && value.getTime && col.format) {
      return moment(value).format("yyyy-MM-DD HH:mm");
    }
    return value;
  };
  renderKeys = (item, col) => {
    return item._id + (col.path || col.key);
  };
  render() {
    const { data, cols } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {cols.map((col) => (
              <td key={this.renderKeys(item, col)}>
                {this.renderCell(item, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
