import { Button } from '@material-ui/core'
import React from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius:'69px'
    }
})) 

export default function Banner () {
    const classes = useStyles();
    const theme = useTheme();

        return (
            <div className='banner'>
                <div>
                <Button className={classes.root} color='primary' variant='contained' color='primary'>Order now</Button>
                </div>
            </div>
        )
    
}
