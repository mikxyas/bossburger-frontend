import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Card, Box,CardContent, CardHeader,IconButton,ListItemSecondaryAction, Typography } from '@material-ui/core';
import FastFoodIcon from '@material-ui/icons/Fastfood'
import GPSIcon from '@material-ui/icons/MyLocation'
import SignOutIcon from '@material-ui/icons/ExitToApp'
import {Link, Redirect} from 'react-router-dom'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'

class Account extends Component {
    render() {
        if(!this.props.isAuthenticated){
            return <Redirect to='/register'/>
        }
        return (
            <div className='account-card-cont'>
                <Card elevation={2} className='account-card'>
                <CardContent>
                   
                    <List>
                        <Link style={{color:'inherit'}} to='/account/info'>
                            <ListItem className='account-list-item' button>
                                <ListItemIcon>
                                <AccountIcon/>
                                </ListItemIcon>
                                <ListItemText  primary={<Typography variant='h6'><Box fontWeight={300}>Account info</Box></Typography>}  />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <ChevronRightIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                        
                        <Link style={{color:'inherit'}} to='/orders'>
                            <ListItem className='account-list-item' button>
                                <ListItemIcon>
                                    <FastFoodIcon/>
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant='h6'><Box fontWeight={300}>Recent Orders</Box></Typography>}/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <ChevronRightIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                        <Link style={{color:'inherit'}} to='/locations'>
                            <ListItem className='account-list-item' button>
                                <ListItemIcon>
                                <GPSIcon/>
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant='h6'><Box fontWeight={300}>Your locations</Box></Typography>} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <ChevronRightIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                        
      <a href='https://www.google.com/maps/place/BOSS+BURGER/@8.9975857,38.7849062,15z/data=!4m2!3m1!1s0x0:0x1717740e78fc081d?sa=X&ved=2ahUKEwjisrqJ-4zuAhWCqHEKHQMhBLwQ_BIwFXoECCIQBQ' style={{color:'inherit'}} target='__blank__'  >

      <ListItem onClick={() => this.props.logout()} className='account-list-item' button>
        <ListItemIcon >
          <SignOutIcon/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant='h6'><Box fontWeight={300}>Sign out</Box></Typography>} />
      </ListItem>
      </a>
              </List>
                    </CardContent>
                </Card>
                
              </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {logout})(Account)