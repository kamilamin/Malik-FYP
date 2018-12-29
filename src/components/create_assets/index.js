import React, { Component } from "react";
import "./style.css";

class AssetsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vin_number: "",
      car_color: "",
      engine_type: "",
      city: "",
      date: ""
    };
  }
  // onCreate = (ev) => {
  //   ev && ev.preventDefault();
  //   const { vin_number, car_color, engine_type, city, date } = this.state
  // }
  render() {
    return (
      <div className="header">
        <h4>Automobile Tracing Management System on Blockchain</h4>
        <h5 className="form_header">Assets Registration Form</h5>
        <div>
          <form className="reg_form">
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
                onChange={vin_number => {
                  this.setState({ vin_number });
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
                onChange={car_color => {
                  this.setState({ car_color });
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
                onChange={engine_type => {
                  this.setState({ engine_type })
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
                onChange={city => {
                  this.setState({city})
                }}
              />
            </div>
            <div className="form-group">
              <label className="field_label_date" for="date">
                Date of Registration
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                aria-describedby="emailHelp"
                placeholder="Enter City"
                maxLength="10"
                readOnly
                onChange={date => {
                  this.setState({date})
                }}
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
