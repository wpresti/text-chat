import React from 'react';
import './Chat.css';
const io = require('socket.io-client')
const socket = io(":3005")//pass server URL in here
console.log(socket)//move above line to onLoad event thingy
class Chat extends React.Component {
    componentDidMount() {

        socket.on('connect', () => {
            console.log(socket.connected); // true
            var userName = window.localStorage.getItem("userName")
            console.log("look here", userName)
            socket.emit("addUser", userName)
        });

        socket.on('disconnect', () => {
            var userName = window.localStorage.getItem("userName")
            console.log("discconected...remoivng user")
            socket.emit("removeUser", userName)
        });

        socket.on("users", data => {
            console.log("received users list", data);
            document.getElementById("userList").innerHTML = "";
            for (var name in data) {
                console.log("name: ", data[name]);
                var list = document.getElementById("userList");
                var entry = document.createElement("dt");
                entry.appendChild(document.createTextNode(data[name]))
                list.appendChild(entry)
            }

        });


        socket.on("message", data => {
            console.log("message received:", data)
            var list = document.getElementById('msgList')

            var entry = document.createElement('dt');
            entry.appendChild(document.createTextNode(data));
            list.appendChild(entry)
        });


        document.getElementById("textBox").onkeydown = function (event) {
            //console.log(event.key)
            if (event.key === "Enter") {
                socket.send(document.getElementById("textBox").value);
                document.getElementById("textBox").value = "";
            }
        }


    }

    render() {
        //window.localStorage.setItem("userName","fuck")
        console.log("this.myContext", this.MyContext)
        console.log("chat page", window.localStorage.getItem("userName"))
        return <div className="chat">
            <h1>Chat </h1>
            <p>hello {window.localStorage.getItem("userName")}</p>
            <button id="logout" onClick={this.LogOut}>Logout</button>
            <div className="chatBox">

                <dl id="msgList">
                    {/* <dt>Coffee</dt>
                <dd>- black hot drink</dd>
                <dt>Milk</dt>
                <dd>- white cold drink</dd> */}
                </dl>
                <div className="userList">
                    <h1>User List</h1>
                    <dl id="userList">
                    </dl>
                </div>
                <div className="chatTextBox">
                    <input type="text" id="textBox"></input>
                    <button id="sendBtn" onClick={this.ActionLink}>Send</button>
                </div>

            </div>
        </div>
    }

    LogOut = () => {
        console.log("logged out clicked :(")
        window.localStorage.clear()
        window.location.pathname = ""
    }

    ActionLink = () => {
        console.log("clicked on send button")
        console.log("msg to be sent:", document.getElementById("textBox").value)
        socket.send(document.getElementById("textBox").value)
        document.getElementById("textBox").value = "";


    }

}

export default Chat