import {NavBar} from "../cmps/NavBar";
import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {StoryPreview} from "./StoryPreview";


export function MainLayout() {
    const story = useSelector(storeState => storeState.storiesModule.story);
debugger;
    return <section className="main-layout light">
        <Link to="/" className="app-header">Instacar</Link>
        <NavBar />
        <Outlet/>
        {story && <StoryPreview story={story}/>}
    </section>

}
