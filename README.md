
# Instagram Clone

A simple Instagram clone built with Node.js, Express, TypeScript, and MongoDB.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete posts
- Comment on posts
- Like and unlike posts
- Follow and unfollow users
- Real-time chat between users (text, images, and audio)

## Technologies

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Socket.io (for real-time chat)
- dotenv

## Project Structure

```
└── 📁insta-clone-api
    └── .env
    └── .gitignore
    └── README.md
    └── env.example
    └── package-lock.json
    └── package.json
    └── 📁src
        └── app.ts
        └── 📁config
            └── database.ts
        └── 📁controllers
            └── authController.ts
            └── chatController.ts
            └── commentController.ts
            └── likeController.ts
            └── postController.ts
            └── userController.ts
        └── 📁middlewares
            └── authMiddleware.ts
            └── validationMiddleware.ts
        └── 📁models
            └── Comment.ts
            └── Like.ts
            └── Message.ts
            └── Post.ts
            └── User.ts
        └── 📁routes
            └── authRoutes.ts
            └── chatRoutes.ts
            └── commentRoutes.ts
            └── likeRoutes.ts
            └── postRoutes.ts
            └── userRoutes.ts
        └── server.ts
        └── 📁utils
            └── jwt.ts
            └── validators.ts
    └── tsconfig.json
```


## Environment Variables
- **PORT**: The port number on which the server will run (default is 3000).
- **MONGO_URI**: The connection string for your MongoDB database.
- **JWT_SECRET**: The secret key for JWT authentication.

## Running the Project

    npm install
    npm run dev

**Access the API:**
The API will be running at `http://localhost:3000`

## API Endpoints

### Authentication

-   `POST /api/auth/register`: Register a new user
-   `POST /api/auth/login`: Login a user

### Users

-   `GET /api/users`: Get all users
-   `GET /api/users/:id`: Get a user by ID
-   `PATCH /api/users/:id`: Update a user
-   `DELETE /api/users/:id`: Delete a user

### Posts

-   `POST /api/posts`: Create a new post
-   `GET /api/posts`: Get all posts
-   `GET /api/posts/:id`: Get a post by ID
-   `PATCH /api/posts/:id`: Update a post
-   `DELETE /api/posts/:id`: Delete a post

### Comments

-   `POST /api/comments`: Add a comment to a post
-   `DELETE /api/comments/:id`: Delete a comment

### Likes

-   `POST /api/likes`: Like a post
-   `DELETE /api/likes/:id`: Unlike a post

### Chat

-   `POST /api/chat/message`: Send a message
-   `GET /api/chat/messages`: Get all messages in a conversation

## Future Enhancements

-   Add video support for posts
-   Implement notifications for user interactions
-   Enhance security features
-   Improve performance and scalability
-   Add more real-time features

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features, enhancements, or bug fixes.