import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../scss/login_doctor.scss';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import bk from '../assets/img/logobk.png'


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
function Login_Doctor(props) {
    const [input_login, set_input_login] = useState({
        phone: "",
        password: ""
    })

    const handleChange = (event)=>{
        var name = event.target.name;
        var value = event.target.value;
        set_input_login(
            {   
                ...input_login,
                [name]: value.trim()
            }
        )
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        console.log(input_login);
    }
    return (
        <div className="Login_Doctor">
            <div className='form-login'>
                <form onSubmit={onSubmit}>
                    <h2>ĐĂNG NHẬP CHO BÁC SỸ VÀ Y TÁ</h2>
                    <img src={bk}/>
                    <input type="text" name='phone' placeholder="Nhập số điện thoại..." onChange={handleChange}/>
                    <input type="password" name='password' placeholder="Nhập mật khẩu" onChange={handleChange}/>
                    <Button style={style_btn} type="submit" variant="contained" color="secondary">Đăng nhập</Button>
                    <Link style={style_link} to='/signup/doctor'>Đăng ký cho bác sỹ và y tá</Link>

                </form>
            </div>
        </div>
    );
}

export default Login_Doctor;