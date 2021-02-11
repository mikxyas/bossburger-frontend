import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {List,Collapse,Chip, ListItem,Checkbox, ListItemIcon,ListItemSecondaryAction, ListItemText, Typography, Box, Divider} from '@material-ui/core'
import DeliveryIcon from '@material-ui/icons/Motorcycle'
import PickupIcon from '@material-ui/icons/Store'
import AddIcon from '@material-ui/icons/Add'
import GpsIcon from '@material-ui/icons/ChevronRight'
import UpIcon from '@material-ui/icons/Cancel'
import {connect} from 'react-redux'
import {UpdateAccountInfo} from '../actions/auth'
import {UpdateOrderInfo, toggleOrderTypeDialog} from '../actions/order'
import {Link} from 'react-router-dom'
function OrderTypeDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [Locations, showLocations] = React.useState(false)
    const [showTime, setshowTime] = React.useState(false)
    const [TimeData, setTimedata] = React.useState([])
    const handleShowTime = () => {
        if(showTime === true){
            setshowTime(false);
        }else{
            setshowTime(true)
            handletimeData()
        }
    }
    const handletimeData = () => {
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
        setTimedata([
            {time:FirstDateObj, key:1},
            {time:SecDateObj, key:2},
            {time:ThirdDateObj,key:3},
            {time:FourthDateObj, key:4}
        ])
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const HandleLocShow = () => {
        if(Locations === true){
            showLocations(false);
        }else{
            showLocations(true)
        }
    }
  const handleClose = () => {
    if(props.open){
        props.toggleOrderTypeDialog()
    }
  };
  
  return (
    <div>
      <Dialog
        open={props.user.prevOrdType === 'none' || props.open}
        onClose={handleClose}
        className='order-type-dialog'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"What kind of order will this be?"}</DialogTitle> */}
        <DialogContent>
            <Typography align='center' variant='h4'><Box fontSize={20}>
                {Locations && !showTime
                    ?<>You selected Delivery</>
                    :null
                }
                {showTime && !Locations
                    ?<>You selected Pickup</>
                    :null
                }
                {!showTime && !Locations
                    ?<>What kind of order will this be?</>
                    :null
                }
                
            </Box></Typography>
            <List>
                {showTime
                    ?null

                :<ListItem button onClick={HandleLocShow}>
                    <ListItemIcon>
                        {Locations
                            ?<UpIcon/>
                            :<DeliveryIcon/>
                        }
                        
                    </ListItemIcon>
                    
                    <ListItemText primary={Locations ?<>Choose your location</> :<>Delivery</>} secondary='We deliver to you for a small fee'/>
                    {/* <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction> */}
                </ListItem>}
                {props.isAuth
                ?<Collapse in={Locations} collapsedHeight={0}>
                    
                    <div className='dialog-loc-container'>
                        {Object.keys(props.Locations).map((item, key) => (
                            <ListItem onClick={() => props.UpdateOrderInfo({"primary_loc_id":item,"name":props.user.name, "prevOrdType":"Delivery"})} className='dialog-loc' color='secondary'  key={key} button>
                                <ListItemIcon><GpsIcon/></ListItemIcon>
                                <ListItemText   primary={props.Locations[item].locName } secondary={ props.Locations[item].locPrice + ' ETB | ' + props.Locations[item].locDistance + ' Km'}/>
                            </ListItem>
                                
                        ))}
                        <Divider style={{width:'100%'}}/>
                        <ListItem button>
                            <ListItemIcon><AddIcon/></ListItemIcon>
                            <Link style={{color:'inherit'}} to='/new/locations/'>
                                <ListItemText primary='Add new location' secondary='Create a new location'/>
                            </Link>
                        </ListItem>
                        </div>

                         </Collapse>
                        
                :null

                }
                {Locations
                    ?null
                    :<>
                    <ListItem button  onClick={() => props.UpdateOrderInfo({"name":props.user.name, "prevOrdType":"Pickup"})}>
                    <ListItemIcon>
                    {showTime
                            ?<UpIcon/>
                            :<PickupIcon/>
                        }
                    </ListItemIcon>
                    <ListItemText primary={showTime ?<>Pick up time</> :<>Pickup</>} secondary='Come and pick up your order'/>                
                </ListItem>
                    </>
                }
               
            </List>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>*/}
        </DialogContent>
        
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
    Locations: state.locations.locations,
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user,
    open: state.order.openOrderType
})
export default connect(mapStateToProps, {UpdateAccountInfo, toggleOrderTypeDialog,UpdateOrderInfo})(OrderTypeDialog)
