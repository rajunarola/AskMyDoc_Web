import $ from 'jquery';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { gettimeslot } from '../Service/PatientService';
import { Card, Drawer, Button, Col, Row, Avatar, Input, Dropdown, Menu, Pagination, Select, DatePicker, Radio, Form, Upload, message, InputNumber,Modal } from 'antd';
import { getalldoctors, UploadPhoto, Bookappointment,varifypatientemail } from '../Service/PatientService';
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
    const [apdate, setApdate] = useState();
    const [file, setFile] = useState();
    const [apbtn, setApbtn] = useState(true);
    const [timeslotvalue, setTimeSlotvalue] = useState();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState();
    const [appointmentToken,setAppointmentToken]=useState();
    const [otp, setOtp] = useState();

    const getOTP=(e)=>{
setOtp(e.target.value);
console.log('otp');
console.log(e.target.value);
console.log(otp);
    }
    const onFinishAppointment = async (values) => {


        const formdata = new FormData();
        formdata.append("file", file);
        var document = null;
        await UploadPhoto(formdata)
            .then(res => {
                console.log(res);
                document = res.data.result.imageName;


            })
            .catch(function (err) {
                console.log(err)
            });
        const appointment = {
            patientName: values.patientname,
            Email: values.patientemail,
            contactNo: values.patientcontact,
            age: values.age,
            aP_Date: apdate,
            timeSlot_Id: radiovalue,
            document: document,
            doctor_Id: doctorid,
            timeSlot: timeslotvalue
        }

        console.log(appointment);
        Bookappointment(appointment)
            .then(res => {
                console.log('appointment response-----------------------');
           
                if (res.data.statusCode == 200) {
                    if(res.data.result!=null)
                    {
                        console.log('check data')
                        console.log(res.data.result);
                       setAppointmentToken(res.data.result.appointmentToken);
                        console.log(appointmentToken);
                        message.success(res.data.message);
                        showModal();
                    }
                    else
                    {
                        message.success(res.data.message);
                        console.log(res.data.message);
                    }
                    
                }
            })
            .catch(function(err){
                message.error(err);
            })

    }


    const showModal = () => {
        setVisible(true);
      };
    
      const handleOk = (e) => {
        
        setConfirmLoading(true);
        console.log(appointmentToken);
        console.log(otp);
        varifypatientemail(otp,appointmentToken)
        .then(res=>{
            if(res.data.statusCode==200)
            {
                message.success(res.data.message);
                setTimeout(() => {
                    setVisible(false);
                    setConfirmLoading(false);
                  }, 2000);
            }
            else{
                message.error(res.data.message);
            }
        })
   
        
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
       
      };



    //for file



    const onChangeradio = e => {
        console.log('radio checked', e.target);
        radiosetValue(e.target.value);
        setTimeSlotvalue(e.target.label);

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

    const onfileChange = (e) => {
        console.log(e.target.value);
        var filename = e.target.value;
        var extaintion = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
        if (extaintion != 'jpeg' && extaintion != 'jpg' && extaintion != 'PNG' && extaintion != 'png' && extaintion != 'JPEG' && extaintion != 'JPG') {
            message.error('invalid file');
            return false;
        }

        setFile(e.target.files[0]);


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

        var ids = data.filter(g => g.doctor_Id != id);
        ids.map((items) => {
            $(`#${items.doctor_Id}`).fadeOut();
        })
        console.log(ids)
        setDoctorid(id);

        setTimeslotdata([])
    }
    const onChangedate = (e) => {

        if (e != null) {

            var exdate = new Date(e.toString());
            setApdate(exdate);
            gettimeslot(doctorid, exdate.toLocaleDateString())
                .then(res => {

                    if (res.data.result == null) {
                        message.info({ content: 'Doctor is Not Available on this Date' })
                        setApbtn(true);
                    }
                    else {

                        if (res.data.statusCode == 200) {
                            setTimeslotdata(res.data.result.timeSlots)
                            setApbtn(false);
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

                                                    {timeslotdata.map((slotitems) => {

                                                        return (<Radio value={slotitems.timeSlot_Id} label={`${slotitems.timeSlotStart}-To-${slotitems.timeSlotEnd}`}>{slotitems.timeSlotStart}-To-{slotitems.timeSlotEnd}</Radio>
                                                        )
                                                    })}

                                                </Radio.Group>
                                            </Col>
                                            <Col span={8}>


                                            </Col>

                                        </Row>
                                        <Row>


                                            <hr/>
                                            <fieldset>
                                                <legend>Patient Details</legend>
                                                <Form onFinish={onFinishAppointment}>
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


                                                        </Col>

                                                        <Col span={10}>
                                                            <label class="form-label" for="customFile">Upload Image</label>
                                                            <input type="file" class="form-control" onChange={(e) => onfileChange(e)} id="patientfile" />
                                                            <p></p>
                                                        </Col>
                                                        <Col>


                                                        </Col>
                                                    </Row>
                                                    <Row style={{ float: 'right' }}>
                                                        <Button type="primary" htmlType="submit" disabled={apbtn} >Confirm Appointment</Button>

                                                    </Row>
                                                </Form>
                                            </fieldset>

                                        </Row>
                                    </Card>
                                    <p></p>

                                </div>
                                <p></p>
                                <Modal
                                    title="Varify Your Email"
                                    visible={visible}
                                    onOk={handleOk}
                                    confirmLoading={confirmLoading}
                                    onCancel={handleCancel}
                                >
                                    <p>Enter Varification Code Sent To Your Email</p>
                                    <lable>Varification Code </lable>
                                    <input type="number" name="code" onChange={(e)=>getOTP(e)}/>

                                </Modal>
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