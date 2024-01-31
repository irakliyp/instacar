import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SET_STORY} from "../store/reducers/stories.reducer.js";
import {userService} from "../services/user.service.js";
import {StoryActions} from "../cmps/StoryActions.jsx";


export function StoryPreview({story}) {
    const {txt, imgUrl, by, loc, comments, likedBy, tags} = story;
    const { fullname, imgUrl: userImage } = by;
    const modalRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
debugger;
        if (story) {
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside)
            }, 0)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [story])

    function onCloseModal() {
        dispatch({ type: SET_STORY, story: null })
    }

    function handleClickOutside(ev) {
        if (modalRef.current && !modalRef.current.contains(ev.target)) {
            onCloseModal()
        }
    }

    if(!story) return <div></div>

    return <article ref={modalRef} className="story-modal">
        <img src={imgUrl} className="story-modal-img left"/>
        <section className="story-modal-container">
            <div className="user-details bottom-border padding">
                <img className="user-icon" src={userImage}/>
                <span className="user-name bold">{fullname}</span>
            </div>
            <ul className="story-modal-comments">
                {comments.map((comment, idx) => {
                    const { imgUrl: userImage, fullname, id } = comment.user;
                    return <li className="user-details" key={idx}>
                        <img className="user-icon" src={userImage}/>
                        <span className="user-name bold">{fullname}</span>
                        <span>{comment.txt}</span>
                    </li>
                })}
            </ul>
            <StoryActions story={story} viewComments={false}/>
        </section>
    </article>
}