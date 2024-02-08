import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import {stories as storiesMock} from "../assets/mocks/mock.js";

const storiesDB = 'stories_DB'
_createStories()

export const storiesService = {
    query,
    get,
    remove,
    save,
    getByUserId
}
// For Debug (easy access from console):
window.cs = storiesService

async function query() {
    const stories = await storageService.query(storiesDB);
    return stories;
}

async function getByUserId(userId) {
    const stories = await storageService.query(storiesDB);
    const userStories = stories.filter(story => story.by.id === userId);
    return userStories;
}

function get(storyId) {
    return storageService.get(storiesDB, storyId)
        .then(story => {
            return story;
        })
}

function remove(storyId) {
    return storageService.remove(storiesDB, storyId)
}

function save(story) {
    if (story.id) {
        return storageService.put(storiesDB, story)
    } else {
        return storageService.post(storiesDB, story)
    }
}

function getEmptyStory(txt = '', imgUrl = [], by = {}, loc = {}, comments = [], likedBy = [], tags = []) {
    return {
        txt,
        imgUrl,
        by,
        loc,
        comments,
        likedBy,
        tags
    }
}

function _createStories() {
    let stories = utilService.loadFromStorage(storiesDB)
    if (!stories || !stories.length) {
        stories = []

        storiesMock.forEach(story => {
            const newStory = _createStory({...story})
            stories.push(newStory);
        })
        utilService.saveToStorage(storiesDB, stories)
    }
}

function _createStory({txt="", imgUrl=[], by={}, loc={}, comments=[], likedBy=[], tags=[]}) {
    const story = getEmptyStory(txt, imgUrl, by, loc, comments, likedBy, tags)
    story.id = utilService.makeId()
    return story
}

function _setNextPrevCarId(car) {
    return storageService.query(storiesDB).then((cars) => {
        const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
        const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
        const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
        car.nextCarId = nextCar.id
        car.prevCarId = prevCar.id
        return car
    })
}
