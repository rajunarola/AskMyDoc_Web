import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChangePassword from '../Admin/ChangePassword';
import AdminLogin from '../_Layout/Admin/AdminLogin';
import Dashboard from '../Admin/Dashboard';
import States from '../Admin/States';
import Specialization from '../Admin/Specialization';
import Degree from '../Admin/Degree';
import City from '../Admin/City';
import ApprovalRequest from '../Admin/ApprovalRequest';
import DoctorList from '../Admin/DoctorList';
import Review from '../Admin/Review';
import Appointment from '../Admin/Appointment';

function AdminRoutes() {

    return (
        <Switch>
            <Route path="/admin" exact={true} component={AdminLogin} />
            <Route path="/admin/admindashboard" exact={true} component={Dashboard} />
            <Route path="/admin/state" exact={true} component={States} />
            <Route path="/admin/specialization" exact={true} component={Specialization} />
            <Route path="/admin/degree" exact={true} component={Degree} />
            <Route path="/admin/approvalrequest" exact={true} component={ApprovalRequest} />
            <Route path="/admin/doctor" exact={true} component={DoctorList} />
            <Route path="/admin/city" exact={true} component={City} />
            <Route path="/admin/changepassword" exact={true} component={ChangePassword} />
            <Route path="/admin/review" exact={true} component={Review} />
            <Route path="/admin/appointment" exact={true} component={Appointment} />
        </Switch>
    );
}

export default AdminRoutes;