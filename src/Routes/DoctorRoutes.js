import React from 'react';
import { Route, Switch} from 'react-router-dom';
import DoctorLogin from '../_Layout/Doctor/DoctorLogin';
import Doctordashboard from '../Doctor/Doctordashboard';
import PatientList from '../Doctor/PatientList';
import AppointmentBadge from '../Doctor/AppointmentBadge';
import DoctorSignin from '../Doctor/DoctorSignin';
import DoctorForgotPwd from '../Doctor/DoctorForgotPwd';

function DoctorRoutes() {
    return (
        <Switch>
            <Route path='/doctor/doctordashboard' exact={true} component={Doctordashboard} />
            <Route path='/doctor/patientlist' exact={true} component={PatientList} />
            <Route path='/doctor/appointmentdetails' exact={true} component={AppointmentBadge} />
            <Route path='/doctorsignin' exact={true} component={DoctorSignin} />
            <Route path='/forgotpwd' exact={true} component={DoctorForgotPwd} />
            <Route path="/" exact={true} component={DoctorLogin} />
        </Switch>
    )
}

export default DoctorRoutes;