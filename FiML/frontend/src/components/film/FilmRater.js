import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import {getRatings, addRatings, putRatings} from '../../actions/ratings'
import {updateUser} from '../../actions/recommends'

import { green, yellow, amber, orange, deepOrange, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


function ColoredRadio (cprops) { // function component
    const {c} = cprops
    const StyledRadio = withStyles({
        root: {
            color: c,
            '&$checked': {
                color: c,
            },
        },
        checked: {},
    })((props) => <Radio color="default" size="small" {...props} />)
    return <StyledRadio {...cprops}/>
};

const formControlLabelStyles = {
    label: {
        fontSize: 13,
    }
}
const StyledFormControlLabel  = withStyles(formControlLabelStyles)(FormControlLabel)

class RadioButtonsGroup extends Component {

    render() {
        const labelList = this.props.labels.map(
        label => {
            const CRadioComp = <ColoredRadio c={label.color}/>
            return <StyledFormControlLabel color="secondary.contrastText" value={label.value} control={CRadioComp} label={label.label} key={label.value} labelPlacement="bottom" />
        })

        return (
            <div>
                <FormControl component="fieldset">
                {this.props.title}
                <RadioGroup row aria-label="rating" name="rating" onChange={this.props.handleChange} value={this.props.value}>
                    {labelList}
                </RadioGroup>
                </FormControl>
            </div>
        );
    }

}

export const Labels = [
    {key:"0", label: "Excellent", value: 5, color:green[900]},
    {key:"1", label: "", value: 4.5, color:green[700]},
    {key:"2", label: "Good", value: 4, color:green[500]},
    {key:"3", label: "", value: 3.5, color:green[300]},
    {key:"4", label: "Whatever", value: 3, color:yellow[300]},
    {key:"5", label: "", value: 2.5, color:amber[600]},
    {key:"6", label: "Not great", value: 2, color: orange[600]},
    {key:"7", label: "", value: 1.5, color: deepOrange[600]},
    {key:"8", label: "Awful", value: 1, color: red[600]},
]


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: '10px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10px',
        marginRight: '10px'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 150,
        height: 220,
        marginLeft: '10px',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px'
    },
}

class FilmRater extends Component {

    state = {
        film_desc: null,
    }

    GetFilmDesc = (film) => {
        if (film != null) { 
            axios.get(`/backend/api/filmdetails/${film}/`).then(
                res => {
                    this.setState({film_desc: res.data.desc})
                }
            ).catch(
                e => {
                    this.setState({film_desc: 'Failed to get film description'})
                }
            )
        }
    }

    componentDidMount() {
        this.props.getRatings()
        const {film} = this.props
        if (film != null) this.GetFilmDesc(film.dataset_id)
    }

    componentDidUpdate(prevProps){
        const {user, ratings, film} = this.props
        const prevRatings = prevProps.ratings
        const prevUser = prevProps.user
        const prevFilm = prevProps.film
        
        if (prevRatings != ratings || prevUser != user) {
            if (user!=null) {this.props.updateUser(user.id)}
        }

        if (prevFilm != film) this.GetFilmDesc(film.dataset_id)

    }

    handleRated = (event, value) => {


        const rating = Number(value)
        const film = this.props.film
        const ratings = this.props.ratings

        if (!(film.dataset_id in ratings)) {
            this.props.addRatings({
                film: film.dataset_id,
                rating: rating,
            })
        } else {
            this.props.putRatings({
                id: ratings[film.dataset_id].id,
                rating: rating,
                film: film.dataset_id,
            })
        }
    };


    render() {

        const { film, ratings, classes } = this.props
        const rating = ratings == null ? null : ratings[film.dataset_id]
        const initalRating = rating==null ? null : rating.rating

        return (
            <div>
                <Card className={classes.root}>

                <CardMedia
                    className={classes.cover}
                    component="img"
                    width="10"
                    image={film.poster!=null ? film.poster : "/static/images/cards/poster_placeholder.jpg" }
                    title="film poster"
                />
                    
                <div className={classes.details}>
                <CardContent className={classes.content} >
                    <h3>{this.props.film.name}</h3> 
                    <p>{this.state.film_desc}</p>
                </CardContent>
                <CardActions className={classes.controls} >
                    <RadioButtonsGroup 
                        labels={Labels} 
                        title={`Please choose your rating ` + (initalRating!=null ? `(you last rated this: ${initalRating})` : ``)}
                        handleChange={this.handleRated} 
                        value={initalRating}
                    />
                </CardActions>
                </div>

                </Card>
            </div>
        )
    }
}

const StyledFilmRater = withStyles(styles)(FilmRater)


const mapStateToProps = state => ({
    ratings: state.ratings.ratings,
    user: state.auth.user
});

export default connect(mapStateToProps, {getRatings, addRatings, putRatings, updateUser})(StyledFilmRater);