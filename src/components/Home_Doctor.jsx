import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

import axios from 'axios'

import List_Device from './List_Device'


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
    const [id_device_add, set_id_device_add] = useState('')
    const [id_device_assigning, set_id_device_assigning] = useState('')
    const [is_add_success, set_is_add_success] = useState({
        value: 0
    })
    const [open_dialog, set_open_dialog] = useState(false);
    const [open_dialog_assign_patient, set_open_dialog_assign_patient] = useState(false)
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

    const Dialog_add_device = (props) => {
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
    const Dialog_assign_patient = (props)=>{
        const {id_device_assigning} = props;
        return (
            <Dialog
                open={open_dialog_assign_patient}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose2}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Gắn thiết bị với bệnh nhân</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <h2 style={{width: '500px'}}>ID thiết bị: {id_device_assigning}</h2> 
                        <form style={{width: '500px', height:'200px'}}>
                            <input style={{width: '100%', height:'40px', padding:'5px'}} type="text" placeholder="Nhập số điện thoại bệnh nhân được gắn..."/>
                        </form>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button style={{margin:'auto', width:'100%'}} variant="contained" color="secondary" onClick={handleClose2}>
                        OK
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

    const openDialogAssignPatient_callback = (data)=>{
        set_id_device_assigning(data)
        set_open_dialog_assign_patient(true)
        console.log(data)
    }
    
    return (
        <div className='Home_Doctor'>
            <Dialog_add_device is_add_success={is_add_success}></Dialog_add_device>
            <Dialog_assign_patient id_device_assigning={id_device_assigning}></Dialog_assign_patient>
            <div className="left"></div>
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