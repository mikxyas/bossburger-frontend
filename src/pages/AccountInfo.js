import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { Paper,Box, Button,Container,TextField, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux'
import {register, UpdateAccountInfo} from '../actions/auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

function AccountInfo(props) {
    const formik = useFormik({
        initialValues: {
          name: props.user.name,
        //   email: props.user.email,
          phone_number:props.user.phone_number,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Minimum 3 Characters")
                .max(15, 'Maximum 15 Characters')
                .required("Required!"),
            // email: Yup.string()
            //     .email("Invalid email format")
            //     .required("Required!"),
            phone_number: Yup.number()
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
                   {/* <TextField id='email' error={formik.touched.email && Boolean(formik.errors.email)}  helperText={formik.touched.email ?formik.errors.email :''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur}  className='normal-form' type='email' value={formik.values.email} variant='outlined' name='email' label='Email'/> */}
                   <TextField id='phone_number' error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}  helperText={formik.touched.phone_number ?formik.errors.phone_number :''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur}  className='normal-form' type='number' value={formik.values.phone_number} variant='outlined' name='phone_number' label='Phone number'/>
               </div>
                <Button  color='secondary' variant='contained' style={{borderRadius:'20px', width:'200px'}} onClick={() => props.UpdateAccountInfo(formik.values)} size='large'>Update Profile</Button>
                
            </Container>
        )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });
export default connect(mapStateToProps, { register,UpdateAccountInfo })(AccountInfo);

