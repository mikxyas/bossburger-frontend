import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField  from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendLoc from './SendLoc';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {toggleLocationDialog} from '../actions/locations'
import { Typography } from '@material-ui/core';


class LocDialog extends React.Component{
    constructor(props){
        super(props)
    }
    static propTypes = {
        OpenDialog: PropTypes.bool.isRequired,
        toggleLocationDialog: PropTypes.func.isRequired
      }
    render(){
        return(
            <Dialog open={this.props.OpenDialog} onClose={this.props.toggleLocationDialog}>
            <div style={{padding:'2em'}}>
            {/* <IconButton style={{marginLeft:'auto'}} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
                </IconButton> */}
                <Typography align='center'>Create Location</Typography>
                <TextField onChange={this.props.handleChange} helperText='Special name of your location. eg: Winget' type='text' name='locName'  label="Location Name" />
                <br/>
                <br/>
                <TextField variant='outlined' onChange={this.props.handleChange} helperText='eg: The building next to the bakery....' multiline label="Location Description" rows={3}  name='locDesc'type='text'/>
                <br/>
                <br/>
                <TextField onFocus={this.props.fetchLocName} multiline label="Click to send us GPS" variant='outlined' color='secondary' value={this.props.nhood}   type='text'/>
                <br/>
                <br/>
                <SendLoc loc={this.props.loc}/>
            </div>
        </Dialog>
        )
    }
    
}

const mapStateToProps = state => ({
    OpenDialog: state.locations.openLocationDialog
})

export default connect(mapStateToProps,  {toggleLocationDialog})(LocDialog)