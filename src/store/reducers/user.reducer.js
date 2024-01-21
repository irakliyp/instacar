import { userService} from "../../services/user.service.js";

export const ADD_FOLLOWING = 'ADD_FOLLOWING';
export const REMOVE_FOLLOWING = 'REMOVE_FOLLOWING';
export const ADD_STORY = 'ADD_STORY';
export const REMOVE_STORY = 'REMOVE_STORY';
export const ADD_FOLLOWERS = 'ADD_FOLLOWERS';
export const REMOVE_FOLLOWERS = 'REMOVE_FOLLOWERS';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';

const initialState = {
    user: userService.getLoggedinUser(),
    users: []
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_FOLLOWING:
            return {
                ...state,
                user: {...state.user, following: [...state.user.following, action.user]}
            }
        case REMOVE_FOLLOWING:
            return {
                ...state,
                user: {...state.user, following: state.user.following.filter(following => following.id !== action.user.id)}
            }
        case ADD_STORY:
            return {
                ...state,
                user: {...state.user, stories: [...state.user.stories, action.story]}
            }
        case REMOVE_STORY:
            return {
                ...state,
                user: {...state.user, stories: state.user.stories.filter(story => story.id !== action.story.id)}
            }
        case ADD_FOLLOWERS:
            return {
                ...state,
                user: {...state.user, followers: [...state.user.followers, action.user]}
            }
        case REMOVE_FOLLOWERS:
            return {
                ...state,
                user: {...state.user, followers: state.user.followers.filter(follower => follower.id !== action.user.id)}
            }
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
