import { Typography,Box,Divider } from '@material-ui/core'
import React, { Component } from 'react'
import {Image} from 'cloudinary-react'

export default class MenuFood extends Component {
    render() {
        return (
            <div className='menu-food-cont' >
                
                {/* <Image  cloudName='mikiyas'  publicId='full-menu_hsxdi3'  width='80%'  secure="true"/> */}

                <img className='menu-img' src='./menu1.png' /> 
                <img className='menu-img' src='./menu2.png'/> 
            </div>
        )
    }
}
