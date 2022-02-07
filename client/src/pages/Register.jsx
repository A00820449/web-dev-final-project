import "./Register.css"
import { PencilIcon } from "@primer/octicons-react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login(props) {

    /**
     * @type {URL}
     */
    const authURL = props.apiURL;
    authURL.pathname = "/auth";

    const usernameInput = useRef(HTMLInputElement);
    const passwordInput = useRef(HTMLInputElement);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        } 
    },[navigate]);

    /**
     * @param {SubmitEvent} e 
     */
    async function formHandler(e) {
        e.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;

        try {
            const { data } = await axios.post(authURL.toString(), {username, password});
            if (!data.error) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                return navigate("/");
            }
        }
        catch(e) {
            console.error(e);

            if (e.response?.status === 400) {
                return alert("Bad request");
            }

            if (e.response?.status === 404) {
                return alert("User not found");
            }

            if (e.response?.status === 401) {
                return alert("Incorrect password");
            }

            return alert("An error occurred. Try again later.");
        }
    }

    return (
        <div className="Register">
            <div className="circle"><PencilIcon size={128}/></div>
            <form onSubmit={formHandler}>
                <h2>Sign Up</h2>
                <input type="text" placeholder="Username" className="form-control" required/>
                <div className="form-group">
                    <input type="password" ref={usernameInput} className="form-control password1" placeholder="Password" required/>
                    <input type="password" ref={passwordInput} className="form-control password2" placeholder="Repeat password" required/>
                </div>
                <input className="btn btn-lg btn-primary btn-block form-group" type="submit" value="Sign Up" />
                <hr />
                <p>Already have an account? Log in here!</p>
                <Link className="btn btn-lg btn-primary btn-block form-group" to={"/login"}>Log In</Link>
            </form>
        </div>
    );
}