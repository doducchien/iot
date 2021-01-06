import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


Login.propTypes = {

};
const style_link = {
    color: 'white',
    textDecoration: 'none',
    width: '100%',
    height: '50px',
    lineHeight: '50px'
}
const style_btn = {
    padding: '0',
    width: '200px',
    height: '50px'
}
function Login(props) {
    const [role, setRole] = useState(null)
    function pickRole(value) {
        setRole(value)
    }
    return (
        <div className="Login">

            <div className='pick-role'>
                <h1>Đăng nhập</h1>
                <h3>Bạn là ai ?</h3>
                <Button style={style_btn} variant="contained" color="primary"><Link style={style_link} to='/login/doctor'>Bác sỹ</Link></Button>
                <Button style={style_btn} variant="contained" color="secondary"><Link style={style_link} to='/login/patient'>Bệnh nhân</Link></Button>
            </div>


        </div>
    );
}

export default Login;