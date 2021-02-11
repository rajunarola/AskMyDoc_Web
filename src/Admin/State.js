import React, {useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { GetAllStates } from '../Service/AdminService';
import {notification } from 'antd';

function State(props) {
    const [state, setState] = useState([])
    
    useEffect(() => {
        if (localStorage.getItem('AccessToken') === null) {
            props.history.push('/admin')
        }else{
            GetAllStates().then(res => {
                if (res.data.status === "Success") {
                  console.log(res.data.result)
                  setState(res.data.result);
                } else {
                  openNotification('error')
                }
              }).catch(function (error) {
                openNetworkErrorNotification('error', error)
              });
        }
    },[])
    const openNotification = type => {
        notification[type]({
          message: 'Oops Wrong Credentail..!',
          description:
            'login attempt fail',
        });
      };
    const openNetworkErrorNotification = (type, error) => {
    notification[type]({
        message: 'Oops Somthing Went Wrong..!',
        description:
        'Message : ' + error,
    });
    };
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>States</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">States</li>
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
                                    <h3 className="card-title">
                                        <div className="float-right btn btn-secondary">Add State</div>
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>State</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {state.map(s=>
                                            <tr>
                                                <td>{s.sName}</td>
                                                <td></td>
                                            </tr>
                                        )

                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <script>
                {`function () {
                    $("#example1").DataTable({
                    "responsive": true, "lengthChange": false, "autoWidth": false,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)')
                }`}
            </script>
        </div>
    )
}
export default withRouter(State);