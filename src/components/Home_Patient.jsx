import React, { useState, useEffect } from 'react';
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

import axios from 'axios';
import io from 'socket.io-client'

import List_Device from './List_Device';
import List_Patient from './List_Patient';
import Bpm from './Bpm'

import bk from '../assets/img/logobk.png'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const style_alert = {
    width: '400px'
}
Home_Patient.propTypes = {

};

function Home_Patient(props) {
    const info_login = JSON.parse(localStorage.getItem('user'))
    const load = useSelector(state => state.load_reducer);
    const [room, set_room] = useState(info_login.phone_number);
    // useEffect(()=>{
    //     var body ={
    //         ...info_login,
    //     }
    //     axios.post('http://localhost:2206/patient/get_device_id', body)
    //     .then(res=>{
    //         if(res.data){
    //             console.log(res.data);
    //             set_room(res.data);
    //         }
    //     })
    // },[])


    return (
        <div className='Home_Patient'>
            <Bpm
                role={false}
                room={room}
                info_login={info_login}
            />
            <div className='infomation'>
                <img src={bk} alt=""/>
                <p>Họ tên: {info_login.full_name}</p>
                <p>Tuổi: {info_login.age}</p>
                <p>Số CMND: {info_login.cmnd_number}</p>
            </div>

        </div>
    );
}

export default Home_Patient;