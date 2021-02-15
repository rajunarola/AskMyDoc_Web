import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';

function Dashboard(props) {
    useEffect(() => {
        if (localStorage.getItem('AccessToken') === null) {
            props.history.push('/admin')
        }
    })

    return (
        <div className="wrapper">
            <AdminHeader/>
            <AdminSidebar/>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title"></h3>
                                    </div>
                                    <div className="card-body"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <AdminFooter/>               
        </div>
    )
}
export default withRouter(Dashboard);