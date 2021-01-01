import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import Select, { createFilter } from 'react-select';
import {getFilms, selectFilm} from '../../actions/films'
import FilmRater from '../film/FilmRater'

const CustomOption = ({ innerProps, data, isFocused, children }) => {
    // console.log(data.value, isFocused, children, data.slogan)
    return <div {...innerProps}>{children}</div>
};


import { FixedSizeList as List } from "react-window";

const height = 35;

class MenuList extends Component {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;
      // need to test if children has a length property since it doesn't pass an empty list if children is empty
      const short_children = children.length==null ? [] : children.slice(0,10) // limit size of menu to 10... seems to work!?
  
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
        this.props.selectFilm(selectedOption)
        this.setState({ selectedOption });
    };

    componentDidMount() {
        this.props.getFilms()
    }

    render() {

        const { selectedOption } = this.state;
        const selected_film = this.props.selected_film
        const form = (selected_film==null ? null : <FilmRater film={selected_film} />)

        return (
            <Fragment>
            <Select
                components={{ MenuList: MenuList}}
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
    selected_film: state.films.selected_film
});

export default connect(mapStateToProps, {getFilms, selectFilm})(Searchbar);