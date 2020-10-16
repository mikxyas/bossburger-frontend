import React, { Component } from 'react'
import {Button,Container,Card, Paper, CardHeader} from '@material-ui/core'
import Link from '@material-ui/core/Link'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default class Events extends Component {
    render() {
        return (
          <div className='EventCover'>
            <div className="Event-desc" style={{padding:"1em",textAlign:"center",background:"rgba(0,0,0,0.4)"}}>
              <h2 className='lg-heading'> 
                Meskel Getaway Challenge
              </h2>
              <h3 className='sub-header'>Get a chance to win two tickets to a world class resort</h3>
              <p style={{color:'white'}}>
                Winner will be selected randomly from people who order from our website
              </p>
            </div>
          </div>
        )
    }
}
