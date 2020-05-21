import React from 'react'
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom"
import { connect } from 'react-redux'

function About({user}) {
    var loginLine = null
    if (user==null) {
        loginLine = (
            <h5>
                <Link to="/login">Login</Link> now to get film recommendations
            </h5>
        )
    }
    return (
        <Container maxWidth="md">
            <h2>About FiML</h2>
            <h5>FiML uses a combination of implicit and explicit collaborative filtering based on state-of-the-art matrix factorization techniques, to bring you the very best film recommendations!
            </h5>
            {loginLine}
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(About);