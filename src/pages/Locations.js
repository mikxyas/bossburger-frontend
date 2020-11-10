import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import GpsIcon from '@material-ui/icons/GpsFixed'
import MoneyIcon from '@material-ui/icons/Money'
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {toggleLocationDialog, deleteLoc} from '../actions/locations'

class Locations extends Component {
    static propTypes = {
        Locations:PropTypes.object.isRequired,
        locLength:PropTypes.number.isRequired,
        isLoaded: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        toggleLocationDialog: PropTypes.func.isRequired,
        deleteLoc: PropTypes.func.isRequired,
      }
      
    render() {
        return (
            <>
            {this.props.isAuthenticated 
                ?<div style={{padding:'1em', display:'flex', justifyContent:'center'}}>
                
                {this.props.locLength > 0
                ?<Grid container spacing={3} justify='center'>
                    <Grid item sm={12}>
                        <Button onClick={()=> this.props.toggleLocationDialog()} variant='contained' endIcon color='primary'>Add Location<AddIcon/></Button>
                    </Grid>

                    {Object.keys(this.props.Locations).map((locs, key) => (
                        <Grid style={{marginTop:'1em', display:'flex', justifyContent:'center'}} item lg={3}  xs={12} sm={6} key={key}>
                            <Card style={{width:'270px'}}>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                    {this.props.Locations[locs].neighborhood}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                    {this.props.Locations[locs].locName}
                                    </Typography>
                                    {/* <Typography className={classes.pos} color="textSecondary">
                                    
                                    </Typography> */}
                                    <Typography variant="body2" component="p">
                                    {this.props.Locations[locs].locDesc}
                                    <br />
                                    </Typography>
                                    <Chip
                                        style={{marginTop:'.7em'}}
                                        // icon={<MoneyIcon/>}
                                        label={this.props.Locations[locs].locDistance + ' Km | ' + this.props.Locations[locs].locPrice + ' ETB'}
                                        size='small'                            
                                    />
                                </CardContent>
                                <CardActions>
                                    {/* <Button variant='outlined' size="small">Update</Button> */}
                                    <Button style={{marginLeft:'auto'}} variant='contained' onClick={() => this.props.deleteLoc(locs)} size="small" color='secondary'>Delete</Button>
                                </CardActions>
                            </Card>
        
                        </Grid>
                    ))}
                    </Grid>
                :<Card style={{width:'300px'}}>
                <CardContent>
                    <Typography align='center' variant="h5" component="h2">
                    Looks like you don't have any locations set
                    </Typography>
                    {/* <Typography className={classes.pos} color="textSecondary">
                    
                    </Typography> */}
                    <Typography align='center' variant="body2" component="p">
                    Create a location now
                    <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={()=> this.props.toggleLocationDialog()} fullWidth variant='contained' color='primary'>Create Now</Button>
                </CardActions>
            </Card>
                }
                </div>
            :<div style={{height:'calc(100vh - 67px)', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography align='center' variant="h5" component="h2">
                    Signin or Register to be able to view this page.
                </Typography>
            </div>
            }
            </>
        )
    }
}
const mapStateToProps = state => ({
    Locations: state.locations.locations,
    isLoaded: state.locations.locLoaded,
    isAuthenticated: state.auth.isAuthenticated,
    locLength: state.locations.locLength
})

export default connect(mapStateToProps, {toggleLocationDialog, deleteLoc})(Locations)