import React, { Fragment, Component } from 'react';
import RankGrid from './RankTable'
import Searchbar from '../layout/Searchbar'
import RatedTable from './RatedTable'
import {connect} from 'react-redux'
import {getRecommends} from '../../actions/recommends'


class Dashboard extends Component{

    componentDidUpdate() {
        const {user} = this.props
        if (user!=null) {this.props.getRecommends(user.id)}
    }

    render(){
        return (
            <Fragment>
                <Searchbar />
                <RatedTable />
                <RankGrid />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {getRecommends})(Dashboard);