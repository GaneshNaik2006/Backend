# VideoTube Backend API

A robust, scalable backend RESTful API for a video hosting platform (similar to YouTube), built using **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **JWT**, **Multer**, and **Cloudinary**.

---

## Features

- **Authentication & Authorization**:
  - Secure User Registration & Login with `bcrypt` password hashing.
  - JWT Access Token & Refresh Token authentication with automatic token renewal.
  - HTTP-Only secure cookies for token management.
  - Protected endpoints using custom authentication middleware (`verifyJWT`).

- **User Management & Profiles**:
  - Profile avatar & cover image uploads integrated with **Cloudinary**.
  - Update user profile info (fullName, email), avatar, cover image, and password.
  - Channel profile aggregation pipeline (subscribers count, subscribed-to count, subscription status).
  - User watch history tracking with nested video owner lookup aggregations.

- **File Uploads**:
  - Temporary local disk storage handling using **Multer**.
  - Automated Cloudinary media upload and local temporary file cleanup.

- **Error & Response Handling**:
  - Standardized custom API response format (`ApiResponse`).
  - Centralized error handling (`ApiError`).
  - Asynchronous controller wrapper (`asyncHandler`).

---

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **File Storage**: [Multer](https://github.com/expressjs/multer) & [Cloudinary](https://cloudinary.com/)
- **Utilities**: `dotenv`, `cookie-parser`, `cors`

---

## Project Structure

```text
├── public/
│   └── temp/              # Temporary storage for uploaded files before Cloudinary upload
├── src/
│   ├── controllers/       # Request handlers & business logic
│   │   └── user.controller.js
│   ├── db/                # Database connection configuration
│   │   └── index.js
│   ├── middlewares/       # Custom middlewares (auth, multer)
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   ├── models/            # Mongoose schemas & data models
│   │   ├── comment.model.js
│   │   ├── like.model.js
│   │   ├── playlist.model.js
│   │   ├── subscriptions.models.js
│   │   ├── tweet.model.js
│   │   ├── user.model.js
│   │   └── video.model.js
│   ├── routes/            # Express API routes
│   │   └── user.routes.js
│   ├── utils/             # Helper utilities (ApiError, ApiResponse, Cloudinary, etc.)
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── cloudinary.js
│   ├── app.js             # Express app setup & middleware declarations
│   ├── constants.js       # Global constants & DB name
│   └── index.js           # App entry point & server listener
├── .env                   # Environment variables (Git-ignored)
├── package.json
└── README.md
```

---

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net
CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your_access_token_secret_key
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Note**: Do not include semicolons (`;`) at the end of `.env` variable values.

---

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/chai-aur-backend.git
   cd chai-aur-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file based on the example above.

4. **Start the development server**:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:8000`.

---

## API Endpoints Summary

### User Routes (`/api/v1/users`)

| Method  | Endpoint            | Description                                        | Auth Required | Request Body / Files |
| :---    | :---                | :---                                               | :---:         | :--- |
| `POST`  | `/register`         | Register a new user                                | No            | `fullName`, `email`, `username`, `password`, `avatar` (file), `coverImage` (file) |
| `POST`  | `/login`            | Login user & receive JWT tokens                    | No            | `username` or `email`, `password` |
| `POST`  | `/logout`           | Logout user & clear cookies                        | Yes           | Header / Cookie |
| `POST`  | `/refresh-token`    | Refresh Access & Refresh Tokens                    | No            | `refreshToken` in Cookie / Body |
| `POST`  | `/change-password`  | Change current password                            | Yes           | `oldPassword`, `newPassword` |
| `GET`   | `/current-user`     | Fetch current logged-in user profile               | Yes           | Header / Cookie |
| `PATCH` | `/update-account`   | Update account details (fullName, email)          | No            | `fullName`, `email` |
| `PATCH` | `/avatar`           | Update user profile avatar image                   | Yes           | `avatar` (file) |
| `PATCH` | `/cover-image`      | Update user cover image                            | Yes           | `coverImage` (file) |
| `GET`   | `/c/:username`      | Get user channel profile & subscriber aggregation  | Yes           | URL Params (`username`) |
| `GET`   | `/history`          | Get user watch history with populated video info   | Yes           | Header / Cookie |

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/chai-aur-backend/issues).

---

## License

This project is licensed under the **ISC License**.
