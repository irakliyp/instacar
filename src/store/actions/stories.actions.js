import {store} from "../store.js";
import {storiesService} from "../../services/stories.service.js";
import {SET_STORIES} from "../reducers/stories.reducer.js";


export async function loadStories() {
    try {
        const stories = await storiesService.query();
        store.dispatch({ type: SET_STORIES, stories })
    } catch (err) {
        console.log('Stories Actions: err in loadStories', err)
    }
}
