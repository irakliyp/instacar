import {useSelector} from "react-redux";
import {follow} from "../store/actions/user.actions.js";


export function SidePanel() {
    const user = useSelector(storeState => storeState.usersModule.user);
    const users = useSelector(storeState => storeState.usersModule.users);
    const {id, following} = user;

    const isFollowing = userItem => {
        if(userItem.id === id) {
            return true;
        }
        let contains = false;
        following?.forEach(follower => {
            if(follower.id === +userItem.id) {
                contains = true;
            }
        })
        return contains;
    }

    const renderUserItem = (userItem, buttonName) => {
        return <section className="suggestion-container">
            <div className="user-details">
                <img className="user-icon" src={userItem.imgUrl}/>
                <div className="user-name-container">
                    <span className="user-name bold">{userItem.fullname}</span>
                    <span className="user-name gray">{userItem.fullname}</span>
                </div>
            </div>
            <button onClick={() =>follow(user, +userItem.id)}>{buttonName}</button>
        </section>
    }

    return <section className="side-panel">
        <section className="suggestion-list">
            <div className="suggestion-list-item">
                {renderUserItem(user, 'Switch')}
            </div>
            <div className="suggestion-container">
                <div className="dark-gray">Suggested for you</div>
                <button className="see-all">See all</button>
            </div>
            {users &&
                <ul className="suggestion-list">
                    {users.map(userItem => {
                        if(isFollowing(userItem)) {
                            return null;
                        }
                        else {
                    return <li className="suggestion-list-item" key={userItem.id}>
                {renderUserItem(userItem, 'Follow')}
                    </li>
                }})}
                </ul>
            }
        </section>
    </section>

}
