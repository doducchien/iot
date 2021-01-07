import * as types from '../constrants/index'

const init_load = {
    value: true
};

export default function load_reducer(state=init_load, action){
    if(action.type === types.LOAD){
        return {
            ...state,
            value: !state.value
        }
    }
    return {...state};
}