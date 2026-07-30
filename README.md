# 🐾 Pet Adoption Platform (MERN Stack)

A full-stack **Pet Adoption Platform** built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The platform allows users to browse pets, submit adoption requests, and enables administrators to manage pets and adoption applications. It also features an **AI-powered chatbot** integrated with the **Google Gemini API** to assist users with pet care and adoption-related queries.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🛡️ JWT Authentication & Authorization
- 🐶 Browse Available Pets
- ❤️ Submit Adoption Applications
- 🏠 Shelter Pet Submission
- 👨‍💼 Admin Dashboard
- 📷 Image Upload Support
- 🤖 AI Chatbot using Google Gemini API
- 📱 Responsive User Interface
- ☁️ MongoDB Atlas Integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### AI Integration
- Google Gemini API

### Development Tools
- Visual Studio Code
- Git
- GitHub

---

## 📂 Project Structure

```
Pet-Adoption-Platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── components/
├── services/
├── IMAGES/
├── README.md
└── package.json
```

---

## ⚙️ Prerequisites

Before running the project, ensure you have installed:

- Node.js (v16 or later)
- npm
- MongoDB Atlas account (or local MongoDB)
- Git

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vijayjp2914/Pet-Adoption-Platform.git
cd Pet-Adoption-Platform
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a **.env** file inside the `backend` folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
API_KEY=your_google_gemini_api_key
```

Start the backend server:

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 👤 Admin Account

A demo administrator account is automatically created when the application starts for the first time.

Default demo credentials:

**Email**

```
Petadmin@example.com
```

**Password**

```
Admin@52
```

> **Note:** These are development/demo credentials. Change them before deploying the application in a production environment.

---

## 🤖 AI Chatbot

The application integrates the **Google Gemini API** to provide an AI-powered chatbot that assists users with:

- Pet care guidance
- Adoption-related questions
- General pet information

---

## 📸 Screenshots

You can include screenshots of:

- 🏠 Home Page
- 🐶 Pet Listing
- ❤️ Adoption Form
- 👨‍💼 Admin Dashboard
- 🤖 AI Chatbot

---

## 🔮 Future Enhancements

- Email Notifications
- Appointment Scheduling
- Pet Recommendation System
- Online Adoption Approval
- Admin Analytics Dashboard
- Multi-language Support

---

## 👨‍💻 Author

**Vijay J Patil**

- GitHub: https://github.com/vijayjp2914

- LinkedIn: https://www.linkedin.com/in/vijayp2914

- Email: vijayjp10085@gmail.com

---

## 📄 License

This project is developed for educational and learning purposes.