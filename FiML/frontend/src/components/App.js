import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Switch, Redirect }  from "react-router-dom"
import PrivateRoute from './common/PrivateRoute'

import {Provider} from 'react-redux';
import store from '../store'
import Header from './layout/Header'
import Dashboard from './film/Dashboard'
import RatedTable from './film/RatedTable'
import About from './layout/About'
import Alerts from './layout/Alerts'
import Login from './accounts/Login'
import Register from './accounts/Register'
import {loadUser} from '../actions/auth'

// alerts
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const alertOptions = {
    timeout: 10000,
    position: 'top center'
}

export default class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {

        return (
            // <ThemeProvider theme={theme}>
            <Provider store={ store }>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Fragment>
                        <Header />
                        <Alerts />
                        <div className="container" style={{marginTop: 30}}>
                            <Route exact path = "/" component={Dashboard} />
                            <PrivateRoute exact path = "/ratings" component={RatedTable} />
                            <Route exact path = "/about" component={About} />
                            <Route exact path = "/register" component={Register} />
                            <Route exact path = "/login" component={Login} />
                        </div>
                    </Fragment>
                </Router>
            </AlertProvider>
            </Provider>
            // </ThemeProvider>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))