
export const SET_STORIES = 'SET_STORIES';
export const ADD_STORY = 'ADD_STORY';
export const REMOVE_STORY = 'REMOVE_STORY';

const initialState = {
    stories: []
}

export function storiesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_STORIES:
            return {
                ...state,
                stories: action.stories
            }
            break;
        case ADD_STORY:
            return {
                ...state,
                stories: [...state.stories, action.story]
            }
            break;
        case REMOVE_STORY:
            return {
                ...state,
                stories: state.stories.filter(story => story.id !== action.story.id)
            }
            break;

        default:
            break;
    }
}
