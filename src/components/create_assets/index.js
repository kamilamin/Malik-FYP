import React, { Component } from "react";
import "./style.css";
import contract from "../../solidity/Contract_Instance";
import Web3 from "web3";

class AssetsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vin_number: "",
      car_color: "",
      engine_type: "",
      city: "",
      date: new Date().toDateString()
    };
  }
  onCreate = async ev => {
    ev && ev.preventDefault();
    const { vin_number, car_color, engine_type, city, date } = this.state;
    const account = (await Web3.eth.getAccounts())[1];
    contract.methods
      .createAsset(vin_number, car_color, engine_type, city, date)
      .send({ from: account, gas: 3000000 })
      .then(res => {
        alert(`Assset: ${vin_number} created successfull !`);
      })
      .catch(err => {
        alert(`Error while creating Asset !!`);
      });
  };
  render() {
    const { date } = this.state;

    return (
      <div className="header">
        <h4>Automobile Tracing Management System on Blockchain</h4>
        <h5 className="form_header">Assets Registration Form</h5>
        <div>
          <form className="reg_form" onSubmit={this.onCreate}>
            <div className="form-group">
              <label className="field_label" for="vin_number">
                Enter Vin Number
              </label>
              <input
                type="number"
                className="form-control"
                id="vin_number"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                maxLength="10"
                onChange={e => {
                  this.setState({ vin_number: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_label_car" for="color">
                Enter Car Color
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                aria-describedby="emailHelp"
                placeholder="Enter Car Color"
                maxLength="10"
                onChange={e => {
                  this.setState({ car_color: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_label_engine" for="Engine_type">
                Enter Engine Type
              </label>
              <input
                type="text"
                className="form-control"
                id="Engine_type"
                aria-describedby="emailHelp"
                placeholder="Enter Engine Type"
                maxLength="10"
                onChange={e => {
                  this.setState({ engine_type: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_label_city" for="city">
                Enter City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                aria-describedby="emailHelp"
                placeholder="Enter City"
                maxLength="10"
                onChange={e => {
                  this.setState({ city: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_label_date" for="date">
                Date of Registration
              </label>
              <input
                type="text"
                className="form-control"
                id="date"
                value={date}
                aria-describedby="emailHelp"
                placeholder="Enter City"
                maxLength="10"
                readOnly
              />
            </div>
            <div>
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AssetsForm;
