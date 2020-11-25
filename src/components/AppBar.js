import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import SigninDialog from './SigninDialog';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import {logout} from '../actions/auth'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer'
import CartDrawer from './CartDrawer'

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
    borderRadius:'20px',
  },
  appbar: {
    zIndex:'3',
    background:'rgba(255,255,255,0.8)',
    padding:'0em',
    height:'fit-content',
    backdropFilter: 'saturate(180%) blur(20px)',
    bottomBorder:'solid 1px rgba(0,0,0,0.14)',
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

function MenuAppBar(props) {
  const classes = useStyles();
  const [link, setlink] = React.useState('');
  const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState('');
  const history = useHistory();
  const handleChange = (e) => {
    history.push(`/${e.currentTarget.value}`);
    setlink(e.currentTarget.value)
    // console.log(link)
  };
  const handleBrand = (e) => {
    history.push(`/`);
    setlink('home')
  };
  const handleClick = (e) => {
    setOpen(e.currentTarget)
  }
  const handleClose = () => {
    setOpen(null)
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}  position="fixed">
        <Toolbar id='toolbar'  className={classes.toolBar}>
            <Button onClick={handleChange} value='menu'  className='cont-nav'>Menu</Button>
            <Button onClick={handleChange} value='order'  className='cont-nav'>Delivery</Button>
            <Button onClick={handleChange} value='events' className='cont-nav'>Events</Button>
            <Button onClick={handleChange} value='jobs' className='cont-nav'>Jobs</Button>
            <Button onClick={handleChange} value='services' className='cont-nav'>Services</Button>
            <Button onClick={handleChange} value='contact' className='cont-nav'>Contact Us</Button>
            <img onClick={handleBrand} value='home' id='brand-pic' className={classes.brandlogo} src='./bblogo.png'/>
            
            {props.user != null
            ?
           
              <div className={classes.login}>
              <div style={{marginRight:'.7em'}}>           
            <Button variant='outlined' startIcon={<AccountCircleIcon/>} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              
              {props.user.name}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={open}
              keepMounted
              open={Boolean(open)}
              onClose={handleClose}
            >
              <Link to='/orders'>
                <MenuItem onClick={handleClose}>Orders</MenuItem>
              </Link>
              <Link to='/locations'>
                <MenuItem onClick={handleClose}>Locations</MenuItem>
              </Link>
              <MenuItem onClick={() => props.logout()}>Logout</MenuItem>
            </Menu>
              </div>
            </div>
            :
            
            <div style={{marginRight:'.7em'}} className={classes.login}>
              <SigninDialog/>
            </div>
            }

              <CartDrawer/>

        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  cart: state.cart.cart
});

export default connect(mapStateToProps, {logout})(MenuAppBar);
