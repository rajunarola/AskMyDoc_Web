import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../_Layout/Patient/Header';
import LandingPage from '../Patient/LandingPage';
import Meeting from '../Patient/Meeting'
import ErrorMessage from '../Patient/ErrorMessage';

function PatientRoutes() {
    return (
        <Switch>
            <Route path="/doctormeeting/{token}"  exact={true} component={Meeting}></Route>
            <Route path="/ErrorMessage" exact={true} component={ErrorMessage}></Route>
            <Route path='/' exact={true} component={LandingPage} />
        </Switch>
    )
}

export default PatientRoutes;