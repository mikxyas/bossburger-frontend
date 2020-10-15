import React, {useEffect,useState, Component, Fragment } from 'react'
import {Button, Container} from '@material-ui/core'
import MenuTab from '../components/Tab';
import MenuCard from '../components/MenuCard'
import Grid from '@material-ui/core/Grid';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getMenuItems} from '../actions/MenuItems';
import { makeStyles, useTheme } from '@material-ui/core/styles';


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
    static propTypes = {
      MenuItems:PropTypes.array.isRequired
    }
    componentDidMount(){
      this.props.getMenuItems();
    }
    handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };
    render(){
    return (
      <Fragment >
        <Container style={{paddingBottom:'3em',overflow:"hidden"}}>
          <MenuTab/>
          {/* {this.state.isLoaded ? */}
          <Grid justify='center' align='center' container spacing={2} style={{padding:"2em",overflowY:"hidden"}}>
          {/* {this.state.items.map(item => ( */}
            <Grid  md={4} sm={8} xs={12}>
              <MenuCard/>
            </Grid>
            <Grid  md={4} sm={8} xs={12}>
              <MenuCard/>
            </Grid>
            <Grid  md={4} sm={8} xs={12}>
              <MenuCard/>
            </Grid>
            {/* ))} */}
          </Grid>
          {/* :<div style={{height:'80vh', display:"flex", justifyContent:"center", alignItems:"center"}}><FastfoodIcon color='secondary' fontSize='large'/></div> */}
        {/* } */}
          </Container>   
        </Fragment>
          
      
    );
  }
}

const mapStateToProps = state =>({
  MenuItems: state.MenuItems.MenuItems
})

export default connect(mapStateToProps, {getMenuItems})(Menu);