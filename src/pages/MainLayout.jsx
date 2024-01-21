import {NavBar} from "../cmps/NavBar";
import {Link, Outlet} from "react-router-dom";


export function MainLayout() {

    return <section className="main-layout dark">
        <Link to="/" className="app-header">Instacar</Link>
        <NavBar />
        <Outlet/>
    </section>

}
