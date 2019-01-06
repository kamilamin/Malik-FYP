import React, { Component } from "react";
import contract from "../../Solidity/Contract_Instance";
import web3 from "../../Solidity/web3";
import "./style.css";

class Transfer_Assets extends Component {
  state = {};

  transferOwnership = async ev => {
    ev.preventDefault();
    const {
      sender_address,
      receiver_address,
      owner_name,
      vin_number,
      city
    } = this.state;

    const chksumSender = await web3.utils.toChecksumAddress(sender_address);
    const chksumReceiver = await web3.utils.toChecksumAddress(receiver_address);

    const account = (await web3.eth.getAccounts())[1];
    contract.methods
      .transferToOwner(
        chksumSender,
        chksumReceiver,
        owner_name,
        vin_number,
        city
      )
      .send({ gas: 3000000, from: account })
      .then(res => {
        alert(`Success: ${vin_number} owenership transfered.`);
      })
      .catch(err => {
        alert(`Error: cannot transfer ownership of ${vin_number} !`);
      });
  };
  render() {
    return (
      <div className="header">
        <h4>Automobile Tracing Management System on Blockchain</h4>
        <h5 className="form_header">Transfer Ownership</h5>
        <div>
          <form className="reg_form" onSubmit={this.transferOwnership}>
            <div className="form-group">
              <label className="field_sender" htmlFor="sender">
                Enter Address of Assets Sender
              </label>
              <input
                type="text"
                className="form-control"
                id="sender"
                aria-describedby="emailHelp"
                placeholder="Enter Address of Assets Sender"
                maxLength="42"
                required
                onChange={e => {
                  this.setState({ sender_address: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_receiver" htmlFor="receiver">
                Enter Address of Assets Receiver
              </label>
              <input
                type="text"
                className="form-control"
                id="receiver"
                aria-describedby="emailHelp"
                placeholder="Enter Address of Assets Receiver"
                maxLength="42"
                required
                onChange={e => {
                  this.setState({ receiver_address: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_owner" htmlFor="owner_name">
                Enter Owner Name
              </label>
              <input
                type="text"
                className="form-control"
                id="owner_name"
                aria-describedby="emailHelp"
                placeholder="Enter Engine Type"
                maxLength="20"
                required
                onChange={e => {
                  this.setState({ owner_name: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_vin_number" htmlFor="vin_number">
                Enter Vin Number
              </label>
              <input
                type="number"
                className="form-control"
                id="vin_number"
                aria-describedby="emailHelp"
                placeholder="Enter Vin Number"
                maxLength="10"
                required
                onChange={e => {
                  this.setState({ vin_number: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_city" htmlFor="city">
                Enter City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                aria-describedby="emailHelp"
                placeholder="Enter City"
                maxLength="15"
                required
                onChange={e => {
                  this.setState({ city: e.target.value });
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
