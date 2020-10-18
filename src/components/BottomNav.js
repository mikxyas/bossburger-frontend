import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom'

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import CardGiftCardIcon from '@material-ui/icons/CardGiftcard';
import FastfoodIcon from '@material-ui/icons/Fastfood';


const useStyles = makeStyles({
  root: {
    width: "100%",
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
        <BottomNavigationAction label="Order" value="order" icon={<FastfoodIcon />} />
        <BottomNavigationAction label="Offers" value="offers" icon={<LocalOfferIcon />} />
        <BottomNavigationAction label="Events" value="events" icon={<EventIcon />} />
        <BottomNavigationAction label="Giveaways" value="giveaways" icon={<CardGiftCardIcon />} />
    </BottomNavigation>
  );
}