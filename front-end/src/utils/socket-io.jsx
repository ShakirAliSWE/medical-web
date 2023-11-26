import io from "socket.io-client";
import { SOCKET_URL } from "../config/constants";

const socket = io(SOCKET_URL);

export const socketEmit = (eventName, eventValue) => {
  socket.emit(eventName, eventValue);
};

export const socketOn = (eventName, eventCallBack = () => {}) => {
  socket.on(eventName, eventCallBack);
};

export const socketDisconnect = () => {
  socket.disconnect();
};
