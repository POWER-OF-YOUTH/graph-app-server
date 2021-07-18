import driver from './services/driver';
import UserMapper from "./models/user_mapper";
import User from './models/user';
/*
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
*/

async function foo() {
    const um = new UserMapper(driver);
    const user: User | null = await um.findByLogin("Aceki320");
    console.log(user);
}

foo();

//console.log(socket.connected);