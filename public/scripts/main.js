const socket = io("http://localhost:5050",({transports:["websocket"]}));

const chatForm  = document.getElementById("chat-form");

const chatmsg = document.querySelector(".chat-messages")

const roomname = document.getElementById("room-name");
const userlist = document.getElementById("users");
const sendbtn = document.querySelector(".btn");

let Urlparams = new URLSearchParams(window.location.search)


let username = Urlparams.get("username");
let room = Urlparams.get("room");

// console.log(username,room)

socket.emit("joinroom",{username,room});

socket.on("message",(message)=>{
    outputmessage(message)
})

socket.on("chatmessage",(message)=>{
    outputmessage(message)
})

socket.on("roomuser",({room,users})=>{
    roomname.innerText = room;

    roomusers(users)
})

function roomusers(users){
    
    let usersss = users.map((ele,int)=>{
        return `<li>${ele.username}</li>`
    }).join("")

    userlist.innerHTML =`${usersss}`;
}

chatForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    let msg = e.target.elements.msg.value;
    msg = msg.trim();
    // console.log(msg)

    if(msg){
        socket.emit("chatmessage",msg)
    }else{
        return false ;
    }

    e.target.elements.msg.value="";
    e.target.elements.msg.focus();
})

function outputmessage(message){
    // console.log(message)
    const div = document.createElement("div");
    div.classList.add("message");

    const p = document.createElement("p");

    p.classList.add("meta");

    p.innerText = message.username;

    p.innerHTML += `  <span>${message.time}</span>`;

    div.appendChild(p);
    const para = document.createElement("p");

    para.classList.add("text");

    para.innerText = message.text

    div.appendChild(para);

    chatmsg.appendChild(div)
}
