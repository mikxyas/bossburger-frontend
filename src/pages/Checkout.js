import Typography  from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import React, { Component } from 'react'
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types'
import { List,Button, TextField, IconButton, ListItemSecondaryAction, CardHeader, CardActionArea } from '@material-ui/core';
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
import {loadUser} from '../actions/auth'
import {toggleLocationDialog} from '../actions/locations'
import { Redirect } from 'react-router-dom';
import LocationDialog from '../components/LocationDialog'
import {Link} from 'react-router-dom';
import {Chip} from '@material-ui/core'


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
        user:PropTypes.object.isRequired
      }
    constructor(props){
        super(props)
        this.state = {
            collapse:true,
            activeListItem:null,
            customer_phone:this.props.user.phone_number,
            order_type:'DVY',
            loc_price:0,
            showLocDesc:false,
            food_price:this.props.TotalPrice,
            TimeData:[],
            selectedPickupTime:'',
            dateTimeRightNow:''
        }
    }
    handleShowLocDesc = () => {
        if(this.state.showLocDesc === false){
            this.setState({
                showLocDesc:true
            })
        }else{
            this.setState({
                showLocDesc:false
            })
        }
    }
    handletimeData = () => {
        var CurrentDateObj = new Date();
        var FirstDateObj = new Date();
        var SecDateObj = new Date();
        var ThirdDateObj = new Date();
        var FourthDateObj = new Date();
        var FifthDateObj = new Date();
        FirstDateObj.setTime(CurrentDateObj.getTime() + (30 * 60 * 1000));
        SecDateObj.setTime(FirstDateObj.getTime() + (30 * 60 * 1000));
        ThirdDateObj.setTime(SecDateObj.getTime() + (30 * 60 * 1000));
        FourthDateObj.setTime(ThirdDateObj.getTime() + (30 * 60 * 1000));
        FifthDateObj.setTime(FourthDateObj.getTime() + (30 * 60 * 1000));
        this.setState({
            TimeData:[
            {time:FirstDateObj, key:1},
            {time:SecDateObj, key:2},
            {time:ThirdDateObj,key:3},
            {time:FourthDateObj, key:4}
            ],
            dateTimeRightNow:CurrentDateObj
        })
    }
    handleTimeChips = (time) => {
        this.setState({
            selectedPickupTime:time
        })
        console.log(this.state.selectedPickupTime)
    }
    SubmitOrder = () => {
        let orderType = ''
        let deliveryPrice = 0
        let pickupTime = null
        const orderId = Object.keys(this.props.cart).map(id =>{
            return parseInt(id)
        })
        if(this.props.user.prevOrdType === 'Delivery'){
            orderType = 'DVY'
            deliveryPrice = this.props.locations[this.props.usersSelectedLoc].locPrice
            pickupTime = new Date()
        }else{
            orderType = 'PCK'
            pickupTime = this.state.selectedPickupTime
        }
        const order = {
            customer_location: this.props.user.primary_loc_id,
            // customer:this.props.user.id,
            order: [...orderId],
            quantities: {...this.props.Amount},
            customer_phone:this.props.user.phone_number,
            order_type:orderType,
            time_delivered: new Date(),
            Food_price: this.props.TotalPrice,
            delivery_price:deliveryPrice,
            extras: {...this.props.Extras},
            pickup_time:pickupTime
        }
        this.props.placeOrder(order)
        console.log(order)
    }
   

    componentDidMount(){
        this.handletimeData()
    }
    render() {
        if(this.props.orderPlaced){
            return <Redirect to='/orders'/>
        }
        if(this.props.TotalPrice === 0){
            return <Redirect to='/order'/>
        }
        
        return (
            <>
            
                <div className='checkout-cont'>
                    {this.props.user.prevOrdType === 'Pickup'
                    ?<div className='checkout-item'>
                    <Typography variant='h4' className='checkout-item-header'>Pickup time {this.state.selectedPickupTime === '' ?<span style={{fontSize:'15px', color:'red'}}>*Required</span> :null}</Typography>
                    <div className='dialog-time-cont' >
                    <Chip
                        color={this.state.selectedPickupTime === this.state.dateTimeRightNow ? 'secondary' :'default'}
                        onClick={() => this.handleTimeChips(this.state.dateTimeRightNow)}
                        clickable
                        label='Right now'
                        // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                        className='dialog-time-chip'
                            />
                    {this.state.TimeData.map(time => (
                            <Chip
                                key={time.key}
                                color={this.state.selectedPickupTime === time.time ?'secondary' :'default'}
                                // icon={icon}
                                clickable
                                onClick={() => this.handleTimeChips(time.time)}
                                label={time.time.toLocaleTimeString()}
                                // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                className='dialog-time-chip'
                            />
                    ))

                    }
                        </div>
                </div>
                : null
                }
                {this.props.user.prevOrdType === 'Delivery'
                    ?<div className='checkout-item'>
                    <Typography variant='h4' className='checkout-item-header'>Delivery Location</Typography>
                    <div className='checkout-loc-card-cont'>
                        <Card variant='outlined' className='checkout-loc-card'>
                            <CardActionArea onClick={() => this.handleShowLocDesc()}>
                                <CardHeader
                                avatar={
                                   <PersonPinCircleIcon/> 
                                }
                                title={this.props.locations[this.props.usersSelectedLoc].locName}
                                subheader={this.props.locations[this.props.usersSelectedLoc].locDistance + 'Km | ' + this.props.locations[this.props.usersSelectedLoc].locPrice + 'ETB'}
                                action={
                                    <IconButton><DownIcon/></IconButton>
                                }
                                />
                            </CardActionArea>
                            <Collapse in={this.state.showLocDesc} collapsedHeight={0}>
                                <CardContent>
                                    <Typography className='desc-table-item'>
                                    <span>Neighbourhood</span> {this.props.locations[this.props.usersSelectedLoc].neighborhood}
                                    </Typography>
                                    <Typography className='desc-table-item'>
                                    <span style={{marginRight:'2em'}}>Description</span> {this.props.locations[this.props.usersSelectedLoc].locDesc}
                                    </Typography>
                                    <Typography className='desc-table-item'>
                                    <span>Distance</span> {this.props.locations[this.props.usersSelectedLoc].locDistance + ' Km'}
                                    </Typography>
                                    <Typography className='desc-table-item'>
                                    <span>Price</span> {this.props.locations[this.props.usersSelectedLoc].locPrice + ' Birr'}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>
                </div>
    
            :null        
            }
                <div className='checkout-item'>
                    <Typography variant='h4' className='checkout-item-header'>Phone we will call</Typography>
                    <div className='checkout-loc-card-cont'>
                        <TextField value={this.state.customer_phone}  fullWidth color='secondary'className='normal-form' variant='outlined' label='Phone number'/>
                    </div>
                </div>
                
                
                    
                    <div className='checkout-item'>
                        <Typography variant='h4' className='checkout-item-header'>Cart</Typography>
                        <div className='checkout-loc-card-cont'>
                            <Paper variant='outlined' className='checkout-item-cart-cont' >
                            <List style={{width:'100%'}}>
                                {Object.keys(this.props.cart).map((item, key) => {
                                return (
                                <>
                                <ListItem key={key} >
                                    {/* <ListItemAvatar>
                                    <Avatar
                                        alt={`Price:${this.props.cart[item].price}`}
                                        src={this.props.cart[item].img}
                                    />
                                    </ListItemAvatar>  */}
                                    {/* <ListItemText  primary={<><>{this.props.cart[item].name}</> 
                                    <>{this.props.Extras[item] != undefined
                                            ?<> + {this.props.menuItems.filter(ext => ext.id === this.props.Extras[item])[0].name}</>
                                            :null
                                    }</></>} 
                                    secondary={<><>{this.props.cart[item].price * this.props.Amount[item] + 'ETB'}</> 
                                    <>{this.props.Extras[item] != undefined
                                            ?<> + {this.props.menuItems.filter(ext => ext.id === this.props.Extras[item])[0].price + ' | Amount ' + this.props.Amount[item]}</>
                                            :null
                                }</> </>} /> */}
                                    <ListItemText primary={this.props.cart[item].name} secondary={this.props.cart[item].price * this.props.Amount[item] + 'ETB' +' | Amount: '+this.props.Amount[item]}/> 
                                    <ListItemSecondaryAction>
                                    {this.props.Amount[item] === 1
                                        ?<IconButton onClick={() => this.props.deleteItem(item, this.props.cart[item].price)}><RemoveCartIcon/></IconButton>
                                        :<IconButton onClick={() => this.props.decreaseAmountof(item)}><RemoveIcon/></IconButton>
                                    }
                                    <IconButton onClick={() => this.props.addAmountof(item)}><AddIcon/></IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {/* <Divider /> */}
                                </>
                                )
                                })}
                            </List>
                        </Paper>
                        </div>
                    </div> 
                    <div className='checkout-item' >
                        <div style={{margin:'1em'}}>
                            <Typography className='desc-table-item'>
                                <span>Food Price</span> {this.props.TotalPrice + 'ETB'}
                            </Typography>
                            {this.props.user.prevOrdType === 'Pickup'
                                ?null
                                :<Typography className='desc-table-item'>
                                <span>Delivery Price</span> {this.props.locations[this.props.usersSelectedLoc].locPrice + 'ETB'}
                                </Typography>

                            }
                            
                            <Divider style={{margin:'.5em'}} variant='middle'/>
                            <Typography  className='desc-table-item'>
                                <span>Total Price</span> {this.props.user.prevOrdType === 'Delivery' ? this.props.locations[this.props.usersSelectedLoc].locPrice  + this.props.TotalPrice + 'ETB' :this.props.TotalPrice + 'ETB'}
                            </Typography>
                        </div>
                        {/* <Typography variant='h4' className='checkout-item-header'></Typography> */}
                        
                    </div> 
                    
                    <Button  color='secondary' variant='contained' style={{borderRadius:'20px', width:'200px'}} onClick={() => this.SubmitOrder()} size='large'>Place Order</Button>
                              
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
    usersSelectedLoc: state.auth.user.primary_loc_id,
    user: state.auth.user,
    Extras: state.cart.Extras,
    menuItems: state.MenuItems.MenuItems
})
      
