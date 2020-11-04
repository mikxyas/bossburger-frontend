import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import CardGiftCardIcon from '@material-ui/icons/CardGiftcard';
import FastfoodIcon from '@material-ui/icons/Fastfood';


const useStyles = makeStyles({
  root: {
    width: "100%",
    height:'67.9px'
  },
});

export default function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [link, setlink] = React.useState('');
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${newValue}`);
    setlink(newValue)
  };

  return (
    <BottomNavigation  showLabels value={value} onChange={handleChange} className={classes.root}>
        {/* <BottomNavigationAction label="Home" value="" icon={<HomeIcon />} /> */}
        <BottomNavigationAction  label={<span style={{fontSize:'18px'}}>Order</span>} value="order" icon={<FastfoodIcon fontSize='medium'/>} />
        <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Offers</span>} value="offers" icon={<LocalOfferIcon fontSize='medium'/>} />
        <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Events</span>} value="events" icon={<EventIcon fontSize='medium'/>} />
        <BottomNavigationAction label={<span style={{fontSize:'18px'}}>Giveaways</span>} value="giveaways" icon={<CardGiftCardIcon fontSize='medium'/>} />
        {/* <BottomNavigationAction label="More" value="giveaways" icon={<MoreVertIcon />} /> */}
    </BottomNavigation>
  );
}