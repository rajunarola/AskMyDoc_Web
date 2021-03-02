import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getAdminDashboard } from './../Service/AdminService';
import { Link } from 'react-router-dom';
import { message } from 'antd'
import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';

function Dashboard(props) {
    const [state, setState] = useState({
        doctorsCount: 0,
        approvalRequestCount: 0,
        degreesCount: 0,
        specializationCount: 0,
        citiesCount: 0,
        statesCount: 0,
        appointmentCount: 0
    });
    useEffect(() => {
        if (localStorage.getItem('AccessToken') === null) {
            props.history.push('/admin')
        }
        else {
            if (state.statesCount == 0) {
                getAdminDashboard().then(res => {
                    if (res.data.status === "Success") {
                        setState(res.data.result);
                        console.log('States ', state);
                    } else {
                        message.error({
                            content: res.data.message, className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            }
                        })
                    }
                }).catch(function (err) {
                    message.error({
                        content: err, className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        }
                    });
                });
            }
        }
    }, [])

    return (
        <div className="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    {/* <li className="breadcrumb-item"><a >Home</a></li> */}
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
                                    {/* <div className="card-header">
                                        <h3 className="card-title"></h3>
                                    </div> */}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-6">
                                                <div className="small-box bg-info">
                                                    <div className="inner">
                                                        <h3>{state.statesCount}</h3>

                                                        <p>States</p>
                                                    </div>
                                                    <div className="icon">
                                                        <i className="fas fa-archway"></i>
                                                    </div>
                                                    {/* <Link className="nav-link" to='/admin/state' className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link> */}
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-6">
                                                <div className="small-box bg-success">
                                                    <div className="inner">
                                                        <h3>{state.citiesCount}</h3>

                                                        <p>Cities</p>
                                                    </div>
                                                    <div className="icon">
                                                        <i class="fas fa-city"></i>
                                                    </div>
                                                    {/* <Link className="nav-link" to='/admin/city' className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link> */}
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-6">
                                                <div className="small-box bg-warning">
                                                    <div className="inner">
                                                        <h3>{state.specializationCount}</h3>

                                                        <p>Doctor Specialities</p>
                                                    </div>
                                                    <div className="icon">
                                                        <i className="fas fa-user-md "></i>
                                                    </div>
                                                    {/* <Link className="nav-link" to='/admin/specialization' className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link> */}
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-6">
                                                <div className="small-box bg-secondary">
                                                    <div className="inner">
                                                        <h3>{state.degreesCount}</h3>

                                                        <p>Doctor Degrees</p>
                                                    </div>
                                                    <div className="icon">
                                                        <i className="fas fa-graduation-cap "></i>
                                                    </div>
                                                    {/* <Link className="nav-link" to='/admin/degree' className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link> */}
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-6">
                                                <div className="small-box bg-primary">
                                                    <div className="inner">
                                                        <h3>{state.approvalRequestCount}</h3>

                                                        <p>Approval Requests</p>
                                                    </div>
                                                    <div className="icon">
                                                        <i className="fas fa-paper-plane "></i>
                                                    </div>
                                                    {/* <Link className="nav-link" to='/admin/approvalrequest' className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link> */}
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-6">
                                                <div className="small-box bg-teal">
                                                    <div className="inner">
                                                        <h3>{state.doctorsCount}</h3>

                                                        <p>Doctors</p>
                                                    </div>
                                                    <div className="icon">
                                                        <i className="fas fa-user-md"></i>
                                                    </div>
                                                    {/* <Link className="nav-link" to='/admin/doctor' className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link> */}
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-6">
                                                <div className="small-box bg-teal">
                                                    <div className="inner">
                                                        <h3>{state.appointmentCount}</h3>

                                                        <p>Doctor Appointments</p>
                                                    </div>
                                                    <div className="icon">
                                                        <i class="fas fa-book-medical"></i>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <AdminFooter />
        </div>
    )
}
export default withRouter(Dashboard);