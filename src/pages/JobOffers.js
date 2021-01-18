import { Paper,Typography,Box,Divider, ListItemIcon,ListItemText, ListItem, Button } from '@material-ui/core'
import React, { Component } from 'react'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'

export default class JobOffers extends Component {
    render() {
        return (
            <>
            <section className='job-section'>
                {/* <img className='delivery-svg' src="./job-hero.svg" alt="Burger"/> */}

                <Typography className='job-section-title' align='center' variant='h2'>
                    Job Offering
                </Typography>
                <Typography align='center' variant='h5'>
                    <Box className='job-section-desc'>If you want to get a job at Boss Burger we will be happy to have you as long as you can satisfy our criteria. Use our email and submit your CV, and a short essay on why you would like to work at Boss Burger. We can't wait to have you on our team!</Box>
                </Typography>
                <Typography style={{marginTop:'.5em', fontSize:'18px'}} align='center' variant='h6'>
                    <Box color='#111'>- Bossburgeraddis@gmail.com -</Box>
                </Typography>
            </section>
            </>
        )
    }
}
