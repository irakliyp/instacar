import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const storiesDB = 'stories_DB'
_createCars()

export const storiesService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
    getFilterFromSearchParams,
    getSpeedStats,
    getVendorStats,
    _createBooks
}
// For Debug (easy access from console):
window.cs = storiesService

function query(users = []) {
    return storageService.query(storiesDB)
        .then(stories => {
            stories = stories.filter(story => users.includes(story.by.id))
            return stories;
        })
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

function _createCars() {
    let cars = utilService.loadFromStorage(storiesDB)
    if (!cars || !cars.length) {
        cars = []
        const vendors = ['audu', 'fiak', 'subali', 'mitsu']
        for (let i = 0; i < 20; i++) {
            const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
            cars.push(_createCar(vendor, utilService.getRandomIntInclusive(80, 300)))
        }
        utilService.saveToStorage(storiesDB, cars)
    }
}

function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyStory(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car
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

function _getCarCountBySpeedMap(cars) {
    const carCountBySpeedMap = cars.reduce((map, car) => {
        if (car.maxSpeed < 120) map.slow++
        else if (car.maxSpeed < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return carCountBySpeedMap
}

function _getCarCountByVendorMap(cars) {
    const carCountByVendorMap = cars.reduce((map, car) => {
        if (!map[car.vendor]) map[car.vendor] = 0
        map[car.vendor]++
        return map
    }, {})
    return carCountByVendorMap
}
function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }
    console.log('books', books)
}
