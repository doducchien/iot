import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

List_Device.propTypes = {

};

function List_Device(props) {
    const {is_add_success} = props;
    const info_login = JSON.parse(localStorage.getItem('user'))
    const [list, set_list] = useState([])
    const open_dialog_assign_patient = (data)=>{
        props.openDialogAssignPatient_callback(data)
    }
    var i = 0;
    var body = { ...info_login }
    useEffect(() => {
        axios.post('http://localhost:2206/device/getall', body)
            .then(res => {
                if (res.data) {
                    let list_ = []
                    res.data.forEach(item => {
                        list_.push(<li style={item.patient !== null? {color: 'white', backgroundColor:'#C32361'}: {}} onClick={()=>open_dialog_assign_patient(item.id_device)} key={i}>{'ID: ' + item.id_device + ' ---  patient: ' + item.patient}</li>)
                        i++;
                    });
                    set_list(list_)
                }

            })
    }, [is_add_success])

    return list

}

export default List_Device;