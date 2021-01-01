import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage'
import Events from './pages/Events'
import Menu from './pages/Menu'
import Locations from './pages/Locations'
import New from './pages/new'
import Contact from './pages/Contact';
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Boss from './pages/Boss';
import JobOffers from './pages/JobOffers';
import MenuFood from './pages/MenuFood';
import Services from './pages/Services'

const Main = () => {
    return(
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/events' component={Events}></Route>
      <Route exact path='/order' component={Menu}></Route>
      <Route exact path='/contact' component={Contact}></Route>
      <Route exact path='/locations' component={Locations}></Route>
      <Route exact path='/new/locations' component={New}></Route>
      <Route exact path='/register' component={Register}></Route>
      <Route exact path='/checkout' component={Checkout}></Route>
      <Route exact path='/orders' component={Orders}></Route>
      <Route exact path='/boss' component={Boss}></Route>
      <Route exact path='/jobs' component={JobOffers}></Route>
      <Route exact path='/menu' component={MenuFood}></Route>
      <Route exact path='/services' component={Services}></Route>
    </Switch>
    )  
}

export default Main
