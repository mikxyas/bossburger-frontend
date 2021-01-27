import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { Paper,Box, Button,Container,TextField, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux'
import {register} from '../actions/auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

function AccountInfo(props) {
    const formik = useFormik({
        initialValues: {
          name: props.user.name,
          email: props.user.email,
          phone_no:props.user.phone_number,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Minimum 3 Characters")
                .max(15, 'Maximum 15 Characters')
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            phone_no: Yup.number()
                // .min(10, "Min correct phone number. Eg: 0902424848")
                .typeError("That doesn't look like a phone number")
                // .max(12, "Enter correct phone number. Eg: 0902424848")
                .integer("A phone number can't include a decimal point")
                .required("Required!"),

        })
      });
        return (
            <Container style={{display:'flex',paddingTop:'3em', alignItems:'center', flexDirection:'column'}}>
                <Typography variant='h4'>
                    <Box className='form-header' fontWeight={500}>Update your account</Box>
                </Typography>
              
                <Divider color='primary' style={{width:'50%', margin:'1em'}}/>

               <div className='form-cont'>
                   <TextField id='name' error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name ?formik.errors.name : ''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur} className='normal-form' type='text' name='name' value={formik.values.name} variant='outlined' label='Name'/>
                   <TextField id='email' error={formik.touched.email && Boolean(formik.errors.email)}  helperText={formik.touched.email ?formik.errors.email :''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur}  className='normal-form' type='email' value={formik.values.email} variant='outlined' name='email' label='Email'/>
                   <TextField id='phone_no' error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}  helperText={formik.touched.phone_no ?formik.errors.phone_no :''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur}  className='normal-form' type='number' value={formik.values.phone_no} variant='outlined' name='phone_no' label='Phone number'/>
               </div>
                <Button  color='secondary' variant='contained' style={{borderRadius:'20px', width:'200px'}} size='large'>Update Profile</Button>
                
            </Container>
        )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });
export default connect(mapStateToProps, { register })(AccountInfo);

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