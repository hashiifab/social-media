# 📱 MERN Social Media App

A fullstack social media platform built with MERN stack (MongoDB, Express, React, Node.js). Users can connect with friends, share posts, and manage their profiles.

## 🛠 Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## ✨ Features

- 👥 User authentication & authorization
- 📝 Create/Edit/Delete posts
- 🤝 Add/Remove friends
- 📸 Profile management
- 🔔 Notifications

## 🧑‍💻 Run Locally

### Backend
```bash
cd server
npm install
npm start
```

### Frontend
```bash
cd client
npm install
npm start
```

## 🔐 Environment Variables

Buat file `.env` di folder server:
```
PORT=3001
MONGO_URL=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

## 📁 Folder Structure
```
mern-social-media/
├── client/       # Frontend (React)
└── server/       # Backend (Express)
    ├── models/   # MongoDB models
    └── routes/   # API endpoints
```

## 👤 Author
- GitHub: [@hashiifabdillah](https://github.com/hashiifab)
- LinkedIn: [Hashiif Abdillah](https://www.linkedin.com/in/hashiif-abdillah-665373297/)

## 📄 License
MIT