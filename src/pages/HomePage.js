import React from 'react';
import {Button,Card, Typography, Divider,Box, ListItemSecondaryAction, Paper, CardContent, CardHeader} from '@material-ui/core';
import {Link} from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {loadEvents, viewEvent} from '../actions/events'
import {connect} from 'react-redux'
import {Image} from 'cloudinary-react'
import EventViewer from '../components/EventViewer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GpsIcon from '@material-ui/icons/LocationOn'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import ExploreIcon from '@material-ui/icons/Explore';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      collapse:false
    }
  }
  
  handleCollapse = () => {
    if(this.state.collapse ===false){
      this.setState({
          collapse:true,
      })
  }else{
      this.setState({
          collapse:false
      })
  } 
  }
  componentDidMount() {
    this.props.loadEvents()
  }
  render(){
    
  return (
    <>
      <EventViewer/>
      
      <section className='hero-section'>
      {/* <img style={{alignSelf:'flex-start'}} className='hero-svg' src="./chef-hero.svg" alt="Burger"/> */}

        <div className='hero-section-content'>
          {/* <img className='hero-logo-pic' src='./logo.jpg'/> */}
          
          <Image className='hero-logo-pic' cloudName='mikiyas' alt='Boss Burger Logo'  publicId='output-onlinepngtools_yxjl1u.png'  secure="true"/>

          {/* <Paper variant='outlined' style={{borderRadius:'0px',padding:'.2em',border:'none',width:'100%',background:'#ED1C24', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Box fontWeight={700} fontSize={19} color='white' fontStyle='italic'>You've had the rest, come try the best</Box>
      </Paper> */}
        
          <Card className='hero-desc-card' >
            <CardContent>
              <List>
              <ListItem className='hero-desc-card-list-item' button>
        <ListItemIcon>
          <AccessTimeIcon/>
        </ListItemIcon>
        <ListItemText primary="Open" secondary='Mon - Sun | 11:00AM - 9:00PM' />
      </ListItem>
      <ListItem className='hero-desc-card-list-item' button>
        <ListItemIcon>
          <MotorcycleIcon/>
        </ListItemIcon>
        <ListItemText primary="Delivery Hours" secondary='12AM - 8:00PM'/>
      </ListItem>
      <a href='https://www.google.com/maps/place/BOSS+BURGER/@8.9975857,38.7849062,15z/data=!4m2!3m1!1s0x0:0x1717740e78fc081d?sa=X&ved=2ahUKEwjisrqJ-4zuAhWCqHEKHQMhBLwQ_BIwFXoECCIQBQ' style={{color:'inherit'}} target='__blank__'  >

      <ListItem className='hero-desc-card-list-item' button>
        <ListItemIcon>
          <ExploreIcon/>
        </ListItemIcon>
        <ListItemText primary="Bole, near Sheger House" secondary='Click to see in map'/>
      </ListItem>
      </a>
              </List>
            </CardContent>
          </Card>
          {/* <Typography align='center' variant='h2'>
            <Box className='hero-section-title' fontWeight={600}>Boss Burger</Box>
          </Typography> */}
          {/* <Typography className='hero-section-subtitle' align='center' variant='p'>
            <Box >You've had the rest. Come try the best!</Box>
          </Typography> */}
          {/* <Typography align='center' className='hero-rest-desc'  variant='subtitle1'>
            A Burger joint in Addis dedicated to customer's satisfaction. Found in <a href='https://www.google.com/maps/place/BOSS+BURGER/@8.9975857,38.7849062,15z/data=!4m2!3m1!1s0x0:0x1717740e78fc081d?sa=X&ved=2ahUKEwjisrqJ-4zuAhWCqHEKHQMhBLwQ_BIwFXoECCIQBQ' target='__blank__' className='hero-rest-link' >Bole, Behind Sheger House </a>
          </Typography> */}
          {/* <Link to='/order'>
          <Button endIcon={<ChevronRightIcon/>} style={{color:'#1e1e1e'}} size='small' >Try the best</Button>

          </Link> */}
          {/* <Image className='hero-section-mobile-image' cloudName='mikiyas' publicId='c-item2_qewdgb'  secure="true"/> */}
          
         
        </div>
      {/* <img className='hero-svg' src="./outdoor-hero.svg" alt="Burger"/> */}

      </section>
      {/* <div style={{flexWrap:'wrap', display:'flex', justifyContent:'space-around', overflow:'hidden',}}>
      <GridList style={{flexWrap:'nowrap', transform:'translateZ(0)'}} cols={4}>
          <GridListTile>
            <img src='https://res.cloudinary.com/mikiyas/image/upload/v1607756427/font2_gg4q96.jpg' alt='Burger' />
             <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            /> 
          </GridListTile>
          <GridListTile>
          <img src='https://res.cloudinary.com/mikiyas/image/upload/v1607756427/font2_gg4q96.jpg' alt='Burger' />

          </GridListTile>
          <GridListTile>
          <img src='https://res.cloudinary.com/mikiyas/image/upload/v1607756427/font2_gg4q96.jpg' alt='Burger' />

          </GridListTile>
          <GridListTile>
          <img src='https://res.cloudinary.com/mikiyas/image/upload/v1607756427/font2_gg4q96.jpg' alt='Burger' />

          </GridListTile>
          <GridListTile>
          <img src='https://res.cloudinary.com/mikiyas/image/upload/v1607756427/font2_gg4q96.jpg' alt='Burger' />

          </GridListTile>
      </GridList>
      </div> */}

      <section className='secondary-section'>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <Typography className='secondary-section-desc' align='center' variant='p'>
        <Box fontSize={15}>We only delivery in a 15km radius.</Box>
        </Typography>
        <Typography className='secondary-section-title' align='center' variant='h3'>
            You order. We deliver
        </Typography>
        <Link to='/order'>
        <Button endIcon={<ChevronRightIcon/>} color='secondary'> Order Now</Button>

        </Link>

        </div>
        <img className='delivery-svg' src="./delivery-hero.svg" alt="Boss Burger Delivery"/>
      </section>
      <section className='secondary-section'>
        <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <img className='loc-dist-svg' src="./map-hero.svg" alt="Boss Burger Delivery Pricing"/>
        <Typography variant='h3' className='secondary-section-title'>Delivery Pricing</Typography>
        </div>
        <List className='location-list-cont' >
        <div>
          <ListItem  button>
          <ListItemIcon>
            <GpsIcon className='location-distance'/>
          </ListItemIcon>
        <ListItemText primary={<Typography className='location-distance' variant='h3'>0 - 3km</Typography>} secondary={<Typography className='location-price' variant='caption'>40Birr</Typography>} />
      </ListItem>
      <ListItem  button>
        
          <ListItemIcon>
            <GpsIcon className='location-distance'/>
          </ListItemIcon>
        <ListItemText primary={<Typography className='location-distance' variant='h3'>3 - 6km</Typography>} secondary={<Typography className='location-price' variant='caption'>60Birr</Typography>} />
      </ListItem>
      <ListItem button>
          <ListItemIcon>
            <GpsIcon className='location-distance'/>
          </ListItemIcon>
        <ListItemText primary={<Typography className='location-distance' variant='h3'>6 - 9km</Typography>} secondary={<Typography className='location-price' variant='caption'>100Birr</Typography>} />
      </ListItem>
      </div>
      <div>
          <ListItem button>
          <ListItemIcon>
            <GpsIcon className='location-distance'/>
          </ListItemIcon>
        <ListItemText primary={<Typography className='location-distance' variant='h3'>9 -12km</Typography>} secondary={<Typography className='location-price' variant='caption'>120Birr</Typography>} />
      </ListItem>
      <ListItem  button>
        
          <ListItemIcon>
            <GpsIcon className='location-distance'/>
          </ListItemIcon>
        <ListItemText primary={<Typography className='location-distance' variant='h3'>12 - 15km</Typography>} secondary={<Typography className='location-price' variant='caption'>150Birr</Typography>} />
      </ListItem>
      <ListItem button>
          <ListItemIcon>
            <GpsIcon className='location-distance'/>
          </ListItemIcon>
        <ListItemText primary={<Typography className='location-distance' variant='h3'> {'>'} 15km</Typography>} secondary={<Typography className='location-price' variant='caption'>We don't deliver</Typography>} />
      </ListItem>
      </div>
          </List>
        
        
       </section>

    </>
    
  );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
})
export default connect(mapStateToProps, {loadEvents, viewEvent})(HomePage);

