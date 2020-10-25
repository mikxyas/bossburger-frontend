import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import GpsIcon from '@material-ui/icons/GpsFixed';
import NextIcon from '@material-ui/icons/ChevronRight';
import PrevIcon from '@material-ui/icons/ChevronLeft';
import { connect } from 'react-redux';
import { SendInfo } from '../../actions/UserInfo';
import Geolocation from '../Geolocated';

class UserAddress extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    prev = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    handleSendInfo = () => {
        // dispatches actions to send info
        this.props.SendInfo(this.props.values)
        this.props.nextStep()
    }

    render() {
        const { values, handleChange } = this.props;
        return (
                <React.Fragment>
                    <h5 style={{textAlign:'center', color:'rgba(0,0,0,0.8)',marginBottom:'.5em'}}>Set your default address</h5>
                    <TextField
                        variant='standard'
                        name='defaultAddress'
                        label="Describe your location"
                        onChange={handleChange}
                        value={values.defaultAddress}
                    />
                    <br />
                    
                    <Geolocation values={this.props.values} handleChange={handleChange}/>

                    <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Button startIcon variant='text' color='secondary'  onClick={this.prev}>
                        <PrevIcon/> Back
                    </Button>
                    <Button endIcon variant='text' color='primary'  onClick={this.handleSendInfo}>
                        Continue <NextIcon/>
                    </Button>
                    </div>
                </React.Fragment>
        )
    }
}

export default connect(
    null,
    {SendInfo}
)(UserAddress)