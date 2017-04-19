import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import {hashHistory, Router, Route, Redirect} from 'react-router';

import Layout from './layout/layout';

import InfoPage from './pages/info';
import ChartPage from './pages/chart';

const app = (
    <Router history={hashHistory}>
        <Redirect from="/" to="/info" />
        <Route path="/" component={Layout}>
            <Route path="info" component={InfoPage} />
            <Route path="chart" component={ChartPage} />
        </Route>
    </Router>
)

jQuery(function() {
    ReactDOM.render(
        app,
        document.getElementById('app'),
        function() {
            console.timeEnd('react-app')
        }
    );
})
