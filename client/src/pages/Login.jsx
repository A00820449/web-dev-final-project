import "./Login.css"
import { PersonIcon } from "@primer/octicons-react";
import { useRef } from "react";

export default function Login(props) {

    /**
     * @type {URL}
     */
    const authURL = props.apiURL;
    authURL.pathname = "/auth";

    const userInput = useRef(HTMLInputElement);
    const passwordInput = useRef(HTMLInputElement);

    /**
     * @param {SubmitEvent} e 
     */
    function formHandler(e) {
        e.preventDefault();

        alert(`User: ${userInput.current.value}\nPassword: ${passwordInput.current.value}\nURL: ${authURL}`);
    }

    return (
        <div className="Login">
            <PersonIcon size={128}/>
            <form onSubmit={formHandler}>
                <input type="text" ref={userInput} className="form-control" placeholder="Username" required/>
                <input type="password" ref={passwordInput} className="form-control" placeholder="Password" required/>
                <input class="btn btn-lg btn-primary btn-block" type="submit" value="Log in" />
            </form>
        </div>
    );
}