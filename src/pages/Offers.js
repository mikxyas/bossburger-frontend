import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Grid,Button } from '@material-ui/core'
import OfferCard from '../components/OfferCard';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input'
import { Link } from 'react-router-dom'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class Offers extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
        }
    }
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
    render() {
        return (
            <>
                <div style={{display:"flex",justifyContent:'center'}}>
                    <a onClick={() => this.handleClickOpen()}>
                    <OfferCard/>
                    </a>
                </div>
                <Dialog
                        fullScreen
                        TransitionComponent={Transition}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        style={{marginTop:'56px'}}
                    >
                        <AppBar style={{position:"relative", display:"flex", justifyContent:"center", alignItems:"start"}}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" >
                                    Buy two get one free
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Container style={{padding:'1em',textAlign:'center'}}>
                            <h1>Buy two get one free deal!!</h1>
                            <p>Get one free Hawaiian burger when ordering two</p>
                            <p>Offer will end soon so gets your today</p>
                            <Link to='/order'>
                                <Button variant='contained' color='primary'>Order Now</Button>
                            </Link>
                        </Container>
                    </Dialog>
            </>  
        )
    }
}
