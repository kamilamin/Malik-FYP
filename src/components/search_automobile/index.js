import React, { Component } from "react";
import "./style.css";

class Search extends Component {
  render() {
    return (
      <div>
        <div className="search_header">
          <h4>Automobile Tracing Management System on Blockchain</h4>
        </div>
        <form>
          <div className="search_current_owner">
            <h5>Search Current Owner of Automobile</h5>
            <div className="search_assets_owner">
              <label for="assets_owner">Enter Vin Number: </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                id="assets_owner"
              />
            </div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
        <form>
          <div className="search_automobile">
            <h5>Search Automobile</h5>
            <div className="search_assets_owner">
              <label for="assets_owner">Enter Vin Number: </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                id="assets_owner"
              />
            </div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
        <form>
          <div className="list_automobile">
            <h5>List Of Automobile Own By Manufacturer</h5>
            <div className="search_assets_owner">
              <label for="assets_owner">Enter Vin Number: </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                id="assets_owner"
              />
            </div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
        <form action="">
          <div className="pervious_automobile">
            <h5>Previous Owner of Automobile</h5>
            <div className="search_assets_owner">
              <label for="assets_owner">Enter Vin Number: </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                id="assets_owner"
              />
            </div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
