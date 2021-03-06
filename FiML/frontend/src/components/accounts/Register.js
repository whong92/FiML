import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {register} from '../../actions/auth'
import {createMessage} from '../../actions/messages'

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        re_password: '',
    }

    onSubmit = e => {
        e.preventDefault();
        const {username, email, password, re_password} = this.state;
        if (username=="" || email=="" || password=="" || re_password==""){
            this.props.createMessage({fieldsRequired: "all fields required"})
        }
        else if (password !== re_password) {
            this.props.createMessage({passwordsNotMatch: "passwords do not match"})
        } else {
            const newUser = {
                username, password, email, re_password
            };
            this.props.register(newUser);
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { username, email, password, re_password } = this.state;

        return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
            <h2 className="text-center">Register</h2>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={this.onChange}
                    value={username}
                />
                </div>
                <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                />
                </div>
                <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                />
                </div>
                <div className="form-group">
                <label>Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="re_password"
                    onChange={this.onChange}
                    value={re_password}
                />
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
                </div>
                <p>
                Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, createMessage })(Register)