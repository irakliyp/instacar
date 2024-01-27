import {FaHeart, FaRegComment} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa6";
import {useSelector} from "react-redux";
import {toggleLike} from "../store/actions/stories.actions.js";

export function StoryDetails({story}) {
    const {txt, imgUrl, by, loc, comments, likedBy, tags} = story;
    const {fullname, imgUrl: userImage} = by;
    const user = useSelector(storeState => storeState.usersModule.user);
    const liked = likedBy.find(likedUser => likedUser.id === user.id);

    console.log("ID: ", txt);
    return <section className="story-details">
        <div className="user-details">
            <img className="user-icon" src={userImage}/>
            <span className="user-name">{fullname}</span>
        </div>
        <img className="story-details-img" src={imgUrl}/>
        <div className="story-details-actions icon">
            <div className="primary-actions">
                <div onClick={() => toggleLike(story, user)}>
                {liked ? <FaHeart style={ {color: 'red'} }/> : <FaRegHeart/>}
                </div>
                <FaRegComment/>
                <FiSend/>
            </div>
            <div className="secondary-actions icon">
                <FaRegBookmark/>
            </div>
        </div>
        <div>{likedBy.length} likes</div>
        <div className="story-details-desc">
            <div>{fullname}</div>
            <div>{txt}</div>
        </div>
        <div>View all {comments.length} comments</div>
        <div className="add-comment-container">
            <input className="story-details-add-comment" type="text" placeholder="Add a comment..."/>
            <button className="btn">Post</button>
        </div>
    </section>
}
