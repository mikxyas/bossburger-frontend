import React, { Component } from 'react'
import '../style/index.css'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import HomeIcon from '@material-ui/icons/Home';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import EventIcon from '@material-ui/icons/Event';
import MonitizationOnIcon from '@material-ui/icons/MonetizationOn';
import CardGiftCardIcon from '@material-ui/icons/CardGiftcard';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'

export default class Navbar extends Component {
    render() {
        return (
               <header>
                   <div className='c-nav-cont'>
                    <ul className='content-nav'>
                        <li>
                            <Link to='/order'>
                                <Button><span className='icon-btn'><MotorcycleIcon fontSize='large' className='menu-icon'/><text>Order</text></span></Button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/offers'>
                                <Button><span className='icon-btn'><MonitizationOnIcon  fontSize='large' className='menu-icon'/><text>Offers</text></span></Button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/events'>
                                <Button><span className='icon-btn'><EventIcon fontSize='large' className='menu-icon'/><text>Events</text></span></Button>
                            </Link>
                        </li>
                        <li>
                        <Button><span className='icon-btn'><CardGiftCardIcon fontSize='large' className='menu-icon'/><text>Giveaways</text></span></Button>
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
                                <Button startIcon variant='contained' color='primary'>
                                <PersonAddIcon/>Sign up
                                </Button>
                            </li>
                            <li>
                                <Button color='primary'>
                                    <ShoppingCartRoundedIcon/>
                                </Button>
                            </li>
                   </ul>
               </header>

        )
        
    }

    
}
