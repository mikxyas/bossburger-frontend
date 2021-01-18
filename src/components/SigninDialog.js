import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField  from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { login, toggleSignupDialog } from '../actions/auth';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    borderRadius:'20px 20px 0px 0px',

  },
  toobar: {
    width:'100%',
    background:'rgba(0,0,0,0.8)',
    borderRadius:'20px 20px 0px 0px',
    color:'white',
    borderBottom:'solid rgba(0,0,0,0.3) 1px'
  },
  title: {
    marginLeft:'auto',
  },
  closeIcon: {
    position:'absolute',
    marginTop:'0em',
    marginLeft:'auto',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


class SigninDialog extends  React.Component{
  constructor(props){
    super(props);
    this.state ={
      open:false,
      email:'',
      password:''
    }
    this.handleSigninFormChange = this.handleSigninFormChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static propTypes = {
    login: PropTypes.func.isRequired,
    toggleSignupDialog: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    openSigninDialog: PropTypes.bool.isRequired
};
  handleSubmit = () => {
    // e.preventDefault()
    const userCred = {
      email: this.state.email,
      password:this.state.password
    }
    this.props.login(userCred)
  }
  handleSigninFormChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleDialog = () => {
    this.props.toggleSignupDialog()
    // if(this.state.open == false){
    //   this.setState({
    //     open:true
    //   })
    // }else{
    //   this.setState({
    //     open:false
    //   })
    // }
    
  }
  
  render(){
  return (
    <div>
      <Button variant='outlined' color='primary'  onClick={() => this.handleDialog()}>
        Signin
      </Button>
      <Dialog open={this.props.openSigninDialog} onClose={this.handleDialog} TransitionComponent={Transition}>        
        <div style={{padding:'1.5em', margin:'auto'}}>

        {/* <IconButton style={{marginLeft:'auto'}} edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton> */}
              <TextField style={{width:'210px'}} type='email' name='email' onChange={this.handleSigninFormChange} label="Email"/>
             <br/>
              <TextField style={{width:'210px', marginBottom:'1em'}} label="Password" name='password' onChange={this.handleSigninFormChange} type='password'/>
              <br/>
              
              <Button style={{marginLeft:'150px', marginBottom:'1.4em',borderRadius:'20px'}} onClick={() => this.handleSubmit()} size='small' variant='contained' color='primary'>Sign In</Button>
              <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
                <Divider style={{marginBottom:'.5em', width:'100%'}}  variant='middle'/>
                <Typography align='center' style={{marginBottom:'.4em'}} variant='caption'>Don't have an account?</Typography>
                
                <Link  to='/register'>
                  <Button onClick={() => this.handleDialog()} size='small' variant='outlined' color='secondary'>Register</Button>
                </Link>
              </div>
              
        </div>
      </Dialog>
    </div>
  )
}
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  openSigninDialog: state.auth.openSigninDialog,

});

export default connect(mapStateToProps, { login, toggleSignupDialog })(SigninDialog);


  
