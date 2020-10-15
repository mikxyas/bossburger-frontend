import React from 'react';
import Navbar from './components/navbar';
import Main from './routes'

import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <body>
        <Navbar/>
        <div className='main-container'>
          <Main/>
        </div>
      </body>
    </Provider>
  );
}

export default App;
