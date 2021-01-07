import * as types from '../constrants/index'

export  function login(data_input){
    var result = {
        type: types.LOGIN,
        data: data_input
    }
    return result;
}

export function get_local_user() {
    var user = JSON.parse(localStorage.getItem('user'));
    var result = {
        type: types.GET_LOCAL_USER,
        data: user
    }
    return result;
}
export function load() {
    return{
        type: types.LOAD
    }
}