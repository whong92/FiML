import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {getRatings, delRatings} from '../../actions/ratings'
import {getFilms} from '../../actions/films'

import {Labels} from './FilmRater'
import { FilmRaterDialog } from './FilmRaterDialog'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';



function sortRatings(ratings, films) {
    return Object.entries(ratings).sort(
        (a,b) => {
            const ratinga = a[1]
            const ratingb = b[1]
            if (ratinga.rating == ratingb.rating) {
                return films[ratinga.film].name < films[ratingb.film].name ? -1 : 1
            }
            return ratinga.rating > ratingb.rating ? -1 : 1
        }
    )
}

function makeLabelStyles(labels) {
    var labelColors = {}
    labels.forEach(
        label => {
            labelColors[label.value] = label.color
        }
    )
    return labelColors
}

const labelColors = makeLabelStyles(Labels)

function ColoredAvatar ({val, col}) { // function component
    const useStyles = makeStyles((theme) => ({
        rounded: {
            color: '#fff',
            backgroundColor: col,
            width: 30, height: 30,
            fontSize: 14,
        },
    }))
    const classes = useStyles()
    return <Avatar variant="rounded" className={classes.rounded}>{val}</Avatar>
};

class RatedTable extends Component {

    state = {
        dialogOpen: false,
        film: null,
        page: 1,
    }

    setFilmState = (film) => {
        console.log(film)
        this.setState({...this.state, dialogOpen: true, film: film})
    }
    
    handleClose = (value) => {
        this.setState({...this.state, dialogOpen: false})
    };

    componentDidMount() {
        this.props.getRatings()
        this.props.getFilms()
    }

    render() {

        const {films, ratings, user} = this.props
        const {dialogOpen, film} = this.state

        const ratingsTab = ratings==null || films.length==0 ? null : sortRatings(ratings, films).map(
            ([key, rating]) => (
                <ListItem>

                    {/* Avatar */}
                    <ListItemAvatar>
                    <ColoredAvatar val={rating.rating} col={labelColors[rating.rating]}/>
                    </ListItemAvatar>


                    {/* Title */}
                    <ListItem
                        button
                        // selected={selectedIndex === 3} // nothing happens yet
                        onClick={(event) => this.setFilmState(films[rating.film])}
                    >
                        <ListItemText primary={films[rating.film].name} />
                    </ListItem>

                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={(event) => {
                        console.log(rating.id)
                        this.props.delRatings(rating)
                    }}>
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

            )
        )
        
        return (
            <Fragment>
                <h3>My Ratings</h3>
                <FilmRaterDialog selectedValue={film} open={dialogOpen} onClose={this.handleClose} />
                <List dense={true}>
                    {ratingsTab}
                </List>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    films: state.films.films,
    ratings: state.ratings.ratings
});

export default connect(mapStateToProps, {getRatings, delRatings, getFilms})(RatedTable);