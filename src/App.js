import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AssetsForm from "./components/create_assets";
import Transfer_Assets from './components/transfer_assets';
import Search from './components/search_automobile';
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link class="navbar-brand" to="/">
            Automobile Tracing With Blockchain
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <Link class="nav-link" to="/">
                  Create New Assets <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/transfer_assets">
                  Transfer Ownership
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/search">
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
