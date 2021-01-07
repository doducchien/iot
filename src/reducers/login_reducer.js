import * as types from '../constrants/index'

const init_state_login = {}

export default function login_reducer(state = init_state_login, action){
    switch (action.type) {
        case types.LOGIN:{
            var data = action.data;
            
            localStorage.setItem("user", JSON.stringify(data))
            return data;
        }

        default:{
            return {...state};
        }
            
    }
}