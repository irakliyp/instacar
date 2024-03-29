import { userService } from "../../services/user.service.js";

import {FOLLOW_USER, REMOVE_USER, SAVE_STORY, SET_USER, SET_USERS} from "../reducers/user.reducer"

import { store } from "../store"
import {ADD_STORY} from "../reducers/stories.reducer.js";



export async function loadUsers() {
    try {
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function follow(user, id) {
    let updatedUser;
    if(user.following) updatedUser = {...user, following: [...user.following, {id: id}]}
    else updatedUser = {...user, following: [{id: id}]}
    await userService.update(updatedUser);
    store.dispatch({
        type: FOLLOW_USER,
        user: updatedUser
    })
}

export async function saveStory(user, story) {
    let updatedUser;
    if(user.saved) {
        if(!user.saved.find(storyItem => storyItem.id === story.id)) {
            updatedUser = {...user, saved: [...user.saved, story]}
        }
        else return;
    }
    else updatedUser = {...user, saved: [story]}
    await userService.update(updatedUser);
    store.dispatch({
        type: SAVE_STORY,
        user: updatedUser
    })
}

