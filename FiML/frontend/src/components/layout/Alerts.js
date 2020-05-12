import React, { Component, Fragment } from 'react'
import {withAlert} from 'react-alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        //message: PropTypes.object.isRequired
    }

    // TODO: update with the ratings posted stuff!
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if ( error != prevProps.error ){

            if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join())
            if(error.msg.username) alert.error(error.msg.username.join())
            if(error.msg.username) alert.error(error.msg.password.join())

        }
        if (message != prevProps.message) {
            if(message.createLead) alert.success(message.createLead);
            if(message.deleteLead) alert.success(message.deleteLead);
            if(message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
            if(message.registerSuccess) alert.success(message.registerSuccess);
        }
    }

    render() {
        return <Fragment />
    }
}

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.message
});


export default connect(mapStateToProps)(withAlert()(Alerts));