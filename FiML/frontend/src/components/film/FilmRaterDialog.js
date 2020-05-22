import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import FilmRater from './FilmRater'

export function FilmRaterDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    return (
      <Dialog fullWidth={true} maxWidth="lg" onClose={handleClose} aria-labelledby="rater-dialog-title" open={open}>
        <DialogTitle id="rater-dialog-title">Watched before? Rate it!</DialogTitle>
        {selectedValue==null? null : <FilmRater film={selectedValue} />}
      </Dialog>
    );
}