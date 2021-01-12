import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'



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
    const load = useSelector(state=> state.load_reducer)
    const info_login = JSON.parse(localStorage.getItem('user'))
    return (
        info_login === null?
        <div className="Login">

            <div className='pick-role'>
                <h1>Bạn là ai ?</h1>
                
                <Button style={style_btn} variant="contained" color="primary"><Link style={style_link} to='/login/doctor'>Bác sỹ</Link></Button>
                <Button style={style_btn} variant="contained" color="secondary"><Link style={style_link} to='/login/patient'>Bệnh nhân</Link></Button>
            </div>


        </div>
        :
        <Redirect to={'/'}/>
    );
}

export default Login;