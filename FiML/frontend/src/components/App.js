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

import {grey } from '@material-ui/core/colors';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const alertOptions = {
    timeout: 10000,
    position: 'top center'
}

export default class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    light: '#757ce8',
                    main: '#3f50b5',
                    dark: '#002884',
                    contrastText: '#fff',
                  },
                secondary: {
                    light: grey[100],
                    main: grey[300],
                    dark: grey[600],
                    contrastText: '#fff',
                },
              },
            typography: {
              fontSize: 12,
            },
          });
        
        return (
            <ThemeProvider theme={theme}>
            <Provider store={ store }>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Fragment>
                        <Header />
                        <Alerts />
                        <div className="container">
                            <Route exact path = "/" component={Dashboard} />
                            <Route exact path = "/register" component={Register} />
                            <Route exact path = "/login" component={Login} />
                        </div>
                    </Fragment>
                </Router>
            </AlertProvider>
            </Provider>
            </ThemeProvider>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))