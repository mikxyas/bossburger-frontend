import React from 'react';
import {Button, Avatar,Grid,Container,Collapse, Paper,Divider,IconButton, Typography, Box, ButtonGroup} from '@material-ui/core';
import {Link} from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DownIcon from '@material-ui/icons/ArrowDownward';
import GpsIcon from '@material-ui/icons/LocationOn'
import UpIcon from '@material-ui/icons/ArrowUpward';
// import OpenInBrowserIcon from '@material-ui/icons/tab'
import Section from '../components/Section'
import Banner from '../components/Banner'
import AdCard from '../components/AdCard'
import InstaIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import PhoneIcon from '@material-ui/icons/Phone'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {loadEvents, viewEvent} from '../actions/events'
import {connect} from 'react-redux'
import {Image, Transformation} from 'cloudinary-react'
import EventViewer from '../components/EventViewer'
import HomePageCarousel from '../components/HomepageCarousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Video from 'cloudinary-react/lib/components/Video';


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
          <Typography align='center' variant='h2'>
            <Box className='hero-section-title'>Boss Burger</Box>
          </Typography>
          <Typography align='center' variant='p'>
            <Box className='hero-section-subtitle'>You've had the rest, come try the best!</Box>
          </Typography>
          <Link to='/order'>
          <Button endIcon={<ChevronRightIcon/>} size='small' style={{margin:'.5em'}} color='secondary'>Try the best</Button>

          </Link>
          
            <Image className='hero-section-mobile-image' cloudName='mikiyas' publicId='font2_gg4q96'  secure="true"/>
           
        </div>
      </section>
      <section className='comment-section'>
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
          {/* <Grid md={4} sm={8} xs={12}  item>
          <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-3_zn8v5l'  secure="true"/>
          </Grid>
          <Grid md={4} sm={8} xs={12}  item>
            <Image className='comment-section-img' cloudName='mikiyas' publicId='rating-6_vzzj8j'  secure="true"/>
          </Grid> */}
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
      
      </section>
    </>
    
  );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
})
export default connect(mapStateToProps, {loadEvents, viewEvent})(HomePage);

