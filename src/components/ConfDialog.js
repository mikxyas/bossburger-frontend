import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Typography } from '@material-ui/core';

export default function ConfDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.Open}
        onClose={props.DialogFunc}
        className='dialog'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography className='dialog-header' variant='h5'><Box fontSize={30}>{props.dialogHeader}</Box></Typography>
        <DialogContent>
        <Typography className='dialog-content' variant='subtitle1'>{props.dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.DialogFunc} className='normal-button' variant='contained' color="secondary">
            No
          </Button>
          <Button onClick={props.ActionFunc} className='normal-button' variant='contained' color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
