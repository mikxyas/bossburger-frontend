import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import {logout} from '../actions/auth';
import {ChangeLink, ChangeLinkToFrom} from '../actions/ui'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CartDrawer from './CartDrawer'
import { Avatar, Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height:'fit-content'
  },
  tab: {
    // width:'100%',
    color:'white',
    marginTop:'0',
   
  },
  toolBar: {
    padding:'0em',
   margin:'0',
      
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  
  login: {
    marginLeft:'auto',
    marginRight:'.5em',
    // borderRadius:'20px',
    
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
    props.ChangeLink('')
    setlink('home')
    history.push(`/`);

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
        <div className='tab-cont'>
        <Tabs
        className={classes.tab}
        onChange={handleLinks} 
        value={props.activeLink}
        indicatorColor='none'
        textColor='secondary'
        >
          
            <img onClick={handleBrand} src='https://res.cloudinary.com/mikiyas/image/upload/v1613451672/output-onlinepngtools_2_on4agn.png' className='brand-pic'/>
          
          <Tab value='' label='Home' className='cont-nav' />
          <Tab  className='cont-nav' value='menu' label="Menu"  />
          <Tab  value='order' className='cont-nav' label="Order"  />
          <Tab  value='gallery' className='cont-nav' label="Gallery"  />
          <Tab  value='events' className='cont-nav' label="Events"  />
          {props.isAdmin
          ?
            <Divider variant='middle' style={{marginLeft:'1em', background:'rgba(0,0,0,0.6)'}}  orientation='vertical' flexItem/>
          
          :null
          }
          {props.isAdmin
          ?
            <Tab  className='boss-btn' value='boss'  label="Dashboard"  />
          
          :null
          }
          {/* <Tab  value='jobs' className='cont-nav' label="Jobs"  /> */}
          {/* <Tab  value='services' className='cont-nav' label="Services"  /> */}
          {/* <Tab  value='contact' className='cont-nav' label="Contacts"  />             */}
            {/* <Button onClick={handleChange} value='menu'  className='cont-nav'>Menu</Button>
            <Button onClick={handleChange} value='order'  className='cont-nav'>Delivery</Button>
            <Button onClick={handleChange} value='events' className='cont-nav'>Events</Button>
            <Button onClick={handleChange} value='jobs' className='cont-nav'>Jobs</Button>
            <Button onClick={handleChange} value='services' className='cont-nav'>Services</Button>
            <Button onClick={handleChange} value='contact' className='cont-nav'>Contact Us</Button> */}
          </Tabs>
        </div>
        
        
            {props.user != null
            ?
           
              <div className={classes.login}>
              <Link to='/account'>
                <Avatar aria-controls="simple-menu" aria-haspopup="true"/>
              </Link>    
              
              {/* {props.user.name} */}
            
            {/* <Menu
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
            </Menu> */}
              </div>
            :
            <div className={classes.login}>
              <Link to='/register'>
                <Button onClick={props.ChangeLinkToFrom('register', props.Clink)} variant='contained' color='secondary'  style={{borderRadius:'20px'}}>Signup</Button>
              </Link>
            </div>
            }
            {!props.isMobile
              ?
              <>
              {props.isAuthenticated
              ?<div style={{marginRight:'.5em'}}>
              <CartDrawer/>
            </div>
            :null

            }
              </>
              :null
            }
            
            
        </Toolbar>

      </AppBar>
    </div>
  );
}


const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isAuthenticated: state.auth.isAuthenticated,
  activeLink:state.ui.link,
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  cart: state.cart.cart,
  isMobile: state.ui.mobile,
  Clink: state.ui.link
});

export default connect(mapStateToProps, {logout,ChangeLinkToFrom, ChangeLink})(MenuAppBar);
