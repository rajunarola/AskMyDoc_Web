import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../_Layout/Patient/Header';
import LandingPage from '../Patient/LandingPage';
import Meeting from '../Patient/Meeting'
import ErrorMessage from '../Patient/ErrorMessage';
import NoObjection from '../Patient/Noobjection';
import Prescription from '../Patient/Prescription';
import Feedback from '../Patient/Feedback';

import DocMeeting from '../Patient/DocMeeting';

function PatientRoutes() {
    return (
        <Switch>
            <Route path="/doctormeeting?token={token}" exact={true} component={Meeting}></Route>
            <Route path="/noobjection" exact={true} component={NoObjection}></Route>
            <Route path="/ErrorMessage" exact={true} component={ErrorMessage}></Route>
            <Route path='/' exact={true} component={LandingPage} />
            <Route path='/Prescription' exact={true} component={Prescription} />
            <Route path='/Feedback' exact={true} component={Feedback} />

            <Route path='/DocMeeting' exact={true} component={DocMeeting} />
        </Switch>
    )
}

export default PatientRoutes;