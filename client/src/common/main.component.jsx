import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home.component';

// Configure all routes here
const Main = (props) => (
    <Switch>
        <Route exact path='/' component={Home} />
    </Switch>
)

export default Main