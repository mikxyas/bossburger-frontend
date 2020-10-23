import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    borderRadius:'20px 20px 0px 0px',

  },
  toobar: {
    width:'100%',
    background:'rgba(0,0,0,0.8)',
    borderRadius:'20px 20px 0px 0px',
    color:'white',
    borderBottom:'solid rgba(0,0,0,0.3) 1px'
  },
  title: {
    marginLeft:'auto',
  },
  closeIcon: {
    position:'absolute',
    marginTop:'0em',
    marginLeft:'auto',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function RegisterDialog() {
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
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Sign up
      </Button>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
          {/* <Toolbar className={classes.toobar}>
            
            <Typography variant="h6" className={classes.title}>
              Sign up
            </Typography>
          </Toolbar> */}
        <div style={{display:'flex', width:'100%',justifyContent:'flex-end',marginBottom:'.5em'}}>
        <IconButton className={classes.closeIcon} edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
          </IconButton>
        </div>
          
        <div style={{display:'flex', alignItmes:'center', justifyContent:'center'}}>
          <RegisterForm/>
        </div>
      </Dialog>
    </div>
  );
}

  
