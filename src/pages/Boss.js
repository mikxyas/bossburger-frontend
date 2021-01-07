import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {loadOrdersForAdmin,loadAllOrdersForAdmin, updateOrder} from '../actions/order'
import {loadAdminLoc} from '../actions/locations'
import {loadAllUser} from '../actions/auth'
import {Badge, Button, Chip, Divider, IconButton, ListItemText, Paper, Typography} from '@material-ui/core'
import UserIcon from '@material-ui/icons/AccountCircle'
import {getMenuItems} from '../actions/MenuItems'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import Collapse from '@material-ui/core/Collapse'
import DownIcon from '@material-ui/icons/ArrowDropDown'
import UpIcon from '@material-ui/icons/ArrowDropUp'


class Boss extends Component {
  constructor(props){
    super(props);
    this.state={
      collapse: null,
      LocCollapse: null
    }
  }
    static propTypes = {
        isAdmin: PropTypes.bool.isRequired,
        orders: PropTypes.object.isRequired,
        AllOrders: PropTypes.object.isRequired,
        // AllUsers: PropTypes.object.isRequired,
        // locations: PropTypes.object.isRequired,
        // loadOrdersFromAdmin: PropTypes.func.isRequired,
        // loadAdminLoc: PropTypes.func.isRequired,
        // loadAllUser: PropTypes.func.isRequired,
        // getMenuItems: PropTypes.func.isRequired,
        menuItems: PropTypes.array.isRequired
    }
    parseDate(input) {
      var parts = input.match(/(\d+)/g);
      // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
    }
    timeSince(time) {
      switch (typeof time) {
        case 'number':
          break;
        case 'string':
          time = +new Date(time);
          break;
        case 'object':
          if (time.constructor === Date) time = time.getTime();
          break;
        default:
          time = +new Date();
      }
      var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
      ];
      var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;
    
