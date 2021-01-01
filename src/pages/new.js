import { Box, Button, Paper, TextField, Typography } from '@material-ui/core'
import React, { Component,useState } from 'react'
import "leaflet/dist/leaflet.css";
import {MapContainer, Circle,TileLayer,useMapEvents,Tooltip, Popup,Marker} from 'react-leaflet'
import GpsIcon from '@material-ui/icons/GpsFixed'
import L from 'leaflet';
import {connect} from 'react-redux';
import {toggleUserLocated, SetCoords, createLoc} from '../actions/locations'
import LocationMarker from '../components/LocationMarker'
import {Redirect} from 'react-router-dom'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



class New extends Component {
    constructor(props){
        super(props)
        this.state = {
            LocationName:'',
            Neighbourhood:'',
            LocationDescription:'',
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]:e.currentTarget.value
        })
    }
    SubmitLoc = () => {
        const locInfo = {
            neighborhood: this.state.Neighbourhood,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            locDistance: parseInt(this.props.distance),
            locPrice:this.props.price,
            locName: this.state.LocationName,
            locDesc: this.state.LocationDescription
        }
        this.props.createLoc(locInfo)
    }
        render(){
            
            const positionOfMap = [8.9806,  38.7578]
            return (
                <>
                <div className='add-loc-cont'>
                    <div className='add-loc-header-cont'>
                        <Typography variant='h4'>
                            <Box fontWeight={600} className='add-loc-header'>Add Location</Box>
                        </Typography>
                    </div>
                    <div className='add-loc-form-cont'>
                        <TextField onChange={this.handleChange} name='LocationName' label='Location Name' className='add-loc-form' variant='outlined' />
                        <br/>
                        <br/>
                        <TextField onChange={this.handleChange} name='Neighbourhood'   className='add-loc-form' variant='outlined' label='Neighbourhood'/>
                        <br/>
                        <br/>
                        <TextField onChange={this.handleChange} name='LocationDescription'  multiline rows={3} className='add-loc-form' variant='outlined' label='Location Description'/>
                    </div>
                {/* <Button onClick={this.GetLocation}>Gimme location</Button> */}
                <div className='map-cont'>
                {!this.props.UserLocated
                ?<Typography  className='map-overlay'>
                <Box color='#e0e0e0'>Click anywhere on the map</Box>
            </Typography>
                :null

                }
                <MapContainer  className="add-loc-map" center={positionOfMap} zoom={20} scrollWheelZoom={true}>                
                    <TileLayer
                    zIndex={2}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker neighbourhood={this.state.Neighbourhood}/>
    {/*                
                    <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker> */}
                </MapContainer>
                </div>
                <div  className='loc-submit-btn'>
                    <Button  color='primary' onClick={() => this.SubmitLoc()} variant='contained'>Create Location</Button>
                </div>
                </div>
                
                </>
            )
      }
    }

const mapStateToProps = (state) => ({
  UserLocated: state.locations.UserLocated,
  latitude: state.locations.UserLatitude,
  longitude: state.locations.UserLongitude,
  distance: state.locations.locDistance,
  price: state.locations.locPrice,
  locCreated: state.locations.locCreated
})
export default connect(mapStateToProps,{toggleUserLocated, SetCoords, createLoc})(New)