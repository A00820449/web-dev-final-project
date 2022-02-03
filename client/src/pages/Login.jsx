import "./Login.css"
import { PersonIcon } from "@primer/octicons-react";
import { useRef } from "react";
import axios from "axios";

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
    async function formHandler(e) {
        e.preventDefault();

        const user = userInput.current.value;
        const password = passwordInput.current.value;

        try {
            const { data } = await axios.post(authURL.toString(), {user, password});
            alert(`Server response: ${JSON.stringify(data)}`);
        }
        catch(e) {
            alert("An error occurred. Try again later.");
            console.error(e);
        }
    }

    return (
        <div className="Login">
            <PersonIcon size={128}/>
            <form onSubmit={formHandler}>
                <input type="text" ref={userInput} className="form-control" placeholder="Username" required/>
                <input type="password" ref={passwordInput} className="form-control" placeholder="Password" required/>
                <input className="btn btn-lg btn-primary btn-block" type="submit" value="Log in" />
            </form>
        </div>
    );
}