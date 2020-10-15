import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { makeStyles, useTheme } from '@material-ui/core/styles';

export default class MenuTab extends React.Component {
    // const classes = useStyles();
    // const theme = useTheme();
    constructor(props){
        super(props);
        this.state = {
          value: 0
        }
    }
    handleChange = (event, newValue) => {
        this.setState({value: newValue});
      };
    render(){
        return (
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Tabs
                  p={{ xs: 2, sm: 3, md: 4 }}
                  value={this.state.value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChange}
                  aria-label="disabled tabs example"
                >
                  <Tab label="Burgers"/>
                  <Tab label="Extras"/>
                  <Tab label="Beverages"/>
                  <Tab label="Fries"/>
                </Tabs>
              </div>
        )
    }
    
}
