import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import likeRoutes from "./routes/likeRoutes";
import chatRoutes from "./routes/chatRoutes";
import connectDB from "./config/database";

// Variables
dotenv.config();
const PORT = process.env.PORT ?? 3000;

// APP
const app = express();
app.use(express.json());

// Conect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/chat", chatRoutes);

// Running app
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
