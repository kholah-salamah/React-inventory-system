import React, { Component } from "react";
import { Link } from "react-router-dom";
class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <main role="main" className="container-home">
          <div class="starter-template">
            <h1>Inventory System Demo</h1>
            <br />
            <p className="lead">
              This is an Inventory system demo.
              <br /> This React App Based Inventory system that allows three
              different users to use it based on thier role .
            </p>
            <br />
            <Link
              type="button"
              className="btn btn-info btn-lg"
              to="/products"
              style={({ marginBottom: 20 }, { marginLeft: 0 })}
            >
              Get started
            </Link>
          </div>
        </main>
        <footer class="footer">
          <div class="container-home">
            <span class="text-muted">By Developer: Khawlah Mansor Salamh</span>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Home;
