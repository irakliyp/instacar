import {NavBar} from "../cmps/NavBar";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {StoryPreview} from "./StoryPreview";
import {useEffect, useState} from "react";
import {CreateNewPost} from "../cmps/CreateNewPost";
import React from 'react'


export function MainLayout() {
    const story = useSelector(storeState => storeState.storiesModule.story);
    const user = useSelector(storeState => storeState.usersModule.user);
    const nav = useNavigate();
    const [newPostModal, setNewPostModal] = useState(false);

    useEffect( () => {
        async function fetchData() {
            if(!user) {
                nav('/login');
            }
        }
        fetchData();
    }, [user])

    function toggleNewPostModal() {
        setNewPostModal(prevState => !prevState);
    }

    return <section className="main-layout light">
        <Link to="/" className="app-header">Instagram</Link>
        <NavBar toggleNewPostModal={toggleNewPostModal}/>
        <Outlet/>
        {story && <StoryPreview story={story}/>}
        {newPostModal && <CreateNewPost toggleNewPostModal={toggleNewPostModal}/>}
    </section>

}
