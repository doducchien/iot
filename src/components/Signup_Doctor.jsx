import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import {Link, Redirect} from 'react-router-dom';
import bk from '../assets/img/logobk.png';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
Signup_Doctor.propTypes = {
    
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
function Signup_Doctor(props) {
    const info_login = JSON.parse(localStorage.getItem('user'))
    const load = useSelector(state=> state.load_reducer)

    const [input_signup, set_input_signup] = useState({
        cmnd_number: "",
        full_name: "",
        id_doctor: "",
        age: null,
        phone_number: "",
        password: "",
        repassword: ""
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
        let data = {...input_signup};
        delete data.repassword;
        axios.post('http://localhost:2206/authen/signup/doctor', data)
        .then(res =>{
            console.log(res.data)
            if(res.data){
                set_result_signup(1)
            }
            else set_result_signup(2)
            let time_out = setTimeout(()=>{
                set_result_signup(0);
                clearTimeout(time_out)
            }, 2000)
        })
    }
    return (
        info_login === null?
        <div className="Signup_Doctor">
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
                    <h2>ĐĂNG KÝ CHO BÁC SỸ VÀ Y TÁ</h2>
                    <img src={bk}/>
                    <input type="text" name='cmnd_number' placeholder="Nhập số CMND..." onChange={handleChange}/>
                    <input type="text" name='full_name' placeholder="Nhập số họ tên..." onChange={handleChange}/>
                    <input type="text" name='id_doctor' placeholder="Nhập id bác sỹ của bạn..." onChange={handleChange}/>

                    <input type="number" name='age' placeholder="Nhập tuổi..." onChange={handleChange}/>

                    <input type="text" name='phone_number' placeholder="Nhập số điện thoại..." onChange={handleChange}/>
                    <input type="password" name='password' placeholder="Nhập mật khẩu..." onChange={handleChange}/>
                    <input type="password" name='repassword' placeholder="Nhập lại mật khẩu..." onChange={handleChange}/>

                    <Button style={style_btn} type="submit" variant="contained" color="secondary">Đăng ký</Button>
                    <Link style={style_link} to='/login/doctor'>Đăng nhập cho bác sỹ và y tá</Link>

                </form>
            </div>
        </div>
        :
        <Redirect to={'/'}/>
    );
}

export default Signup_Doctor;