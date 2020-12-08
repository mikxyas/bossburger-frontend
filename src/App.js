import React from 'react';
import Navbar from './components/navbar';
import BottomNav from './components/BottomNav';
import Main from './routes'
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import {loadLoc} from './actions/locations'
import Footer from './components/Footer';

class App extends React.Component{
  
  componentDidMount(){
    store.dispatch(loadUser())
    store.dispatch(loadLoc())
    // store.dispatch(showSuccessSnackbar("Success!"));

  }
  render(){  
  return (
    <Provider store={store}>
      <body>
        <Navbar/>
        <div className='bottom-nav'>
          <BottomNav/>
        </div>
        <div className='main-container'>
          <Main/>
        </div>
        <Footer/>
      </body>
    </Provider>
  );
}
}

export default App;
