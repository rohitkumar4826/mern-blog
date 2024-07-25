# MERN Blog Web App

## Description

This project is a full-featured blog web application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, read, update, and delete blog posts. The application also includes user authentication and authorization, enabling users to manage their own posts securely.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete blog posts
- View a list of all blog posts
- View individual blog post details
- Responsive design for mobile and desktop

## Demo

Check out the live demo: [MERN Blog Web App Demo](#)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

    ```bash
    git clone git@github.com:rohitkumar4826/mern-blog.git
    cd mern-blog
    ```

2. **Install backend dependencies:**

    ```bash
    cd api
    npm install
    ```

3. **Install frontend dependencies:**

    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following variables:

    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

5. **Run the development server:**

    Start the backend server:

    ```bash
    cd api
    npm start
    ```

    Start the frontend development server:

    ```bash
    cd client
    npm start
    ```

6. **Open the app:**

    Navigate to `http://localhost:3000` in your browser to see the application in action.

## Usage

- Register a new user or log in with an existing account.
- Create a new blog post using the "New Post" button.
- View a list of all blog posts on the home page.
- Click on a blog post to view its details.
- Edit or delete your own blog posts.

## API Endpoints

### AUTH Routes

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/signin`: Log in an existing user.
- `POST /api/auth/google`: Log in user with google authentications.

### Blog Post Routes

- `GET /api/posts/getposts`: Get all blog posts.
- `POST /api/posts/create`: Create a new blog post (authenticated).
- `PUT /api/posts//updatepost/:postId/:userId`: Update a blog post by ID (authenticated).
- `DELETE /api/posts//deletepost/:postId/:userId`: Delete a blog post by ID (authenticated).

## Technologies Used

- **Frontend:**
  - React
  - Redux
  - Fetch
  - Tailwind CSS
  - Flowbite CSS

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JSON Web Tokens (JWT)

## Folder Structure

```plaintext
mern-blog/
├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
|   ├── utils/
│   ├── .env
│   ├── index.js
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   ├── index.css
│   │   └── main.js
│   ├── .env
│   └── package.json
├── README.md
└── package.json
