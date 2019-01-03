import React, { Component } from "react";
import contract from "../../Solidity/Contract_Instance";
import web3 from "../../Solidity/web3";
import "./style.css";

class Search extends Component {
  state = {};
  // List of Car Owned by Manufacturer
  componentDidMount() {
    // this.listOfCarsOwnedByManufacturer();
  }
  getCurrentOwnerOfAsset = async ev => {
    ev.preventDefault();
    const { SCOA } = this.state;
    contract.methods
      .getCurrentOwnerOfAsset(SCOA)
      .call()
      .then(res => {
        const { 0: currentOwner, 1: currentLocation } = res;
        console.log(currentOwner, currentLocation);
        this.setState({
          response_SCOA: (
            <p>
              {"VIN No: " + SCOA} <br />
              {"Name: " + currentOwner} <br />
              {"Location: " + currentLocation} <br />
            </p>
          )
        });
      })
      .catch(err => {
        alert(`error retreiving asset # ${SCOA}`);
      });
  };
  getSpecificCar = ev => {
    ev.preventDefault();
    const { SA } = this.state;
    contract.methods
      .getSpecificCar(SA)
      .call()
      .then(res => {
        console.log(res);
        const {
          0: lotNumber,
          1: carColor,
          3: engineType,
          4: DateOfManufacture,
          5: origin
        } = res;
        this.setState({
          response_SA: (
            <p>
              {"Vin Number: " + SA} <br />
              {"Lot Number: " + lotNumber} <br />
              {"Car Color: " + carColor} <br />
              {"Engine Type: " + engineType} <br />
              {"Date Of Manufacture: " + DateOfManufacture} <br />
              {"Origin: " + origin} <br />
            </p>
          )
        });
      })
      .catch(error => {
        alert("Error", error);
      });
  };
  listOfCarsOwnedByManufacturer = () => {
    contract.methods
      .getListOfAssetsOwnedByManufacturer()
      .call()
      .then(res => {
        console.log(res);
        const { list } = res;
        this.setState({
          response_LAOM: (
            <p>{list}</p>
          )
        })
      })
      .catch(error => {
        alert("Error", error);
      });
  };
  render() {
    const {
      response_SCOA,
      response_SA,
      response_LAOM,
      response_POA
    } = this.state;
    return (
      <div>
        <div className="search_header">
          <h3>Automobile Tracing Management System on Blockchain</h3>
        </div>
        <form onSubmit={this.getCurrentOwnerOfAsset}>
          <div className="search_current_owner">
            <h5>Search Current Owner of Automobile</h5>
            <div className="search_assets_owner">
              <label htmlFor="assets_owner">Enter Vin Number: </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                id="assets_owner"
                required
                onChange={e => {
                  this.setState({ SCOA: e.target.value });
                }}
              />
            </div>
            <div className="result">{response_SCOA}</div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
        {/* Get Specific Car */}
        <form onSubmit={this.getSpecificCar}>
          <div className="search_current_owner">
            <h5>Search Automobile</h5>
            <div className="search_assets_owner">
              <label htmlFor="assets_owner">Enter Vin Number: </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                id="assets_owner"
                required
                onChange={e => {
                  this.setState({ SA: e.target.value });
                }}
              />
            </div>
            <div className="result">{response_SA}</div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>

        <form>
          <div className="search_current_owner">
            <h5>List Of Automobiles Owned By Manufacturer</h5>
            <div className="search_assets_owner">
              <label htmlFor="assets_owner">Enter Vin Number: </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                id="assets_owner"
                required
                onChange={e => {
                  this.setState({ LAOM: e.target.value });
                }}
              />
            </div>
            <div className="result">{response_LAOM}</div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>

        <form>
          <div className="search_current_owner">
            <h5>Previous Owner of Automobile</h5>
            <div className="search_assets_owner">
              <label htmlFor="assets_owner">Enter Vin Number: </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                id="assets_owner"
                required
                onChange={e => {
                  this.setState({ POA: e.target.value });
                }}
              />
            </div>
            <div className="result">{response_POA}</div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>

        <form>
          <div className="search_current_owner">
            <h5>Current Owner of Automobile</h5>
            <div className="search_assets_owner">
              <label htmlFor="assets_owner">Enter Vin Number: </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                id="assets_owner"
                required
                onChange={e => {
                  this.setState({ POA: e.target.value });
                }}
              />
            </div>
            <div className="result">{response_POA}</div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
