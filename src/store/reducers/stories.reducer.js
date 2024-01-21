
export const SET_STORIES = 'SET_STORIES';
export const SET_STORY = 'SET_STORY';
export const ADD_STORY = 'ADD_STORY';
export const REMOVE_STORY = 'REMOVE_STORY';
export const ADD_IMG = 'ADD_IMG';
export const ADD_COMMENT = 'ADD_COMMENT';
export const LIKE_STORY = 'LIKE_STORY';
export const ADD_TAG = 'ADD_TAG';

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
        case SET_STORY:
            return {
                ...state,
                story: action.story
            }
        case ADD_STORY:
            return {
                ...state,
                stories: [...state.stories, action.story]
            }
        case REMOVE_STORY:
            return {
                ...state,
                stories: state.stories.filter(story => story.id !== action.story.id)
            }
        case ADD_IMG: {
            const newStories = state.stories.map(story => {
                if (story.id === action.story.id) {
                    story.imgUrl = [...story.imgUrl, action.imgUrl];
                }
                return story;
            });
            return {
                ...state,
                stories: newStories
            }
        }
        case ADD_COMMENT:
        {
            const newStories = state.stories.map(story =>  {
                if(story.id === action.story.id){
                    story.comments = [...story.comments, action.comments];
                }
                return story;
            });
            return {
                ...state,
                stories: newStories
            }
        }
        case LIKE_STORY:
        {
            const newStories = state.stories.map(story =>  {
                if(story.id === action.story.id){
                    story.likedBy = [...story.likedBy, action.likedBy];
                }
                return story;
            });
            return {
                ...state,
                stories: newStories
            }
        }
        case ADD_TAG:
        {
            const newStories = state.stories.map(story =>  {
                if(story.id === action.story.id){
                    story.tags = [...story.tags, action.tags];
                }
                return story;
            });
            return {
                ...state,
                stories: newStories
            }
        }
        default:
            return state;
    }
}
