import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {getFilms} from '../../actions/films'
import {getRecommends} from '../../actions/recommends'
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
        
        const {films, recommends} = this.props
        var disp = null
        if (recommends != null) {
            const { dist, rec } = recommends
            if (films.length > 0){
                disp = rec.map( 
                    (r, i) => (
                    <tr key={ films[r].id }>
                        <td>{ films[r].id }</td>
                        <td>{ films[r].name }</td>
                        <td>{ dist[i] }</td>
                    </tr>
                    )
                )
            }
        } else {
            disp = films.slice(0,100).map( 
                film => (
                <tr key={ film.id }>
                    <td>{ film.id }</td>
                    <td>{ film.name }</td>
                    <td>{ 0 }</td>
                </tr>
                )
            )
        }

        return (
            <Fragment>
                <h1>FiML</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disp}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    films: state.films.films,
    recommends: state.recommends.recommends,
    ratings: state.ratings.ratings
});

export default connect(mapStateToProps, {getFilms, getRecommends})(RankTable);