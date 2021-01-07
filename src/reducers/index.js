import {combineReducers} from 'redux';
import login_reducer from './login_reducer';
import get_local_user_reducer from './get_local_user_reducer'
import load_reducer from './load_reducer'

const index_reducer = combineReducers({
    login_reducer,
    get_local_user_reducer,
    load_reducer
})

export default index_reducer;