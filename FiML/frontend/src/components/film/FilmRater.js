import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {getRatings, addRatings, putRatings} from '../../actions/ratings'
import {updateUser} from '../../actions/recommends'

import { green, yellow, amber, orange, deepOrange, red, blue, pink, white, grey } from '@material-ui/core/colors';
import { withStyles, ThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


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
    })((props) => <Radio color="default" {...props} />)
    return <StyledRadio {...cprops}/>
};

class RadioButtonsGroup extends Component {

    render() {
        const labelList = this.props.labels.map(
        label => {
            const CRadioComp = <ColoredRadio c={label.color}/>
            return <FormControlLabel color="secondary.contrastText" value={label.value} control={CRadioComp} label={label.label} key={label.value} labelPlacement="bottom" />
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

const labels = [
    {label: "Excellent", value: 5, color:green[900]},
    {label: "", value: 4.5, color:green[700]},
    {label: "Good", value: 4, color:green[500]},
    {label: "", value: 3.5, color:green[300]},
    {label: "Whatever", value: 3, color:yellow[300]},
    {label: "", value: 2.5, color:amber[600]},
    {label: "Not great", value: 2, color: orange[600]},
    {label: "", value: 1.5, color: deepOrange[600]},
    {label: "Awful", value: 1, color: red[600]},
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
        padding: '20px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
        marginRight: '20px'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 150,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        padding: '20px'
    },
}

class FilmRater extends Component {


    componentDidMount() {
        this.props.getRatings()
    }

    componentDidUpdate(){
        const {user, ratings} = this.props
        if (user!=null) {this.props.updateUser(user.id)}
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
        const rating = ratings[film.dataset_id]
        const initalRating = rating==null ? null : rating.rating

        console.log(film)


        return (
            <div>
                <Card className={classes.root}>

                <CardMedia
                    className={classes.cover}
                    image={film.poster}
                    title="Live from space album cover"
                />
                    
                <div className={classes.details}>
                <CardContent className={classes.content} ><h3>{this.props.film.name}</h3></CardContent>
                <CardActions className={classes.controls} >
                    <RadioButtonsGroup labels={labels} title="Please choose your rating" handleChange={this.handleRated} value={initalRating}/>
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