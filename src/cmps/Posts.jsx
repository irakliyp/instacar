import {useOutletContext} from "react-router-dom";
import {setStory} from "../store/actions/stories.actions.js";
import { FaComment } from "react-icons/fa";


export function Posts() {
    const stories = useOutletContext();

    return <section className="posts">
        {stories.map(story => {
            return <div>
                <img src={story.imgUrl} onClick={() => setStory(story)}/>
                <div className="post-comment">
                    <FaComment style={{color: "white"}}/>
                    <div className="bold">{story.comments.length}</div>
                </div>
            </div>
        })}
    </section>
}
