import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import bk from '../assets/img/logobk.png';
import Alert from '@material-ui/lab/Alert';


import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

//redux
import * as actions from '../actions/index'

Login_Doctor.propTypes = {

};
const style_btn = {

    display: 'block',
    margin: 'auto',
    marginTop: '50px',
    marginBottom: '10px',
}
const style_link = {
    textDecoration: 'none',
    fontSize: '20px'
}
const style_alert = {
    width: '400px'
}

// function component
function Login_Doctor(props) {
    const load = useSelector(state => state.load_reducer)
    const info_login = JSON.parse(localStorage.getItem('user'))
    const [input_login, set_input_login] = useState({
        phone_number: "",
        password: ""
    })
    const [login_fail, set_login_fail] = useState(false)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        set_input_login(
            {
                ...input_login,
                [name]: value.trim()
            }
        )
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:2206/authen/login/doctor', input_login)
            .then((res) => {
                if (res.data) {
                    dispatch(actions.login(res.data))
                    dispatch(actions.get_local_user())
                    dispatch(actions.load())
                }
                else {
                    set_login_fail(true)
                    var time_out = setTimeout(() => {
                        set_login_fail(false);
                        clearTimeout(time_out)
                    }, 2000)
                }

            })

    }
    return (
        info_login === null ?
            <div className="Login_Doctor">
                {
                    login_fail ? <Alert style={style_alert} severity="error">Đăng nhập thất bại ! Vui lòng thử lại.</Alert> : ''
                }
                <div className='form-login'>
                    <form onSubmit={onSubmit}>
                        <h2>ĐĂNG NHẬP CHO BÁC SỸ VÀ Y TÁ</h2>
                        <img src={bk} />
                        <input type="text" name='phone_number' placeholder="Nhập số điện thoại..." onChange={handleChange} />
                        <input type="password" name='password' placeholder="Nhập mật khẩu..." onChange={handleChange} />
                        <Button style={style_btn} type="submit" variant="contained" color="secondary">Đăng nhập</Button>
                        <Link style={style_link} to='/signup/doctor'>Đăng ký cho bác sỹ và y tá</Link>

                    </form>
                </div>
            </div>
            :
            <Redirect to={'/'} />
    );
}

export default Login_Doctor;