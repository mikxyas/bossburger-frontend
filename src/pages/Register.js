import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm.js'

export default class Register extends Component {
    render() {
        return (
            <div style={{display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>
            <RegisterForm/>
            </div>
        )
    }
}
