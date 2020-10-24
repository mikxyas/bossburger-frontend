import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ButtonGroup } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import GpsIcon from '@material-ui/icons/GpsFixed';
import NextIcon from '@material-ui/icons/ChevronRight';
import PrevIcon from '@material-ui/icons/ChevronLeft';


export default class UserAddress extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    prev = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values, handleChange } = this.props;
        return (
                <React.Fragment>
                    <h5 style={{textAlign:'center', color:'rgba(0,0,0,0.8)',marginBottom:'.5em'}}>Set your default address</h5>
                    <TextField
                        name='defaultAddress'
                        label="Describe your location"
                        onChange={this.props.handleChange}
                        defaultvalue={values.defaultAdress}
                    />
                    <br />
                    <Fab variant="extended">
                        <GpsIcon />
                        Get my location 
                    </Fab>
                    <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Button startIcon variant='text' color='secondary'  onClick={this.prev}>
                        <PrevIcon/> Back
                    </Button>
                    <Button endIcon variant='text' color='primary'  onClick={this.continue}>
                        Continue <NextIcon/>
                    </Button>
                    </div>
                </React.Fragment>
        )
    }
}

