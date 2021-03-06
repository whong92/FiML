import React, { Fragment, Component } from 'react';
import {RankGrid, MultiRankGrid} from './RankTable'
import Searchbar from '../layout/Searchbar'
import RatedTable from './RatedTable'
import About from '../layout/About'
import {connect} from 'react-redux'
import {getRecommends} from '../../actions/recommends'
import {getRatings} from '../../actions/ratings'
import {getSimilars} from '../../actions/similars'

class Dashboard extends Component{

    componentDidMount() {
        const {user} = this.props
        if (user!=null) {this.props.getRecommends(user.id)}
    }

    componentDidUpdate() {
        const {user} = this.props
        if (user!=null) {this.props.getRecommends(user.id)}
    }

    render(){
        const {user} = this.props
        if (user!=null){
            return (
                <Fragment>
                    <Searchbar />
                    <div style={{marginTop: 20}}>
                        <MultiRankGrid />
                    </div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <About />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {getRecommends, getRatings, getSimilars})(Dashboard);