import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Forgetpassword from '../Admin/Forgetpassword';
import AdminLogin from '../_Layout/Admin/AdminLogin';
import Dashboard from '../Admin/Dashboard';

import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';

function Routes() {
    if(localStorage.getItem('AccessToken'))
    {
        return (
            <div className="wrapper">
                <AdminHeader/>
                <AdminSidebar/>
                <Router>
                    <Switch>
                        <Route path="/admin/admindashboard" exact={true} component={Dashboard} />
                        <Route path="/admin/forgetpassword" exact={true} component={Forgetpassword} />
                    </Switch>     
                </Router>
                <AdminFooter/>               
            </div>
        );
    }
    else
    {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/admin" exact component={AdminLogin} />
                    </Switch>                    
                </Router>
            </div>
        );  
    }

}

export default Routes;