import {REMOVE_STORY} from "./stories.reducer.js";

export const ADD_FOLLOWING = 'ADD_FOLLOWING';
export const REMOVE_FOLLOWING = 'REMOVE_FOLLOWING';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const ADD_FOLLOWERS = 'ADD_FOLLOWERS';
export const REMOVE_FOLLOWERS = 'REMOVE_FOLLOWERS';
export const SAVE_STORY = 'SAVE_STORY';
export const UNSAVE_STORY = 'UNSAVE_STORY';

const initialState = {
    _id: '',
    username: '',
    password: '',
    fullName: '',
    imgUrl: '',
    following: [],
    followers: [],
    posts: [],
    savedStories: []
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_FOLLOWING:
            return {
                ...state,
                following: [...state.following, action.user]
            }
        case REMOVE_FOLLOWING:
            return {
                ...state,
                following: state.following.filter(user => user.id !== action.user.id)
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.post.id)
            }
        case ADD_FOLLOWERS:
            return {
                ...state,
                followers: [...state.followers, action.user]
            }
        case REMOVE_FOLLOWERS:
            return {
                ...state,
                followers: state.followers.filter(user => user.id !== action.user.id)
            }
        case SAVE_STORY:
            return {
                ...state,
                savedStories: [...state.savedStories, action.story]
            }
        case UNSAVE_STORY:
            return {
                ...state,
                savedStories: state.following.filter(story => story.id !== action.story.id)
            }

        default:
            return state;
    }
}
