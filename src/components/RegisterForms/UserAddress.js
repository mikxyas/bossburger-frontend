import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import NextIcon from '@material-ui/icons/ChevronRight';
import PrevIcon from '@material-ui/icons/ChevronLeft';
import { connect } from 'react-redux';
// import { SendInfo } from '../../actions/UserInfo';
import {GeoLocation} from '../Geolocated';

class UserAddress extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    prev = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    handleSendInfo = () => {
        // dispatches actions to send info
        // this.props.SendInfo(this.props.values)
        this.props.nextStep()
    }
    componentDidMount() {
        this.props.GenerateVerfCode()
    }
    render() {
        const { values, handleChange } = this.props;
        return (
                <React.Fragment>
                    <GeoLocation values={this.props.values} handleChange={handleChange}/>
                    <br />
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Button startIcon variant='text' color='secondary'  onClick={this.prev}>
                        <PrevIcon/> Back
                    </Button>
                    <Button endIcon variant='text' color='primary'  onClick={this.handleSendInfo}>
                        Continue <NextIcon/>
                    </Button>
                    </div>
                </React.Fragment>
        )
    }
}

export default connect(
    null,
    
)(UserAddress)