import React from "react";
import { geolocated } from "react-geolocated";
import axios from 'axios'
import Fab from '@material-ui/core/Fab';
import GpsIcon from '@material-ui/icons/GpsFixed';
import TextField from '@material-ui/core/TextField'
import { Paper } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


class Geolocation extends React.Component {
    constructor(props){
        super(props)
        this.state={
            userAddress:'',
            buttonClicked:false,
            trueChecked:false,
            falseChecked:false,
            lat:'',
            long:'',
            neighbourhood:''
        }
        this.fetchLocName = this.fetchLocName.bind(this);

    }
    handleChecktrue = () => {
        this.setState({trueChecked: true, falseChecked:false})
    }
    handleCheckfalse = () => {
        this.setState({trueChecked: false, falseChecked:true})
    }
    fetchLocName = (props) => {
        var cords = this.formatDegrees(this.props.coords.latitude, false) + ',' + this.formatDegrees(this.props.coords.longitude, true)
        console.log(cords)
        var url = `https://api.opencagedata.com/geocode/v1/json?key=2a607809622a49d0a5697c3d524f8973&q=${cords}`
        axios.get(url)
        .then(res => {
            var county = res.data.results[0].components.county
            var neighbourhood = res.data.results[0].components.neighbourhood
            if(neighbourhood === undefined){
                this.setState({userAddress:county})
            }else{
                this.setState({userAddress:neighbourhood})
            }
            console.log(res.data)
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
                    <Paper style={{padding:'1em'}}>{this.state.buttonClicked 
                        ?
                        <div>
                    Are you around {this.state.userAddress}? 
                    <br/>
                    {/* With cordinates of  lat: {this.state.lat} long: {this.state.long} */}
                    {/* <br/> */}
                    <Checkbox
                        checked={this.state.trueChecked}
                        onChange={this.handleChecktrue}
                        name="trueChecked" 
                    />Yes
                    <Checkbox
                        checked={this.state.falseChecked}
                        onChange={this.handleCheckfalse}
                        name="falseChecked"
                    />Not even close
                        </div>
                        :<p>Click the button below</p>
                    }</Paper>
                    <br/>
                    <Fab onClick={this.fetchLocName} variant="extended">
                        <GpsIcon />
                        Get my location 
                    </Fab>
            {/* <p>{this.state.userAddress}</p> */}
            </>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geolocation);