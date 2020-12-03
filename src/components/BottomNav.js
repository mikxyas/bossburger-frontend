import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom'
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
// import HomeIcon from '@material-ui/icons/Men';
import EventIcon from '@material-ui/icons/Event';
import MoreIcon from '@material-ui/icons/MoreVert';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BtmNavMoreBtn from './BtmNavMoreBtn'
import {connect} from 'react-redux'
import {ChangeLink} from '../actions/ui'

const useStyles = makeStyles({
  root: {
    width: "100%",
    height:'60px'
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
    <BottomNavigation  showLabels color='secondary' value={props.activeLink} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Menu</span>} value="menu" icon={<MenuBookIcon />} />
        <BottomNavigationAction  label={<span style={{fontSize:'18px'}}>Order</span>} value="order" icon={<FastfoodIcon fontSize='medium'/>} />
        {/* <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Offers</span>} value="offers" icon={<LocalOfferIcon fontSize='medium'/>} /> */}
        <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Events</span>} value="events" icon={<EventIcon fontSize='medium'/>} />
        {/* <BottomNavigationAction label={<span style={{fontSize:'18px'}}>More</span>} value="giveaways" icon={<MoreIcon fontSize='medium'/>} /> */}
        <BtmNavMoreBtn/>
        {/* <BottomNavigationAction label="More" value="giveaways" icon={<MoreVertIcon />} /> */}
    </BottomNavigation>
  );
}

const mapStateToProps = state => ({
  activeLink: state.ui.link
})
export default connect(mapStateToProps, {ChangeLink})(BottomNav)