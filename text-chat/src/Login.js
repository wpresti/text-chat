import './Login.css';
import React from 'react';
// import { useHistory } from 'react-router-dom';
class Login extends React.Component {

    render() {

        return <div className="login">
            <h1>Login</h1>
            {/* <form method="post"> */}
            <form>
                <input type="text" name="u" id="userNameField" placeholder="Username" required="required" />
                {/* <input type="password" name="p" placeholder="Password" required="required" /> */}
                <button type="button" onClick={this.ActionLink} className="btn btn-primary btn-block btn-large">Let me in.</button>
            </form>
        </div>
    }


    ActionLink = () => {
        //console.log(useHistory())
        console.log(window.location.origin + "/chat")
        // window.localStorage.setItem("userName", "testUser")
        window.localStorage.setItem("userName", document.getElementById("userNameField").value)
        window.location.pathname = "chat"

    }
}


export default Login;