import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  toolBar: {
    width:'100%',
    color:'#1f1f1f',
    backgroundColor:'white',

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  login: {
    marginLeft:'auto',
    borderRadius:'20px'
  },
  appbar: {
    backgroundColor:'rbga(0,0,0,0.8)',
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar id='toolbar' className={classes.toolBar}>
          <Link to='/'>
            <img className='brand-logo' width='100' height='65' src='./logo.jpg'/>
          </Link>
          <Link to='/order'>
            <Button className='cont-nav'>Order</Button>
          </Link>
          <Link to='/offers'>
            <Button className='cont-nav'>Offers</Button>
          </Link>
          <Link to='/events'>
            <Button className='cont-nav'>Events</Button>
          </Link>
          <Link to='/giveaways'>
            <Button className='cont-nav'>giveaways</Button>
          </Link>
          <Button variant='contained' color='primary' className={classes.login}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}