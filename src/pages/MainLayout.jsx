import {NavBar} from "../cmps/NavBar";
import {Link, Outlet, useNavigate} from "react-router-dom";


export function MainLayout() {

    const navigator = useNavigate();
    navigator('/home');


    return <section className="main-layout dark">
        <Link to="/" className="app-header">Instacar</Link>
        <NavBar navigator={navigator}/>
        <Outlet/>
    </section>

}
