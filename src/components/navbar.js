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
                    message={this.props.message}
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