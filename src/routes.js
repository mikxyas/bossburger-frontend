import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage'
import Events from './pages/Events'
import Menu from './pages/Menu'
import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard'
import Offers from './pages/Offers'
import Giveaway from './pages/Giveaway'
import RegisterForm from './components/RegisterForm';

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
      <Route exact path='/cart' component={Cart}></Route>
      <Route exact path='/dashboard' component={Dashboard}></Route>
      <Route exact path='/register' component={RegisterForm}></Route>
    </Switch>
    )  
}

export default Main
