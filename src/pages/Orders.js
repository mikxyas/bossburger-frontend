import { Paper, Typography,Card,Divider,Grid, Button, Badge, CardContent,Collapse,CardHeader,IconButton } from '@material-ui/core';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadOrders} from '../actions/order';
import PropTypes from 'prop-types'
import DoneIcon from '@material-ui/icons/CheckCircle';
import DownIcon from '@material-ui/icons/ArrowDropDown'
import UpIcon from '@material-ui/icons/ArrowDropUp'
import InfoIcon from '@material-ui/icons/Info';


class Orders extends Component {
    constructor(props){
        super(props);
        this.state={
            collapse:null,
            LocCollapse: null

        }
    }
    static propTypes = {
        locations:PropTypes.object.isRequired,
        orders:PropTypes.object.isRequired,
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
        this.props.loadOrders()
    }
    render() {
        if(this.props.orderPlaced){
            return window.location.reload()
        }
        return (
            
            <div className='orders-cont'>
                {Object.keys(this.props.orders).length > 0
                    ? <Grid justify='center' align='center' container spacing={2} >
                    {Object.keys(this.props.orders).map(id => (
                    this.props.orders[id].delivered == false
                    ?

                    <Grid item md={4} sm={6} xs={12}>
                    <Card className='order-card'>
                        <CardContent>
                            {this.props.orders[id].order_type === 'DVY'
                            ?<>
                                <Collapse in={this.state.LocCollapse === id} collapsedHeight={58}>
                                <div style={{display:'flex', marginBottom:'.5em',justifyContent:'space-between', alignItems:'center'}}>
                                <div>
                                    <Typography variant='h6'>{this.props.orders[id].customer_location[0].neighborhood}</Typography>
                                    <Typography variant='h7'>{this.props.orders[id].customer_location[0].locDistance + 'Km |' + this.props.orders[id].delivery_price + 'Birr' }</Typography>
                                </div>
                                <Button variant='outlined' onClick={() => this.handleLocCollapse(id)} endIcon={this.state.LocCollapse?<UpIcon/> :<DownIcon/>}>Details</Button>

                                {/* <ListItemText   secondary={}/> */}
                                {/* <a target='__blank__' href={`https://www.google.com/maps/search/?api=1&query=${this.props.locations[this.props.orders[id].customer_location].latitude},${this.props.locations[this.props.orders[id].customer_location].longitude}`}> */}
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
                                    <Button variant='outlined' >Map</Button>
                                    </a>
                                    </Typography>

                                </div>
                            </Paper>
                            <Divider/>
                            </Collapse>

                            {/* Order Section */}
                            <Paper variant='outlined' style={{padding:'0.5em', margin:'0.5em'}}>
                                <div style={{display:'flex', marginTop:'.5em',marginBottom:'.5em',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                {Object.keys(this.props.orders[id].order).map(item => (
                                    <>
                                    <Typography variant='subtitle2' style={{alignSelf:'start',display:'flex',justifyContent:'space-between',width:'100%'}}>{this.props.orders[id].order[item].name} <span>{  ' X '+this.props.orders[id].quantities[this.props.orders[id].order[item].id]}</span></Typography>
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
                                <Typography align='center'>Your order will be on its way once we call you to comfirm your order</Typography>
                            </>
                            :<>
                            <Typography align='center'>You ordered a pickup. We will be expecting you.</Typography>
                            <Paper variant='outlined' style={{padding:'0.5em', margin:'0.5em'}}>
                                <div style={{display:'flex', marginTop:'.5em',marginBottom:'.5em',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                {Object.keys(this.props.orders[id].order).map(item => (
                                    <>
                                    {/* <Typography variant='subtitle2' style={{alignSelf:'start',display:'flex',justifyContent:'space-between',width:'100%'}}>{this.props.orders[id].order[item].name} <span>{  ' X '+this.props.orders[id].quantities[this.props.orders[id].order[item].id]}</span></Typography> */}
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
                                {/* <Typography align='center'></Typography> */}

                            </>
                            }
                        </CardContent>
                    </Card>
                    </Grid>
                    :null
                ))}
                </Grid>
                
               
                :<CardHeader
                      avatar={
                        <IconButton color='primary' aria-label="settings">
                          <InfoIcon />
                        </IconButton>
                      }
                      title='No orders placed'
                      subheader='You have not placed any orders yet.'
                    /> 
                    }
            
            {/* <div style={{display:'flex', height:'calc(100vh - 70px)', width:'100%',flexDirection:'column', padding:'.5em',alignItems:'center'}}>
                    {Object.keys(this.props.orders).map(id => (
                        <>
                        {this.props.orders[id].delivered == false
                            ?<Paper key={id} style={{padding:'1em', width:'350px', marginTop:'1em'}}>
                            <Typography align='center' variant="h5" component="h2">Your order is being delivered!</Typography>
                            <Typography align='center'>Total Price {this.props.orders[id].Food_price + this.props.orders[id].delivery_price}</Typography>
                            <Typography align='center'>Please prepare the right amount of money to pay.</Typography>
                        </Paper>
                        :null
                            // <Paper key={id} style={{padding:'1em', width:'350px', marginTop:'1em', backgroundColor:'rgba(0,0,0,0.08)'}}>
                            //     <Typography align='center' variant="h5" component="h2">Your order was delivered </Typography>
                            //     <Typography align='center'>{this.props.orders[id].Food_price + this.props.orders[id].delivery_price} Birr was paid</Typography>
                            //     <Typography align='center'>Thank you for choosing us!</Typography>
                            // </Paper>                        

                        }
                        
                        </>
                    ))
                    }
            </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    locations:state.locations.locations,
    orderPlaced: state.order.orderPlaced,
    menuItems: state.MenuItems.MenuItems
})
export default connect(mapStateToProps, {loadOrders})(Orders)

//             <Typography variant='subtitle2' style={{alignSelf:'flex-start',  display:'flex', justifyContent:'space-between', width:'100%'}}><span>Phone Given</span> {this.props.orders[id].customer_phone}</Typography>
       
      
     
