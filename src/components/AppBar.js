import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import RegisterDialog from '../components/RegisterDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background:'yellow',
    height:'fit-content'
  },
  toolBar: {
    width:'100%',
    color:'#1f1f1f',
    marginTop:'0',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  login: {
    marginLeft:'auto',
    borderRadius:'20px'
  },
  appbar: {
    background:'rgba(255,255,255,0.8)',
    padding:'0em',
    height:'fit-content',
    border:'none',
    backdropFilter: 'saturate(180%) blur(20px)',
    boxShadow:'none'
  },
  brandlogo: {
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'-.5em',
    width:'100px',
    height:'50px',
    cursor:'pointer'
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [link, setlink] = React.useState('');
  // const [value, setValue] = React.useState('');
  const history = useHistory();
  const handleChange = (e) => {
    history.push(`/${e.currentTarget.value}`);
    setlink(e.currentTarget.value)
    console.log(link)
  };
  const handleBrand = (e) => {
    history.push(`/`);
    setlink('home')
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}  position="fixed">
        <Toolbar id='toolbar'  className={classes.toolBar}>
            <Button onClick={handleChange} value='order'  className='cont-nav'>Order</Button>
            <Button onClick={handleChange} value='offers' className='cont-nav'>Offers</Button>
            <Button onClick={handleChange} value='events' className='cont-nav'>Events</Button>
            <Button onClick={handleChange} value='giveaways' className='cont-nav'>giveaways</Button>
            <img onClick={handleBrand} value='home' id='brand-pic' className={classes.brandlogo} src='./bblogo.png'/>
            <div className={classes.login}>
              <RegisterDialog/>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
