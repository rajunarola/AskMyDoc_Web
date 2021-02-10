import React from 'react';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import Forgetpassword from '../Admin/Forgetpassword';
import AdminLogin from '../_Layout/Admin/AdminLogin';
import Admindashboard from '../Admin/Dashboard';


function Routes()
{
    return(
        <div>
            <Router>
            <Switch>
            <Route path="/" exact={true} >
            <AdminLogin/>    
            </Route>
            <Route path="/admin/adminlogin" exact={true} >
            <AdminLogin/>    
            </Route>
            
            <Route path="/admin/admindashboard" exact component={Admindashboard}/>

            <Route path="/admin/forgetpassword" exact={true}>
            <Forgetpassword/>
            </Route>  
            
            </Switch>
            </Router>
        </div>
    )
}

export default Routes;