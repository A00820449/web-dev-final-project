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

    const usernameInput = useRef(HTMLInputElement);
    const passwordInput = useRef(HTMLInputElement);

    /**
     * @param {SubmitEvent} e 
     */
    async function formHandler(e) {
        e.preventDefault();

        const username = usernameInput.current.value;
        const password = passwordInput.current.value;

        try {
            const { data } = await axios.post(authURL.toString(), {username, password});
            alert(`Server response: ${JSON.stringify(data)}`);
        }
        catch(e) {
            alert("An error occurred. Try again later.");
            console.error(e);
        }
    }

    return (
        <div className="Login">
            <div class="circle"><PersonIcon size={128}/></div>
            <form onSubmit={formHandler}>
                <input type="text" ref={usernameInput} className="form-control" placeholder="Username" required/>
                <input type="password" ref={passwordInput} className="form-control" placeholder="Password" required/>
                <input className="btn btn-lg btn-primary btn-block" type="submit" value="Log in" />
            </form>
        </div>
    );
}