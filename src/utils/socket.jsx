import { io } from "socket.io-client";
import getToken from "./getToken";

const URL = `${import.meta.env.VITE_API_ENDPOINT}/chats`;
// const URL = `${"https://rhemar-backend.onrender.com"}/chats`;

const token = getToken("accessToken");

const socket = io({
  auth: {
    token,
    URL,
  },
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

// socket.on("connect_error", (error) => {
//   console.log(error);
// });

export default socket;
