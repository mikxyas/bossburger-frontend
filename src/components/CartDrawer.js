import React from 'react';
import {connect} from 'react-redux';
import {deleteItem} from '../actions/cart';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import { ListItemAvatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


class CartDrawer extends React.Component {
    static propTypes = {
        cart:PropTypes.object,
      }
    constructor(props){
        super(props);
        this.state = {
            openDrawer: false,
        }
    }
    OpenDrawer = () => {
        this.setState({
            openDrawer:true
        })
    }
    CloseDrawer = () => {
        this.setState({
            openDrawer:false
        })
    }
    render() {
        console.log(Object.keys(this.props.cart))
        return (

            <React.Fragment >
            <IconButton  onClick={this.OpenDrawer}>
            
                <Badge badgeContent={Object.keys(this.props.cart).length} color="secondary">
                <ShoppingCartIcon/>
                </Badge>
                </IconButton>
            <Drawer anchor='bottom' open={this.state.openDrawer} onClose={this.CloseDrawer}>
            <div
                style={{width:'auto', marginBottom:'56px'}}
                role="presentation"
                // onClick={}
                // onKeyDown={}
                >
                    { Object.keys(this.props.cart).length == 0
                    ? <>
                    <p style={{textAlign:'center',marginTop:'.3em', fontSize:'20px'}}>Your cart is empty</p>
                    {/* <br/> */}
                    <p style={{textAlign:'center',marginTop:'.3em', fontSize:'20px'}}>Any item that you add to your cart will appear here</p>
                    </>
                    : <List>
                    {Object.keys(this.props.cart).map((item, key) => (
                    <>
                    <ListItem key={key} button>
                        <ListItemAvatar>
                        <Avatar
                            alt={`Price:${this.props.cart[item].price}`}
                            src={this.props.cart[item].img}
                        />
                        </ListItemAvatar>
                        <ListItemText  primary={this.props.cart[item].name + ' (' + this.props.cart[item].price + 'ETB'+')'} />
                        <ListItemSecondaryAction>
                        <IconButton onClick={() => this.props.deleteItem(this.props.cart[item].id)}><CloseIcon/></IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    </>
                    
                    ))}
                    <div style={{padding:'.5em'}}>
                        <Button variant='contained' fullWidth color='primary'>Checkout</Button>
                    </div>
                </List>
                    }
                </div>
                    </Drawer>
                    </React.Fragment>
            );
        }
    }

const mapStateToProps = state =>({
    cart: state.cart
})
      
export default connect(mapStateToProps, {deleteItem})(CartDrawer);