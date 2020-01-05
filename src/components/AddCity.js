import React, { Component } from 'react';
import axios from 'axios';

export default class AddCity extends Component {
  constructor(props) {
    super(props);

    this.onChangeCityname = this.onChangeCityname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cityname: ''
    };
  }

  onChangeCityname(e) {
    this.setState({
      cityname: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const city = {
      cityname: this.state.cityname,
      sites: []
    };

    axios
      .post('http://localhost:5000/add', city)
      .then(res => console.log(res.data));

    this.setState({
      cityname: ''
    });

    window.location = '/';
  }

  render() {
    return (
      <div style={{ marginTop: ' 40px ' }}>
        <form onSubmit={this.onSubmit} className="col-md-6">
          <div className="form-group">
            <label>City name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.cityname}
              onChange={this.onChangeCityname}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add City" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
