import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Paper, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

export default function RegisterForm() {
  return (
      <Paper raised>
        <Formik
        initialValues={{
            email: '',
            password: '',
            username:'',
            phoneNumber:''
        }}
        // validate={values => {
        //     const errors: Partial<Values> = {};
        //     if (!values.email) {
        //     errors.email = 'Required';
        //     } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        //     ) {
        //     errors.email = 'Invalid email address';
        //     }
        //     return errors;
        // }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
            }, 500);
        }}
        >
        {({ submitForm, isSubmitting }) => (
            <Form style={{width:"fit-content",paddingLeft:'2em',paddingRight:'2em',paddingTop:'1em',paddingBottom:'1em'}}>
            {/* <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
            />
            <br /> */}
            <Field
                component={TextField}
                type="phone number"
                label="Phone number"
                name="phoneNumber"
                required
                style={{marginBottom:'.5em'}}

            />
            <br />
            <Field
                component={TextField}
                type="username"
                label="Username"
                name="username"
                required
                style={{marginBottom:'.5em'}}

            />
            <br />
            <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
                required
                style={{marginBottom:'2em'}}

            />
            {isSubmitting && <LinearProgress />}
            <br />
            <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                style={{marginLeft:'8em'}}
            >
                Sign up
            </Button>
            </Form>
        )}
        </Formik>
        </Paper>
  );
}