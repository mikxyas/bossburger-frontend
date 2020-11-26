import React from 'react'
import {AppBar, Button, Box} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {toggleSignupDialog} from '../actions/auth'
import {getMenuItems, rateItem,makeAvailable,makeunAvailable,toggleAddMenuItem, deleteMenuItem} from '../actions/MenuItems';
import {addtoCart, deleteItem} from '../actions/cart'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddMenuItem from '../components/AddMenuItem'
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
import FullStar from '@material-ui/icons/Grade';
import HalfStar from '@material-ui/icons/StarHalf';
import UserIcon from '@material-ui/icons/People';
import { Image } from 'cloudinary-react';
import AddIcon from '@material-ui/icons/Add'

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
    isAdmin: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
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
    round (value, step) {
      console.log(value)
      step || (step = 1.0);
      var inv = 1.0 / step;
      console.log(Math.round(value * inv) / inv) 
      return Math.round(value * inv) / inv;
  }
    handleRating = item => (newRating) => {
      if(item.rating == null){
        item.rating = new Object()
      }
      // var userId = this.props.user.id
      item.rating[this.props.user.id] = newRating
      this.props.rateItem(item)
      // console.log(Object.keys(item.rating).length)
    }
    render(){
    return (
      <div style={{overflow:"hidden"}}>
        <AddMenuItem/>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Tabs
            p={{ xs: 2, sm: 3, md: 4 }}
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
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
      
          {this.props.isAdmin
          ?<Button endIcon={<AddIcon/>} onClick={() => this.props.toggleAddMenuItem()} style={{marginTop:'1em', marginLeft:'1em'}} variant='contained' color='primary'>Add Menu Item</Button>
          :null
          }
          <Grid justify='center' align='center' container spacing={2} style={{padding:"2em",overflowY:"hidden"}}>
            {this.state.SelectedMenuItems.map(item => {
              if(item.rating != null){
                var rating = 0
                var sum = 0
                rating = Object.keys(item.rating).map(userID=> {
                  return sum += item.rating[userID] 
                })
              }
              return(
              <Grid item key={item.id} md={4} sm={8} xs={12} style={{margin:'auto'}}>
                <Card variant='outlined' style={{borderRadius:'5px',width:'300px', marginBottom:'0em'}}>
                  <CardContent>
                    {item.available
                    ?null
                    :<Typography>This item is not available</Typography>

                    }
                    <Paper elevation={2} style={{borderRadius:'5px',padding:'1em',background:'rgba(255,255,255,0.4)'}}>
                    <Typography variant="h5" component="h2">
                          <Box fontSize='25'>{item.name}</Box>
                        </Typography> 
                        <Typography variant="h7" color="textPrimary" component="p">
                          {item.price} Birr
                        </Typography>
                        {this.props.user == null
                        ?
                        <div style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                         <ReactStars
                          count={5}
                          value={item.rating == null ?0 :this.round(sum/Object.keys(item.rating).length, 0.5)}

                          // onChange={ratingChanged}
                          style={{margin:'auto'}}
                          size={27}
                          // isHalf={true}
                          emptyIcon={<EmptyStar/>}
                          halfIcon={<HalfStar/>}
                          fullIcon={<FullStar/>}
                          onClick={() => this.props.toggleSignupDialog()}
                          // onChange={item.rating == null
                          //   ?this.handleNewRating(item)
                          //   :this.handleRating(item)
                          // }
                          activeColor="#ffd700"
                        />
                        <Typography style={{marginTop:'-.5em' ,fontSize:'12px'}}> ({item.rating == null ?<>0</> :<>{Object.keys(item.rating).length}</>} Ratings)</Typography>

                        </div>
                          :
                        <div style={{display:'flex', alignItems:'center',flexDirection:'column',justifyContent:'center'}}>
                          <ReactStars
                          count={5}
                          value={item.rating == null ?0 :this.round(sum/Object.keys(item.rating).length, 0.5)}
                          // onChange={ratingChanged}
                          style={{margin:'auto'}}
                          size={27}
                          isHalf={true}
                          emptyIcon={<EmptyStar/>}
                          halfIcon={<HalfStar/>}
                          fullIcon={<FullStar/>}
                          onChange={this.handleRating(item)}
                          activeColor="#ffd700"
                        /> 
                        <Typography style={{marginTop:'-.5em',fontSize:'12px'}}> ({item.rating == null ?<>0</> :<>{Object.keys(item.rating).length}</>} Ratings)</Typography>
                        </div>
                        }
                    </Paper>  
                    </CardContent>
                    {item.food_type === 'BRG'
                      ?<Image cloudName='mikiyas' height='178' width='178' publicId={item.img} secure="true"/>
                        // ?<h1>hi</h1>
                    //   <CardMedia
                    //   component="img"
                    //   alt={item.name}
                    //   height="178px"
                    //   style={{width:'178px'}}
                    //   image={item.food_pic}
                    //   title={item.name}
                    // />
                    :null
                  }
                  <CardActions>
                  
                    {this.props.cart[item.id]
                    ?<>
                    <Button style={{borderRadius:'20px', margin:'auto'}}  onClick={() => this.props.deleteItem(item.id, item.price)}  color='secondary' variant='contained'>Remove From Cart</Button>
                    </>
                    :<>
                    {this.props.isAuthenticated
                    ?<Link to='/checkout'>
                      <Button disabled={!item.available} style={{borderRadius:'20px'}} onClick={() => this.props.addtoCart(item)}  variant='contained' color='primary'>Order</Button>
                    </Link> 
                    :  <Button disabled={!item.available} onClick={() => this.props.toggleSignupDialog()} style={{borderRadius:'20px'}} variant='contained' color='primary'>Order</Button>
                    }
                    <Button disabled={!item.available} style={{borderRadius:'20px', marginLeft:'auto'}} color='secondary'  onClick={() => this.props.addtoCart(item)}  variant='contained'>Add to Cart</Button>
                    </>
                    }
                  </CardActions>
                </Card>
                {this.props.isAdmin
                    ?<Paper style={{width:'300px', display:'flex',padding:'.5em',justifyContent:'space-between',borderRadius:'0px 0px 20px 20px'}}>
                        <Button style={{borderRadius:'20px'}} onClick={() => this.props.deleteMenuItem(item)} variant='outlined' size='small'  color='secondary'>Delete</Button>
                        {item.available 
                        ?<Button style={{borderRadius:'20px'}}  size='small' variant='outlined' onClick={() => this.props.makeunAvailable(item)} >Make Unavailable</Button>
                        :<Button style={{borderRadius:'20px'}}  size='small' variant='outlined' onClick={() => this.props.makeAvailable(item)}>Make Available</Button>

                        }
                        
                    </Paper>
                    :null
                }
              </Grid>
              )})} 
          </Grid>
         
        </div>
          
      
    );
  }
}

const mapStateToProps = state =>({
  isAdmin:state.auth.isAdmin,
  user:state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  itemsLoading: state.MenuItems.itemsLoading,
  Burgers: state.MenuItems.MenuItems.filter(item => item.food_type == 'BRG'),
  Extras: state.MenuItems.MenuItems.filter(item => item.food_type == 'EXT'),
  Fries: state.MenuItems.MenuItems.filter(item => item.food_type == 'FRI'),
  Beverages: state.MenuItems.MenuItems.filter(item => item.food_type == 'BVG'),
  cart: state.cart.cart
})

export default connect(mapStateToProps, { getMenuItems, rateItem,makeAvailable,makeunAvailable, addtoCart, deleteMenuItem,toggleAddMenuItem,toggleSignupDialog,deleteItem })(Menu);