import { Paper,Typography,Box,Divider, ListItemIcon,ListItemText, ListItem } from '@material-ui/core'
import React, { Component } from 'react'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'

export default class JobOffers extends Component {
    render() {
        return (
            <>
            <div style={{height:'20vh'}} className='event-header' >
                <Typography variant='h2' align='center'>
                    <Box color='white'>Job Offerings</Box>
                </Typography>
                {/* <Typography variant='h4'><u>Delivery</u></Typography> */}
            </div> 
            <div style={{display:'flex', alignItems:'center',padding:'.5em',flexDirection:'column'}}>
                {/* <h1>Header Content</h1> */}
               
                <Typography  align='center'>
                    <Box >Reach out to us and send your CV and you will hear back from us if we are willing to hire you.</Box>
                </Typography>
                <Paper elevation={3} className='neo-bg'>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            <Box>Bossburgeraddis@gmail.com</Box>
                        </ListItemText>
                    </ListItem>
                </Paper>
                <Paper elevation={3} className='neo-bg'>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Box>0911736121</Box>
                        </ListItemText>
                    </ListItem>
                </Paper>
            </div>
            </>
        )
    }
}
