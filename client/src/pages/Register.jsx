import "./Register.css"
import { PencilIcon } from "@primer/octicons-react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login(props) {

    /**
     * @type {URL}
     */
    const registerURL = props.apiURL;
    registerURL.pathname = "/register";

    const usernameInput = useRef(HTMLInputElement);
    const password1Input = useRef(HTMLInputElement);
    const password2Input = useRef(HTMLInputElement);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        } 
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    /**
     * @param {SubmitEvent} e 
     */
    async function formHandler(e) {
        e.preventDefault();

        if (password1Input.current.value !== password2Input.current.value) {
            return alert("The two passwords must match. Try again.");
        }

        const password = password1Input.current.value.trim();
        const username = usernameInput.current.value.trim();

        try {
            const { data } = await axios.post(registerURL.toString(), {username, password});
            if (!data.error) {
                alert("Sign up successful! Log in to continue.")
                return navigate("/login");
            }
        }
        catch(e) {
            console.error(e);

            if (!e.response) {
                return alert("Couldn't reach server. Try again later.")
            }

            if (e.response?.status === 400) {
                return alert("Bad request");
            }

            if (e.response?.status === 409) {
                return alert("Username already exists");
            }

            return alert("An error occurred. Try again later.");
        }
    }

    return (
        <div className="Register">
            <div className="circle"><PencilIcon size={128}/></div>
            <form onSubmit={formHandler}>
                <h2>Sign Up</h2>
                <input type="text" ref={usernameInput} placeholder="Username" className="form-control" required/>
                <div className="form-group">
                    <input type="password" ref={password2Input} className="form-control password1" placeholder="Password" required/>
                    <input type="password" ref={password1Input} className="form-control password2" placeholder="Repeat password" required/>
                </div>
                <input className="btn btn-lg btn-primary btn-block form-group" type="submit" value="Sign Up" />
                <hr />
                <p>Already have an account? Log in here!</p>
                <Link className="btn btn-lg btn-primary btn-block form-group" to={"/login"}>Log In</Link>
            </form>
        </div>
    );
}