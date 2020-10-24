import React, { Component } from 'react';
import UserDetails from './RegisterForms/UserDetails';
import UserAddress from './RegisterForms/UserAddress';
import UserVerf from './RegisterForms/UserVerf';

export default class RegisterForm extends Component {
        state = {
            step: 1,
            phoneNumber:'',
            username:'',
            password:'',
            defaultAddress:'',
            verf_code:'',
        }
       
   
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    handleChange =  e => {
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.name)
    }
    render() {
        const { step } = this.state;
        const {password, verf_code, username, phoneNumber, defaultAddress} = this.state;
        const values = { password, verf_code, username, phoneNumber, defaultAddress} 
        switch(step) {
            case 1:
                return(
                    <UserDetails nextStep={this.nextStep} handleChange={this.handleChange} values={values}/>
                )
            case 2:
                return(
                    <UserAddress nextStep={this.nextStep} prevStep={this.prevStep} handleChange={this.handleChange} values={values}/>
                )
            case 3:
                return(
                    <UserVerf nextStep={this.nextStep} prevStep={this.prevStep} handleChange={this.handleChange} values={values}/>
                )
        }
    }
}
