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
        <div style={{marginTop:"56px"}}>
          <Main/>
        </div>
      </body>
    </Provider>
  );
}

export default App;
