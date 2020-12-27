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
            // for login
            if(error.msg.non_field_errors != null) alert.error(error.msg.non_field_errors.join())
            // for registration
            if(error.msg.username != null) error.msg.username.forEach(msg => alert.error("username: " + msg))
            if(error.msg.password != null) error.msg.password.forEach(msg => alert.error("password: " + msg))
            if(error.msg.email != null) error.msg.email.forEach(msg => alert.error("email: " + msg))
            if(error.msg.api != null) alert.error("woops, " + error.msg.api)
        }
        if (message != prevProps.message) {
            // everything else within the app
            if(message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
            if(message.fieldsRequired) alert.error(message.fieldsRequired);
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