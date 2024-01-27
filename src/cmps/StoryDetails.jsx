import {FaHeart, FaRegComment} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa6";
import {useSelector} from "react-redux";
import {addComment, toggleLike} from "../store/actions/stories.actions.js";
import {useState} from "react";

export function StoryDetails({story}) {
    const {txt, imgUrl, by, loc, comments, likedBy, tags} = story;
    const {fullname, imgUrl: userImage} = by;
    const user = useSelector(storeState => storeState.usersModule.user);
    const [comment, setComment] = useState('');

    function postComment() {
        addComment(story, {id: user.id, txt: comment});
        setComment('')
    }

    const liked = likedBy.find(likedUser => likedUser.id === user.id);

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
            <input className="story-details-add-comment" type="text" placeholder="Add a comment..." value={comment} onChange={ev => setComment(ev.target.value)}/>
            <button className="btn" onClick={postComment}>Post</button>
        </div>
    </section>
}
