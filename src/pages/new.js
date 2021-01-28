import { Box, Button, Paper, Divider,TextField, Typography } from '@material-ui/core'
import React, { Component,useState } from 'react'
import "leaflet/dist/leaflet.css";
import {MapContainer, Circle,TileLayer,useMapEvents,Tooltip, Popup,Marker} from 'react-leaflet'
import GpsIcon from '@material-ui/icons/GpsFixed'
import L from 'leaflet';
import {connect} from 'react-redux';
import {toggleUserLocated, SetCoords, createLoc} from '../actions/locations'
import LocationMarker from '../components/LocationMarker'
import {Redirect} from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



function New(props){

    const formik = useFormik({
        initialValues: {
            neighborhood: '',
            latitude: 0,
            longitude: 0,
            locDistance: '',
            locPrice:0,
            locName: '',
            locDesc: ''
        },
        
        validationSchema: Yup.object({
            locName: Yup.string()
                .min(3, "Minimum 3 Characters")
                .required("Required!")
                .max(250, 'Maximum 250 Characters'),
            neighborhood: Yup.string()
                .min(3, "Minimum 3 Characters")
                .required("Required!")
                .max(250, 'Maximum 250 Characters'),
            locDesc: Yup.string()
                .min(10, "Minimum 10 Characters")
                .max(250, 'Maximum 250 Characters')
                .required("Required!"),
        }),
        onSubmit: values => {
            values.latitude = props.latitude
            values.longitude = props.longitude
            values.locPrice = props.price
            values.locDistance = parseInt(props.distance)
            props.createLoc(JSON.stringify(values, null, 2));  
          }
      });
    const positionOfMap = [8.9806,  38.7578]
    if(props.locCreated){
        return <Redirect to='/locations'/>
    }
    return (
        <>
            <div className='add-loc-cont'>
                <Typography align='center' variant='h5'>
                    <Box className='form-header' fontWeight={500}>Tell us about your location</Box>
                </Typography>
                <Divider color='primary' style={{width:'50%', margin:'1em'}}/>
                <div className='form-cont'>
                    <TextField error={formik.touched.locName && Boolean(formik.errors.locName)}  helperText={formik.touched.locName ?formik.errors.locName :''} onChange={formik.handleChange} onBlur={formik.handleBlur} name='locName' label='Location Name' type='text' className='normal-form' variant='outlined' />
                    <TextField onChange={formik.handleChange} name='neighborhood'  type='text' error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}  helperText={formik.touched.neighborhood ?formik.errors.neighborhood :''} onBlur={formik.handleBlur} className='normal-form' variant='outlined' label='Neighbourhood'/>
                    <TextField onChange={formik.handleChange} name='locDesc' type='text' error={formik.touched.locDesc && Boolean(formik.errors.locDesc)}  helperText={formik.touched.locDesc ?formik.errors.locDesc :''} onBlur={formik.handleBlur}  multiline rows={3} className='normal-form' variant='outlined' label='Location Description'/>
                </div>
                {/* <Button onClick={this.GetLocation}>Gimme location</Button> */}
                <Divider color='primary' style={{width:'50%', margin:'1em'}}/>
                <Typography align='center' variant='h5'>
                    <Box className='form-header' fontWeight={500}>Send us your location on a map</Box>
                </Typography>
                <Divider color='primary' style={{width:'50%', margin:'1em'}}/>
                <div className='map-cont'>
                    {!props.UserLocated
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
                        <LocationMarker neighbourhood={formik.values.neighborhood}/>
    {/*                
                    <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker> */}
                    </MapContainer>
                </div>
                <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'1em'}}>
                    <Button disabled={!formik.dirty || !formik.isValid || !props.locInfoFetched} color='secondary' variant='contained' style={{borderRadius:'20px', width:'200px'}} size='large' onClick={formik.handleSubmit} variant='contained'>Create Location</Button>
                </div>
                </div>
                
            </>
        )
}

const mapStateToProps = (state) => ({
    locInfoFetched:state.locations.locInfoFetched,
    UserLocated: state.locations.UserLocated,
    latitude: state.locations.UserLatitude,
    longitude: state.locations.UserLongitude,
    distance: state.locations.locDistance,
    price: state.locations.locPrice,
    locCreated: state.locations.locCreated
})
export default connect(mapStateToProps,{toggleUserLocated, SetCoords, createLoc})(New)

// SubmitLoc = () => {
//     const locInfo = {
//         neighborhood: this.state.Neighbourhood,
//         latitude: this.props.latitude,
//         longitude: this.props.longitude,
//         locDistance: parseInt(this.props.distance),
//         locPrice:this.props.price,
//         locName: this.state.LocationName,
//         locDesc: this.state.LocationDescription
//     }
//     this.props.createLoc(locInfo)
// }