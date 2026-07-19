# Social Media Backend API

A RESTful backend for a social media application built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. The application provides secure user authentication, profile management, connection requests, and personalized user feeds.

## 🚀 Features

### Authentication
- User Signup
- User Login
- User Logout
- JWT-based Authentication
- Cookie-based Session Management
- Protected Routes using Middleware

### User Profile
- View Profile
- Edit Profile
- Update Password
- Profile Validation

### Connection Requests
- Send Connection Request
- Accept Connection Request
- Reject Connection Request
- View Received Requests
- View Accepted Connections

### User Feed
- Personalized Feed
- Excludes:
  - Logged-in user
  - Already connected users
  - Pending connection requests
- Pagination Support

### Security
- Password Hashing using bcrypt
- JWT Authentication
- Input Validation
- Protected API Routes
- CORS Configuration
- HTTP-only Cookies

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- cookie-parser
- validator
- CORS

---

# 📁 Project Structure

```
Social-Media-BE
│
├── src
│   ├── config
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   ├── app.js
│   └── database.js
│
├── package.json
├── .env
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/gouravsharma199/social-media-be.git
```

Move into project

```bash
cd social-media-be
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=222
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the server

```bash
npm run dev
```

or

```bash
npm start
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login user |
| POST | `/logout` | Logout user |

---

## Profile

| Method | Endpoint |
|---------|----------|
| GET | `/profile/view` |
| PATCH | `/profile/edit` |
| PATCH | `/profile/password` |

---

## Connection Requests

| Method | Endpoint |
|---------|----------|
| POST | `/request/send/:status/:userId` |
| POST | `/request/review/:status/:requestId` |
| GET | `/user/request/received` |
| GET | `/user/request/accepted` |

---

## Feed

| Method | Endpoint |
|---------|----------|
| GET | `/user/feed?page=1&limit=10` |

---

# Database Collections

## User

```javascript
{
  firstName,
  lastName,
  emailId,
  password,
  age,
  gender,
  about,
  skills,
  photoUrl
}
```

---

## ConnectionRequest

```javascript
{
  fromUserId,
  toUserId,
  status
}
```

Status can be:

- interested
- ignored
- accepted
- rejected

---

# Authentication Flow

1. User logs in.
2. Password is verified using bcrypt.
3. JWT token is generated.
4. Token is stored in an HTTP-only cookie.
5. Protected routes verify the token using middleware.
6. User information becomes available through `req.user`.

---

# Pagination

Example:

```
GET /user/feed?page=1&limit=10
```

Returns only the requested page of users.

---

# Future Improvements

- User Search
- Profile Photo Upload
- Real-time Chat
- Notifications
- Friend Suggestions
- Email Verification
- Password Reset
- Socket.IO Integration
- Cloudinary Image Upload
- Redis Caching
- API Rate Limiting

---

# Author

**Gourav Sharma**

GitHub: https://github.com/gouravsharma199
Linkdin: https://www.linkedin.com/in/gouravsharma09

---

# License

This project is licensed under the MIT License.
