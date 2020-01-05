import React, { Component } from 'react';
import axios from 'axios';

export default class EditSite extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSitename = this.onChangeSitename.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      sitename: '',
      description: '',
      cityid: props.location.cityid,
      selectedfile: null,
      showImage: null
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/editsite/${this.props.location.cityid}/${this.props.location.siteid}`
      )
      .then(response => {
        this.setState({
          sitename: response.data.sitename,
          description: response.data.description,
          selectedfile: response.data.imageData,
          showImage: `http://localhost:5000/${response.data.imageData}`
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeSitename(e) {
    this.setState({
      sitename: e.target.value
    });
  }

  onChangefilename = e => {
    this.setState({
      selectedfile: e.target.files[0],
      showImage: URL.createObjectURL(e.target.files[0])
    });
  };

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }
  onSubmit(e) {
    e.preventDefault();
    let fd = new FormData();
    fd.append('imageData', this.state.selectedfile);
    fd.append('description', this.state.description);
    fd.append('sitename', this.state.sitename);
    axios
      .patch(
        `http://localhost:5000/editsite/${this.state.cityid}/${this.props.location.siteid}`,
        fd
      )
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error);
      });

    window.location = '/';
    // window.location = `/sites/${this.state.cityid}`;
  }

  render() {
    return (
      <div style={{ marginTop: '40px' }}>
        <h3>Edit Site</h3>
        <form onSubmit={this.onSubmit} className="col-md-6">
          <div className="form-group">
            <label>Change the picture here</label> {'  '}
            <input
              type="file"
              name="imageData"
              onChange={this.onChangefilename}
            />
          </div>
          <div className="form-group">
            <label>Name of place: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.sitename}
              onChange={this.onChangeSitename}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-primary" />
          </div>
        </form>
        <div
          style={{
            position: 'fixed',
            top: '20%',
            right: '10%',
            width: '300px',
            height: '300px'
          }}
        >
          <img src={this.state.showImage} class="img-fluid" alt="..." />
        </div>
      </div>
    );
  }
}
