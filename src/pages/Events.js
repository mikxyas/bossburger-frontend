import React, { Component } from 'react'
import {Button,Container,Card,CardActionArea,Typography,Box, Paper, CardHeader, CardActions, IconButton, ButtonGroup, Grid} from '@material-ui/core'
import Link from '@material-ui/core/Link'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EventTabForAdmin from '../components/EventTabForAdmin'
import AddIcon from '@material-ui/icons/Add'
import {connect} from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete'
import {loadEvents, viewEvent, toggleAddEvent, deleteEvent} from '../actions/events'
import PropTypes from 'prop-types'
import EventViewer from '../components/EventViewer'
import AddEvent from '../components/AddEvent'
import {Image} from 'cloudinary-react'

class Events extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'Burger Giveaway event massive',
      desc:''
    }

  }
  componentDidMount(){
    this.props.loadEvents()
  }
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    events: PropTypes.array.isRequired
  }
    render() {
        return (
          <>
          <EventViewer/>
          <div style={{padding:'2em'}}>
            {this.props.isAdmin 
            ?<>
            <AddEvent/>
              <Button onClick={() => this.props.toggleAddEvent()} style={{marginBottom:'1em'}} className='add-event-btn' startIcon={<AddIcon/>} color='primary' variant='contained'>
              Add Event
            </Button>
            </>
            :null  
          }
          <Grid container style={{marginLeft:'2em'}}>
            {Object.keys(this.props.events).map(item => {
              return(
              <Grid item key={item}>
              <Card onClick={() => this.props.viewEvent(item)} className='codepen-card'>
                <CardActionArea>
                    {/* <img className="codepen-card-image" src="https://instagram.fadd1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.160.1280.1280a/s320x320/123495909_381318276556811_4479592698820581644_n.jpg?_nc_ht=instagram.fadd1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=jO0XwjbeYZkAX8nDqzN&tp=16&oh=22febfb99f65c3e0bad61e8cea9c512a&oe=5FE02BAF" alt=""/> */}
                    <Image cloudName='mikiyas' height='160' width='100%' publicId={this.props.events[item].img} secure="true"/>

                </CardActionArea>
                <Typography className='codepen-title'>
                  <Box fontSize={18} fontWeight={600}>
                    {this.props.events[item].title.length > 19
                    ?<>{this.props.events[item].title.substring(0, 19) + '...'}</>
                    :<>{this.props.events[item].title}</>
                    }
                    </Box>
                </Typography>
                <Typography className='codepen-desc' variant='caption'>
                  <Box >
                    {this.props.events[item].desc.length > 59
                      ?<>{this.props.events[item].desc.substring(0, 59) + '...'}</>
                      :<>{this.props.events[item].desc}</>
                    }
                  </Box>
                </Typography>
              </Card>
                {this.props.isAdmin
                    ?<Paper style={{width:'225px',background:'rgba(0,0,0,0.08)', display:'flex',padding:'.5em',justifyContent:'space-between',borderRadius:'0px 0px 20px 20px'}}>
                        {/* <Button style={{borderRadius:'20px'}} variant='contained' size='small' color='primary'>Edit</Button> */}
                        <Button endIcon={<DeleteIcon/>} style={{borderRadius:'20px'}} fullWidth size='small' variant='contained' onClick={() => this.props.deleteEvent(this.props.events[item])} color='secondary'>Delete</Button>
                    </Paper>
                    :null
                }
                    </Grid>
          )})}
          </Grid>

          </div>
        </>
        )
    }
}

const mapStateToProps =state => ({
  isAdmin: state.auth.isAdmin,
  events: state.events.events
})
export default connect(mapStateToProps, {loadEvents, viewEvent, toggleAddEvent, deleteEvent})(Events)