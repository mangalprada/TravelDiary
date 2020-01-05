import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Travel Diary
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item"></li>
          </ul>
        </div>
      </nav>
    );
  }
}
