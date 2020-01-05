import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import createBrowserHistory from 'history';
import Navbar from './components/Navbar';
import AddSite from './components/AddSite';
import AddCity from './components/AddCity';
import CityList from './components/CityList';
import SiteList from './components/SiteList';
import EditCity from './components/EditCity';
import EditSite from './components/EditSite';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <div>
        <Navbar />
        <br />
        <Switch>
          <Route exact path="/" component={CityList} />
          <Route exact path="/add" component={AddCity} />
          <Route exact path="/editCity/:id" component={EditCity} />
          <Route exact path="/editsite/:id" component={EditSite} />
          <Route exact path="/sites/addsite/:id" component={AddSite} />
          <Route exact path="/sites/:id" component={SiteList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
