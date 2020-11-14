import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage'
import Events from './pages/Events'
import Menu from './pages/Menu'
import About from './pages/About'
import Locations from './pages/Locations'
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard'
import Offers from './pages/Offers'
import Giveaway from './pages/Giveaway'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Boss from './pages/Boss';

const Main = () => {
    return(
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/events' component={Events}></Route>
      <Route exact path='/order' component={Menu}></Route>
      <Route exact path='/offers' component={Offers}></Route>
      <Route exact path='/giveaways' component={Giveaway}></Route>
      <Route exact path='/contact' component={Contact}></Route>
      <Route exact path='/about' component={About}></Route>
      <Route exact path='/locations' component={Locations}></Route>
      <Route exact path='/dashboard' component={Dashboard}></Route>
      <Route exact path='/register' component={Register}></Route>
      <Route exact path='/checkout' component={Checkout}></Route>
      <Route exact path='/orders' component={Orders}></Route>
      <Route exact path='/boss' component={Boss}></Route>
    </Switch>
    )  
}

export default Main
