import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../_Layout/Patient/Header';
import LandingPage from '../Patient/LandingPage';
import Meeting from '../Patient/Meeting'
import ErrorMessage from '../Patient/ErrorMessage';

function PatientRoutes() {
    return (
        <Switch>
            <Route path='/' exact={true} component={LandingPage} />
            <Route path="/doctormeeting/:token" exact component={Meeting}></Route>
            <Route path="/ErrorMessage" exact component={ErrorMessage}></Route>
        </Switch>
    )
}

export default PatientRoutes;