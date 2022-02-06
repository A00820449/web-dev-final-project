import "./Navbar.css"
import { SyncIcon } from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="Navbar">
            <button className="btn btn-outline-secondary hamburger"><SyncIcon size={16}/></button>
            <span>Hello, {props.name}!</span>
            <button className="btn btn-outline-danger" onClick={logOut}>Log Out</button>
        </nav>
    );
}