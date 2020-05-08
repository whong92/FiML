import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {getFilms} from '../../actions/films'
import PropTypes from 'prop-types'

class RankTable extends Component {

    static propTypes = {
        films: PropTypes.array.isRequired,
        getFilms: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getFilms()
    }

    render() {
        
        const films = this.props.films.map(
            film => (
            <tr key={ film.id }>
                <td>{ film.id }</td>
                <td>{ film.name }</td>
            </tr>
            )
        )

        return (
            <Fragment>
                <h1>FiML</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    films: state.films.films,
});

export default connect(mapStateToProps, {getFilms})(RankTable);