import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {userService} from "../services/user.service.js";
import {useEffect, useRef, useState} from "react";
import { IoPersonAddOutline, IoPersonAdd } from "react-icons/io5";
import {storiesService} from "../services/stories.service.js";
import { MdVerified } from "react-icons/md";
import { LiaTableSolid } from "react-icons/lia";
import {FaRegBookmark} from "react-icons/fa6";



export function Profile() {
    const location = useLocation();
    const profileName = location.pathname.substring(1);
    const [user, setUser] = useState(null);
    const [stories, setStories] = useState([]);
    const [selectedTab, setSelectedTab] = useState(1);
    const [followers, setFollowers] = useState([]);
    const tabContainer = useRef();
    const nav = useNavigate();

    useEffect( () => {
        async function fetchData() {
            if(!user) {
                const fetchedUser = await userService.getByUsername(profileName);
                setUser(fetchedUser);
            }

            if(user) {
                const fetchedStories = await storiesService.getByUserId(user.id);
                setStories(fetchedStories);
                const fetchedFollowers = await userService.getFollowers(user.id);
                setFollowers(fetchedFollowers);
            }
        }
        fetchData();
    }, [user])

    function handleTabChange(selection) {
        let navigation = `/${username}${selection === 2 ? '/saved' : ''}`;
        nav(navigation);
        setSelectedTab(selection);
    }

    if(!user) return <div></div>
    const {fullname, username, password, isAdmin, id, imgUrl, following} = user;
    const style = {
        color: "blue",
        width: "15px",
        height: "15px"
    }

    return <section className="profile center">
        <section className="profile-layout">
            <section className="profile-layout-details">
                <div className="profile-icon">
                    <img src={imgUrl}/>
                </div>
                <div className="profile-details">
                    <div className="profile-details-header">
                        <div>{fullname}</div>
                        <MdVerified style={style}/>
                        <button className="margin-left">Following</button>
                        <button>Message</button>
                        <button><IoPersonAddOutline/></button>
                    </div>
                    <div className="profile-details-other">
                        <div className="other">
                            <div className="bold">{stories.length}</div>
                            <div>{stories.length === 1 ? "post" : "posts"}</div>
                        </div>
                        <div className="other">
                            <div className="bold">{followers.length}</div>
                            <div>{followers.length === 1 ? "follower" : "followers"}</div>
                        </div>
                        <div className="other">
                            <div className="bold">{following.length}</div>
                            <div>following</div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<section className="profile-layout-suggestions">2</section>*/}
            <section className="profile-layout-tabs">
                <div ref={tabContainer} className="tabs-container">
                    <div className={`tab${selectedTab === 1 ? ' selected' : ' gray'}`}  onClick={() => handleTabChange(1)}>
                        <LiaTableSolid />
                        <div>POSTS</div>
                    </div>
                    <div className={`tab${selectedTab === 2 ? ' selected' : ' gray'}`}  onClick={() => handleTabChange(2)}>
                        <FaRegBookmark/>
                        <div>SAVED</div>
                    </div>
                </div>
            </section>
            <section className="profile-layout-content">
                <Outlet context={stories}/>
            </section>
        </section>
    </section>
}