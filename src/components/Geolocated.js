import React from "react";
import { geolocated } from "react-geolocated";
import axios from 'axios'
import Fab from '@material-ui/core/Fab';
import GpsIcon from '@material-ui/icons/GpsFixed';
import TextField from '@material-ui/core/TextField'
import { Paper, Button } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check';
import {connect} from 'react-redux';
import {SendLoc} from '../actions/UserInfo';
import Loading from './Loading'
import ReplayIcon from '@material-ui/icons/Replay'

class Geolocation extends React.Component {
    constructor(props){
        super(props)
        this.state={
            userAddress:{
                coordinates:'',
                neighbourhood:'',
                isAccurate:true,
            },
            buttonClicked:false,
        }
        this.fetchLocName = this.fetchLocName.bind(this);

    }
    handleChecktrue = () => {
        this.setState(prevState =>({
            userAddress: {
                ...prevState.userAddress,
                isAccurate:true
            }
        }))
    }
    handleCheckfalse = () => {
        this.setState(prevState =>({
            userAddress: {
                ...prevState.userAddress,
                isAccurate:false
            }
        }))
    }
     
    fetchLocName = (props) => {
        var cords = this.formatDegrees(this.props.coords.latitude, false) + ',' + this.formatDegrees(this.props.coords.longitude, true)
        var url = `https://api.opencagedata.com/geocode/v1/json?key=2a607809622a49d0a5697c3d524f8973&q=${cords}`
        this.setState(prevState =>({
            userAddress: {
                ...prevState.userAddress,
                coordinates:cords
            }
        }))
        axios.get(url)
        .then(res => {
            const {userAddress} = this.state
            var county = res.data.results[0].components.county
            var neighbourhood = res.data.results[0].components.neighbourhood
            if(neighbourhood === undefined){
                this.setState(prevState =>({
                    userAddress: {
                        ...prevState.userAddress,
                        neighbourhood:county
                    }
                }))
            }else{
                this.setState(prevState =>({
                    userAddress: {
                        ...prevState.userAddress,
                        neighbourhood:neighbourhood
                    }
                }))
            }
            this.setState({buttonClicked:true})
        }).catch(err => console.log(err));
    }
    getDirection = (degrees, isLongitude) =>
    degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

    formatDegrees = (degrees, isLongitude) =>
    `${0 | degrees}° ${
        0 | (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)
    }' ${0 | (((degrees * 60) % 1) * 60)}" ${this.getDirection(
        degrees,
        isLongitude,
    )}`;

    render() {
        const { values, handleChange } = this.props;
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <>
                <SendGeoLocation buttonClicked={this.state.buttonClicked} fetchLocName={this.fetchLocName} userAddress={this.state.userAddress} trueChecked={this.state.trueChecked} falseChecked={this.state.falseChecked} handleCheckfalse={this.handleCheckfalse} handleChecktrue={this.handleChecktrue}/>
            </>
        ) : (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Loading  LoaderIcon={<GpsIcon/>}/>
            </div>
        );
    }
}

export function SendGeoLoc(props) {
    function SendUserLoc() {
        props.SendLoc(props.userAddress)
    }
    return (
        <div>
            <h5 style={{textAlign:'center', color:'rgba(0,0,0,0.8)',marginBottom:'.5em'}}>Set your default address</h5>
            <br />
            <Paper style={{padding:'1em'}}>{props.buttonClicked 
                        ?
                        <>
                        <div>
                    Are you around {props.userAddress.neighbourhood}? 
                    <br/>
                    <Checkbox
                        checked={props.userAddress.isAccurate === true}
                        onChange={props.handleChecktrue}
                        name="trueChecked" 
                    />Yes
                    <Checkbox
                        checked={props.userAddress.isAccurate === false}
                        onChange={props.handleCheckfalse}
                        name="falseChecked"
                    />Not even close
                        </div>
                        </>
                        :<p>Click the button below</p>
                    }</Paper>
                    <br/>
                    {!props.buttonClicked ?
                        <Fab  color='primary' onClick={props.fetchLocName} variant="extended">
                           Get my location<GpsIcon />
                        </Fab> 
                        :<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Fab color='primary' variant='extended' onClick={SendUserLoc} >
                            Submit location<CheckIcon />
                        </Fab> 
                    </div>
                    }
                    
        </div>
    )
}

export const GeoLocation = geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geolocation);

export const SendGeoLocation =  connect(
    null,
   {SendLoc}
)(SendGeoLoc)