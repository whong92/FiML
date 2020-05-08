import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Switch, Redirect }  from "react-router-dom"
import PrivateRoute from './common/PrivateRoute'

import {Provider} from 'react-redux';
import store from '../store'
import Header from './layout/Header'
import Dashboard from './film/Dashboard'
import Alerts from './layout/Alerts'
import Login from './accounts/Login'
import Register from './accounts/Register'
import {loadUser} from '../actions/auth'

// alerts
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const alertOptions = {
    timeout: 3000,
    position: 'top center'
}

export default class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        
        return (
            <Provider store={ store }>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                            <Route exact path = "/" component={Dashboard} />
                            <Route exact path = "/register" component={Register} />
                            <Route exact path = "/login" component={Login} />
                        </div>
                    </Fragment>
                </Router>
            </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))