import Typography  from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import React, { Component } from 'react'
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types'
import { List,Button, TextField, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import Collapse from '@material-ui/core/Collapse';
import DownIcon from '@material-ui/icons/ArrowDropDown'
import UpIcon from '@material-ui/icons/ArrowDropUp'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import RemoveCartIcon from '@material-ui/icons/RemoveShoppingCart'
import Radio from '@material-ui/core/Radio';
import {addAmountof, decreaseAmountof, deleteItem} from '../actions/cart'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {placeOrder} from '../actions/order'
import {toggleLocationDialog} from '../actions/locations'
import { Redirect } from 'react-router-dom';
import LocationDialog from '../components/LocationDialog'


class Checkout extends Component {
    static propTypes = {
        locations:PropTypes.object.isRequired,
        Amount:PropTypes.object.isRequired,
        locLoaded:PropTypes.bool.isRequired,
        AddedToCart:PropTypes.bool.isRequired,
        orderPlaced:PropTypes.bool.isRequired,
        cart:PropTypes.object.isRequired,
        addAmountof:PropTypes.func.isRequired,
        decreaseAmountof:PropTypes.func.isRequired,
        placeOrder:PropTypes.func.isRequired,
        deleteItem:PropTypes.func.isRequired,
        toggleLocationDialog:PropTypes.func.isRequired,
        TotalPrice:PropTypes.number.isRequired,
        locLength:PropTypes.number.isRequired,
      }
    constructor(props){
        super(props)
        this.state = {
            collapse:true,
            activeListItem:'',
            customer_phone:'',
            order_type:'DVY',
            loc_price:0,
            food_price:this.props.TotalPrice
        }
    }
    SubmitOrder = () => {
        const orderId = Object.keys(this.props.cart).map(id =>{
            return parseInt(id)
        })
        const order = {
            customer_location: parseInt(this.state.activeListItem),
            order: [...orderId],
            quantities: {...this.props.Amount},
            customer_phone:this.state.customer_phone,
            order_type:this.state.order_type,
            time_of_delivery: "09:18:24",
            Food_price: this.props.TotalPrice,
            delivery_price:this.state.loc_price
        }
        this.props.placeOrder(order)
        // console.log(JSON.stringify(order))
    }
    handleCollapse = () => {
        if(this.state.collapse === true){
            this.setState({
                collapse:false,
            })
        }else{
            this.setState({
                collapse:true
            })
        }  
    }
    handleList = (id) => {
        this.setState({
            activeListItem: id,
            collapse:false,
            loc_price:this.props.locations[id].locPrice
        })
    } 
    handleChange = (e) => {
        this.setState({
            order_type: e.target.value
        })
    } 
    handlePhone = (e) => {
        this.setState({
            customer_phone:e.target.value
        })
    }
    render() {
        if (this.props.orderPlaced){
            return <Redirect to='/orders'/>
        }
        return (
            <>
            <LocationDialog/>
            <div style={{padding:"2em", display:'flex', justifyContent:'center', flexDirection:'column',alignItems:'center'}}>
                <Paper style={{padding:"1em", paddingBottom:'.3em',width:'350px'}}>
                    <Typography align='center'>
                        What kind of order will this be?
                    </Typography>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={this.state.order_type}
                            onChange={this.handleChange}
                            variant='outlined'
                            >
                            <MenuItem value='DVY'>Delivery</MenuItem>
                            <MenuItem value='PCK'>Pickup</MenuItem>
                        </Select>
                    </div>
                </Paper>
                {this.state.order_type === 'DVY'
                ?<>
                    {this.props.locLength > 0
                ?<>
                <Paper style={{padding:"1em", marginTop:'1em',paddingBottom:'0em',width:'350px'}}>
                    <Typography align='center'>
                        Select your delivery location
                    </Typography>
                    {this.props.locLoaded
                    ?
                        <Collapse in={this.state.collapse} collapsedHeight={50}>
                        <Button variant='outlined' style={{marginTop:'.5em'}} fullWidth onClick={this.handleCollapse}>
                            {!this.state.collapse 
                            ?<>Expand<DownIcon/></>
                            :<>Collapse <UpIcon/></>
                            }
                        </Button>
                        {/* LOCATION LIST */}
                        <List>
                            {Object.keys(this.props.locations).map((item, key) => (
                            <>
                            <ListItem color='secondary' onClick={() => this.handleList(item)} key={key} button>
                                {/* <ListItemAvatar>
                                <Avatar
                                    alt={`Price:${this.props.locations[item].locName}`}
                                    src={<CheckIcon/>}
                                />
                                </ListItemAvatar> */}
                                <ListItemIcon>
                                <PersonPinCircleIcon/>
                                </ListItemIcon>
                                <ListItemText   primary={this.props.locations[item].locName } secondary={ this.props.locations[item].locPrice + ' ETB | ' + this.props.locations[item].locDistance + ' Km'}/>
                                <ListItemSecondaryAction>
                                {/* <IconButton onClick={() => this.props.deleteItem(this.props.cart[item].id)}><CloseIcon/></IconButton> */}
                                <Radio
                                    checked={this.state.activeListItem === item}
                                    onChange={() => this.handleList(item)}
                                    name="location-radio"
                                    color='primary'
                                />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            </>
                            ))}
                        </List>
                        </Collapse>

                    :<p>....Loading</p>                        
                }
             {!this.state.collapse && this.state.activeListItem != ''
                ?
                <>
                <Typography align='center'>Location set to "{this.props.locations[this.state.activeListItem].locName +', ' + this.props.locations[this.state.activeListItem].neighborhood}"</Typography>
                </>
                :null
             }   
            </Paper>
               
                </>
            :<Card style={{width:'350px', marginTop:'1em'}}>
            <CardContent>
                <Typography align='center' variant="h5" component="h2">
                Looks like you don't have any locations set
                </Typography>
                {/* <Typography className={classes.pos} color="textSecondary">
                
                </Typography> */}
                <Typography align='center' variant="body2" component="p">
                Create a location now
                <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={()=> this.props.toggleLocationDialog()} fullWidth variant='contained' color='primary'>Create Now</Button>
            </CardActions>
        </Card>
    }
                </>
                :null
                }
                
                
                <Divider/>
                <Paper style={{padding:"1em", marginTop:'1em',width:'350px'}}>
                    <Typography align='center'>Phone number for us to call</Typography>
                    <TextField fullWidth onChange={this.handlePhone}  label='Your Phone Number'/>
                </Paper>
                <br/>

                {/* ORDER CART */}
                <Paper style={{paddingTop:'1em'}}>
                <List style={{padding:"1em", marginTop:'1em',width:'350px'}}>
                    {Object.keys(this.props.cart).map((item, key) => {
                    return (
                    <>
                    <ListItem key={key} >
                        {/* <ListItemAvatar>
                        <Avatar
                            alt={`Price:${this.props.cart[item].price}`}
                            src={this.props.cart[item].img}
                        />
                        </ListItemAvatar> */}
                        <ListItemText primary={this.props.cart[item].name} secondary={this.props.cart[item].price * this.props.Amount[item] + 'ETB' +' | Amount: '+this.props.Amount[item]}/>
                        <ListItemSecondaryAction>
                        {this.props.Amount[item] === 1
                            ?<IconButton onClick={() => this.props.deleteItem(item, this.props.cart[item].price)}><RemoveCartIcon/></IconButton>
                            :<IconButton onClick={() => this.props.decreaseAmountof(item)}><RemoveIcon/></IconButton>
                        }
                        <IconButton onClick={() => this.props.addAmountof(item)}><AddIcon/></IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    </>
                    )
                    })}
                </List>
                <Typography align='center' style={{padding:'.3em'}}>
                    Food Price: {this.props.TotalPrice}
                    <br/>
                    {this.state.activeListItem >= 1
                    ?<>Delivery Price: {this.props.locations[this.state.activeListItem].locPrice} <br/> Total Price: {this.props.locations[this.state.activeListItem].locPrice + this.props.TotalPrice}</>
                    :null
                    }
                </Typography>
                </Paper>
                <Button onClick={() => this.SubmitOrder()} style={{width:'335px', marginTop:'1em', marginBottom:'75px'}} variant='contained' color='primary'>
                    Submit Order
                </Button>
            </div>
            </>
        )
    }
}

const mapStateToProps = state =>({
    locations: state.locations.locations,
    locLoaded: state.locations.locLoaded,
    cart: state.cart.cart,
    AddedToCart:state.cart.AddedToCart,
    Amount:state.cart.Amount,
    TotalPrice: state.cart.TotalPrice,
    locLength: state.locations.locLength,
    orderPlaced: state.order.orderPlaced,
})
      
export default connect(mapStateToProps, {addAmountof, decreaseAmountof, deleteItem, placeOrder, toggleLocationDialog})(Checkout);