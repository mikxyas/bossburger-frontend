import React, { Component } from 'react'
import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook'
import InstaIcon from '@material-ui/icons/Instagram'
import OpenInNew from '@material-ui/icons/OpenInNew'
import { Typography, Button,ButtonGroup,Divider } from '@material-ui/core';
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
                    <Button onClick={handleLinks} value='jobs'>Jobs</Button>
                    <Button onClick={handleLinks} value='services'>Services</Button>
                    <Button onClick={handleLinks} value='contact'>Contacts</Button>
                </ButtonGroup>
                <ButtonGroup  variant="text" color="inherit" size='small'>
                    <Button href='https://www.instagram.com/bossburgeraddis/' target='__blank__' startIcon={<InstaIcon/>}>Instagram</Button>
                    <Button href='https://www.facebook.com/bossburgeraddis251/' target='__blank__' startIcon={<FacebookIcon/>}>Facebook</Button>
                    <Button startIcon={<PhoneIcon/>}>0902424848</Button>
                </ButtonGroup>
                {/* <Divider style={{width:'30%', background:'rgba(255,255,255,0.5)',margin:'.3em'}} variant='middle'/> */}
                <Typography align='center' variant='subtitle1'>Website developed by <br/><Button className='umami--click--lunabite-button' href='https://t.me/mikiyas_tg' target='__blank__' endIcon={<OpenInNew/>} variant='contained' color='secondary' style={{zIndex:'999', marginBottom:'.3em',opacity:'.9'}}>lunabite</Button></Typography>
                {/* <Divider style={{width:'30%', background:'rgba(255,255,255,0.5)',margin:'.3em'}} variant='middle'/> */}
                
                <Typography align='center' variant='caption'>Boss Burger inc Copyright © {new Date().getFullYear()}. All rights reserved</Typography>
                
                {/* <img src='./bblogo.png' className='footer-brand'/> */}

            </footer>
        )
}

export default connect(null, {ChangeLink})(Footer)