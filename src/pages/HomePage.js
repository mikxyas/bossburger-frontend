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
import {Image} from 'cloudinary-react'
import EventViewer from '../components/EventViewer'
import HomePageCarousel from '../components/HomepageCarousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";


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

     <header className='v-header container'>
          
      <div className="header-overlay"></div>
      <div className="header-content text-md-center">
        {/* <div className='hero-brand'> */}
        <Image  cloudName='mikiyas' className='hero-brand' publicId='bblogo_tapaum' height='350' width='635'  secure="true"/>

        {/* </div> */}
        {/* <img className='hero-brand' src='./boss-trns.png'/>  */}
        <Typography variant='h5' className='hero-subtitle'>
          <Box fontWeight={500}> You've had the rest come try the best</Box>
        </Typography>
        <br/>
        <div> 
          <ButtonGroup>
            <Link  style={{color:'white'}} to='/services'>
              <Button variant='outlined' color='inherit'>Services</Button>          
            </Link>
            <Button href='https://www.google.com/maps/place/BOSS+BURGER/@8.9975752,38.7849085,15z/data=!4m2!3m1!1s0x0:0x1717740e78fc081d?sa=X&ved=2ahUKEwiGgbOZvp7tAhUJGVkFHcriBsoQ_BIwFXoECBgQBQ' target='__blank__' endIcon={<OpenInNewIcon/>} color='inherit'>Location</Button>
            <Link style={{color:'white'}} to='/contact'>
            <Button variant='outlined' color='inherit'>Contact</Button>

            </Link>
          </ButtonGroup>
        </div>
        {/* <h1>Boss Burger</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id temporibus perferendis necessitatibus numquam amet impedit explicabo? Debitis quasi ullam aperiam!</p>
        <a class="btn">Find Out More</a> */}
      </div>
      {/* <div style={{display:'flex',justifySelf:'startz, marginTop:'1em'}}>
          <Avatar alt="Remy Sharp" src="./f-logo.png" />
          <Avatar alt="Remy Sharp" style={{marginLeft:'.5em'}} src="./insta-logo.webp" />
        </div> */}
      {/* <div className='fullscreen-video-wrap'>
        <img  src='./bossburgerhero-bg.gif'/>
      </div>  */}
    </header> 
    <div style={{padding:'.5em'}}>
      <Typography align='center' variant='h6'>The Best...</Typography>
    <HomePageCarousel/>
      
    </div>

    <Container style={{paddingTop:'1.5em',overflow:'hidden'}}>
      <Typography align='center' variant='h4'>Events</Typography>
        <Grid spacing={2} container alignItems='center' justify='center' style={{padding:'1em'}}>
            {Object.keys(this.props.events).map(item => {
              return(
              <Grid item md={4} sm={8} xs={12}  key={item}>
              <Card onClick={() => this.props.viewEvent(item)} className='codepen-card'>
                <CardActionArea>
                    {/* <img className="codepen-card-image" src="https://instagram.fadd1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.160.1280.1280a/s320x320/123495909_381318276556811_4479592698820581644_n.jpg?_nc_ht=instagram.fadd1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=jO0XwjbeYZkAX8nDqzN&tp=16&oh=22febfb99f65c3e0bad61e8cea9c512a&oe=5FE02BAF" alt=""/> */}
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
          </Grid>
    </Container>
    
    </>
    
  );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
})
export default connect(mapStateToProps, {loadEvents, viewEvent})(HomePage);
