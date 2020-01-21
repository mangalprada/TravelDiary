import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

const Site = props => (
  <div
    className="card"
    style={{
      width: '35%',
      height: '30%',
      display: 'table',
      margin: '10px auto'
    }}
  >
    <img
      src={`http://localhost:5000/${props.site.imageData}`}
      className="card-img-top"
      alt="..."
    />
    <div className="card-body">
      <h5 className="card-title">{props.site.sitename}</h5>
      <p className="card-text">{props.site.description}</p>
      <a
        href="#"
        onClick={() => {
          props.deleteSite(props.site._id);
        }}
      >
        delete
      </a>
      {'  '}
      <Link
        to={{
          pathname: `/editsite/${props.site._id}`,
          cityid: props.cityid,
          siteid: props.site._id
        }}
      >
        Edit
      </Link>
    </div>
  </div>
);

export default class SiteList extends Component {
  constructor(props) {
    super(props);

    this.deleteSite = this.deleteSite.bind(this);

    this.state = { sites: [] };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/sites/${this.props.location.cityid}`)
      .then(response => {
        this.setState({ sites: response.data.sites });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteSite(id) {
    axios
      .delete(
        `http://localhost:5000/delete/${this.props.location.cityid}/${id}`
      )
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      sites: this.state.sites.filter(el => el._id !== id)
    });
  }

  render() {
    return (
      <div style={{ marginTop: '40px' }}>
        <h1> Tourist Sites Visited :</h1>

        {_.chunk(this.state.sites, 2).map((currentsite, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {currentsite.map((col, colIndex) => {
                return (
                  <Site
                    site={col}
                    deleteSite={this.deleteSite}
                    cityid={this.props.location.cityid}
                    key={currentsite._id}
                  />
                );
              })}
            </div>
          );
        })}
        <div style={{ position: 'fixed', top: '70px', right: '60px' }}>
          <Link
            className="btn btn-primary nav-link"
            to={{
              pathname: `addsite/${this.props.location.cityid}`,
              cityid: this.props.location.cityid
            }}
          >
            Add Site +
          </Link>
        </div>
      </div>
    );
  }
}
