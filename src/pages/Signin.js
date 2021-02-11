import React from 'react'
import { Paper,Box, Button,Container,TextField, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux'
import {login} from '../actions/auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";


function Signin(props) {
    
    const formik = useFormik({
        initialValues: {
          email: "",
          password:''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(7, "Minimum 7 Characters")
                .max(20, 'Maximum 20 Characters')
                .required("Required!"),
        }),
        onSubmit: values => {
            props.login(JSON.stringify(values, null, 2));  
          }
      });
      if(props.isAuthenticated && props.token !== null){
        return (<Redirect to={props.prevLink}/>)
    }
        return (
            <Container style={{display:'flex',paddingTop:'3em', alignItems:'center', flexDirection:'column'}}>
                <Typography align='center' variant='h4'>
                    <Box className='form-header' fontWeight={500}>Welcome back! Sign in</Box>
                </Typography>
                <Divider color='primary' style={{width:'50%', margin:'1em'}}/>
                <Typography variant='caption'>
                    Don't have an account?
                </Typography>
                <Link to='/register'>
                    <Button color='secondary'>SignUp</Button>
                </Link>
                <Divider color='primary' style={{width:'50%', margin:'1em'}}/>
               <div className='form-cont'>
                   <TextField id='email' error={formik.touched.email && Boolean(formik.errors.email)}  helperText={formik.touched.email ?formik.errors.email :''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur}  className='normal-form' type='email' value={formik.values.email} variant='outlined' name='email' label='Email'/>
                   <TextField id='password' error={formik.touched.password && Boolean(formik.errors.password)}  helperText={formik.touched.password ?formik.errors.password :''} color='secondary' onChange={formik.handleChange} onBlur={formik.handleBlur}  className='normal-form' type='password' value={formik.values.password} variant='outlined' name='password' label='Password'/>
               </div>
                <Button onClick={formik.handleSubmit} disabled={!formik.dirty || !formik.isValid} color='secondary' variant='contained' style={{borderRadius:'20px', width:'200px'}} size='large'>Sign In</Button>
                
            </Container>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
    prevLink: state.ui.prevLink
})
export default connect(mapStateToProps, {login})(Signin)