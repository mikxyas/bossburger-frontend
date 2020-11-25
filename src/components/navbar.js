import React, { Component } from 'react'
import '../style/index.css'
import Slide from '@material-ui/core/Slide';
import MenuAppBar from './AppBar'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from 'react-redux'
import {CloseSnack} from '../actions/snackbar'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            openSignup: false,
            message:'',
        }
    }
    // Order verification dialog
    handleClickOpen = () => {
        this.setState({
            open:true        
    })
      };
    handleClose = () => {
        this.setState({
            open:false
        })
      };

      //signup dialog handling
      handleSignupClickOpen = () => {
        this.setState({
            openSignup:true
        })
      };
      handleSignupClose = () => {
        this.setState({
            openSignup:false
        })
      };
      componentDidUpdate(prevProps) {
        const { message } = this.props;
        if (message !== prevProps.message) {
          if (message.name) this.setState({message: `Name: ${message.name.join()}`});
          if (message.customer_phone) this.setState({message: `Phone number: ${message.customer_phone.join()}`});
          if (message.email) this.setState({message: `Email: ${message.email.join()}`}) 
          if (message.message) this.setState({message: `${message.message}`})
          if (message.non_field_errors) this.setState({message:message.non_field_errors.join() }) 
          if (message.username) this.setState({message: message.username.join()});
        }
    
        // if (message !== prevProps.message) {
        //   if (message.deleteLead) alert.success(message.deleteLead);
        //   if (message.addLead) alert.success(message.addLead);
        //   if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        // }
      }
    render() {
        return (
            <>
            <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={this.props.openSnackbar}
                    autoHideDuration={3000}
                    onClose={this.props.CloseSnack}
                    message={this.state.message}
                    action={
                    <React.Fragment>
                        <IconButton onClick={this.props.CloseSnack} size="small" aria-label="close" color="inherit" >
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
                <MenuAppBar/>
            </>
        )
        
    }

    
}

const mapStateToProps = state => ({
    openSnackbar: state.snackbar.openSnack,
    message: state.snackbar.message,
})

export default connect(mapStateToProps, {CloseSnack})(Navbar)