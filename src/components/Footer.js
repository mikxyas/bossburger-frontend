import React, { Component } from 'react'
import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook'
import InstaIcon from '@material-ui/icons/Instagram'
import OpenInNew from '@material-ui/icons/OpenInNew'
import { Typography, Button,ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import {ChangeLink} from '../actions/ui'


function Footer(props){
    const history = useHistory();
    const handleLinks = (event) => {
        // setlink(newValue)
        // console.log(event.currentTarget.value)
        props.ChangeLink(event.currentTarget.value)
        history.push(`/${event.currentTarget.value}`);
    };
        return (
            <footer>
                <ButtonGroup style={{margin:'.5em'}} variant="text" color="inherit" size='small'>
                    <Button onClick={handleLinks} value='menu'>Menu</Button>
                    <Button onClick={handleLinks} value='order'>Order</Button>
                    <Button onClick={handleLinks} value='events'>Events</Button>
                    <Button onClick={handleLinks} value='jobs'>Jobs</Button>
                    <Button onClick={handleLinks} value='services'>Services</Button>
                    <Button onClick={handleLinks} value='contact'>Contacts</Button>
                </ButtonGroup>
                <ButtonGroup  variant="text" color="inherit" size='small'>
                    <Button href='https://www.instagram.com/bossburgeraddis/' target='__blank__' startIcon={<InstaIcon/>}>Instagram</Button>
                    <Button href='https://www.facebook.com/bossburgeraddis251/' target='__blank__' startIcon={<FacebookIcon/>}>Facebook</Button>
                    <Button startIcon={<PhoneIcon/>}>091121221</Button>
                </ButtonGroup>
                <Typography align='center' style={{display:'flex', alignItems:'center'}} variant='subtitle1'>Website designed and developed by <Button href='https://lunabite.com' target='__blank__' endIcon={<OpenInNew/>} variant='text' color='inherit'>lunabite</Button></Typography>
                <Typography align='center' variant='caption'>Boss Burger inc Copyright © 2020. All rights reserved</Typography>
                
                {/* <img src='./bblogo.png' className='footer-brand'/> */}

            </footer>
        )
}

export default connect(null, {ChangeLink})(Footer)