import {NavBar} from "../cmps/NavBar";
import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {StoryPreview} from "./StoryPreview";
import {useState} from "react";
import {CreateNewPost} from "../cmps/CreateNewPost";


export function MainLayout() {
    const story = useSelector(storeState => storeState.storiesModule.story);
    const [newPostModal, setNewPostModal] = useState(false);

    function toggleNewPostModal() {
        setNewPostModal(prevState => !prevState);
    }

    return <section className="main-layout light">
        <Link to="/" className="app-header">Instacar</Link>
        <NavBar toggleNewPostModal={toggleNewPostModal}/>
        <Outlet/>
        {story && <StoryPreview story={story}/>}
        {newPostModal && <CreateNewPost toggleNewPostModal={toggleNewPostModal}/>}
    </section>

}