export default connect(mapStateToProps, {addAmountof, decreaseAmountof, deleteItem, placeOrder, toggleLocationDialog, loadUser})(Checkout);

{/* <LocationDialog/>
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
                         LOCATION LIST 
                        <List>
                            {Object.keys(this.props.locations).map((item, key) => (
                            <>
                            <ListItem color='secondary' onClick={() => this.handleList(item)} key={key} button>
                                 <ListItemAvatar>
                                <Avatar
                                    alt={`Price:${this.props.locations[item].locName}`}
                                    src={<CheckIcon/>}
                                />
                                </ListItemAvatar> 
                                <ListItemIcon>
                                <PersonPinCircleIcon/>
                                </ListItemIcon>
                                <ListItemText   primary={this.props.locations[item].locName } secondary={ this.props.locations[item].locPrice + ' ETB | ' + this.props.locations[item].locDistance + ' Km'}/>
                                <ListItemSecondaryAction>
                                 <IconButton onClick={() => this.props.deleteItem(this.props.cart[item].id)}><CloseIcon/></IconButton> 
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
                 <Typography className={classes.pos} color="textSecondary">
                
                </Typography> 
                <Typography align='center' variant="body2" component="p">
                Create a location now
                <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Link style={{width:'100%'}} to='/new/locations'>
                    <Button fullWidth variant='contained' color='primary'>Create Now</Button>
                </Link>
            </CardActions>
        </Card>
    }
                </>
                :null
                }
                
                
                <Divider/>
                <Paper style={{padding:"1em", marginTop:'1em',width:'350px'}}>
                    <Typography  align='center'>Phone number for us to call</Typography>
                    <TextField fullWidth  onChange={this.handlePhone}  label='Your Phone Number'/>
                </Paper>
                <br/>

                ORDER CART 
                <Paper style={{paddingTop:'1em'}}>
                <List style={{padding:"1em", marginTop:'1em',width:'350px'}}>
                    {Object.keys(this.props.cart).map((item, key) => {
                    return (
                    <>
                    <ListItem key={key} >
                        <ListItemAvatar>
                        <Avatar
                            alt={`Price:${this.props.cart[item].price}`}
                            src={this.props.cart[item].img}
                        />
                        </ListItemAvatar> 
                        <ListItemText  primary={<><>{this.props.cart[item].name}</> 
                        <>{this.props.Extras[item] != undefined
                                ?<> + {this.props.menuItems.filter(ext => ext.id === this.props.Extras[item])[0].name}</>
                                :null
                        }</></>} 
                        secondary={<><>{this.props.cart[item].price * this.props.Amount[item] + 'ETB'}</> 
                        <>{this.props.Extras[item] != undefined
                                ?<> + {this.props.menuItems.filter(ext => ext.id === this.props.Extras[item])[0].price + ' | Amount ' + this.props.Amount[item]}</>
                                :null
                    }</> </>} />
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
                    {this.state.activeListItem >= 1 && this.state.order_type === 'DVY'
                    ?<>Delivery Price: {this.props.locations[this.state.activeListItem].locPrice} <br/> Total Price: {this.props.locations[this.state.activeListItem].locPrice + this.props.TotalPrice}</>
                    :null
                    }
                </Typography>
                </Paper>
                <Button onClick={() => this.SubmitOrder()} style={{width:'335px', marginTop:'1em', marginBottom:'75px'}} variant='contained' color='primary'>
                    Submit Order
                </Button>
            </div> */}