import React, {useEffect,useState, Component, Fragment } from 'react'
import {Button, Container} from '@material-ui/core'
import MenuCard from '../components/MenuCard'
import Grid from '@material-ui/core/Grid';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getMenuItems} from '../actions/MenuItems';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles((theme) => ({
  gradient: {
    background: 'linear-gradient(45deg, #3f1313 15%, #bb0404 90%)'

  },
}))

export class Menu extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value: 0,
        isLoaded: false,
        items: [],
        itemToFetch: 'burgers'
      }

    //   this.FetchItems = this.FetchItems.bind(this);
    //   this.FetchExtras = this.FetchExtras.bind(this);
    //   this.FetchFries = this.FetchFries.bind(this);
    //   this.FetchBeverages = this.FetchBeverages.bind(this);
    }
    FetchBurgers = () => {
      axios.get('https://bossburger.herokuapp.com/burgers/')
      .then((response) => {
        this.setState({items:response.data, isLoaded:true})
        console.log(response.data)
      }).catch(function(error) {
        console.log(error)})
        this.render()

    }
    FetchExtras = () => {
      axios.get('https://bossburger.herokuapp.com/extras/')
      .then((response) => {
        this.setState({items:response.data,isLoaded:true})
      }).catch(function(error) {
        console.log(error)})
        this.render()
    }
    FetchBeverages = () => {
      axios.get('https://bossburger.herokuapp.com/beverages/')
      .then((response) => {
        this.setState({items:response.data,isLoaded:true})
      }).catch(function(error) {
        console.log(error)})
        this.render()
    }
    FetchFries = () => {
      axios.get('https://bossburger.herokuapp.com/fries/')
      .then((response) => {
        this.setState({items:response.data,isLoaded:true})
      }).catch(function(error) {
        console.log(error)})
        this.render()

    }
    static propTypes = {
      MenuItems:PropTypes.array.isRequired
    }
    componentDidMount(){
      this.FetchBurgers()
      this.props.getMenuItems();
    }
    handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };
    render(){
    return (
      // Fragment was here
      <div style={{overflow:"hidden"}}>
        {/* <Container style={{paddingBottom:'3em',overflow:"hidden"}}> */}
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Tabs
                  p={{ xs: 2, sm: 3, md: 4 }}
                  value={this.state.value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChange}
                  aria-label="disabled tabs example"
                >
                  <Tab onClick={this.FetchBurgers} label="Burgers"/>
                  <Tab onClick={this.FetchExtras} label="Extras"/>
                  <Tab onClick={this.FetchBeverages} label="Beverages"/>
                  <Tab onClick={this.FetchFries} label="Fries"/>
                </Tabs>
              </div>
          {this.state.isLoaded ?
          <Grid justify='center' align='center' container spacing={2} style={{padding:"2em",overflowY:"hidden"}}>
          {this.state.items.map(item => (
            <Grid key={item.name} md={4} sm={8} xs={12}>
              <MenuCard itemPrice={item.price + 'ETB'} img={item.img + '.png'} itemName={item.name}/>
            </Grid>
             ))} 
          </Grid>
           :<div style={{height:'80vh', display:"flex", justifyContent:"center", alignItems:"center"}}><FastfoodIcon color='secondary' fontSize='large'/></div> 
         } 
          {/* </Container>    */}
        </div>
          
      
    );
  }
}

const mapStateToProps = state =>({
  MenuItems: state.MenuItems.MenuItems
})

export default connect(mapStateToProps, {getMenuItems})(Menu);