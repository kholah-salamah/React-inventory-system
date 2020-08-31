import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";

import Navbar from "./components/navBar";
import Products from "./components/products";
import Transactions from "./components/transactions";
import TransactionForm from "./components/transactionForm";
import Inventory from "./components/inventory";
import ProductsForm from "./components/productForm";
import Home from "./components/home";

import { setCurrentUser } from "./services/fakeUserService";
import { getCurrentUSer } from "./services/fakeUserService";

import "./App.css";

class App extends Component {
  state = {
    user: getCurrentUSer(),
  };

  handleUserSelect = (userId) => {
    const user = setCurrentUser(userId);
    this.setState({ user: user });
  };
  render() {
    return (
      <React.Fragment>
        <Navbar onUserSelect={this.handleUserSelect} user={this.state.user} />

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/products/:id" component={ProductsForm} />
          <Route path="/transactions" component={Transactions} />
          <Route
            path="/products"
            render={(props) => <Products {...props} user={this.state.user} />}
          />
          <Route path="/transactionsForm" component={TransactionForm} />
          <Route path="/inventory" component={Inventory} />
          productsForm
          <Redirect to="/notFound" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
