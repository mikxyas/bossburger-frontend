import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { Paper,Box, Button,Container,TextField, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux'
import {register} from '../actions/auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

function Register(props) {
    const formik = useFormik({
        initialValues: {
          name: "",
          email: "",
          password:"",
          phone_number:'',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Minimum 3 Characters")
                .max(15, 'Maximum 15 Characters')
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(7, "Minimum 7 Characters")
                .max(20, 'Maximum 20 Characters')
                .required("Required!"),

            phone_number: Yup.number()
                // .min(10, "Min correct phone number. Eg: 0902424848")
                .typeError("That doesn't look like a phone number")
                // .max(12, "Enter correct phone number. Eg: 0902424848")
                .integer("A phone number can't include a decimal point")
                .required("Required!"),

        }),
        onSubmit: values => {
            props.register(JSON.stringify(values, null, 2));  
          }
      });
      if(props.isAuthenticated){
        return (<Redirect to='/signin'/>)
    }
        return (
            <Container style={{display:'flex',paddingTop:'3em', alignItems:'center', flexDirection:'column'}}>
                <Typography variant='h4'>
                    <Box className='form-header' fontWeight={500}>Signup to get Started</Box>
                </Typography>
                <Divider color='primary' style={{width:'50%', margin:'1em'}}/>
                <Typography variant='caption'>
                    Already have an account?
                </Typography>
                <Link to='/signin'>
                    <Button color='secondary'>SignIn</Button>
                </Link>
                <Divider color='primary' style={{width:'50%', margin:'1em'}}/>

               <div className='form-cont'>
                   <TextField id='name' error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name ?formik.errors.name : ''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur} className='normal-form' type='text' name='name' value={formik.values.name} variant='outlined' label='Name'/>
                   <TextField id='email' error={formik.touched.email && Boolean(formik.errors.email)}  helperText={formik.touched.email ?formik.errors.email :''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur}  className='normal-form' type='email' value={formik.values.email} variant='outlined' name='email' label='Email'/>
                   <TextField id='password' error={formik.touched.password && Boolean(formik.errors.password)}  helperText={formik.touched.password ?formik.errors.password :''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur}  className='normal-form' type='password' value={formik.values.password} variant='outlined' name='password' label='Password'/>
                   <TextField id='phone_number' error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}  helperText={formik.touched.phone_number ?formik.errors.phone_number :''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur}  className='normal-form' type='number' value={formik.values.phone_number} variant='outlined' name='phone_number' label='Phone number'/>
               </div>
                <Button onClick={formik.handleSubmit} disabled={!formik.dirty || !formik.isValid} color='secondary' variant='contained' type='submit' style={{borderRadius:'20px', width:'200px'}} size='large'>SignUp</Button>
                
            </Container>
        )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    prevLink: state.ui.prevLink
});
export default connect(mapStateToProps, { register })(Register);

// <Paper variant='outlined' square style={{padding:'1em', width:'fit-content'}}>                                
// <form  onSubmit={this.handleSubmit}>
//     <TextField style={{marginBottom:'.4em', width:'190px'}} 
//     type='email' 
//     error={this.state.emailError}
//     label="Email"
//     onChange={this.handleChange}
//     name='email'
//     value={this.state.email} 
//     />
//     <br/>
//     <TextField style={{marginBottom:'.4em', width:'190px'}} 
//     label="Name"
//     value={this.state.name} 
//     name='name'
//     onChange={this.handleChange}
//     />
//     <br/>
//     <TextField style={{marginBottom:'.4em', width:'190px'}} label="Password"
//      value={this.state.password} 
//      error={this.state.passwordError}
//      helperText='Use at least 8 characters'
//      name='password'
//      type='password'
//      onChange={this.handleChange}
//     />
//     {/* <br/> */}
//     {/* <TextField style={{marginBottom:'.4em'}} id="standard-basic" label="Repeat Password" 
//      value={this.state.password2} 
//      onChange={this.handleChange}
//      name='password2'
//      type='password'
//     //  onBlur={handleBlur}
//     /> */}
//     <br/>
//     <TextField style={{marginBottom:'2em', width:'190px'}} 
//     label="Phone number"
//     error={this.state.phone_numberError}
//     value={this.state.phone_number} 
//     helperText='10 digit Ethiopian phone number'
//     name='phone_number'
//     onChange={this.handleChange}
//     />
//     <br/>
//     <Button type="submit" style={{borderRadius:'20px'}} size='small' fullWidth variant='contained' color='secondary'>Register</Button>
// </form>
// </Paper>