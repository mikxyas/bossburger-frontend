import React from 'react';
import Navbar from './components/navbar';
import BottomNav from './components/BottomNav';
import Main from './routes'

import {Provider} from 'react-redux';
import store from './store';

function App() {
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
      </body>
    </Provider>
  );
}

export default App;
