import {store} from "../store.js";
import {storiesService} from "../../services/stories.service.js";
import {ADD_COMMENT, ADD_STORY, LIKE_STORY, SET_STORIES, SET_STORY} from "../reducers/stories.reducer.js";
import {userService} from "../../services/user.service.js";

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

export async function addComment(story, comment) {
    story.comments = [...story.comments, comment]
    await storiesService.save(story);
    store.dispatch({type: ADD_COMMENT, story});
    await setStory(story);
}

export async function setStory(storyToSet) {
    const promises = storyToSet.comments.map(async (comment) => {
        return {
            txt: comment.txt,
            user: await userService.getById(comment.id)
        }
    });
     const story = {...storyToSet, comments: await Promise.all(promises)};

    store.dispatch({type: SET_STORY, story})
}

export async function addStory(story) {
    await storiesService.save(story);
    await store.dispatch({type: ADD_STORY, story});
}
