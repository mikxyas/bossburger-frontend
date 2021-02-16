import React from 'react';
import Navbar from './components/navbar';
import BottomNav from './components/BottomNav';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import Footer from './components/Footer';
import {UpdateDevice} from './actions/ui'
import LoadPage from './components/LoadPage'

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f3e43',
    },
    secondary: {
      main: '#F25C05',
    },
  },
});
class App extends React.Component{
  componentDidMount(){
    store.dispatch(loadUser())
    // store.dispatch(showSuccessSnackbar("Success!"));
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      store.dispatch(UpdateDevice(true))
    }else{
      // false for not mobile device
      store.dispatch(UpdateDevice(false))
      
    }
  }
  render(){ 

  return (
    <body>
    <Provider store={store}>
      
      <ThemeProvider theme={outerTheme}>
        <Navbar/>
        <div className='bottom-nav'>
          <BottomNav/>
        </div>
        <LoadPage/>
        <Footer/>
        </ThemeProvider>
      
    </Provider>
    </body>
  );
}
}

export default App;
