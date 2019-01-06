import React, { Component } from "react";
import contract from "../../Solidity/Contract_Instance";
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
        const {
          0: lotNumber,
          1: carColor,
          2: engineType,
          3: DateOfManufacture,
          4: origin,
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

  listOfCarsOwnedByManufacturer = (ev) => {
    ev.preventDefault();
    contract.methods
      .getListOfAssetsOwnedByManufacturer()
      .call()
      .then(res => {
        console.log(res);
        this.setState({
          response_LAOM: !res ? "No Automobiles available." : res.map((v, i) => {
            return (<p key={i}>{`${i + 1}) ${v}`}</p>);
          })
        });
      })
      .catch(error => {
        console.log(error);
        alert("Error", error);
      });
  };

  previousOwner = (ev) => {
    ev.preventDefault();
    const { POA } = this.state;
    contract.methods
      .getPreviousOwnerOfAsset(POA)
      .call()
      .then((res) => {
        console.log(res);

        const {
          0: totalOwners,
          1: previousOwnersName,
          2: previousOwnersLocation
        } = res;
        this.setState({
          response_POA: <div>
            <p>Total Owners Uptil Now: {totalOwners}</p>
            <p>Previous Owner's Name: {previousOwnersName}</p>
            <p>Previous Owner's Location: {previousOwnersLocation}</p>
          </div>
        });

      })
      .catch((err) => {
        alert("No previous owner against asset: " + POA);
      });
    // response_POA
  };

  render() {
    const {
      response_SCOA,
      response_SA,
      response_LAOM,
      response_POA,
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

        {/* Get List of all Cars */}
        <form onSubmit={this.listOfCarsOwnedByManufacturer}>
          <div className="search_current_owner">
            <h5>List Of Automobiles Owned By Manufacturer</h5>
            <div className="result">{response_LAOM}</div>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>

        {/* Get previous owner of the Car */}
        <form onSubmit={this.previousOwner}>
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

      </div>
    );
  }
}

export default Search;
