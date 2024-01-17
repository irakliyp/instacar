import { MdHomeFilled } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";
import { LuPlusSquare } from "react-icons/lu";
import { VscThreeBars } from "react-icons/vsc";



export function NavBar() {

    return <section className="nav-bar left">
            <section className="nav-bar-primary">
                <button className="btn">
                    <div className="icon">
                        <MdHomeFilled />
                    </div>
                    <span>Home</span>
                </button>
                <button className="btn">
                    <div className="icon">
                        <BiMessageSquareEdit />
                    </div>
                    <span>Message</span></button>
                <button className="btn">
                    <div className="icon">
                        <LuPlusSquare />
                    </div>
                    <span>Create</span></button>
            </section>
            <section className="nav-bar-secondary">
                <button className="btn">
                    <div className="icon">
                        <VscThreeBars />
                    </div>
                    <span>More</span></button>
            </section>
    </section>
}
