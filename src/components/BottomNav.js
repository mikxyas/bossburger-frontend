import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom'
// import HomeIcon from '@material-ui/icons/Men';
import EventIcon from '@material-ui/icons/Event';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GalleryIcon from '@material-ui/icons/PhotoLibrary'
import {connect} from 'react-redux'
import {ChangeLink} from '../actions/ui'
import CartDrawer from './CartDrawer'

 
const useStyles = makeStyles({
  root: {
    width: "100%",
    height:'64px',
    background:'#f5ede8',

  },
});

 function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [link, setlink] = React.useState('');
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.ChangeLink(newValue)
    history.push(`/${newValue}`);
    setlink(newValue)
  };

  return (
    <>
    <CartDrawer/>   
    <BottomNavigation  showLabels color='secondary' value={props.activeLink} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Menu</span>} value="menu" icon={<MenuBookIcon />} />
        <BottomNavigationAction  label={<span style={{fontSize:'18px'}}>Order</span>} value="order" icon={<FastfoodIcon />} />
        {/* <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Offers</span>} value="offers" icon={<LocalOfferIcon fontSize='medium'/>} /> */}
        <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Gallery</span>} value="gallery" icon={<GalleryIcon />} />
        <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Events</span>} value="events" icon={<EventIcon />} />
        
        {/* <BottomNavigationAction label={<span style={{fontSize:'18px'}}>More</span>} value="giveaways" icon={<MoreIcon fontSize='medium'/>} /> */}
        {/* <BtmNavMoreBtn/> */}
        {/* <BottomNavigationAction label="More" value="giveaways" icon={<MoreVertIcon />} /> */}
    </BottomNavigation>
    </>
  );
}

const mapStateToProps = state => ({
  activeLink: state.ui.link
})
export default connect(mapStateToProps, {ChangeLink})(BottomNav)