import { userService} from "../../services/user.service.js";

export const REMOVE_USER = 'REMOVE_USER';
export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';
export const FOLLOW_USER = 'FOLLOW_USER';

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
        case FOLLOW_USER:
            const updatedUsers = state.users.map(userItem => userItem.id === action.user.id ? action.user : userItem)
            return { ...state, users: updatedUsers, user: action.user }
        default:
            return state;
    }
}
