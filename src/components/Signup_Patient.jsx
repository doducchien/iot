import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../scss/signup_patient.scss';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
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
function Signup_Patient(props) {
    const [input_login, set_input_login] = useState({
        cmnd: "",
        fullname: "",
        age: null,
        phone: "",
        password: "",
        repassword: ""
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
        <div className="Signup_Patient">
            <div className='form-signup'>
                <form onSubmit={onSubmit}>
                    <h2>ĐĂNG KÝ BỆNH NHÂN VÀ NGƯỜI NHÀ CỦA BỆNH NHÂN</h2>
                    <img src={bk}/>
                    <input type="text" name='cmnd' placeholder="Nhập số CMND..." onChange={handleChange}/>
                    <input type="text" name='fullname' placeholder="Nhập số họ tên..." onChange={handleChange}/>
                    <input type="number" name='age' placeholder="Nhập tuổi..." onChange={handleChange}/>

                    <input type="text" name='phone' placeholder="Nhập số điện thoại..." onChange={handleChange}/>
                    <input type="password" name='password' placeholder="Nhập mật khẩu..." onChange={handleChange}/>
                    <input type="password" name='repassword' placeholder="Nhập lại mật khẩu..." onChange={handleChange}/>

                    <Button style={style_btn} type="submit" variant="contained" color="secondary">Đăng nhập</Button>
                    <Link style={style_link} to='/login/patient'>Đăng nhập cho bệnh nhân và người nhà</Link>

                </form>
            </div>
        </div>
    );
}

export default Signup_Patient;