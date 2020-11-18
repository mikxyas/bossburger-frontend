import React from 'react';
import {Button, Container,Collapse, Paper,Divider,IconButton, Typography, Box, ButtonGroup} from '@material-ui/core';
import Link from '@material-ui/core/Link'
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
  render(){
  return (
    <>
    <header className='v-header container'>
          
      <div className="header-overlay"></div>
      <div className="header-content text-md-center">
        <div className='hero-brand'>
          
        </div>
        {/* <img className='hero-brand' src='./boss-trns.png'/>  */}
        <Typography variant='h5' className='hero-subtitle'>
          <Box fontWeight={500}> You've had the rest come try the best</Box>
        </Typography>
        {/* <ButtonGroup>
          <IconButton><InstaIcon/></IconButton> 
          <IconButton><FacebookIcon/></IconButton>
        </ButtonGroup> */}
        {/* <h1>Boss Burger</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id temporibus perferendis necessitatibus numquam amet impedit explicabo? Debitis quasi ullam aperiam!</p>
        <a class="btn">Find Out More</a> */}
      </div>
      <div className='fullscreen-video-wrap'>
        <img  src='./bossburgerhero-bg.gif'/>
      </div> 
    </header>
    </>
    
  );
  }
}

export default HomePage;
