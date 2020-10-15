import '../style/index.css'
import React, { Component } from 'react'
import {ButtonGroup, Button} from '@material-ui/core'
import {makeStyles, useTheme} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius:'69px'
    }
})) 

export default function Section () {
    const classes = useStyles();
    const theme = useTheme();
        return (
            <section>
                <h2>You've had the rest, come try the best</h2> 
                <div className='btn-group' style={{justifyContent:'flex-start'}}>
                    {/* <ButtonGroup> */}
                        {/* make a state for when mobile is detected to make the btn group fluid */}
                        <Button className={classes.root} variant='contained' color='primary'>Order Pickup</Button>
                        <Button className={classes.root} variant='contained' color='secondary'>Order Delivery</Button>
                    {/* </ButtonGroup> */}
                </div>
            </section>
        )
    }
