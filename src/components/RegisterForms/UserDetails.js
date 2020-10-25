import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import NextIcon from '@material-ui/icons/ChevronRight';

export default class UserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { values, handleChange } = this.props;
        return (
                <React.Fragment>
                    <h5 style={{textAlign:'center', color:'rgba(0,0,0,0.8)',marginBottom:'.5em'}}>Enter your information</h5>
                    <TextField
                        name='phoneNumber'
                        hintText = "Enter your phone number"
                        label="Phone number"
                        onChange={handleChange}
                        value={values.phoneNumber}
                    />
                    <br />
                    <TextField
                        name='username'
                        hintText = "Enter your username"
                        label="Username"
                        onChange={handleChange}
                        value={values.username}
                    />
                    <br />
                    <TextField
                        name='password'
                        hintText = "Enter your password"
                        label="Password"
                        onChange={handleChange}
                        value={values.password}
                    />
                    <br />
                    <Button style={{marginLeft:'auto'}} endIcon color='primary' variant='text' onClick={this.continue}>
                        Continue <NextIcon/>
                    </Button>
                </React.Fragment>
        )
    }
}
