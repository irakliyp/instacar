import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa6";



export function StoryDetails({story}) {
    const {txt, imgUrl, by, loc, comments, likedBy, tags} = story;
    const {fullname, imgUrl: userImage} = by;

    return <section className="story-details">
        <div className="user-details">
            <img className="user-icon" src={userImage}/>
            <span className="user-name">{fullname}</span>
        </div>
        <img className="story-details-img" src={imgUrl}/>
        <div className="story-details-actions icon">
            <div className="primary-actions">
                <AiOutlineHeart/>
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
