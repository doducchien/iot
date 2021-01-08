import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

List_Patient.propTypes = {
    
};

function List_Patient(props) {
    const info_login = JSON.parse(localStorage.getItem('user'))

    const [list_patient, set_list_patient] = useState([]);

    const open_dialog_patient = (data)=>{
        props.openDialogPatient_callback(data)
    }
    useEffect(()=>{
        let body = {...info_login}
        axios.post('http://localhost:2206/patient/getall', body)
        .then(res=>{
            let list = []
            let i = 0;
            let data = res.data;
            if(data){
                data.forEach(item=>{
                    list.push(<li onClick={()=>open_dialog_patient(item)} key={i}>{item.full_name}</li>)
                    i++
                })
                set_list_patient(list);
            }
        })

    }, [])


    return (
        <div>
            {list_patient}
        </div>
    );
}

export default List_Patient;