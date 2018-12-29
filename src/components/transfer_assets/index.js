import React, { Component } from "react";
import "./style.css";

class Transfer_Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header">
        <h4>Automobile Tracing Management System on Blockchain</h4>
        <h5 className="form_header">Transfer Ownership</h5>
        <div>
          <form className="reg_form">
            <div className="form-group">
              <label className="field_sender" for="sender">
                Enter Address of Assets Sender
              </label>
              <input
                type="text"
                className="form-control"
                id="sender"
                aria-describedby="emailHelp"
                placeholder="Enter Address of Assets Sender"
                maxLength="20"
                onChange={sender_address => {
                  this.setState({ sender_address });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_receiver" for="receiver">
                Enter Address of Assets Receiver
              </label>
              <input
                type="text"
                className="form-control"
                id="receiver"
                aria-describedby="emailHelp"
                placeholder="Enter Address of Assets Receiver"
                maxLength="20"
                onChange={receiver_address => {
                  this.setState({ receiver_address });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_owner" for="owner_name">
                Enter Owner Name
              </label>
              <input
                type="text"
                className="form-control"
                id="owner_name"
                aria-describedby="emailHelp"
                placeholder="Enter Engine Type"
                maxLength="10"
                onChange={owner_name => {
                  this.setState({ owner_name });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_vin_number" for="vin_number">
                Enter Vin Number
              </label>
              <input
                type="number"
                className="form-control"
                id="vin_number"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                maxLength="10"
                onChange={vin_number => {
                  this.setState({ vin_number });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_city" for="city">
                Enter City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                aria-describedby="emailHelp"
                placeholder="Enter City"
                maxLength="10"
                onChange={city => {
                  this.setState({ city });
                }}
              />
            </div>
            <div>
              <button className="btn btn-primary">Transfer Assets</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Transfer_Assets;
