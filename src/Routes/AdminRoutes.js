import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Forgetpassword from '../Admin/Forgetpassword';
import AdminLogin from '../_Layout/Admin/AdminLogin';
import Dashboard from '../Admin/Dashboard';
import States from '../Admin/States';
import Specialization from '../Admin/Specialization';
import City from '../Admin/City';

function AdminRoutes() {
    return ( 
        <Switch>
            <Route path="/admin" exact={true} component={AdminLogin} />
            <Route path="/admin/admindashboard" exact={true} component={Dashboard} />
            <Route path="/admin/state" exact={true} component={States} />
            <Route path="/admin/specialization" exact={true} component={Specialization} />
            <Route path="/admin/city" exact={true} component={City} />
            <Route path="/admin/forgetpassword" exact={true} component={Forgetpassword} />
        </Switch>
    );
}

export default AdminRoutes;