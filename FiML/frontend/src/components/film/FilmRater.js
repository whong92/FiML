import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {getRatings, addRatings, putRatings} from '../../actions/ratings'
import {updateUser} from '../../actions/recommends'


class RadioButtonsGroup extends Component {

    render() {
        const labelList = this.props.labels.map(
            label => (<FormControlLabel value={label.value} control={<Radio />} label={label.label} key={label.value} labelPlacement="bottom" />)
        )
        return (
            <FormControl component="fieldset">
            <FormLabel component="legend">{this.props.title}</FormLabel>
            <RadioGroup row aria-label="gender" name="gender1" onChange={this.props.handleChange}>
                {labelList}
            </RadioGroup>
            </FormControl>
        );
    }

}

const labels = [
    {label: "Excellent", value: "5.0"},
    {label: "", value: "4.5"},
    {label: "Good", value: "4.0"},
    {label: "", value: "3.5"},
    {label: "Whatever", value: "3.0"},
    {label: "", value: "2.5"},
    {label: "Not great", value: "2.0"},
    {label: "", value: "1.5"},
    {label: "Awful", value: "1.0"},
]

// some default stuff I copied from material ui's site
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = labels;

function valuetext(value) {
  return `${value}`;
}

const divStyle = {
    marginLeft: '10%',
};  

function DiscreteSlider({handleChange, initialValue}) {
    const classes = useStyles();
    return (
        <div className={classes.root} style={divStyle}>
        <Typography id="discrete-slider-custom" gutterBottom>
            Rate it
        </Typography>
        <Slider
            max={5}
            min={1}
            value={initialValue==null ? 3.0 : initialValue.rating}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={0.5}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={handleChange}
        />
        </div>
    );
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

        return (
            <div>
                <Fragment>
                    <h3>{this.props.film.name}</h3>
                    <RadioButtonsGroup labels={labels} title="Please choose your rating" handleChange={this.handleRated}/>
                    {/* <DiscreteSlider handleChange={this.handleRated} initialValue={ratings[film.dataset_id]}/> */}
                </Fragment>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ratings: state.ratings.ratings,
    user: state.auth.user
});

export default connect(mapStateToProps, {getRatings, addRatings, putRatings, updateUser})(FilmRater);