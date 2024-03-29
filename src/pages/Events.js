import React, { Component } from 'react'
import {Button,Container,Collapse,Card,CardActionArea,Divider,Typography,Box, Paper, CardHeader, CardActions, IconButton, ButtonGroup, Grid} from '@material-ui/core'
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
import InfoIcon from '@material-ui/icons/Info';

class Events extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'Burger Giveaway event massive',
      desc:'',
      CardClicked: null
    }

  }
  handleCardClicked = (cardId) => {
    if(this.state.CardClicked===cardId){
      this.setState({CardClicked:null})
    }else{
    this.setState({CardClicked: cardId})
    }
  }
  componentDidMount(){
    this.props.loadEvents()
  }
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    // events: PropTypes.object.isRequired
  }
    render() {
        return (
          <>
          {/* <EventViewer/> */}
          <div className='event-page-cont'>
            {this.props.isAdmin 
            ?<div >
            <AddEvent/>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center',width:'100%', marginTop:'.5em'}}>
                <Card color='secondary' style={{width:'270px'}} variant='outlined'>
                  <CardActionArea onClick={() => this.props.toggleAddEvent()} color='secondary'>
                    <CardHeader
                      action={
                        <IconButton color='secondary' aria-label="settings">
                          <AddIcon/>
                        </IconButton>
                      }
                      title='Add an event'
                      subheader='Add a new event or offer'
                    />  
                    </CardActionArea>
                              </Card>
              </div>
            </div>
            :null  
          }
          {Object.keys(this.props.events).length > 0
            ?<Grid container alignItems='center'  justify='center' spacing={2}>
            {Object.keys(this.props.events).map(item => {
              return(
              <Grid style={{display:'flex', alignItems:'center', justifyContent:'center'}} item key={item} md={4} sm={8} xs={12}>
                <div onClick={() => this.handleCardClicked(item)} className='event-card'>
                <Image cloudName='mikiyas' className='event-card-img' publicId={this.props.events[item].img} secure="true"/>
                {this.props.isAdmin
                    ?<div className='event-card-admin'>
                         {/* <Button style={{borderRadius:'20px'}} variant='contained' size='small' color='primary'>Edit</Button>  */}
                        {/* <Button endIcon={}  fullWidth size='small' variant='contained' >Delete</Button> */}
                        <IconButton onClick={() => this.props.deleteEvent(this.props.events[item])}><DeleteIcon style={{color:'#111111'}}/></IconButton>
                    </div>
                    :null
                }
                  <div className='event-card-overlay'>
                      <Typography variant='h2' className='event-card-title'>
                    <Collapse  collapsedHeight={58} in={this.state.CardClicked === item}>
                        <Box fontSize='23px' fontWeight={600} color='#e0e0e0'>
                          {/* If card clicked display the entire title not the short version */}
                          {item === this.state.CardClicked
                            ?<>{this.props.events[item].title}</>
                            :<>{this.props.events[item].title.length > 27 
                          ?<>{this.props.events[item].title.substring(0, 27) + '...'}</>
                          :<>{this.props.events[item].title}</>
                          }</>
                          }
                        </Box> 
                        <Box className='event-card-desc' fontSize='14px' color='#e0e0e0'>
                          {item === this.state.CardClicked
                            ?<>{this.props.events[item].desc}</>
                            :this.props.events[item].desc.length > 59
                            ?<>{this.props.events[item].desc.substring(0, 59) + '...'}</>
                            :<>{this.props.events[item].desc}</>
                          }
                        </Box>
                        <Divider style={{background:'rgba(255,255,255, 0.3)', margin:'.1em'}}/>
                        {this.state.CardClicked === item
                          ?<Box color='#e0e0e0' className='event-card-content' fontSize='15px'>{this.props.events[item].content}</Box>
                          :null
                        }
                    </Collapse>
                        
                      </Typography>
                  </div>
                  
                </div>
              </Grid>
          )})}
          </Grid>
          :<div style={{display:'flex',height:'60vh', alignItems:'center', justifyContent:'center'}}>
            <CardHeader
                      avatar={
                        <IconButton color='primary' aria-label="settings">
                          <InfoIcon />
                        </IconButton>
                      }
                      title='No offers'
                      subheader='Sorry we dont have any offers right now'
                    /> 
            
          </div>

          }
          

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

{/* <Card onClick={() => this.props.viewEvent(item)} className='codepen-card'>
                <CardActionArea>
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
                 */}