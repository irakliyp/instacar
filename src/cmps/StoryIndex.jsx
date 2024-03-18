import {StoryDetails} from "./StoryDetails";
import React from 'react'

export function StoryIndex(props) {
    const {stories} = props;

    if(stories.length<=0) return <div></div>
    return <ul style={{display: "grid"}}>
        {stories.length>0 && stories.slice(0).reverse().map(story => {
            return <li className="story-item" key={story.id}>
                <StoryDetails story={story}/>
            </li>
        })}
    </ul>
}
