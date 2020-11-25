import { Typography,Box } from '@material-ui/core'
import React, { Component } from 'react'

export default class Services extends Component {
    render() {
        return (
            <>
            <div style={{height:'20vh'}} className='event-header' >
                <Typography variant='h2' align='center'>
                    <Box color='white'>Services</Box>
                </Typography>
                {/* <Typography variant='h4'><u>Delivery</u></Typography> */}
            </div>
            <div style={{paddingRight:'2em', paddingLeft:'2em'}}>
            <Typography style={{marginLeft:'0em', marginTop:'.5em'}} variant='h4'>Delivery</Typography>
            <Typography style={{marginLeft:'0em',}}> If you, our customer, orders a delivery using our ordering system, we will garentee the delivery of that order to the desired location(with in a 15km range) of our customer. If their are to be any mistakes or wrong doing on our side and if an official from bossburger doesn't contact you, you can use one of the contacts listed on out contacts page.</Typography>
            <Typography style={{marginLeft:'0em', marginTop:'.5em'}} variant='h4'>Pick Up</Typography>
            <Typography style={{marginLeft:'0em',}}>You can order a pick up here from our website so that we can prepare your order and you can come and pick it up in person. To do that you will have to set the delivery type to "Pick up" when you finally check out with your order</Typography>
            <Typography style={{marginLeft:'0em', marginTop:'.5em'}} variant='h4'>Drive Thru</Typography>
            <Typography style={{marginLeft:'0em',}}>You can also enjoy our delicious burger from the comfort of your own car by parking your car in tha available space and request for your burger to be delivered their. </Typography>

            </div>

            </>
        )
    }
}
