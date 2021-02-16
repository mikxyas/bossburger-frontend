import React from 'react'
import {Tooltip,Chip,Button, Box, Collapse} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {register, toggleSignupDialog} from '../actions/auth'
import {getMenuItems, rateItem,makeAvailable,makeunAvailable,toggleAddMenuItem, deleteMenuItem} from '../actions/MenuItems';
import {addtoCart, deleteItem} from '../actions/cart'
import AddMenuItem from '../components/AddMenuItem'
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactStars from "react-rating-stars-component";
import EmptyStar from '@material-ui/icons/StarOutlined';
import FullStar from '@material-ui/icons/Grade';
import HalfStar from '@material-ui/icons/StarHalf';
import ChevronDownIcon from '@material-ui/icons/ArrowDownward'
import UpIcon from '@material-ui/icons/ArrowUpward'
import { Image, Transformation } from 'cloudinary-react';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Loading from '../components/Loading';
import FastFoodIcon from '@material-ui/icons/Fastfood'
import RemoveIcon from '@material-ui/icons/Close'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Radio from '@material-ui/core/Radio'
import ListItemText from '@material-ui/core/ListItemText';
import {addExtra, removeExtra} from '../actions/cart'
import {ChangeLinkToFrom} from '../actions/ui'
import ConfDialog from '../components/ConfDialog'
import OrderTypeDialog from '../components/OrderTypeDialog';
import OrderAppbar from '../components/OrderAppbar'
import Divider from '@material-ui/core/Divider'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'

 
class Menu extends React.Component {
  static propTypes = {
    menuItems:PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    itemsLoaded: PropTypes.bool.isRequired
  }
    constructor(props){
      super(props);
      this.state = {
        value: 0,
        isLoaded: false,
        items: [],
        itemToFetch: 'burgers',
        SelectedMenuItems: this.props.Burgers,
        SelectedMenuType:'BRG',
        expandExtras:null,
        selectedExtras:{},
        openDialog:false,
        ItemToDelete:''
      }
    }
    handleDialog = (item) => {
      this.setState({ItemToDelete:item})
      if(this.state.openDialog === false){
          this.setState({openDialog:true})
      }else{
          this.setState({openDialog:false, locToDelete:''})
      }
  } 
    handleExSelection = (Bid, Eid, price) => {
      this.props.addExtra(Bid, Eid, price)
      this.setState({
        selectedExtras:{
          ...this.state.selectedExtras,
          [Bid]:Eid
        },
        expandExtras:null
      })
    }
    handleRemoveExtra = (id, price) => {
      this.props.removeExtra(id, price)
      delete this.state.selectedExtras[id]
      this.setState({
        selectedExtras:{
          ...this.state.selectedExtras
        }
      })
      console.log(this.state.selectedExtras)
    }
    handleExCollapse = (id) => {
      if(id != this.state.expandExtras){
        this.setState({
          expandExtras:id
        })
      }
      else{
        this.setState({
          expandExtras:null
        })
      }
    }
  
  //  componentDidMount(){
  //    this.props.getMenuItems()
  //   }
   
