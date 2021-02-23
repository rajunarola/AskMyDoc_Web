import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { gettimeslot } from '../Service/PatientService';
import { Card, Drawer, Button, Col, Row, Avatar, Input, Dropdown, Menu, Pagination, Select, DatePicker, Radio, Form, Upload, message, InputNumber } from 'antd';
import { getalldoctors } from '../Service/PatientService';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone, RedEnvelopeOutlined, EnvironmentOutlined, CalendarOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Search } = Input;
const { Dragger } = Upload;



function DoctorList() {


    const [currentpage, setCurrentpage] = useState();
    const [count, setCount] = useState();
    const [bookappointmentmodel, setBookappointmentmodel] = useState('d-none');
    const [doctorid, setDoctorid] = useState();
    const [radiovalue, radiosetValue] = useState(1);
    const [timeslotdata, setTimeslotdata] = useState([]);
    
    //for file
    const [fileList, updateFileList] = useState([]);
    const props = {
        fileList,
        beforeUpload: file => {
            if (file.type !== 'image/png' || file.type !== 'image/jpg') {
                message.error(`${file.name} is not valid file (please Upload PNG OR JPG)`);
            }
            return file.type === 'image/png' || file.type === 'image/jpg';
        },
        onChange: info => {
            console.log(info.fileList);
            // file.status is empty when beforeUpload return false
            updateFileList(info.fileList.filter(file => !!file.status));
        },
    };


    const onChangeradio = e => {
        console.log('radio checked', e.target.value);
        radiosetValue(e.target.value);
    };

    const { Option } = Select;

    const onSearchtxt = value => console.log(value);

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }




    const [data, setData] = useState([]);

    const onPageChange = (e) => {

        setCurrentpage(e);
    }

    useEffect(() => {

        getalldoctors()
            .then(res => {
                if (res.data.statusCode == 200) {

                    setData(res.data.result)
                    setCount(res.data.result.length)
                }

            })

    }, [])
    const setBookappointmentmodelfn = (id) => {
        $(`#${id}`).fadeToggle(1000);

        var ids=data.filter(g=>g.doctor_Id!=id);
        ids.map((items)=>{
            $(`#${items.doctor_Id}`).fadeOut();
        })
        console.log(ids)
        setDoctorid(id);
        
    setTimeslotdata([])
    }
    const onChangedate = (e) => {
    
        if (e != null) {
       
            var exdate = new Date(e.toString());
      
            gettimeslot(doctorid, exdate.toLocaleDateString())
                .then(res => {
                
                    if (res.data.result == null) {
                        message.info({ content: 'Doctor is Not Available on this Date' })
                    }
                    else {
                       
                            if(res.data.statusCode==200)
                            {
                            setTimeslotdata(res.data.result.timeSlots)
                            }
                        

                    }
                }).catch(function (err) {
                    console.log(err)
                })
        }

    }
    return (
        <div className="container">
            <div className="col-lg-12 justify-content-center bg-light" style={{ paddingBottom: '20px', marginBottom: '20px' }}>
               
                <div class="form-check form-check-inline" style={{ float: 'right' }}>


                    <Search
                        placeholder="Search Doctor"
                        allowClear
                        enterButton="Search"
                        size="middle"
                        onSearch={onSearchtxt}
                    />
                </div>
                <div class="form-check form-check-inline" style={{ float: 'right' }}>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a Gender"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>

                    </Select>
                </div>
                <div class="form-check form-check-inline">

                </div>

            </div>

            <div className="row justify-content-center">
                <div className="row justify-content-center">


                    {data.map((items) => {
                        return (
                            <div className="justify-content-center">
                                <Card title={`Dr. ` + items.fName + ' ' + items.mName + ' ' + items.lName} key={items.doctor_Id} extra={<Button type="primary" onClick={() => setBookappointmentmodelfn(items.doctor_Id)} ><CalendarOutlined /> Book Appointment</Button>} style={{ width: 800, borderColor: 'gray', borderRadius: '5px' }}>
                                    <Row gutter={16}>
                                        <Col span={8}>

                                            <Avatar shape="square" className="img-bordered" style={{ borderRadius: '10px' }} size={100} src={process.env.REACT_APP_SERVER_URL + `/Comman/GetFile?file=${items.profilePicture}&type=1`} ></Avatar>

                                        </Col>
                                        <Col span={8}>

                                            <label><i className="fas fa-user-md"></i> Dr. {items.fName} {items.mName} {items.lName} </label><br />
                                            <label><RedEnvelopeOutlined /> {items.email}</label><br />
                                            <label><EnvironmentOutlined /> clinic Address</label><br />
                                            <label><i className="far fa-building"></i> {items.stateName} | <i className="far fa-building"></i> {items.cityName} </label><br />
                                            <label>Gender : {items.gender}</label>
                                        </Col>
                                        <Col span={8}>

                                            <label><i className="fas fa-stethoscope"></i> {items.specializationName}</label><br />
                                            <label><i className="fas fa-user-graduate"></i> {items.degreeName}</label><br />
                                            <label> Experience :{items.experienceInYear} Year</label><br />
                                            <label><i className="fas fa-user-clock"></i> Mon - Fri</label>

                                        </Col>

                                    </Row>
                                </Card>

                                <p></p>
                                <div id={items.doctor_Id} style={{ display: 'none' }}>
                                    <Card title="Appointment" style={{ width: 800, borderColor: 'gray', borderRadius: '5px' }}>
                                        <Row gutter={16}>
                                            <Col span={8}>

                                                <DatePicker onChange={(e) => onChangedate(e)} disabledDate={(current) => {
                                                    return moment().add(-1, 'days') >= current ||
                                                        moment().add(-1, 'month') >= current;
                                                }} />

                                            </Col>
                                            <Col span={16}>

                                                <Radio.Group onChange={(e) => onChangeradio(e)} value={radiovalue}>
                                                    {/* <Radio value={1}>08.10-8.20</Radio>
                                                    <Radio value={2}>08:20-08:30</Radio>
                                                    <Radio value={3}>08:30-08:40</Radio>
                                                    <Radio value={4}>08:40-08:50</Radio> */}

                                                    {timeslotdata.map((slotitems)=>{
                                                        return( <Radio value={slotitems.timeSlotStart+slotitems.timeSlotEnd}>{slotitems.timeSlotStart}-To-{slotitems.timeSlotEnd}</Radio>
                                                        )
                                                    })}

                                                </Radio.Group>
                                            </Col>
                                            <Col span={8}>


                                            </Col>

                                        </Row>
                                        <Row>



                                            <fieldset>
                                                <legend>Patient Details</legend>
                                                <Form>
                                                    <Row gutter={16}>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                label="Patient Name"
                                                                name="patientname"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input your name!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Patient Email"
                                                                name="patientemail"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input your name!',
                                                                    },
                                                                    {
                                                                        type: 'email',
                                                                        message: 'please enter the valid email',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input />
                                                                
                                                            </Form.Item>

                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                label="Patient Contact"
                                                                name="patientcontact"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input your contact Number!',
                                                                    },


                                                                ]}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                             
                                                            >
                                                                
                                                                <Button type="primary">Send OTP</Button>
                                                            </Form.Item>

                                                        </Col>
                                                        <Col>
                                                        
                                                        <Form.Item
                                                                label="Varification Code"
                                                                name="code"

                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input your code!',
                                                                    },
                                                                    {
                                                                        type: 'number',
                                                                        message: 'please enter the valid code',
                                                                    },
                                                                ]}
                                                            >
                                                                
                                                                <Input/>
                                                            </Form.Item>
                                                        </Col>

                                                        <Col span={10}>

                                                            <Form.Item
                                                                label="Age"
                                                                name="age"

                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input your age!',
                                                                    },
                                                                    {
                                                                        type: 'number',

                                                                        message: 'please enter the valid age',
                                                                    },
                                                                ]}
                                                            >
                                                                <InputNumber placeholder="Age (Max Age :100,  Min Age:1)" size={'large'} min={1} max={100} />

                                                            </Form.Item>
                                                        </Col>
                                                        <Col>

                                                            <Upload {...props}>
                                                                <Button icon={<UploadOutlined />}>Upload File</Button>
                                                            </Upload>
                                                            <p></p>
                                                        </Col>
                                                    </Row>
                                                    <Row>

                                                        <Button type="dashed" disabled={true} >Confirm Appointment</Button>
                                                    </Row>
                                                </Form>
                                            </fieldset>

                                        </Row>
                                    </Card>
                                    <p></p>

                                </div>
                                <p></p>
                            </div>

                        )
                    })}




                </div>
                <Pagination defaultCurrent={currentpage} onChange={(e) => onPageChange(e)} total={count} />
            </div>
        </div>
    );

}
export default DoctorList