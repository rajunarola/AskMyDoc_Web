import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Forgetpassword from '../Admin/Forgetpassword';
import AdminLogin from '../_Layout/Admin/AdminLogin';
import Dashboard from '../Admin/Dashboard';
import States from '../Admin/States';
import Specialization from '../Admin/Specialization';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/admin/admindashboard" exact={true} component={Dashboard} />
                <Route path="/admin/state" exact={true} component={States} />
                <Route path="/admin/specialization" exact={true} component={Specialization} />

                <Route path="/admin/forgetpassword" exact={true} component={Forgetpassword} />
                <Route path="/admin" exact component={AdminLogin} />
            </Switch>     
        </Router>
    );
}

export default Routes;