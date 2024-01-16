
export const ADD_IMG = 'ADD_IMG';
export const ADD_COMMENT = 'ADD_COMMENT';
export const LIKE_STORY = 'LIKE_STORY';
export const ADD_TAG = 'ADD_TAG';

const initialState = {
    id:'',
    txt: "",
    imgUrl: [],
    by: {},
    loc: {},
    comments: [],
    likedBy: [],
    tags: []
}

export function storyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_IMG:
            return {
                ...state,
                imgUrl: [...state.imgUrl, action.imgUrl]
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.comments]
            }
        case LIKE_STORY:
            return {
                ...state,
                likedBy: [...state.likedBy, action.likedBy]
            }
        case ADD_TAG:
            return {
                ...state,
                tags: [...state.tags, action.tags]
            }

        default:
            return state;
    }
}
