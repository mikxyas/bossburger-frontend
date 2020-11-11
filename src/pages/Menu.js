import React from 'react'
import {Button} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {toggleSignupDialog} from '../actions/auth'
import {getMenuItems} from '../actions/MenuItems';
import {addtoCart, deleteItem} from '../actions/cart'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star'
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ReactStars from "react-rating-stars-component";
import EmptyStar from '@material-ui/icons/StarOutlined';
import FullStar from '@material-ui/icons/Star';
import HalfStar from '@material-ui/icons/StarHalf';
import UserIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  gradient: {
    background: 'linear-gradient(45deg, #3f1313 15%, #bb0404 90%)'

  },
  
}))

class Menu extends React.Component {
  static propTypes = {
    MenuItems:PropTypes.array.isRequired,
    itemLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }
    constructor(props){
      super(props);
      this.state = {
        value: 0,
        isLoaded: false,
        items: [],
        itemToFetch: 'burgers',
        SelectedMenuItems: this.props.Burgers,
      }
    }
    InitialFetch() {
      this.props.getMenuItems()
      setTimeout(function(){
      this.setState({SelectedMenuItems:this.props.Burgers,isLoaded:true})
        console.log(this.state.SelectedMenuItems)
      }.bind(this),4000)
    }
    FetchBurgers = () => {
      this.setState({SelectedMenuItems: this.props.Burgers})
    }
    FetchFries = () => {
      this.setState({SelectedMenuItems: this.props.Fries})
    }
    FetchExtras = () => {
      this.setState({SelectedMenuItems: this.props.Extras})
    }
    FetchBeverages = () => {
      this.setState({SelectedMenuItems: this.props.Beverages})
    }

   componentDidMount(){
      this.InitialFetch()
    }
    handleMenu = (event, newItem) => {
      this.setState({SelectedMenuItems: this.props.newItem})
    } 
    handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };
    render(){
    return (
      // Fragment was here
      <div style={{overflow:"hidden"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Tabs
            p={{ xs: 2, sm: 3, md: 4 }}
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            aria-label="disabled tabs example"
          >
            <Tab onClick={() => this.FetchBurgers()} label="Burgers"/>
            <Tab onClick={() => this.FetchExtras()} label="Extras"/>
            <Tab onClick={() => this.FetchBeverages()} label="Beverages"/>
            <Tab onClick={() => this.FetchFries()} label="Fries"/>
          </Tabs>
        </div>
        {/* {this.state.itemLoading ?
        <div style={{display:"flex",height:"80vh", alignItems:"center",justifyContent:"center"}}>
        <Loading LoaderIcon={<FastFoodIcon/>} load={this.state.isLoaded}/> 
      </div> */}
          
          
          <Grid justify='center' align='center' container spacing={2} style={{padding:"2em",overflowY:"hidden"}}>
            {this.state.SelectedMenuItems.map(item => (
              <Grid key={item.name} md={4} sm={8} xs={12}>
                <Card  style={{borderRadius:'20px',width:'350px', marginBottom:'1em'}}>
                  <CardContent>
                    <Paper elevation={2} style={{borderRadius:'20px',padding:'.5em',backdropFilter: 'saturate(180%) blur(20px)',background:'rgba(255,255,255,0.4)'}}>
                    <Typography variant="h5" component="h2">
                          {item.name}
                        </Typography> 
                        <Typography variant="body2" color="textPrimary" component="h5">
                          {item.price} Birr
                        </Typography>
                        <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <ReactStars
                          count={5}
                          value={4.5}
                          // onChange={ratingChanged}
                          style={{margin:'auto'}}
                          size={30}
                          isHalf={true}
                          emptyIcon={<EmptyStar/>}
                          halfIcon={<HalfStar/>}
                          fullIcon={<FullStar/>}
                          activeColor="#ffd700"
                        />10<UserIcon/>
                        </div>
                    </Paper>  
                    </CardContent>
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="250"
                      width='200'
                      image={item.img}
                      title={item.name}
                    />
                  <CardActions>
                  {this.props.isAuthenticated
                    ?<Link to='/checkout'>
                      <Button style={{borderRadius:'20px'}} onClick={() => this.props.addtoCart(item)}  variant='contained' color='primary'>Order</Button>
                    </Link> 
                    :  <Button onClick={() => this.props.toggleSignupDialog()} style={{borderRadius:'20px'}} variant='contained' color='primary'>Order</Button>
                    }
                    {this.props.cart[item.id]
                    ?<Button style={{borderRadius:'20px', marginLeft:'auto'}}  onClick={() => this.props.deleteItem(item.id, item.price)}  color='secondary' variant='contained'>Remove From Cart</Button>
                    :<Button style={{borderRadius:'20px', marginLeft:'auto'}} color='secondary'  onClick={() => this.props.addtoCart(item)}  variant='contained'>Add to Cart</Button>
                    }
                  </CardActions>
                </Card>
    
              </Grid>
              ))} 
          </Grid>
         
        </div>
          
      
    );
  }
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
  itemsLoading: state.MenuItems.itemsLoading,
  Burgers: state.MenuItems.MenuItems.filter(item => item.food_type == 'BRG'),
  Extras: state.MenuItems.MenuItems.filter(item => item.food_type == 'EXT'),
  Fries: state.MenuItems.MenuItems.filter(item => item.food_type == 'FRI'),
  Beverages: state.MenuItems.MenuItems.filter(item => item.food_type == 'BVG'),
  cart: state.cart.cart
})

export default connect(mapStateToProps, { getMenuItems, addtoCart, toggleSignupDialog,deleteItem })(Menu);