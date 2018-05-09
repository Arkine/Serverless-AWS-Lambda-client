import React from 'react';

import { Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import SignUp from './containers/Signup';

import AppliedRoute from './components/AppliedRoute';

export default ({ childProps }) => 
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={SignUp} props={childProps} />
        <AppliedRoute component={NotFound} />
    </Switch>