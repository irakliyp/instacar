import {SidePanel} from "../cmps/SidePanel.jsx";
import {userService} from "../services/user.service.js"
import {loadUsers} from "../store/actions/user.actions.js";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export function HomePage() {

    useEffect(() => {
        loadUsers();
    }, [])

    const users = useSelector(storeState => storeState.usersModule.users);
    console.log("users", users)

    return <>
        <section className="center">Hello from Home page</section>
        <SidePanel/>
    </>


}
