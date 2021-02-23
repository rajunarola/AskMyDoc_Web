import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Header from '../_Layout/Patient/Header';
import LandingPage from '../Patient/LandingPage'; 

function PatientRoutes() {
    return (
        <Switch>
            <Route path='/patient' exact={true} component={LandingPage} />
           
        </Switch>
    )
}

export default PatientRoutes;