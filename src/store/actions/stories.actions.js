import {store} from "../store.js";
import {storiesService} from "../../services/stories.service.js";
import {LIKE_STORY, SET_STORIES} from "../reducers/stories.reducer.js";

export async function loadStories() {
    try {
        const stories = await storiesService.query();
        store.dispatch({ type: SET_STORIES, stories })
    } catch (err) {
        console.log('Stories Actions: err in loadStories', err)
    }
}

export async function toggleLike(story, user) {
    const liked = story.likedBy.find(likeUser => likeUser.id === user.id);
    if(liked) {
        story.likedBy.splice(story.likedBy.indexOf(liked), 1);
    }
    else {
        story.likedBy = [...story.likedBy, user]
    }
    await storiesService.save(story);
    store.dispatch({type: LIKE_STORY, story});
}
