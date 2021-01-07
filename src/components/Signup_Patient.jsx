import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../scss/signup_patient.scss';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'

import {Link, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import bk from '../assets/img/logobk.png'
Signup_Patient.propTypes = {
    
};
const style_btn = {
    
    display: 'block',
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '10px',
}
const style_link = {
    textDecoration: 'none',
    fontSize: '20px'
}

const style_alert = {
    width: '400px'
}

//component
function Signup_Patient(props) {
    const load = useSelector(state=> state.load_reducer)

    const info_login = JSON.parse(localStorage.getItem('user'))
    const [input_signup, set_input_signup] = useState({
        cmnd_number: "",
        full_name: "",
        age: null,
        phone_number: "",
        doctor_manager: "",
        
    })
    const [result_signup, set_result_signup] = useState(0)

    const handleChange = (event)=>{
        var name = event.target.name;
        var value = event.target.value;
        set_input_signup(
            {   
                ...input_signup,
                [name]: value.trim()
            }
        )
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        console.log(input_signup);
        axios.post('http://localhost:2206/authen/signup/patient',input_signup)
        .then((res)=>{
            if(res.data) set_result_signup(1);
            else set_result_signup(2)
            var time_out = setTimeout(()=>{
                set_result_signup(0);
                clearTimeout(time_out)
            }, 2000)
        })
    }
    return (
        info_login === null?
        <div className="Signup_Patient">
            {
                result_signup === 0? '':
                (   
                    result_signup === 1? 
                    <Alert style={style_alert} severity="success">Đăng ký thành công! Hãy đến trang đăng nhập.</Alert>
                    :
                    <Alert style={style_alert} severity="error">Đăng ký thất bại ! Vui lòng thử lại.</Alert>
                )
            }
            <div className='form-signup'>
                <form onSubmit={onSubmit}>
                    <h2>ĐĂNG KÝ BỆNH NHÂN VÀ NGƯỜI NHÀ CỦA BỆNH NHÂN</h2>
                    <img src={bk}/>
                    <input type="text" name='cmnd_number' placeholder="Nhập số CMND..." onChange={handleChange}/>
                    <input type="text" name='full_name' placeholder="Nhập số họ tên..." onChange={handleChange}/>
                    <input type="number" name='age' placeholder="Nhập tuổi..." onChange={handleChange}/>
                    <input type="text" name='phone_number' placeholder="Nhập số điện thoại..." onChange={handleChange}/>
                    <input type="text" name='doctor_manager' placeholder="Nhập id bác sỹ..." onChange={handleChange}/>

                    <Button style={style_btn} type="submit" variant="contained" color="secondary">Đăng nhập</Button>
                    <Link style={style_link} to='/login/patient'>Đăng nhập cho bệnh nhân và người nhà</Link>

                </form>
            </div>
        </div>
        :
        <Redirect to={'/'}/>
    );
}

export default Signup_Patient;