    handleMenuType = (e,newValue) => {
      this.setState({SelectedMenuType: newValue})
      // console.log(newValue)
    }
    round (value, step) {
      // console.log(value)
      step || (step = 1.0);
      var inv = 1.0 / step;
      // console.log(Math.round(value * inv) / inv) 
      return Math.round(value * inv) / inv;
  }
    handleRating = item => (newRating) => {
      if(item.rating == null){
        item.rating = new Object()
      }
      // var userId = this.props.user.id
      item.rating[this.props.user.id] = newRating
      this.props.rateItem(item)
      // console.log(Object.keys(item.rating).length)
    }
    deleteMenuItemAndClose = () => {
      this.props.deleteMenuItem(this.state.ItemToDelete)
      this.setState({openDialog:false})
    }
    render(){
    return (
      <div style={{overflow:"hidden"}}>
        <AddMenuItem/>
        {this.props.isAuthenticated
         ?<> <OrderTypeDialog/>
        <OrderAppbar/></>
        :null
        }
        
        <ConfDialog Open={this.state.openDialog} ActionFunc={() => this.deleteMenuItemAndClose()} DialogFunc={() => this.handleDialog()} dialogHeader='Delete Menu item' dialogContent={"Are you sure you want to delete the Menu Item ?"}/>
       
        {/* <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
          <AppBar className='menu-tab'  elevation={1} position='fixed'>

          <Tabs
            p={{ xs: 2, sm: 3, md: 4 }}
            value={this.state.SelectedMenuType}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleMenuType}
          >
            <Tab icon={<Avatar src='https://res.cloudinary.com/mikiyas/image/upload/v1607435089/burger-logo_ukn09j.png'/>} value='BRG' label="Burgers"/>
            
            <Tab  icon={<Avatar src='https://res.cloudinary.com/mikiyas/image/upload/v1607435164/ketchup_ouyt62.png'/>}  value='EXT' label="Extras"/>
            <Tab  icon={<Avatar src='https://res.cloudinary.com/mikiyas/image/upload/v1607435205/tropical-drink_1f379_k7r2gt.png'/>} value='BVG' label="Beverages"/>
            <Tab  icon={<Avatar src='https://res.cloudinary.com/mikiyas/image/upload/v1607435254/0d9d71defc5df17911a035a7341add42_f93uek.jpg'/>} value='FRI' label="Fries"/>
          </Tabs>
          </AppBar>
        </div> */}
        <div style={{marginBottom:'1em'}}/>
        
        {this.props.itemsLoaded 
        ?<>
        {this.props.isAdmin
          ?<div style={{display:'flex', alignItems:'center', justifyContent:'center',width:'100%', marginTop:'1.5em'}}>
          <Card color='secondary' style={{width:'270px'}} variant='outlined'>
                            <CardActionArea onClick={() => this.props.toggleAddMenuItem()} color='secondary'>
                                    <CardHeader
                                        action={
                                                <IconButton color='secondary' aria-label="settings">
                                                    <AddIcon/>
                                                </IconButton>

                                        }
                                        title='Add menu item'
                                        subheader='Add a new menu item'
                                    />  
                            </CardActionArea>
                        </Card>
          </div>
          :null
          }
          {/* MENU TYPE HEADER  */}
            <Divider className='menu-header-divider'/>
            <Typography align='center' className='menu-header' variant='h2'>Burgers</Typography>
          <Grid container spacing={2} jusitfy='center' alignItems='center' style={{padding:"2em",overflowY:"hidden"}}>
            {this.props.menuItems.sort((item1, item2) => (item1.price - item2.price)).filter(item => item.food_type === "BRG").map(item => {
              if(item.rating != null){
                var rating = 0
                var sum = 0
                rating = Object.keys(item.rating).map(userID=> {
                  return sum += item.rating[userID] 
                })
              }
              let ActionBtnStyle = {
                marginTop:'-.8em'
              }
              let textStyle = {
                color:'black'
              }
              let priceStyle = {
                color:'#1e1e1e',
              }
              if(item.available == false){
                textStyle = {
                  color:'grey'
                }
                priceStyle = {
                  color:'grey',
                }
                ActionBtnStyle={
                  display:'none',
                  marginTop:'-.8em'
                }
              }
              return(
              <Grid style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}} item key={item.id} md={4} sm={6} xs={12} >
                <Card variant='outlined' style={{borderRadius:'5px',width:'300px', marginBottom:'0em'}}>
                  <CardContent>
                  {/* {item.food_type === 'BRG'
                      ?<div style={{display:"flex", justifyContent:'center'}}>{item.available === true
                        ?<Image loading="lazy" cloudName='mikiyas' height='178' width='178' alt={item.name} publicId={item.img} secure="true"/>
                        :<Image loading="lazy" cloudName='mikiyas' height='178' width='178' alt={item.name} publicId={item.img} secure="true"><Transformation effect="grayscale" /></Image>
                      }</div>
                    :null
                  } */}
                    {/* <Paper elevation={2} style={{borderRadius:'5px',padding:'1em',background:'rgba(255,255,255,0.4)'}}> */}
                    <Typography style={textStyle} variant="h5" component="h2">
                          <Box fontSize='25'>{item.name}</Box>
                        </Typography> 
                        {this.state.selectedExtras[item.id] != undefined
                                ? <Chip
                                style={{margin:'.3em'}}
                                clickable
                                deleteIcon={<RemoveIcon/>}
                                onClick={() => this.handleRemoveExtra(item.id, this.props.menuItems.filter(ext => ext.id === this.state.selectedExtras[item.id])[0].price)}
                                onDelete={() => this.handleRemoveExtra(item.id, this.props.menuItems.filter(ext => ext.id === this.state.selectedExtras[item.id])[0].price)}
                                variant='outlined'
                                color='secondary'
                                label={"With " + this.props.menuItems.filter(ext => ext.id === this.state.selectedExtras[item.id])[0].name}
                              />
                                // <Typography>With {}</Typography>
                                :null
                              }
                            <Typography style={priceStyle} variant='subtitle1' color="textPrimary" component="p">
                              {item.price}Birr  {this.state.selectedExtras[item.id] != undefined
                                    ?<> + {this.props.menuItems.filter(ext => ext.id === this.state.selectedExtras[item.id])[0].price}</>
                                    :null
                                  }
                            </Typography>
                        
                        {this.props.user === null
                        ?
                        <div style={{display:'flex',alignItems:'center'}}>
                         <ReactStars
                          count={5}
                          value={item.rating === null ?0 :this.round(sum/Object.keys(item.rating).length, 0.5)}
                          isHalf={true}
                          // onChange={ratingChanged}
                          style={{margin:'auto'}}
                          size={21}
                          // isHalf={true}
                          
                          emptyIcon={<EmptyStar/>}
                          halfIcon={<HalfStar/>}
                          fullIcon={<FullStar/>}
                          onChange={() => this.props.toggleSignupDialog()}
                          // onChange={item.rating == null
                          //   ?this.handleNewRating(item)
                          //   :this.handleRating(item)
                          // }
                          activeColor={item.available === true ?"#f78b27b6": '#9e9e9e'}
                        />
                        <Typography  style={{ color:'rgb(100, 100, 100)',marginLeft:'.3em',fontSize:'13px'}}> {item.rating == null ?<>0</> :<>{Math.round(sum/Object.keys(item.rating).length * 100) / 100 + ' (' + Object.keys(item.rating).length + ')'}</>}</Typography>

                        </div>
                          :
                        <div style={{display:'flex', alignItems:'center'}}>
                          <ReactStars
                            count={5}
                            value={item.rating === null ?0 :this.round(sum/Object.keys(item.rating).length, 0.5)}
                            // onChange={ratingChanged}
                            style={{margin:'auto'}}
                            size={21}
                            isHalf={true}
                            emptyIcon={<EmptyStar/>}
                            halfIcon={<HalfStar/>}
                            fullIcon={<FullStar/>}
                            onChange={this.handleRating(item)}
                            activeColor={item.available === true ?"#f78b27b6": '#9e9e9e'}
                          /> 
                        <Typography style={{color:'rgb(100, 100, 100)',marginLeft:'.3em',fontSize:'12px'}}> {item.rating == null ?<>0</> :<>{Math.round(sum/Object.keys(item.rating).length * 100) / 100 + ' (' + Object.keys(item.rating).length + ')'}</>}</Typography>
                        
                        </div>
                        }
                        {item.food_type === 'BRG' 
                          ?<Typography variant='caption'>{item.desc}</Typography>
                          :null
                        }
                    {/* </Paper>  */}
                    </CardContent>
                    
                  {item.available
                          ?null
                          :<div style={{margin:'.5em'}}>
                          <Chip
                            // style={{marginTop:'-1em'}}
                            icon={<InfoIcon />}
                            color='secondary'
                            variant='outlined'
                            label="This Item is Unavailable"
                          />
                          </div>

                          } 
                  <CardActions style={ActionBtnStyle}>
                  
                    {this.props.cart[item.id]
                    ?<>
                    <Button style={{margin:'auto'}} color='secondary' size='small' onClick={() => this.props.deleteItem(item.id, item.price)}  >Remove From Cart</Button>
                    </>
                    :<>
                    {item.food_type === 'BRG'
                      ? <Button disabled={!item.available} onClick={() => this.handleExCollapse(item.id)} variant='contained' endIcon={this.state.expandExtras === item.id ?<UpIcon/> :<ChevronDownIcon/>} size='small' style={{borderRadius:'20px'}} color='primary'>Extras</Button>
                      :null
                    }
                    {this.props.isAuthenticated
                      ?<Button disabled={!item.available} endIcon={<ShoppingCartIcon/>} size='small'  onClick={() => this.props.addtoCart(item)} color='secondary'>Add to Cart</Button>
                      :<Tooltip title="Please SignIn before you add to cart" arrow>
                          <Link to='/register'>
                            <Button onClick={() => this.props.ChangeLinkToFrom('register', 'order')} endIcon={<ShoppingCartIcon/>} size='small' color='secondary'>Add to Cart</Button>
                          
                          </Link>
                      </Tooltip>
                    }
                    </>
                    }
                  </CardActions>
                  {item.food_type === 'BRG'
                      ?
                      <> 
                      <Collapse  in={this.state.expandExtras === item.id}>
                        <List style={{height:'200px', overflow:'auto'}}>
                          {this.props.menuItems.filter(item => item.food_type === 'EXT').map(Extra => (
                            <ListItem key={Extra.id} onClick={() => this.handleExSelection(item.id, Extra.id,Extra.price)} button >
                              {/* <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon> */}
                              <ListItemText primary={Extra.name} secondary={Extra.price + 'Birr'}/>
                              <ListItemSecondaryAction >
                                {/* <IconButton onClick={() => this.props.deleteItem(this.props.cart[item].id)}><CloseIcon/></IconButton> */}
                                <Radio
                                    onClick={() => this.handleExSelection(item.id, Extra.id)}
                                    checked = {this.state.selectedExtras[item.id] === Extra.id}
                                    name="Extra"
                                    color='primary'
                                />
                                </ListItemSecondaryAction>
                              {/* <StarBorder /> */}
                              
                            </ListItem>
                            
                            ))
                          }

                      </List>
                    </Collapse>
                     
                    </> 
                      :null
                    }
                </Card>
                {this.props.isAdmin
                    ?<Paper variant='outlined' style={{width:'300px', display:'flex',padding:'.5em',justifyContent:'space-between', borderTop:'none'}}>
                        {item.available 
                        ?<Button size='small' variant='outlined' onClick={() => this.props.makeunAvailable(item)} >Make Unavailable</Button>
                        :<Button size='small' variant='outlined' onClick={() => this.props.makeAvailable(item)}>Make Available</Button>
                        }
                        <Button onClick={() => this.handleDialog(item)} variant='outlined' size='small'  color='secondary'>Delete</Button>
                    </Paper>
                    :null
                }
              </Grid>
              )})} 
          </Grid>
                  {/* SIDES GRID */}
                            {/* MENU TYPE HEADER  */}
            <Divider className='menu-header-divider'/>
            <Typography align='center' className='menu-header' variant='h2'>Sides</Typography>

                  <Grid container spacing={2} jusitfy='center' alignItems='center' style={{padding:"2em",overflowY:"hidden"}}>
            {this.props.menuItems.sort((item1, item2) => (item2.price - item1.price)).filter(item => item.food_type === "FRI" || item.food_type === "BVG").map(item => {
              if(item.rating != null){
                var rating = 0
                var sum = 0
                rating = Object.keys(item.rating).map(userID=> {
                  return sum += item.rating[userID] 
                })
              }
              let ActionBtnStyle = {
                marginTop:'-.8em'
              }
              let textStyle = {
                color:'black'
              }
              let priceStyle = {
                color:'#1e1e1e',
              }
              if(item.available == false){
                textStyle = {
                  color:'grey'
                }
                priceStyle = {
                  color:'grey',
                }
                ActionBtnStyle={
                  display:'none',
                  marginTop:'-.8em'
                }
              }
              return(
              <Grid style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}} item key={item.id} md={4} sm={6} xs={12} >
                <Card variant='outlined' style={{borderRadius:'5px',width:'300px', marginBottom:'0em'}}>
                  <CardContent>
                  {/* {item.food_type === 'BRG'
                      ?<div style={{display:"flex", justifyContent:'center'}}>{item.available === true
                        ?<Image loading="lazy" cloudName='mikiyas' height='178' width='178' alt={item.name} publicId={item.img} secure="true"/>
                        :<Image loading="lazy" cloudName='mikiyas' height='178' width='178' alt={item.name} publicId={item.img} secure="true"><Transformation effect="grayscale" /></Image>
                      }</div>
                    :null
                  } */}
                    {/* <Paper elevation={2} style={{borderRadius:'5px',padding:'1em',background:'rgba(255,255,255,0.4)'}}> */}
                    <Typography style={textStyle} variant="h5" component="h2">
                          <Box fontSize='25'>{item.name}</Box>
                        </Typography> 
                        {this.state.selectedExtras[item.id] != undefined
                                ? <Chip
                                style={{margin:'.3em'}}
                                clickable
                                deleteIcon={<RemoveIcon/>}
                                onClick={() => this.handleRemoveExtra(item.id, this.props.menuItems.filter(ext => ext.id === this.state.selectedExtras[item.id])[0].price)}
                                onDelete={() => this.handleRemoveExtra(item.id, this.props.menuItems.filter(ext => ext.id === this.state.selectedExtras[item.id])[0].price)}
                                variant='outlined'
                                color='secondary'
                                label={"With " + this.props.menuItems.filter(ext => ext.id === this.state.selectedExtras[item.id])[0].name}
                              />
                                // <Typography>With {}</Typography>
                                :null
                              }
                            <Typography style={priceStyle} variant='subtitle1' color="textPrimary" component="p">
                              {item.price}Birr  {this.state.selectedExtras[item.id] != undefined
                                    ?<> + {this.props.menuItems.filter(ext => ext.id === this.state.selectedExtras[item.id])[0].price}</>
                                    :null
                                  }
                            </Typography>
                        
                        {this.props.user === null
                        ?
                        <div style={{display:'flex',alignItems:'center'}}>
                         <ReactStars
                          count={5}
                          value={item.rating === null ?0 :this.round(sum/Object.keys(item.rating).length, 0.5)}
                          isHalf={true}
                          // onChange={ratingChanged}
                          style={{margin:'auto'}}
                          size={21}
                          // isHalf={true}
                          
                          emptyIcon={<EmptyStar/>}
                          halfIcon={<HalfStar/>}
                          fullIcon={<FullStar/>}
                          onChange={() => this.props.toggleSignupDialog()}
                          // onChange={item.rating == null
                          //   ?this.handleNewRating(item)
                          //   :this.handleRating(item)
                          // }
                          activeColor={item.available === true ?"#f78b27b6": '#9e9e9e'}
                        />
                        <Typography  style={{ color:'rgb(100, 100, 100)',marginLeft:'.3em',fontSize:'13px'}}> {item.rating == null ?<>0</> :<>{Math.round(sum/Object.keys(item.rating).length * 100) / 100 + ' (' + Object.keys(item.rating).length + ')'}</>}</Typography>

                        </div>
                          :
                        <div style={{display:'flex', alignItems:'center'}}>
                          <ReactStars
                            count={5}
                            value={item.rating === null ?0 :this.round(sum/Object.keys(item.rating).length, 0.5)}
                            // onChange={ratingChanged}
                            style={{margin:'auto'}}
                            size={21}
                            isHalf={true}
                            emptyIcon={<EmptyStar/>}
                            halfIcon={<HalfStar/>}
                            fullIcon={<FullStar/>}
                            onChange={this.handleRating(item)}
                            activeColor={item.available === true ?"#f78b27b6": '#9e9e9e'}
                          /> 
                        <Typography style={{color:'rgb(100, 100, 100)',marginLeft:'.3em',fontSize:'12px'}}> {item.rating == null ?<>0</> :<>{Math.round(sum/Object.keys(item.rating).length * 100) / 100 + ' (' + Object.keys(item.rating).length + ')'}</>}</Typography>
                        
                        </div>
                        }
                        {item.food_type === 'BRG' 
                          ?<Typography variant='caption'>{item.desc}</Typography>
                          :null
                        }
                    {/* </Paper>  */}
                    </CardContent>
                    
                  {item.available
                          ?null
                          :<div style={{margin:'.5em'}}>
                          <Chip
                            // style={{marginTop:'-1em'}}
                            icon={<InfoIcon />}
                            color='secondary'
                            variant='outlined'
                            label="This Item is Unavailable"
                          />
                          </div>

                          } 
                  <CardActions style={ActionBtnStyle}>
                  
                    {this.props.cart[item.id]
                    ?<>
                    <Button style={{margin:'auto'}} color='secondary' size='small' onClick={() => this.props.deleteItem(item.id, item.price)}  >Remove From Cart</Button>
                    </>
                    :<>
                    {item.food_type === 'BRG'
                      ? <Button disabled={!item.available} onClick={() => this.handleExCollapse(item.id)} variant='contained' endIcon={this.state.expandExtras === item.id ?<UpIcon/> :<ChevronDownIcon/>} size='small' style={{borderRadius:'20px'}} color='primary'>Extras</Button>
                      :null
                    }
                    {this.props.isAuthenticated
                      ?<Button disabled={!item.available} endIcon={<ShoppingCartIcon/>} size='small'  onClick={() => this.props.addtoCart(item)} color='secondary'>Add to Cart</Button>
                      :<Tooltip title="Please SignIn before you add to cart" arrow>
                          <Link to='/register'>
                            <Button onClick={() => this.props.ChangeLinkToFrom('register', 'order')} endIcon={<ShoppingCartIcon/>} size='small' color='secondary'>Add to Cart</Button>
                          
                          </Link>
                      </Tooltip>
                    }
                    </>
                    }
                  </CardActions>
                  {item.food_type === 'BRG'
                      ?
                      <> 
                      <Collapse  in={this.state.expandExtras === item.id}>
                        <List style={{height:'200px', overflow:'auto'}}>
                          {this.props.menuItems.filter(item => item.food_type === 'EXT').map(Extra => (
                            <ListItem key={Extra.id} onClick={() => this.handleExSelection(item.id, Extra.id,Extra.price)} button >
                              {/* <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon> */}
                              <ListItemText primary={Extra.name} secondary={Extra.price + 'Birr'}/>
                              <ListItemSecondaryAction >
                                {/* <IconButton onClick={() => this.props.deleteItem(this.props.cart[item].id)}><CloseIcon/></IconButton> */}
                                <Radio
                                    onClick={() => this.handleExSelection(item.id, Extra.id)}
                                    checked = {this.state.selectedExtras[item.id] === Extra.id}
                                    name="Extra"
                                    color='primary'
                                />
                                </ListItemSecondaryAction>
                              {/* <StarBorder /> */}
                              
                            </ListItem>
                            
                            ))
                          }

                      </List>
                    </Collapse>
                     
                    </> 
                      :null
                    }
                </Card>
                {this.props.isAdmin
                    ?<Paper variant='outlined' style={{width:'300px', display:'flex',padding:'.5em',justifyContent:'space-between', borderTop:'none'}}>
                        {item.available 
                        ?<Button size='small' variant='outlined' onClick={() => this.props.makeunAvailable(item)} >Make Unavailable</Button>
                        :<Button size='small' variant='outlined' onClick={() => this.props.makeAvailable(item)}>Make Available</Button>
                        }
                        <Button onClick={() => this.handleDialog(item)} variant='outlined' size='small'  color='secondary'>Delete</Button>
                    </Paper>
                    :null
                }
              </Grid>
              )})} 
          </Grid>

          </>
        :<div style={{display:"flex",height:"60vh", alignItems:"center",justifyContent:"center"}}>
        <Loading LoaderIcon={<FastFoodIcon/>} load={this.props.itemsLoaded}/> 
        
      </div>
      }

    </div>    
      
    );
  }
}

const mapStateToProps = state =>({
  isAdmin:state.auth.isAdmin,
  user:state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  itemsLoaded: state.MenuItems.itemsLoaded,
  menuItems: state.MenuItems.MenuItems,
  cart: state.cart.cart
})

export default connect(mapStateToProps, { getMenuItems, rateItem,makeAvailable,makeunAvailable, removeExtra,addtoCart, deleteMenuItem,toggleAddMenuItem,toggleSignupDialog,addExtra,deleteItem,ChangeLinkToFrom })(Menu);