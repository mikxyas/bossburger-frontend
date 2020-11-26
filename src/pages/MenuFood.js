import { Typography,Box,Divider } from '@material-ui/core'
import React, { Component } from 'react'
import {Image} from 'cloudinary-react'

export default class MenuFood extends Component {
    render() {
        return (
            <div  style={{display:'flex',alignItems:'center', flexDirection:'column',justifyContent:'center',padding:'2em', paddingTop:'0em'}}>
                <Typography className='event-header' style={{width:'100vw', height:'20vh'}} align='center' variant='h4'>
                    <Box  color='white' fontWeight={700}>Our Menu</Box>   
                </Typography>
                <Image  cloudName='mikiyas'  publicId='full-menu_hsxdi3'  width='80%'  secure="true"/>

                {/* <img src='./menu1.png' style={{zIndex:'2',width:'69%', marginTop:'-6em'}}/>
                <img src='./menu2.png' style={{width:'69%'}}/> */}
            </div>
        )
    }
}
