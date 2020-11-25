import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {connect} from 'react-redux'; 
import {toggleEventViewer} from '../actions/events'
import {Image} from 'cloudinary-react'


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    display:'flex',
    height:'20vh',
    justifyContent:'center',
    alignItems:'center'
  },
  toolbar: {
    width:'100%'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EventViewer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={props.openEvent} onClose={props.toggleEventViewer} TransitionComponent={Transition}>
        <AppBar className='event-header' position='relative'>
          <Toolbar className={classes.toolbar}>
            <Typography  variant="h5" className='event-header-title'>
                <Box color='white' fontWeight={600}>{props.openedEvent.title}</Box>
            </Typography>
            <IconButton edge="start" color="inherit" onClick={props.toggleEventViewer} aria-label="close">
              <CloseIcon />
            </IconButton>
            {/* <Button autoFocus color="inherit" onClick={props.toggleEventViewer}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <div className='event-content'>
          <Image cloudName='mikiyas' height='300' width='350' publicId={props.openedEvent.img} secure="true"/>
            <>
                <Typography align='center' variant='h3' className='event-content-title' style={{marginBottom:'.1em'}}><Box fontWeight={600}>{props.openedEvent.title}</Box></Typography>
                <Typography className='event-content-desc' align='center' variant='subtitle1' style={{marginBottom:'1em'}}>{props.openedEvent.desc}</Typography>
                <Typography className='event-content-content' align='center' variant='subtitle1' style={{marginBottom:'1em'}}>{props.openedEvent.content}</Typography>
            </>
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => ({
    openEvent: state.events.openEventViewer,
    openedEvent: state.events.openedEvent,
})

export default connect(mapStateToProps, {toggleEventViewer})(EventViewer)