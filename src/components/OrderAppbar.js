import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Box,Divider,Menu,MenuItem } from '@material-ui/core';
import {connect} from 'react-redux'
import {toggleOrderTypeDialog} from '../actions/order'
class OrderAppbar extends Component {
    render() {
        return (
            <div>
                <AppBar  position="static">
                    <Toolbar variant="dense" style={{width:'100%'}}>
                        <Typography variant="h6" >
                            <Box fontSize={17}>Order type: {this.props.orderType}</Box>
                        </Typography>
                        <Divider orientation='vertical' style={{margin:'.5em', background:'#d98555b2'}} flexItem/>
                        {this.props.locLoaded && this.props.orderType !== 'Pickup' && this.props.selectedLocId !== 0
                        ?
                        <Typography variant="h6" >
                            <Box fontSize={17}>Location: {this.props.locations[this.props.selectedLocId].locName}</Box>
                        </Typography>
                        :null
                        }
                        <Button onClick={() => this.props.toggleOrderTypeDialog()} style={{marginLeft:'auto'}} color='secondary' variant={this.props.mobile ?'text' :'contained'} size={this.props.mobile ?'small' :'medium'}>
                            Change
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orderType: state.auth.user.prevOrdType,
    selectedLocId: state.auth.user.primary_loc_id,
    locations: state.locations.locations,
    locLoaded: state.locations.locLoaded,
    mobile: state.ui.mobile
})
export default connect(mapStateToProps, {toggleOrderTypeDialog})(OrderAppbar)