import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius:'69px',
    }
})) 

export default function AdCard(props) {
    const classes = useStyles();
    const theme = useTheme();

        return (
            <div className='adCard'>
                <Link to='/offers'>
                    <Button className={classes.root} color='primary' variant='contained'>{props.btnTitle}</Button>
                </Link>
            </div>
        )
}
