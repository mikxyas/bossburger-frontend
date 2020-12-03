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
import {logout} from '../actions/auth';
import {ChangeLink} from '../actions/ui'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer'
import CartDrawer from './CartDrawer'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height:'fit-content'
  },
  tab: {
    // width:'100%',
    color:'#111111',
    marginTop:'0',
    display:"flex", 
    alignItems:'center',
  },
  toolBar: {
    padding:'0em',
   margin:'0'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  
  login: {
    marginLeft:'auto',
    marginRight:'.5em',
    // borderRadius:'20px',
    width:'fit-content',
    alignItems:'center'
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
  const handleLinks = (event, newValue) => {
    setlink(newValue)
    props.ChangeLink(newValue)
    history.push(`/${newValue}`);
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
      <AppBar elevation={2} className='appbar-nav'  position="fixed">
        <Toolbar id='toolbar' className={classes.toolBar}>
        
        <Tabs
        className={classes.tab}
        onChange={handleLinks} 
        value={props.activeLink}
        indicatorColor='white'
        >
          
          <Tab value='' label={<img  id='brand-pic' className={classes.brandlogo} src='./bblogo.png'/>}  />
          <Tab  className='cont-nav' value='menu' label="Menu"  />
          <Tab  value='order' className='cont-nav' label="Order"  />
          <Tab  value='events' className='cont-nav' label="Events"  />
          <Tab  value='jobs' className='cont-nav' label="Jobs"  />
          <Tab  value='services' className='cont-nav' label="Services"  />
          <Tab  value='contact' className='cont-nav' label="Contacts"  />            
            {/* <Button onClick={handleChange} value='menu'  className='cont-nav'>Menu</Button>
            <Button onClick={handleChange} value='order'  className='cont-nav'>Delivery</Button>
            <Button onClick={handleChange} value='events' className='cont-nav'>Events</Button>
            <Button onClick={handleChange} value='jobs' className='cont-nav'>Jobs</Button>
            <Button onClick={handleChange} value='services' className='cont-nav'>Services</Button>
            <Button onClick={handleChange} value='contact' className='cont-nav'>Contact Us</Button> */}
          </Tabs>
        
            {props.user != null
            ?
           
              <div className={classes.login}>
                      
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
            :
            
            <div className={classes.login}>
              <SigninDialog/>
            </div>
            }
            <div style={{marginRight:'.5em'}}>
              <CartDrawer/>
            </div>
        </Toolbar>

      </AppBar>
    </div>
  );
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  activeLink:state.ui.link,
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  cart: state.cart.cart
});

export default connect(mapStateToProps, {logout, ChangeLink})(MenuAppBar);
