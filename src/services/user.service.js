import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER_DB = 'user'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getByUsername,
    getFollowers
}

// window.userService = userService

async function getUsers() {
    const users = await storageService.query(STORAGE_KEY_USER_DB);
    return users;
}

async function getFollowers(userId) {
    const users = await storageService.query(STORAGE_KEY_USER_DB);
    const followers = users.filter(user => {
        if(user.id === userId) return false;
        const follower = user.following.find(userItem => userItem.id === +userId);
        if(follower) return true;
        return false;
    })
    return followers;
}

async function getByUsername(username) {
    const users = await storageService.query(STORAGE_KEY_USER_DB);
    const user = users.find(userItem => userItem.username === username);
    return user;
}

async function getById(userId) {
    try {
        const user = await storageService.get(STORAGE_KEY_USER_DB, userId);
        return user;
    }
    catch (e) {
        return _getEmptyUser();
    }
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY_USER_DB, userId)
}

async function update(userToUpdate) {
    const user = await getById(userToUpdate.id)
    const updatedUser = await storageService.put(STORAGE_KEY_USER_DB, { ...user, ...userToUpdate })
    if (getLoggedinUser().id === updatedUser.id) saveLocalUser(updatedUser)
    return updatedUser
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY_USER_DB)
    const user = users.find(user => user.username === userCred.username)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {

    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    if (!userCred.isAdmin) userCred.isAdmin = false;
    const user = await storageService.post(STORAGE_KEY_USER_DB, userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    user = { id: user.id, fullname: user.fullname, imgUrl: user.imgUrl, following: user.following, username: user.username, saved: user.saved }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _getEmptyUser() {
    return {fullname: 'John', username: 'Dow', password:'123', isAdmin: false, imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'}
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Merab P', username: 'Merab', password:'123', isAdmin: false, id:'1111', following:[{id:2222}]})
//     await userService.signup({fullname: 'Zurab P', username: 'Zurab', password:'123',  isAdmin: true, id:'2222', following:[{id:3333}, {id:1111}]})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', isAdmin: false, id:'3333', following:[{id:1111}]})
//     await userService.signup({fullname: 'Tiana P', username: 'Tiana', password:'123', isAdmin: false, id:'4444', following:[{id:5555}]})
//     await userService.signup({fullname: 'Rom P', username: 'Rom', password:'123',  isAdmin: true, id:'5555', following:[{id:3333}, {id:4444}]})
//     await userService.signup({fullname: 'Irakliy P', username: 'Irakliy', password:'123', isAdmin: false, id:'6666', following:[{id:7777}, {id:1111}, {id:2222}]})
//     await userService.signup({fullname: 'Kristina P', username: 'Kristina', password:'123', isAdmin: false, id:'7777', following:[{id:5555}]})
//     await userService.signup({fullname: 'Regina M', username: 'Regina', password:'123',  isAdmin: true, id:'8888', following:[{id:2222}, {id:6666}]})
//     await userService.signup({fullname: 'Andrey Goncharov', username: 'Andrey', password:'123', isAdmin: false, id:'9999', following:[{id:1111}]})
// })()
