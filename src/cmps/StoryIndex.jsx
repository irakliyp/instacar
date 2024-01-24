import {StoryDetails} from "./StoryDetails";

export function StoryIndex(props) {
    const {stories} = props;
    console.log("STORIES", stories);

    if(stories.length<=0) return <div></div>
    return <ul>
        {stories.length>0 && stories.map(story => {
            return <li className="story-item" key={story.id}>
                <StoryDetails story={story}/>
            </li>
        })}
    </ul>
}
