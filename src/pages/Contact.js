import {IconButton,CardHeader,Typography,Box, Card, CardActionArea } from '@material-ui/core'
import React, { Component } from 'react'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstaIcon from '@material-ui/icons/Instagram'
import RightIcon from '@material-ui/icons/ChevronRight'

export default class Contact extends Component {
    render() {
        return (
            <>
            <section className='contact-section'>
                <Typography>
                    <Box className='contact-section-title'>Lets connect!</Box>
                </Typography>
                <div className='social-card-cont'>
                    <Card  className='social-card'>
                        <CardActionArea target='__blank__' href='https://www.instagram.com/bossburgeraddis/'>
                            <CardHeader
                            avatar={<InstaIcon/>}
                            action={
                            <IconButton>
                                <RightIcon/>
                            </IconButton>
                        }
                            title='Instagram'
                            subheader='@bossburgeraddis'
                            />
                        </CardActionArea>
                    </Card>
                    <Card href=''  className='social-card'>
                        <CardActionArea target='__blank__' href='https://www.facebook.com/bossburgeraddis251/'>
                            <CardHeader
                            avatar={<FacebookIcon/>}
                            action={
                            <IconButton>
                                <RightIcon/>
                            </IconButton>
                        }
                            title='Facebook'
                            subheader='/bossburgeraddis251'
                            />
                        </CardActionArea>
                    </Card>
                    <Card className='social-card'>
                        <CardActionArea>
                            <CardHeader
                            avatar={<PhoneIcon/>}
                            
                            title='Phone number'
                            subheader='0902424848'
                            />
                        </CardActionArea>
                    </Card>
                    <Card className='social-card'>
                        <CardActionArea>
                            <CardHeader
                            avatar={<EmailIcon/>}
                            title='Email'
                            subheader='bossburgeraddis@gmail.com'
                            />
                        </CardActionArea>
                    </Card>
                </div>
                
            </section>
            </>
        )
    }
}
