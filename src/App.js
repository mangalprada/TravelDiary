import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddSite from './components/AddSite';
import AddCity from './components/AddCity';
import CityList from './components/CityList';
import SiteList from './components/SiteList';
import EditCity from './components/EditCity';
import EditSite from './components/EditSite';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <br />

        <Route exact path="/" component={CityList} />
        <Route path="/add" component={AddCity} />
        <Route path="/editCity/:id" component={EditCity} />
        <Route path="/editsite/:id" component={EditSite} />
        <Route path="/addsite/:id" component={AddSite} />
        <Route path="/sites/:id" component={SiteList} />
      </div>
    </BrowserRouter>
  );
}

export default App;
