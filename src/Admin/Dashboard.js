import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


function Dashboard(props) {
    useEffect(() => {
        if (localStorage.getItem('AccessToken') === null) {
            props.history.push('/admin')
        }
    })

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>DataTables</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">DataTables</li>
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
                                    <h3 className="card-title">DataTable with default features</h3>
                                </div>
                                <div className="card-body"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default withRouter(Dashboard);