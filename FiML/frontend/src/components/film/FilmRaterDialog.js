import React from 'react'
import {connect} from 'react-redux'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {getFilms, selectFilm} from '../../actions/films'

import FilmRater from './FilmRater'

export function _FilmRaterDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };

    const clickFilm = (film) => {
        props.selectFilm({'film': film})
    }
  
    return (
      <Dialog fullWidth={true} maxWidth="lg" onClose={handleClose} aria-labelledby="rater-dialog-title" open={open}>
        <DialogTitle id="rater-dialog-title">Watched before? Rate it!</DialogTitle>
        {selectedValue==null? null : <FilmRater film={selectedValue} />}
        <Button onClick={() => { clickFilm(selectedValue) }}>Find Related</Button>
      </Dialog>
    );
}

const mapStateToProps = state => ({
    selected_film: state.films.selected_film
});

export const FilmRaterDialog = connect(mapStateToProps, {selectFilm})(_FilmRaterDialog);