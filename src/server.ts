// import express, { NextFunction, Request, Response } from "express";
// import http from "http";
// import socketIo from "socket.io";
// import { authMiddleware } from "./middlewares/authMiddleware";
// import { app } from "./app";

// const server = http.createServer(app);
// const io = new socketIo.Server(server);

// io.use((socket, next) => {
//   authMiddleware(
//     socket.request as Request,
//     {} as Response,
//     next as NextFunction
//   );
// });

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("join", (room) => {
//     socket.join(room);
//     console.log(`User joined room: ${room}`);
//   });

//   socket.on("message", (data) => {
//     io.to(data.room).emit("message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });
