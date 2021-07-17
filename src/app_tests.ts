import { io } from 'socket.io-client';

const socket = io("http://localhost:3000/socket");

const userData = {
    name: "Nikita",
    surname: "Brekhuntsov",
    patronymic: "Alexsandrovich",
    login: "Aceki",
    email: "aceki320@gmail.com"
}

socket.on("connect", () => { 
    console.log("Connected!");
    socket.emit("user:connect", userData, "72a2489a-fea1-4734-b291-d6fd0f0ff6e9");
});
socket.on("user:connected", u => {
    console.log(u);
})
socket.on("graph:load", data => {
    console.log(data);
})
socket.on("disconnect", () => {
    console.log("Disconnected!");
})
socket.on("user:gone", (user) => {
    console.log(`[${user.name}] gone!`);
})

//console.log(socket.connected);