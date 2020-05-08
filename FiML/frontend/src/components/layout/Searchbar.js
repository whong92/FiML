import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import Select, { createFilter } from 'react-select';
import {getFilms} from '../../actions/films'
import {getRatings, addRatings, putRatings} from '../../actions/ratings'

const CustomOption = ({ innerProps, data, isFocused, children }) => {
    // console.log(data.value, isFocused, children, data.slogan)
    return <div {...innerProps}>{children}</div>
};

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { FixedSizeList as List } from "react-window";

class RadioButtonsGroup extends Component {

    render() {
        const labelList = this.props.labels.map(
            label => (<FormControlLabel value={label.value} control={<Radio />} label={label.label} key={label.label}/>)
        )
        return (
            <FormControl component="fieldset">
            <FormLabel component="legend">{this.props.title}</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" onChange={this.props.handleChange}>
                {labelList}
            </RadioGroup>
            </FormControl>
        );
    }

}

const height = 35;

class MenuList extends Component {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;
      const short_children = children.slice(0,10) // limit size of menu to 10... seems to work!?
  
      return (
        <List
          height={maxHeight}
          itemCount={short_children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{short_children[index]}</div>}
        </List>
      );
    }
  }

class Searchbar extends Component {

    state = {
        selectedOption: null,
    };

    handleChange = selectedOption => {
        this.setState(
        { selectedOption },
        () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    componentDidMount() {
        this.props.getFilms()
        this.props.getRatings()
    }

    
    handleRated = (event) => {
        console.log(event.target.value, this.state.selectedOption, this.props.ratings)
        const rating = Number(event.target.value)
        const film = this.state.selectedOption.film
        const ratings = this.props.ratings

        // console.log(ratings[film.id])

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

        console.log("re-rendering")

        const { selectedOption } = this.state;
        const labels = [
            {label: "Good", value: "5.0"},
            {label: "Medium", value: "2.5"},
            {label: "Bad", value: "0.0"},
        ]

        // TODO: put this in own component
        const form = this.state.selectedOption === null ? null : (
            <Fragment>
            <h3>{this.state.selectedOption.film.name}</h3>
            <RadioButtonsGroup labels={labels} title="Please choose your rating" handleChange={this.handleRated}/>
            </Fragment>
        )

        return (
            <Fragment>
            <Select
                components={{ MenuList: MenuList, Option: CustomOption }}
                value={selectedOption}
                onChange={this.handleChange}
                options={this.props.films.map(film=>({film: film, label: film.name}))}
                filterOption={createFilter({ignoreAccents: false})}
            />
            {form}          
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    films: state.films.films,
    ratings: state.ratings.ratings
});

export default connect(mapStateToProps, {getFilms, getRatings, addRatings, putRatings})(Searchbar);