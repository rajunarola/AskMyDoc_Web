import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import {Route,Link} from 'react-router-dom';
import AdminHeader from '../_Layout/Admin/AdminHeader';


function Dashboard(props)
{
    useEffect(()=>{
        if(localStorage.getItem('AccessToken')==null)
        {
            props.history.push('/')
        }
    })
    
      
    
    return(
        
        <div className="wrapper">
         <AdminHeader/>
        </div>
    )
}
export default Dashboard;