import {NavBar} from "../cmps/NavBar";
import {Outlet, useNavigate} from "react-router-dom";


export function MainLayout() {

    const navigator = useNavigate();
    console.log("HELLO")
    navigator('/home');


    return <section className="main-layout">
        <NavBar navigator={navigator}/>
        <Outlet/>
    </section>

}
