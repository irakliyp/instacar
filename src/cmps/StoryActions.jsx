import {addComment, setStory, toggleLike} from "../store/actions/stories.actions.js";
import {useSelector} from "react-redux";
import {useState} from "react";
import {FaHeart, FaRegComment, FaBookmark} from "react-icons/fa";
import {FiSend} from "react-icons/fi";
import {FaRegBookmark, FaRegHeart} from "react-icons/fa6";
import {saveStory} from "../store/actions/user.actions.js";


export function StoryActions({story, viewComments}) {
    const {txt, imgUrl, by, loc, comments, likedBy, tags} = story;
    const {fullname, imgUrl: userImage} = by;
    const user = useSelector(storeState => storeState.usersModule.user);
    const [comment, setComment] = useState('');
    const liked = likedBy.find(likedUser => likedUser.id === user.id);
    const [saved, setSaved] = useState(user.saved?.find(storyItem => storyItem.id === story.id));


    function postComment() {
        addComment(story, {id: user.id, txt: comment});
        setComment('')
    }

    async function previewStory() {
        await setStory(story);
    }

    async function save() {
        setSaved(story);
        await saveStory(user, story);
    }

    if(!story) return <div></div>

    return <>
        <div className="story-details-actions icon">
            <div className="primary-actions">
                <div onClick={() => toggleLike(story, user)}>
                    {liked ? <FaHeart style={ {color: 'red'} }/> : <FaRegHeart/>}
                </div>
                <div onClick={previewStory}> <FaRegComment/></div>
                <FiSend/>
            </div>
            <div className="secondary-actions icon">
                {!saved ? <div onClick={save}>
                    <FaRegBookmark/>
                </div>
                    :
                    <FaBookmark/>
                }

            </div>
        </div>
        <div className="bold">{likedBy.length} likes</div>
        <div className="story-details-desc">
            <div className="bold">{fullname}</div>
            <div>{txt}</div>
        </div>
        {viewComments && <div className="gray" onClick={previewStory}>View all {comments.length} comments</div>}
        <div className="add-comment-container">
            <input className="add-comment" type="text" placeholder="Add a comment..." value={comment} onChange={ev => setComment(ev.target.value)}/>
            <button className="btn-post" disabled={comment.length > 0 ? false : true} onClick={postComment}>Post</button>
    </div>
    </>
}