      if (seconds == 0) {
        return 'Just now'
      }
      if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
      }
      var i = 0,
        format;
      while (format = time_formats[i++])
        if (seconds < format[0]) {
          if (typeof format[2] == 'string')
            return format[list_choice];
          else
            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
      return time;
    }
    handleCollapse = (id) => {
      if(this.state.collapse != id){
        this.setState({
            collapse:id,
        })
    }else{
        this.setState({
            collapse:null
        })
    } 
    }
    handleLocCollapse = (id) => {
      if(this.state.LocCollapse != id){
        this.setState({
            LocCollapse:id,
        })
    }else{
        this.setState({
            LocCollapse:null
        })
    } 
    }
    componentDidMount(){
      this.props.loadAllOrdersForAdmin()
      this.props.getMenuItems()
      this.props.loadOrdersForAdmin()
     
    }
    render() {
        return (
            <>
            {this.props.isAdmin 
            
            //   <div className='stat-cont'>
            //     <Paper className='stat-card' variant='outlined'>
            //       <Typography>{Object.keys(this.props.AllOrders).length}</Typography>
            //     </Paper>
            //     <Paper className='stat-card' variant='outlined'>
            //       <h1>Amount of orders delivered</h1>
            //       <Typography>{Object.keys(this.props.AllOrders).length - Object.keys(this.props.orders).length}</Typography>

            //     </Paper>
            //     <Paper className='stat-card' variant='outlined'>
            //       <h1>Money Made</h1>
            //     </Paper>
            //   </div>
            //   <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            //     <IconButton><DownIcon/></IconButton>
            //   </div>
            ?<>
              <Divider variant='middle'/>
              <div style={{display:'flex',padding:'1em', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
                {Object.keys(this.props.orders).map(id => (
                  <Paper variant='outlined' key={id} style={{width:'350px',marginBottom:'1em', padding:'1em'}}>
                    <Chip style={{marginLeft:'100px'}} icon={<QueryBuilderIcon/>} label={this.timeSince(this.props.orders[id].time_of_order)}/>
                    <Collapse in={this.state.collapse === id} collapsedHeight={58}>
                      <div style={{display:'flex', marginBottom:'.5em',justifyContent:'space-between', alignItems:'center'}}>
                        <div>
                        <Typography variant='h6'>{this.props.orders[id].customer[0].name}</Typography>
                        <Typography variant='h7'>{this.props.orders[id].customer_phone}</Typography>
                        </div>
                        <Button variant='outlined' onClick={() => this.handleCollapse(id)} endIcon={this.state.collapse?<UpIcon/> :<DownIcon/>}>Details</Button>
                      </div>
                      <Paper variant='outlined' style={{padding:'0.5em', margin:'0.5em'}}>
                        <div style={{display:'flex', marginTop:'.5em',marginBottom:'.5em',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between', width:'100%'}}><span>Customer Name</span> {this.props.orders[id].customer[0].name}</Typography>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between', width:'100%'}}><span>Email</span> {this.props.orders[id].customer[0].email}</Typography>
                          <Divider style={{margin:'.5em'}}/>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start',  display:'flex', justifyContent:'space-between', width:'100%'}}><span>Phone Registered</span> {this.props.orders[id].customer[0].phone_number}</Typography>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start',  display:'flex', justifyContent:'space-between', width:'100%'}}><span>Phone Given</span> {this.props.orders[id].customer_phone}</Typography>
                        
                        </div>
                    </Paper>
                    </Collapse>
                    
                    <Divider/>
                    
                    {this.props.orders[id].order_type === 'DVY'
                    ?<>
                    <Collapse in={this.state.LocCollapse === id} collapsedHeight={58}>
                      <div style={{display:'flex', marginBottom:'.5em',justifyContent:'space-between', alignItems:'center'}}>
                        <div>
                          <Typography variant='h6'>{this.props.orders[id].customer_location[0].neighborhood}</Typography>
                          <Typography variant='h7'>{this.props.orders[id].customer_location[0].locDistance + 'Km |' + this.props.orders[id].delivery_price + 'Birr' }</Typography>
                        </div>
                        {/* <ListItemText   secondary={}/> */}
                        {/* <a target='__blank__' href={`https://www.google.com/maps/search/?api=1&query=${this.props.locations[this.props.orders[id].customer_location].latitude},${this.props.locations[this.props.orders[id].customer_location].longitude}`}> */}
                      <Button variant='outlined' onClick={() => this.handleLocCollapse(id)} endIcon={this.state.LocCollapse?<UpIcon/> :<DownIcon/>}>Details</Button>
                        {/* </a> */}
                      </div>
                      <Paper variant='outlined' style={{padding:'0.5em', margin:'0.5em'}}>
                        <div style={{display:'flex', marginTop:'.5em',marginBottom:'.5em',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between', width:'100%'}}><span>Location Name</span> {this.props.orders[id].customer_location[0].neighborhood}</Typography>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between', width:'100%'}}><span>User Assigned Name</span> {this.props.orders[id].customer_location[0].locName}</Typography>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between', width:'100%'}}><span>Location Description</span> {this.props.orders[id].customer_location[0].locDesc}</Typography>
                          <Divider style={{margin:'.5em'}}/>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between', width:'100%'}}><span>Location Distance</span> {this.props.orders[id].customer_location[0].locDistance + 'KM'}</Typography>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between', width:'100%'}}><span>Location Price</span> {this.props.orders[id].customer_location[0].locPrice + 'Birr'}</Typography>
                          <Divider style={{margin:'.5em'}}/>
                          <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between',alignItems:'center', width:'100%'}}><span>Google Maps Link</span> 
                          <a target='__blank__' href={`https://www.google.com/maps/search/?api=1&query=${this.props.orders[id].customer_location[0].latitude},${this.props.orders[id].customer_location[0].longitude}`}>
                            <Button variant='outlined' endIcon={<OpenInNewIcon/>}>Map</Button>
                          </a>
                          </Typography>

                        </div>
                    </Paper>
                    </Collapse>
                    </>
                    :<Typography align='center'>Order type is Pickup</Typography>
                    }
                    
                    <Divider/>
                    {/* Order Section */}
                    <Paper variant='outlined' style={{padding:'0.5em', margin:'0.5em'}}>
                      <div style={{display:'flex', marginTop:'.5em',marginBottom:'.5em',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                      {Object.keys(this.props.orders[id].order).map(item => (
                          <>
                          <Typography variant='subtitle2' style={{alignSelf:'start',display:'flex',justifyContent:'space-between',width:'100%'}}>
                            <>{this.props.orders[id].order[item].name}</> <>{this.props.orders[id].extras[this.props.orders[id].order[item].id] !== undefined
                            // get the extra's name by filtering menu items
                            ?<> + {this.props.menuItems.filter(mItem => mItem.id === this.props.orders[id].extras[this.props.orders[id].order[item].id])[0].name}</>
                            :null
                          }</> <span>{  ' X '+this.props.orders[id].quantities[this.props.orders[id].order[item].id]}</span>
                            </Typography>
                          
                          </>
                        ))}
                        <Divider style={{margin:'.5em'}}/>
                        <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between', width:'100%'}}><span>Food Price</span> {this.props.orders[id].Food_price}</Typography>
                        <Typography variant='subtitle2' style={{alignSelf:'flex-start', display:'flex', justifyContent:'space-between', width:'100%'}}><span>Delivery Price</span> {this.props.orders[id].delivery_price}</Typography>
                        <Typography variant='subtitle2' style={{alignSelf:'flex-start',  display:'flex', justifyContent:'space-between', width:'100%'}}><span>Total Price</span> {this.props.orders[id].delivery_price + this.props.orders[id].Food_price}</Typography>
                        <Divider style={{margin:'.5em'}}/>
                        {this.props.orders[id].order_type === 'DVY'
                          ?<Typography variant='subtitle2' style={{alignSelf:'flex-start',  display:'flex', justifyContent:'space-between', width:'100%'}}><span>Order Type</span> Delivery</Typography>
                          :<Typography variant='subtitle2' style={{alignSelf:'flex-start',  display:'flex', justifyContent:'space-between', width:'100%'}}><span>Order Type</span> Pickup</Typography>
                          }
                      </div>
                    </Paper>
                   <Button onClick={() => this.props.updateOrder(this.props.orders[id])} fullWidth color='primary' variant='contained'>Set as delivered</Button>
                  </Paper>
              ))
              }
            </div>
          </>

            :<div style={{display:'flex', height:'calc(100vh - 70px)', justifyContent:'center', alignItems:'center'}}>
            <h1 style={{margin:'auto'}}>Sorry you're not the boss</h1>
          </div>
            }
            </>
        )
    }
}

const mapStateToProps = state => ({
    isAdmin: state.auth.isAdmin,
    orders: state.order.PendingOrders,
    AllOrders: state.order.AllOrders,
    itemsLoaded: state.MenuItems.itemsLoaded,
    menuItems: state.MenuItems.MenuItems
})
export default connect(mapStateToProps, {loadOrdersForAdmin,loadAllOrdersForAdmin, updateOrder, getMenuItems})(Boss)
