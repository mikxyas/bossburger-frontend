import React, { Component } from 'react'
import '../style/index.css'
import Slide from '@material-ui/core/Slide';
import MenuAppBar from './AppBar'


import MenuIcon from '@material-ui/icons/Menu';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class Navbar extends Component {
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
                <MenuAppBar/>
            </>
        )
        
    }

    
}
