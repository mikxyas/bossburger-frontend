import React, { Component } from 'react'
import '../style/index.css'
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import EventIcon from '@material-ui/icons/Event';
import CardGiftCardIcon from '@material-ui/icons/CardGiftcard';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import { Link } from 'react-router-dom'
import { Button,ButtonGroup, Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Input from '@material-ui/core/Input'
import MenuAppBar from './AppBar'

import MenuIcon from '@material-ui/icons/Menu';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            openSignup: false,
        }
    }
    // Order verification dialog
    handleClickOpen = () => {
        this.setState({
            open:true        
    })
      };
    handleClose = () => {
        this.setState({
            open:false
        })
      };

      //signup dialog handling
      handleSignupClickOpen = () => {
        this.setState({
            openSignup:true
        })
      };
      handleSignupClose = () => {
        this.setState({
            openSignup:false
        })
      };

    render() {
        return (
            <>
            <MenuAppBar/>
               {/* <header>
                   <div className='c-nav-cont'>
                    <ul className='content-nav'>
                        <li>
                            <Button onClick={() => this.handleClickOpen()}><span className='icon-btn'><FastfoodIcon fontSize='large' className='menu-icon'/><text>Order</text></span></Button>
                        </li>
                        <li>
                            <Link to='/offers'>
                                <Button><span className='icon-btn'><LocalOfferIcon  fontSize='large' className='menu-icon'/><text>Offers</text></span></Button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/events'>
                                <Button><span className='icon-btn'><EventIcon fontSize='large' className='menu-icon'/><text>Events</text></span></Button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/giveaways'>
                                <Button><span className='icon-btn'><CardGiftCardIcon fontSize='large' className='menu-icon'/><text>Giveaways</text></span></Button>
                            </Link>
                        </li>
                    </ul>
                   </div>
                    <Link to='/'>
                        <div className='brand-pic'>
                             <IconButton><HomeIcon/></IconButton> 
                        </div>
                    </Link>
                    <ul className='signup-nav'>
                            <li>
                                <Button startIcon variant='contained' onClick={() => this.handleSignupClickOpen()} color='primary'>
                                <PersonAddIcon/>Sign up
                                </Button>
                            </li>
                            <li>
                                <Button color='primary'>
                                    <ShoppingCartRoundedIcon/>
                                </Button>
                            </li>
                   </ul>

               </header> */}

               <div>
                <Dialog
                        fullScreen
                        TransitionComponent={Transition}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        style={{marginTop:'56px'}}
                    >
                        <AppBar style={{position:"relative", display:"flex", justifyContent:"center", alignItems:"start"}}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" >
                                    Configure your order
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Container style={{display:"flex",alignItems:"center",justifyContent:"start",padding:'1em',height:'calc(100vh - 150px)', flexDirection:'column'}}>
                            <Input style={{marginTop:'2em'}}  placeholder='Name'/>
                            <Input style={{marginTop:'2em'}} type='number' placeholder='Phone number'/>
                            <Input style={{marginTop:'2em'}} placeholder='Describe your location'/>
                            <Button style={{marginTop:"1em"}} variant='contained' color='secondary' >Get my location <GpsFixedIcon/></Button>
                            {/* <div style={{display:"flex",alignItems:"center",justifyContent:"center", marginTop:'1em'}}> */}
                                {/* <ButtonGroup style={{marginTop:'2em'}}> */}
                                    <Link to='/order'>
                                        <Button style={{marginTop:'1em'}} onClick={this.handleClose} color='primary' variant='contained'>Order Pickup</Button>
                                        <Button style={{marginLeft:'1em', marginTop:'1em'}} onClick={this.handleClose} color='primary' variant='contained'>Order Delivery</Button>
                                    </Link>
                                {/* </ButtonGroup> */}
                            {/* </div> */}
                        </Container>
                    </Dialog>

                    {/* signup dialog */}

                    <Dialog
                        fullScreen
                        TransitionComponent={Transition}
                        open={this.state.openSignup}
                        onClose={this.handleSignupClose}
                        aria-labelledby="responsive-dialog-title"
                        style={{marginTop:'56px'}}
                    >
                        <AppBar style={{position:"relative", display:"flex", justifyContent:"center", alignItems:"start"}}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={this.handleSignupClose} aria-label="close">
                                <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" >
                                    Signup
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Container style={{display:"flex",alignItems:"center",justifyContent:"start",padding:'1em',height:'calc(100vh - 150px)', flexDirection:'column'}}>
                            <Input aria-label='Name' style={{marginTop:'2em'}}  placeholder='Name'/>
                            <Input aria-label='Email' style={{marginTop:'2em'}}  placeholder='Email' type='email'/>
                            <Input style={{marginTop:'2em'}} type='number' placeholder='Phone number'/>
                            <Input style={{marginTop:'2em'}} placeholder='Describe the location you would order from'/>
                            <Button style={{marginTop:"1em"}} variant='contained' color='secondary' >Get my location <GpsFixedIcon/></Button>
                            <Button style={{marginTop:'1em'}} onClick={this.handleClose} color='primary' variant='contained'>Sign up</Button>
                                    
                        </Container>
                    </Dialog>
                </div>
</>
        )
        
    }

    
}
