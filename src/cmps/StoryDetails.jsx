import {StoryActions} from "./StoryActions";
import {Link} from "react-router-dom";
import {userService} from "../services/user.service.js";
import {useEffect, useState} from "react";

export function StoryDetails({story}) {
    const {imgUrl, by} = story;
    const {username} = by;
    const [user, setUser] = useState(null);
    const {fullname, imgUrl: userImage} = user ? user : {fullname: '', imgUrl: ''};

    useEffect( () => {
        async function fetchData() {
            if(!user) {
                const fetchedUser = await userService.getByUsername(username);
                setUser(fetchedUser);
            }
        }
        fetchData();
    }, [story])

    return <section className="story-details">
        <div className="user-details">
            <img className="user-icon" src={userImage}/>
            <Link className="user-name bold" to={`/${username}`}>{fullname}</Link>
        </div>
        <img className="story-details-img" src={imgUrl}/>
        <StoryActions story={story} viewComments={true}/>
    </section>
}
