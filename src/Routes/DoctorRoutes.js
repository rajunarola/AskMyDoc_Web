import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoctorLogin from '../_Layout/Doctor/DoctorLogin';
import Doctordashboard from '../Doctor/doctordashboard';
import PatientList from '../Doctor/PatientList';
import AppointmentBadge from '../Doctor/AppointmentBadge';
import DoctorSignin from '../Doctor/DoctorSignin';
import DoctorForgotPwd from '../Doctor/DoctorForgotPwd';
import ResetPassword from '../Doctor/ResetPassword';
import DoctorDetail from "../Doctor/DoctorDetail";
import ChangePassword from "../Doctor/DoctorChangePassword";

function DoctorRoutes() {
    return (
        <Switch>
            <Route path='/doctor/doctordashboard' exact={true} component={Doctordashboard} />
            <Route path='/doctor/patientlist' exact={true} component={PatientList} />
            <Route path='/doctor/appointmentdetails' exact={true} component={AppointmentBadge} />
            <Route path='/doctorsignin' exact={true} component={DoctorSignin} />
            <Route path='/forgotpwd' exact={true} component={DoctorForgotPwd} />
            <Route path='/doctor/resetpassword' exact={true} component={ResetPassword} />
            <Route path='/doctor/doctordetail' exact={true} component={DoctorDetail} />
            <Route path='/doctor/changepassword' exact={true} component={ChangePassword} />

            <Route path="/" exact={true} component={DoctorLogin} />
        </Switch>
    )
}

export default DoctorRoutes;