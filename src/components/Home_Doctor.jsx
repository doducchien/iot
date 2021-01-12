import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/index'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

import axios from 'axios';
import io from 'socket.io-client'

import List_Device from './List_Device';
import List_Patient from './List_Patient';
import Bpm from './Bpm'

import bk from '../assets/img/logobk.png'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
Home_Doctor.propTypes = {

};
const style_alert = {
    width: '400px'
}

function Home_Doctor(props) {
    const info_login = JSON.parse(localStorage.getItem('user'))
    const load = useSelector(state => state.load_reducer)
    const dispatch = useDispatch()
    const [id_device_add, set_id_device_add] = useState('')
    const [id_device_assigning, set_id_device_assigning] = useState('')
    const [data_show_patient, set_data_show_patient] = useState('')
    const [is_add_success, set_is_add_success] = useState({
        value: 0
    })
    const [open_dialog, set_open_dialog] = useState(false);
    const [open_dialog_assign_patient, set_open_dialog_assign_patient] = useState(false)
    const [open_dialog_show_patient, set_open_dialog_show_patient] = useState(false)
    const [room, set_room] = useState(null);

    const handleChange_add_device = (event) => {
        var id = event.target.value;
        set_id_device_add(id);
    }
    const submit_add_device = async (event) => {
        event.preventDefault();

        var body = {
            ...info_login,
            id_device: id_device_add
        }
        set_open_dialog(true)
        await axios.post('http://localhost:2206/device/add', body)
            .then(res => {
                if (res.data) {
                    set_is_add_success({
                        ...is_add_success,
                        value: 1
                    })
                }
                else set_is_add_success({
                    ...is_add_success,
                    value: 2
                })
            })

        await set_open_dialog(true);
    }

    const ghep_success_callback = ()=>{
        set_is_add_success({
            ...is_add_success,
            value: 1
        })
    }
    const Dialog_add_device_result = (props) => {
        const { is_add_success } = props
        return (
            <Dialog
                open={open_dialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose1}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Thông báo</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {
                            is_add_success.value === 0 ? '' :
                                (
                                    is_add_success.value === 1 ?
                                        <Alert style={style_alert} severity="success">Thêm thiết bị thành công</Alert>
                                        :
                                        <Alert style={style_alert} severity="error">Thêm thiết bị thất bại! Hãy kiểm tra lại!</Alert>
                                )
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose1} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
    const Dialog_assign_patient = (props) => {
        const { id_device_assigning, info_login } = props;
        const [phone_number, set_phone_number] = useState('')
        const [ghep_success, set_ghep_success] = useState(0)
     
        const onSubmit = (event) => {
            event.preventDefault();
            let body = {
                role: info_login.role,
                phone_number: phone_number,
                id_device: id_device_assigning
            }
            axios.put('http://localhost:2206/device/add_patient', body)
                .then(res => {
                    if (res.data) {
                        set_ghep_success(1);
                        let time_out = setTimeout(()=>{
                            props.ghep_success_callback();
                            handleClose2();
                            clearTimeout(time_out)
                        }, 2000)
                        
                    }
                    else set_ghep_success(2)
                })
        }
        const handleChange = (event) => {
            let value = event.target.value;
            set_phone_number(value);
        }
        return (
            <Dialog
                open={open_dialog_assign_patient}
                TransitionComponent={Transition}
                keepMounted
                style={{textAlign: 'center'}}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title"><h3>Ghép thiết bị với bệnh nhân</h3></DialogTitle>
                <DialogContent>
                    <img style={{display:'block',height:'120px', margin: 'auto'}} src={bk}/>
                    <DialogContentText id="alert-dialog-slide-description">
                        

                        <p style={{ width: '500px' }}>ID thiết bị: {id_device_assigning}</p>
                        <form onSubmit={onSubmit} style={{ width: '500px', height: '200px' }}>
                            <input
                                value={phone_number}
                                onChange={handleChange}
                                style={{ width: '100%', height: '40px', padding: '5px'}}
                                type="text"
                                placeholder="Nhập số điện thoại bệnh nhân cần được ghép..." />
                            <Button type='submit' style={{ display: 'block', margin: 'auto', width: '150px', marginTop: '20px' }} variant="contained" color="secondary">
                                GHÉP
                            </Button>
                        </form>
                        {
                            ghep_success === 0 ? '' :
                                (
                                    ghep_success === 1 ?
                                        <Alert style={{ margin: 'auto' }} severity="success">Ghép thành công</Alert>
                                        :
                                        <Alert style={{ margin: 'auto' }} severity="error">Ghép thất bại</Alert>

                                )
                        }



                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button style={{ margin: 'auto', width: '100%' }} variant="contained" color="primary" onClick={handleClose2}>
                        ĐÓNG
                    </Button>

                </DialogActions>
            </Dialog>
        )
    }
    const Dialog_show_patient = (props) => {
        const { data_show_patient } = props;
        const show_bpm = ()=>{
            handleClose3();
            props.set_room_callback(data_show_patient.phone_number)
        }
        return (
            <Dialog
                open={open_dialog_show_patient}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose3}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ width: '400px', textAlign:'center' }} id="alert-dialog-slide-title"><h3>Thông tin bệnh nhân</h3></DialogTitle>
                <DialogContent>
                    <img style={{display:'block',height:'120px', margin: 'auto'}} src={bk}/>

                    <DialogContentText id="alert-dialog-slide-description">
                        <p>Họ tên: {data_show_patient.full_name}</p>
                        <p>Tuổi: {data_show_patient.age}</p>
                        <p>Số điện thoại: {data_show_patient.phone_number}</p>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button style={{ margin: 'auto', width: '100%' }} variant="contained" color="primary" onClick={handleClose3}>
                        ĐÓNG
                    </Button>
                    <Button style={{ margin: 'auto', width: '100%' }} variant="contained" color="secondary" onClick={show_bpm}>
                        XEM NHỊP TIM
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
    const handleClose1 = () => {
        set_id_device_add('')
        set_open_dialog(false)
    }
    const handleClose2 = () => {
        set_open_dialog_assign_patient(false)
    }
    const handleClose3 = () => {
        set_open_dialog_show_patient(false)
    }

    const openDialogAssignPatient_callback = (data) => {
        set_id_device_assigning(data)
        set_open_dialog_assign_patient(true)
        console.log(data)
    }
    const openDialogPatient_callback = (data) => {
        set_data_show_patient(data);
        set_open_dialog_show_patient(true)
    }
    const logout = () => {
        localStorage.removeItem('user');
        dispatch(actions.load())
    }

    const set_room_callback = (data)=>{
        set_room(data)
    }
    return (
        <div className='Home_Doctor'>
            <Dialog_add_device_result is_add_success={is_add_success}></Dialog_add_device_result>
            <Dialog_assign_patient ghep_success_callback={ghep_success_callback} info_login={info_login} id_device_assigning={id_device_assigning}></Dialog_assign_patient>
            <Dialog_show_patient 
                data_show_patient={data_show_patient}
                set_room_callback={set_room_callback}
    
            >

            </Dialog_show_patient>
            <Button
                style={{ position: 'absolute', bottom: '0', right: '0' }}
                variant="contained" color="primary"
                onClick={logout}
            >
                Đăng xuất
            </Button>
            <div className="left">
                <div className="graph">
                    <Bpm
                        room={room}
                        info_login={info_login}
                    >

                    </Bpm>
                    <div className="logout">

                    </div>
                </div>
                <div className="list-patient">
                    <List_Patient openDialogPatient_callback={openDialogPatient_callback}></List_Patient>
                </div>
            </div>
            <div className="right">
                <form onSubmit={submit_add_device} className="add-device">
                    <input onChange={handleChange_add_device} value={id_device_add} type="text" name="id_device" placeholder="Nhập id thiết bị...." />
                    <Button disabled={id_device_add.trim() === '' ? true : false} style={{ width: '90px', height: '50px', boxSizing: 'border-box', padding: '0' }} type='submit' variant="contained" color="secondary">Thêm</Button>
                </form>
                <div className="list-device">
                    <h3>Danh sách thiết bị</h3>
                    <ul>
                        <List_Device
                            is_add_success={is_add_success}
                            openDialogAssignPatient_callback={openDialogAssignPatient_callback}
                        >

                        </List_Device>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Home_Doctor;