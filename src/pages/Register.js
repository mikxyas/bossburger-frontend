import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { Paper, Button,Container,TextField } from '@material-ui/core';
import { connect } from 'react-redux'
import {register} from '../actions/auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            emailError:false,
            password:'',
            // password2:'',
            passwordError:false,
            phone_number:'',
            phone_numberError:false,
        }
        this.handleChange = this.handleChange.bind(this)
    }
    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(e.target.value)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.register(this.state)
        console.log(this.state)
    }
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
          }
        return (
            <Container className='svg-background' style={{display:'flex',alignItems:'center',flexDirection:'column',height:'calc(100vh - 64px)'}}>
                <Paper elevation={1} square style={{padding:'1.5em', marginTop:'2em', width:'fit-content'}}>
                                <form  onSubmit={this.handleSubmit}>
                                    <TextField style={{marginBottom:'.4em'}} 
                                    type='email' 
                                    error={this.state.emailError}
                                    label="Email"
                                    onChange={this.handleChange}
                                    name='email'
                                    value={this.state.email} 
                                    />
                                    <br/>
                                    <TextField style={{marginBottom:'.4em'}} 
                                    label="Name"
                                    value={this.state.name} 
                                    name='name'
                                    onChange={this.handleChange}
                                    />
                                    <br/>
                                    <TextField style={{marginBottom:'.4em'}} label="Password"
                                     value={this.state.password} 
                                     error={this.state.passwordError}
                                     helperText='Use at least 8 characters'
                                     name='password'
                                     type='password'
                                     onChange={this.handleChange}
                                    />
                                    {/* <br/> */}
                                    {/* <TextField style={{marginBottom:'.4em'}} id="standard-basic" label="Repeat Password" 
                                     value={this.state.password2} 
                                     onChange={this.handleChange}
                                     name='password2'
                                     type='password'
                                    //  onBlur={handleBlur}
                                    /> */}
                                    <br/>
                                    <TextField style={{marginBottom:'2em'}} 
                                    label="Phone number"
                                    error={this.state.phone_numberError}
                                    value={this.state.phone_number} 
                                    helperText='10 digit Ethiopian phone number'
                                    name='phone_number'
                                    onChange={this.handleChange}
                                    />
                                    <br/>
                                    <Button type="submit"  fullWidth variant='contained' color='secondary'>Register</Button>
                                </form>
                    </Paper>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
export default connect(mapStateToProps, { register })(Register);

