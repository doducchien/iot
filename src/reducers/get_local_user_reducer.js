import userEvent from '@testing-library/user-event'
import * as types from '../constrants/index'

const init_local_user = {}

export default function get_local_user_reducer(state = init_local_user, action) {
    switch (action.type) {
        case types.GET_LOCAL_USER: {
            var data = JSON.parse(localStorage.getItem('user'))

            var user = {
                ...state,
                data
            }
            return user;
        }

        default: {
            return state;
        }
    }
}