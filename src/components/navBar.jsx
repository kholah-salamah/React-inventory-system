import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import getUsers from "../services/fakeUserService";

class Navbar extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <nav className="navbar  bg-light nav-small">
          <NavLink className=" nav-item nav-link navbar-brand" to="/home">
            Home
          </NavLink>

          <NavLink className="nav-item nav-link" to="/transactions">
            Transactions
          </NavLink>
          <NavLink className="nav-item nav-link" to="/products">
            Products
          </NavLink>
          <NavLink className="nav-item nav-link inventory-link" to="/inventory">
            Inventory
          </NavLink>

          <div className="dropdown ">
            <button
              className="btn btn-primary btn-sm dropdown-toggle"
              type="button"
              id="Menu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user.role.name}
            </button>

            <div
              className="dropdown-menu dropdown-menu-style"
              aria-labelledby="Menu2"
            >
              {getUsers().map((u) => (
                <NavLink
                  key={u._id}
                  className="dropdown-item"
                  type="button"
                  to="/products"
                  onClick={() => this.props.onUserSelect(u._id)}
                >
                  {u.role.name}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default Navbar;
