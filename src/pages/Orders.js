import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadOrders} from '../actions/order';

class Orders extends Component {
    componentDidMount(){
        this.props.loadOrders()
    }
    render() {
        return (
            <div>
                This are your orders
            </div>
        )
    }
}

export default connect(null, {loadOrders})(Orders)
