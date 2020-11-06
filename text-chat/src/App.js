import './App.css';
import React from "react";
import Login from './Login'
import Chat from './Chat'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

class App extends React.Component{
  componentDidMount(){
    console.log("component mounted!")
    checkForLogin()
  }

  render(){
    return (
      <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>

    );
  }
}


function checkForLogin() {
  console.log("CHECKING LOGGIN RIGHT NOW")
  console.log(window.localStorage,window.location.pathname)
  if (window.localStorage.length === 1 & window.location.pathname === "/"){
    //username present
    console.log("redirecting to chat")
    window.location.pathname = "chat"
  } else if (window.location.pathname === "/") {
    //do nothing!
    //username not present
    //window.location.pathname = ""
    window.location.pathname = "login"
  }
}

export default App;
