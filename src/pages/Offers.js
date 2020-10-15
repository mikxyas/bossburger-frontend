import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Grid } from '@material-ui/core'
import OfferCard from '../components/OfferCard';

export default class Offers extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div className='offer-grid'>
                <div className='offer-cont'>
                    <OfferCard/>
                </div>
                <div  className='offer-display'>
                    <div style={{textAlign:"center"}}>
                        <h2 className='lg-heading'>
                            Buy two get one free
                        </h2>
                        <h3 className='sub-heading'>
                            Hawaiian Hamburger
                        </h3>
                        <p>Get two Hawaiian hamburgers when you order one.</p>
                    </div>
                </div>
            </div>
        )
    }
}
