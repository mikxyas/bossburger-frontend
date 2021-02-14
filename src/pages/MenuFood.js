import { Typography,Box,Divider } from '@material-ui/core'
import React, { Component } from 'react'
import {Image} from 'cloudinary-react'

export default class MenuFood extends Component {
    render() {
        return (
            <div className='menu-food-cont' >
                <Image className='menu-img' cloudName='mikiyas' alt='Boss Burger Menu'  publicId='menu1_ljrbch'  secure="true"/>
                <Image className='menu-img' cloudName='mikiyas' alt='Boss Burger Menu' publicId='menu2_srlh81'  secure="true"/>
            </div>
        )
    }
}
