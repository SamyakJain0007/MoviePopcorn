# 🍿 Popcorn Go - Full Stack Movie Booking App

**Popcorn Go** is a fully functional, beautifully crafted online movie booking platform built with the powerful **MERN stack** (MongoDB, Express, React, Node.js). This project demonstrates the development of a robust, scalable web application that covers key functionality from **user authentication** to **admin management** and **real-time bookings**.

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 👨‍💼 Admin Panel to manage movies and bookings
- 🎟️ Seamless Movie Booking Experience
- 👥 Advanced User Roles and Permissions
- ⚡ Performance-Optimized Design
- 🌐 Modern Responsive UI with Material UI
- 📦 State Management using Redux Toolkit

---

## 🛠️ Tech Stack

| Tech            | Description                             |
|-----------------|-----------------------------------------|
| MongoDB         | Database for storing users, movies, etc |
| Express.js      | Backend framework for APIs              |
| React.js        | Frontend JavaScript library             |
| Node.js         | JavaScript runtime environment          |
| Mongoose        | ODM for MongoDB                         |
| Redux Toolkit   | For managing app-wide state             |
| Material UI     | UI component library                    |
| Axios           | For making HTTP requests                |
| JWT             | For secure authentication               |
| Bcrypt          | For password hashing                    |

---

## 📂 Folder Structure

PopcornGo/
├── client/ # React frontend
├── server/ # Express backend
├── .env # Environment variables
├── package.json # Main config
└── README.md # This file

---

## 🔧 Installation & Setup

Follow these steps to get the project running on your local machine:

1. **Clone the repository**  
   ```bash
   git clone https://github.com/SamyakJain0007/MoviePopcorn/
   cd PopcornGo

### 2. Install dependencies

- **Client:**
```bash
cd client
npm install
```

- **Server:**
```bash
cd ../server
npm install
```

### 3. Setup environment variables  
In the `server` folder, create a `.env` file with the following content:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

### 4. Run the app

- Start the backend server:
```bash
npm start
```

- Start the frontend app (in a new terminal):
```bash
cd client
npm start
```

### 5. Open in browser:
```
http://localhost:3000
```

---

## 🧠 What I Learned

- Built a production-ready full-stack application from scratch.
- Understood role-based access control (Admin vs User).
- Learned how to connect frontend with backend using Axios.
- Secured authentication using **JWT & Bcrypt**.
- Styled the UI using **Material UI** and custom CSS.
- Applied Redux Toolkit for global state management.

👨‍💻 Author
Samyak Jain
Made with ❤️ by a full-stack developer in the making!