import { userService} from "../../services/user.service.js";

export const REMOVE_USER = 'REMOVE_USER';
export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';

const initialState = {
    user: userService.getLoggedinUser(),
    users: []
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.userId)
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_USER:
            return { ...state, user: action.user }
        default:
            return state;
    }
}
