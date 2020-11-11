import { Paper, Typography,Divider, Badge } from '@material-ui/core';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadOrders} from '../actions/order';
import PropTypes from 'prop-types'
import DoneIcon from '@material-ui/icons/CheckCircle';


class Orders extends Component {
    static propTypes = {
        locations:PropTypes.object.isRequired,
        orders:PropTypes.object.isRequired,
    }
    componentDidMount(){
        this.props.loadOrders()
    }
    render() {
        return (
            <>
            <div style={{display:'flex', height:'calc(100vh - 70px)', width:'100%',flexDirection:'column', padding:'.5em',alignItems:'center'}}>
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
            </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    locations:state.locations.locations
})
export default connect(mapStateToProps, {loadOrders})(Orders)
