import React, {useEffect,useState, Component, Fragment } from 'react'
import {Button, Container} from '@material-ui/core'
import MenuCard from '../components/MenuCard'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getMenuItems} from '../actions/MenuItems';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BurgerIcon from '@material-ui/icons/Fastfood'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import Loading from '../components/Loading';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  gradient: {
    background: 'linear-gradient(45deg, #3f1313 15%, #bb0404 90%)'

  },
  
}))

export class Menu extends React.Component {
  static propTypes = {
    MenuItems:PropTypes.array.isRequired
  }
    constructor(props){
      super(props);
      this.state = {
        value: 0,
        isLoaded: false,
        items: [],
        itemToFetch: 'burgers',
        SelectedMenuItems: this.props.Burgers,
      }
    }
    InitialFetch = () => {
      setTimeout(function(){
        this.setState({SelectedMenuItems:this.props.Burgers,isLoaded:true})
        console.log(this.state.SelectedMenuItems)
      }.bind(this),5000)
    }
    FetchBurgers = () => {
      this.setState({SelectedMenuItems: this.props.Burgers})
    }
    FetchFries = () => {
      this.setState({SelectedMenuItems: this.props.Fries})
    }
    FetchExtras = () => {
      this.setState({SelectedMenuItems: this.props.Extras})
    }
    FetchBeverages = () => {
      this.setState({SelectedMenuItems: this.props.Beverages})
    }
    componentDidMount(){
      this.props.getMenuItems();
      this.InitialFetch()
    }
    handleMenu = (event, newItem) => {
      this.setState({SelectedMenuItems: this.props.newItem})
    } 
    handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };
    render(){
    return (
      // Fragment was here
      <div style={{overflow:"hidden"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Tabs
            p={{ xs: 2, sm: 3, md: 4 }}
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            aria-label="disabled tabs example"
          >
            <Tab onClick={() => this.FetchBurgers()} label="Burgers"/>
            <Tab onClick={() => this.FetchExtras()} label="Extras"/>
            <Tab onClick={() => this.FetchBeverages()} label="Beverages"/>
            <Tab onClick={() => this.FetchFries()} label="Fries"/>
          </Tabs>
        </div>
        {this.props.itemsLoaded ?
          <Grid justify='center' align='center' container spacing={2} style={{padding:"2em",overflowY:"hidden"}}>
            {this.state.SelectedMenuItems.map(item => (
              <Grid key={item.name} md={4} sm={8} xs={12}>
                <MenuCard itemPrice={item.price + 'ETB'} img={item.img + '.png'} itemName={item.name}/>
              </Grid>
              ))} 
          </Grid>
          :<div style={{display:"flex",height:"80vh", alignItems:"center",justifyContent:"center"}}>
            <Loading load={this.state.isLoaded}/> 
          </div>
         } 
        </div>
          
      
    );
  }
}

const mapStateToProps = state =>({
  itemsLoaded: state.MenuItems.itemsLoaded,
  Burgers: state.MenuItems.MenuItems.filter(item => item.food_type == 'BRG'),
  Extras: state.MenuItems.MenuItems.filter(item => item.food_type == 'EXT'),
  Fries: state.MenuItems.MenuItems.filter(item => item.food_type == 'FRI'),
  Beverages: state.MenuItems.MenuItems.filter(item => item.food_type == 'BVG'),
})

export default connect(mapStateToProps, { getMenuItems })(Menu);