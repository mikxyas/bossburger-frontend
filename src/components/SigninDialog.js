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
    this.handleChange = this.handleChange.bind(this)
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
  handleChange = (e) => {
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
      <Button variant="contained" color="primary" onClick={() => this.handleDialog()}>
        Sign in
      </Button>
      <Dialog open={this.props.openSigninDialog} onClose={this.handleDialog} TransitionComponent={Transition}>
        <div style={{display:'flex',flexDirection:'column',padding:'2em', alignItmes:'center', justifyContent:'center'}}>
        {/* <IconButton style={{marginLeft:'auto'}} edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton> */}
              <TextField type='email' name='email' onChange={this.handleChange} label="Email"/>
              <br/>
              <TextField label="Password" name='password' onChange={this.handleChange} type='password'/>
              <br/>
              <br/>
              <Button onClick={() => this.handleSubmit()} variant='contained' color='primary'>Sign In</Button>
              <Divider style={{margin:'1em'}} variant='middle'/>
              {/* <p style={{textAlign:'center'}}>Or</p> */}
              <Link style={{width:"100%"}} to='/register'>
                <Button onClick={() => this.handleDialog()} fullWidth variant='contained' color='secondary'>Register</Button>
              </Link>
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


  
