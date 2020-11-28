import React from 'react';
import {Button, Avatar,Grid,Container,Collapse, Paper,Divider,IconButton, Typography, Box, ButtonGroup} from '@material-ui/core';
import {Link} from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DownIcon from '@material-ui/icons/ArrowDownward';
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
            <Box className='hero-section-title'>Boss Burger.</Box>
          </Typography>
          <Typography align='center' variant='p'>
            <Box className='hero-section-subtitle'>You've had the rest, come try the best!</Box>
          </Typography>
          <Button endIcon={<ChevronRightIcon/>} size='small' style={{margin:'.5em'}} color='secondary'>Try the best</Button>
          
            <Image className='hero-section-mobile-image' cloudName='mikiyas' publicId='c-item2_qewdgb'  secure="true"/>

          <div className='hero-section-grid'>
            {/* <img src='https://instagram.fadd1-1.fna.fbcdn.net/v/t51.2885-15/e35/c59.0.1122.1122a/s480x480/97237411_248415766235891_5659653975019641466_n.jpg?_nc_ht=instagram.fadd1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=idrsKOxco2gAX_YEahg&tp=1&oh=c877491441a7ade3d65bf08f13c6f7fc&oe=5FEC9883' className='hero-section-grid-img-short-2'/> */}
            <Image  cloudName='mikiyas' className='hero-section-grid-img-short-2' publicId='97237411_248415766235891_5659653975019641466_n_sxwi4c' secure="true"/>
            {/* <img src='./c-item2.jpg' className='hero-section-grid-img-long'/> */}
            <Image  cloudName='mikiyas' className='hero-section-grid-img-long' publicId='c-item2_qewdgb'   secure="true"/>
            {/* <img src='./c-item-3.jpg' className='hero-section-grid-img-short-1'/> */}
            <Image cloudName='mikiyas' className='hero-section-grid-img-short-1' publicId='c-item-3_i2lzp6' secure="true"> 
              <Transformation gravity="center" />
             </Image>
          
          </div>
        </div>
      </section>
      {/* <section>
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

// Iterate over events 
{/* <Grid spacing={2} container alignItems='center' justify='center' style={{padding:'1em'}}>
{Object.keys(this.props.events).map(item => {
  return(
  <Grid item md={4} sm={8} xs={12}  key={item}>
  <Card onClick={() => this.props.viewEvent(item)} className='codepen-card'>
    <CardActionArea>
         <img className="codepen-card-image" src="https://instagram.fadd1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.160.1280.1280a/s320x320/123495909_381318276556811_4479592698820581644_n.jpg?_nc_ht=instagram.fadd1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=jO0XwjbeYZkAX8nDqzN&tp=16&oh=22febfb99f65c3e0bad61e8cea9c512a&oe=5FE02BAF" alt=""/> 
        <Image className='codepen-card-image' cloudName='mikiyas' height='160' width='100%' publicId={this.props.events[item].img}  secure="true"/>

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
        </Grid>
)})}
</Grid> */}