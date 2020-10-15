import React, { Component } from 'react'

export default class OfferCard extends Component {
    render() {
        return (
            <>
            <div className='offer-card'>
              <div className='offer-grid'>
              <div className='card-image'>
              <img src='./burger3.png'/>
            </div>
            <div className='offer-head'>
              <h2 className='offer-header'>
                Buy two get one free!
              </h2>
              </div>
            
              {/* <h3 className='item-price'>
                200ETB
              </h3> */}
            </div>
            
            {/* </ButtonGroup> */}
          </div>
        </>
        )
    }
}
