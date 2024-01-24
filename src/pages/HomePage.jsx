import {SidePanel} from "../cmps/SidePanel.jsx";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {loadStories} from "../store/actions/stories.actions.js";
import {StoryIndex} from "../cmps/StoryIndex";

export function HomePage() {

    const stories = useSelector(storeState => storeState.storiesModule.stories);

    useEffect(() => {
        loadStories();
    }, [stories?.length])

    return <>
        <section className="center">
            <StoryIndex stories={stories}/>
        </section>
        <SidePanel/>
    </>


}
