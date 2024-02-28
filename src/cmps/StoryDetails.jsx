import {useSelector} from "react-redux";
import {StoryActions} from "./StoryActions";
import {Link} from "react-router-dom";

export function StoryDetails({story}) {
    const {txt, imgUrl, by, loc, comments, likedBy, tags} = story;
    const {fullname, imgUrl: userImage, username} = by;
    const user = useSelector(storeState => storeState.usersModule.user);

    return <section className="story-details">
        <div className="user-details">
            <img className="user-icon" src={userImage}/>
            <Link className="user-name bold" to={`/${username}`}>{fullname}</Link>
        </div>
        <img className="story-details-img" src={imgUrl}/>
        <StoryActions story={story} viewComments={true}/>
    </section>
}
