import { MdHomeFilled } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";
import { LuPlusSquare } from "react-icons/lu";
import { VscThreeBars } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import React from 'react'


export function NavBar({toggleNewPostModal}) {
    const user = useSelector(storeState => storeState.usersModule.user);
    const navigation = useNavigate();

    function handleClick(nav) {
        navigation(`/${nav}`);
    }

    return <section className="nav-bar">
        <section className="nav-bar-container">
            <section className="nav-bar-primary">
                <button className="btn" onClick={() => handleClick('home')}>
                    <div className="nav-icon">
                        <MdHomeFilled />
                    </div>
                    <span>Home</span>
                </button>
                <button className="btn">
                    <div className="nav-icon">
                        <BiMessageSquareEdit />
                    </div>
                    <span>Message</span></button>
                <button className="btn" onClick={toggleNewPostModal}>
                    <div className="nav-icon">
                        <LuPlusSquare />
                    </div>
                    <span>Create</span></button>
                <button className="btn" onClick={() => handleClick(user.username)}>
                <div className="nav-icon">
                    <CgProfile />
                </div>
                <span>Profile</span>
            </button>
            </section>
            <section className="nav-bar-secondary">
                <button className="btn">
                    <div className="nav-icon">
                        <VscThreeBars />
                    </div>
                    <span>More</span></button>
            </section>
        </section>
    </section>
}
