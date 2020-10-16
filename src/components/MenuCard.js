import React from 'react'
import {Button,ButtonGroup, Container} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import StarIcon from '@material-ui/icons/Star'
// import IconButton from '@material-ui/core/IconButton'



const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: '100px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      textAlign:"center",
      width:'11em'
    },
    cover: {
      width: "100%",
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));
export default function MenuCard(props) {
    const classes = useStyles();
    const theme = useTheme();
    return (
      <div className='menu-item-card'>
        <div className='menu-head'>
          <h3 className='menu-header'>
            {props.itemName}
          </h3>
          <h3 className='item-price'>
            {props.itemPrice}
          </h3>
        </div>
        <div className='card-image'>
          <img src={props.img}/>
        </div>
        <IconButton>
        <StarIcon style={{color:'orange'}}/><StarIcon style={{color:'orange'}}/><StarIcon style={{color:'orange'}}/><StarIcon style={{color:'orange'}}/><StarIcon/>
        </IconButton>
        {/* <ButtonGroup> */}
        <div className='btn-group'>
        <Button className={classes.root} variant='contained' color='primary'>Order</Button>
        <Button className={classes.root} variant='contained'>Add to Cart</Button>
        </div>
        {/* </ButtonGroup> */}
      </div>
    
    )
}
