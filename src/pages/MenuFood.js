import { Typography,Box,Divider } from '@material-ui/core'
import React, { Component } from 'react'

export default class MenuFood extends Component {
    render() {
        return (
            <div style={{display:'flex',alignItems:'center', flexDirection:'column',justifyContent:'center',padding:'2em', paddingTop:'0em'}}>
                <Typography className='normal-header-bg' style={{zIndex:'0',display:'flex',justifyContent:'center', width:'100vw', height:'30vh'}} align='center' variant='h4'>
                    <Box style={{ marginTop:'1em'}} color='white' fontWeight={700}><u>Our Menu</u></Box>   
                </Typography>
                <img src='./menu1.png' style={{zIndex:'2',width:'69%', marginTop:'-6em'}}/>
                <img src='./menu2.png' style={{width:'69%'}}/>
            </div>
        )
    }
}
