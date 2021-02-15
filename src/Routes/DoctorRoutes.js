import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import Forgetpassword from '../Admin/Forgetpassword';
import DoctorLogin from '../_Layout/Doctor/DoctorLogin';
import Doctordashboard from '../Doctor/doctordashboard';
// import Admindashboard from '../Admin/Dashboard';
import PatientList from '../Doctor/PatientList';
import AppointmentBadge from '../Doctor/AppointmentBadge';
import DoctorSignin from '../Doctor/DoctorSignin';
import DoctorForgotPwd from '../Doctor/DoctorForgotPwd';

function Routes() {
    return (
        <div>
            <Router>

                <Switch>
                    <Route path="/" exact component={DoctorLogin} />
                    <Route path='/doctor/doctordashboard' exact component={Doctordashboard} />
                    <Route path='/doctor/patientlist' exact component={PatientList} />
                    <Route path='/doctor/appointmentdetails' exact component={AppointmentBadge} />
                    <Route path='/doctorsignin' exact component={DoctorSignin} />
                    <Route path='/forgotpwd' exact component={DoctorForgotPwd} />
                </Switch>
            </Router>
        </div>
    )
}

export default Routes;