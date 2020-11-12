import React from 'react';
import {connect} from 'react-redux';
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
import {Link} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import RemoveCartIcon from '@material-ui/icons/RemoveShoppingCart'
import {addAmountof, decreaseAmountof, deleteItem} from '../actions/cart'
import {toggleSignupDialog} from '../actions/auth';

class CartDrawer extends React.Component {
    static propTypes = {
        cart:PropTypes.object,
        Amount:PropTypes.object,
        addAmountof:PropTypes.func.isRequired,
        decreaseAmountof:PropTypes.func.isRequired,
        toggleSignupDialog:PropTypes.func.isRequired,
        deleteItem:PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
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
    toggleAndClose = () => {
        this.props.toggleSignupDialog()
        this.CloseDrawer()
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
                        <ListItemText  primary={this.props.cart[item].name} secondary={this.props.cart[item].price * this.props.Amount[item] + 'ETB' + ' | Amount ' + this.props.Amount[item]} />
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
                    
                    ))}
                    <div style={{padding:'.5em'}}>
                        {this.props.isAuthenticated
                        ?
                            <Link to='/checkout'>
                                <Button variant='contained' onClick={this.CloseDrawer} fullWidth color='primary'>Checkout</Button>
                            </Link>
                        
                        :<Button variant='contained' onClick={this.toggleAndClose} fullWidth color='primary'>Checkout</Button>
                        
                        }
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
    cart: state.cart.cart,
    Amount: state.cart.Amount,
    isAuthenticated: state.auth.isAuthenticated
})
      
export default connect(mapStateToProps, {deleteItem, addAmountof, toggleSignupDialog,decreaseAmountof})(CartDrawer);