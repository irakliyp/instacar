import {useSelector} from "react-redux";
import {StoryActions} from "./StoryActions";

export function StoryDetails({story}) {
    const {txt, imgUrl, by, loc, comments, likedBy, tags} = story;
    const {fullname, imgUrl: userImage} = by;
    const user = useSelector(storeState => storeState.usersModule.user);

    return <section className="story-details">
        <div className="user-details">
            <img className="user-icon" src={userImage}/>
            <span className="user-name bold">{fullname}</span>
        </div>
        <img className="story-details-img" src={imgUrl}/>
        <StoryActions story={story} viewComments={true}/>
    </section>
}
