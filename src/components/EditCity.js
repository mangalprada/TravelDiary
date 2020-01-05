import React, { Component } from 'react';
import axios from 'axios';

export default class EditCity extends Component {
  constructor(props) {
    super(props);

    this.onChangeCityname = this.onChangeCityname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cityname: ''
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/city/${this.props.location.cityid}`)
      .then(response => {
        this.setState({ cityname: response.data.cityname });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeCityname(e) {
    this.setState({
      cityname: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const city = {
      cityname: this.state.cityname
    };

    axios
      .patch(
        `http://localhost:5000/editcity/${this.props.location.cityid}`,
        city
      )
      .then(res => console.log(res.data));

    this.setState({
      cityname: ''
    });

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Save</h3>
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
            <input
              type="submit"
              value="Create City"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
