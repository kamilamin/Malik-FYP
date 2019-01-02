import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AssetsForm from "./components/create_assets";
import Transfer_Assets from "./components/transfer_assets";
import Search from "./components/search_automobile";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
              Automobile Tracing With Blockchain
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Create New Assets <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/transfer_assets">
                    Transfer Ownership
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">
                    Search Automobile
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route exact path="/" component={AssetsForm} />
          <Route exact path="/transfer_assets" component={Transfer_Assets} />
          <Route exact path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;
