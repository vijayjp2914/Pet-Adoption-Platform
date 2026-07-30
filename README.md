# 🐾 Pet Adoption Platform (MERN Stack)

A full-stack **Pet Adoption Platform** built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The platform enables users to browse pets, submit adoption requests, allows shelters to list pets for adoption, and provides administrators with tools to manage pets, users, and adoption requests.

The application also features an **AI-powered chatbot** integrated with the **Google Gemini API** to answer pet care and adoption-related questions.

---

# 🚀 Features

- 🔐 User Registration & Login
- 🛡️ JWT Authentication & Authorization
- 🐶 Browse Available Pets
- 🔍 Search & Filter Pets
- ❤️ Submit Adoption Requests
- 🏠 Shelter Pet Submission
- 👨‍💼 Admin Dashboard
- 📷 Pet Image Upload
- 🤖 AI Chatbot (Google Gemini API)
- ☁️ MongoDB Atlas Integration
- 📱 Responsive User Interface

---

# 🛠️ Tech Stack

## Frontend
- React.js
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- JWT (JSON Web Token)

## AI Integration
- Google Gemini API

## Development Tools
- Visual Studio Code
- Git
- GitHub

---

# 📂 Project Structure

```text
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
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── components/
├── services/
├── IMAGES/
├── Screenshots/
├── README.md
└── package.json
```

---

# ⚙️ Prerequisites

Before running the project, install:

- Node.js (v16 or later)
- npm
- MongoDB Atlas Account
- Git

---

# 📥 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/vijayjp2914/Pet-Adoption-Platform.git
cd Pet-Adoption-Platform
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
API_KEY=your_google_gemini_api_key
```

Start the backend:

```bash
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal.

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# 👤 Demo Admin Account

A demo administrator account is automatically created when the application starts.

**Email**

```text
Petadmin@example.com
```

**Password**

```text
Admin@52
```

> **Note:** These credentials are intended only for development and testing. Change them before deploying the application.

---

# 🤖 AI Chatbot

The platform integrates the **Google Gemini API** to provide AI-powered assistance for:

- 🐶 Pet Care Guidance
- ❤️ Adoption Queries
- 🩺 General Pet Health Information
- 💡 Pet Ownership Tips

---

# 📸 Project Screenshots

## 🏠 Home Page

![Home Page](Screenshots/Home.png)

---

## 🐶 Adopt Pets

![Adopt Pets](Screenshots/Adopt-pets.png)

---

## 📖 Pet Care Guides

![Pet Care Guides](Screenshots/Pet-care-guides.png)

---

## 👤 Adopter Registration

![Adopter Registration](Screenshots/Adopter-registration.png)

---

## 🏢 Shelter Registration

![Shelter Registration](Screenshots/Shelter-registration.png)

---

## 🔐 User Login

![User Login](Screenshots/User-login.png)

---

## 🛡️ Admin Login

![Admin Login](Screenshots/Admin-login.png)

---

## ➕ Submit Pet

![Submit Pet](Screenshots/Submit-pet.png)

---

## 📊 Admin Dashboard

![Admin Dashboard](Screenshots/Admin-dashboard.png)

---

# 🔮 Future Enhancements

- 📧 Email Notifications
- 📅 Appointment Scheduling
- 🤖 AI-Based Pet Recommendation System
- ✅ Online Adoption Approval Workflow
- 📊 Advanced Analytics Dashboard
- 🌐 Multi-language Support
- 📱 Progressive Web App (PWA)

---

# 👨‍💻 Author

**Vijay J Patil**

- **GitHub:** https://github.com/vijayjp2914
- **LinkedIn:** https://www.linkedin.com/in/vijayp2914
- **Email:** vijayjp10085@gmail.com

---

# 📄 License

This project was developed for educational and learning purposes.

If you found this project helpful, consider ⭐ starring the repository.