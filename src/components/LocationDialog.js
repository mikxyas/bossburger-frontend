import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField  from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import axios from 'axios'
import LocDialog from './LocDialogInner'

class LocationDialog extends Component {
    constructor(props){
        super(props)
        this.state = { 
            neighborhood:'',
            latitude:'',
            longitude:'',
            locPrice:0,
            locDistance:0,
            locName:'',
            locDesc:'',
        }
    }

    degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
      }
      
    distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
        var earthRadiusKm = 6371;
      
        var dLat = this.degreesToRadians(lat2-lat1);
        var dLon = this.degreesToRadians(lon2-lon1);
      
        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);
      
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
      }


    fetchLocName = () => {
        const DistanceInKM = parseInt(this.distanceInKmBetweenEarthCoordinates(8.9974982, 38.7847816, this.props.coords.latitude, this.props.coords.longitude))
        var cords = this.formatDegrees(this.props.coords.latitude, false) + ',' + this.formatDegrees(this.props.coords.longitude, true)
        var url = `https://api.opencagedata.com/geocode/v1/json?key=2a607809622a49d0a5697c3d524f8973&q=${cords}`
        if(DistanceInKM <= 3 && DistanceInKM > 0){
            this.setState({
                locPrice:40
            })
        }
        if(DistanceInKM <= 6 && DistanceInKM > 3){
            this.setState({
                locPrice:60
            })
        }
        if(DistanceInKM <= 9 && DistanceInKM > 6){
            this.setState({
                locPrice:100
            })
        }
        if(DistanceInKM <= 12 && DistanceInKM > 9){
            this.setState({
                locPrice:120
            })
        }
        if(DistanceInKM <= 15 && DistanceInKM > 12){
            this.setState({
                locPrice:150
            })
        }
        this.setState({
            latitude:this.props.coords.latitude,
            longitude:this.props.coords.longitude,
            locDistance: DistanceInKM
            }
        )
        axios.get(url)
        .then(res => {
            const {userAddress} = this.state
            var county = res.data.results[0].components.county
            var neighbourhood = res.data.results[0].components.neighbourhood
            if(neighbourhood === undefined){
                this.setState({
                    neighborhood:county,
                })
            }else{
                this.setState({
                    neighborhood:neighbourhood,
                })
            }
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

    handleChange = (e) => {
        this.setState({
                [e.target.name]: e.target.value
            })
    }
    render() {
        return (
              <LocDialog nhood={this.state.neighborhood} loc={this.state} handleChange={this.handleChange} fetchLocName={() => this.fetchLocName()} /> 
            
        )
    }
}

export default geolocated({ positionOptions: { enableHighAccuracy: true,},userDecisionTimeout: 5000,})(LocationDialog)
