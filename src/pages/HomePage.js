import React from 'react';
import {Button,Card, Typography, Divider,Box, ListItemSecondaryAction, Paper, CardContent} from '@material-ui/core';
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
        <div className='hero-section-content'>
          {/* <Typography align='center' variant='h2'>
            <Box className='hero-section-title'>Boss Burger</Box>
          </Typography>
          <Typography align='center' variant='p'>
            <Box className='hero-section-subtitle'>You've had the rest, come try the best!</Box>
          </Typography>
          <Link to='/order'>
          <Button endIcon={<ChevronRightIcon/>} size='small' style={{margin:'.5em'}} color='secondary'>Try the best</Button>

          </Link> */}

          <img className='hero-logo-pic' src='./logo.jpg'/>
          <Card className='hero-desc-card' >
            <CardContent>
            {/* <Box className='hero-section-title' fontWeight={600}>Boss Burger</Box> */}
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
      <img className='hero-svg' src="./landing-hero.svg" alt="Burger"/>

      </section>

      <section className='secondary-section'>
        <div>
        <Typography className='secondary-section-title' align='center' variant='h3'>
            You order. We deliver
        </Typography>
        <Typography className='secondary-section-desc' align='center' variant='p'>
        <Box >*we only delivery in a 15km radius.</Box>
        </Typography>
        </div>
        <img className='delivery-svg' src="./delivery-hero.svg" alt="Burger"/>
      </section>
      <section className='secondary-section'>
        <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <img className='delivery-svg' src="./map-hero.svg" alt="Burger"/>
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
        {/* <Typography align='center' variant='h2'>
            <Box className='secondary-section-desc'>0-3km = 40birr</Box>
             <Box className='secondary-section-desc'>*we only delivery in a 15km radius.</Box> 
        </Typography> */}
        
       </section>

        {/* <section className='secondary-section'>
          <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
            <img className='delivery-svg' src="./reviews-hero.svg" alt="Burger"/>
            <Typography variant='h3' className='secondary-section-title'>Reviews</Typography>
          </div>
          <div className='comment-section-img-cont'>
          <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-2_ou1gd5'  secure="true"/>
          </div>
          <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-5_ke5gub'  secure="true"/>
          </div>
        
          
        </div>
       
      <div className='comment-section-img-cont'>
      <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-6_vzzj8j'  secure="true"/>
          </div>
          <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-3_zn8v5l'  secure="true"/>
          </div>
      </div>  
        </section>  */}
      {/* <section className='comment-section'>
        <Typography align='center' variant='h2'>
          <Box className='comment-section-title'>We are the best</Box>
        </Typography>
        <Typography align='center' variant='h2'>
          <Box className='comment-section-desc'>Don't just take our words for it</Box>
        </Typography>
        <div className='comment-section-img-cont'>
          <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-2_ou1gd5'  secure="true"/>
          </div>
          <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-5_ke5gub'  secure="true"/>
          </div>
          <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-4_hme45j'  secure="true"/>
          </div>
           <Grid md={4} sm={8} xs={12}  item>
          <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-3_zn8v5l'  secure="true"/>
          </Grid>
          <Grid md={4} sm={8} xs={12}  item>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-6_vzzj8j'  secure="true"/>
          </Grid> 
        </div>
       
      <div className='comment-section-img-cont'>
      <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-6_vzzj8j'  secure="true"/>
          </div>
          <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-3_zn8v5l'  secure="true"/>
          </div>
          <div>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-7_mgcfkq'  secure="true"/>
          </div>
      </div>  
      
      </section> */}
{/*       
      <section className='pricesection'>
          hello
        </section> */}
    </>
    
  );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
})
export default connect(mapStateToProps, {loadEvents, viewEvent})(HomePage);

