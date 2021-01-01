import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {toggleLocationDialog, deleteLoc, toggleLocCreated} from '../actions/locations'
import LocationDialog from '../components/LocationDialog'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

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
        if(this.props.locCreated){
            this.props.toggleLocCreated()
        }
        return (
            <>
            <LocationDialog/>
            {this.props.isAuthenticated 
                ?<div style={{padding:'1em', display:'flex', justifyContent:'center'}}>
                
                {this.props.locLength > 0
                ?<Grid container spacing={3} justify='center'>
                    <Grid item sm={12}>
                        <Link to='/new/locations/'>
                            <Button variant='contained' endIcon color='primary'>Add Location<AddIcon/></Button>
                        </Link>
                    </Grid>

                    {Object.keys(this.props.Locations).map((locs, key) => (
                        <Grid style={{marginTop:'1em', display:'flex', justifyContent:'center'}} item lg={3}  xs={12} sm={6} key={key}>
                            <Card style={{width:'270px'}} variant='outlined'>
                                <CardHeader
                                    action={
                                    <IconButton onClick={() => this.props.deleteLoc(locs)} aria-label="settings">
                                        <DeleteIcon/>
                                    </IconButton>
                                    }
                                    title={this.props.Locations[locs].locName}

                                    subheader={this.props.Locations[locs].neighborhood}
                                />
                                <CardContent style={{marginTop:'-1.5em'}}>  
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {this.props.Locations[locs].locDesc}   
                                    </Typography>
                                    <Chip
                                        style={{marginTop:'1em'}}
                                        // icon={<MoneyIcon/>}
                                        label={this.props.Locations[locs].locDistance + ' Km | ' + this.props.Locations[locs].locPrice + ' ETB'} 
                                        variant='outlined'
                                        color='secondary'                           
                                    />
                                </CardContent>
                                
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
                    <Link style={{width:'100%'}} to='/new/locations'>
                        <Button fullWidth variant='contained' color='primary'>Create Now</Button>
                    </Link>
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
    locLength: state.locations.locLength,
    locCreated: state.locations.locCreated
})

export default connect(mapStateToProps, {toggleLocationDialog, deleteLoc, toggleLocCreated})(Locations)