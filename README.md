# 🐾 Pet Adoption Platform (MERN Stack)

A full-stack **Pet Adoption Platform** built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The platform enables adopters to browse and adopt pets, allows shelters to submit pets for adoption, and provides administrators with tools to manage users, pets, and adoption requests. It also includes an **AI-powered chatbot** integrated with the **Google Gemini API** to assist users with pet care guidance and adoption-related queries.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🛡️ JWT Authentication & Authorization
- 🐶 Browse Available Pets
- 🔍 Search & Filter Pets
- ❤️ Submit Adoption Requests
- 🏠 Shelter Pet Submission
- 👨‍💼 Admin Dashboard
- 📷 Pet Image Upload
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

### Authentication
- JWT (JSON Web Token)

### AI Integration
- Google Gemini API

### Development Tools
- Visual Studio Code
- Git
- GitHub

---

## 📂 Project Structure

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
├── Screenshots/
├── README.md
└── package.json
```

---

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

- Node.js (v16 or later)
- npm
- MongoDB Atlas account (or local MongoDB)
- Git

---

## 📥 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/vijayjp2914/Pet-Adoption-Platform.git
cd Pet-Adoption-Platform
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a **.env** file inside the **backend** folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
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

### 3️⃣ Frontend Setup

Open a new terminal.

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

## 👤 Demo Admin Account

A demo administrator account is automatically created during the first application startup.

**Email**

```text
Petadmin@example.com
```

**Password**

```text
Admin@52
```

> **Note:** These credentials are intended only for local development and demonstration. Change them before deploying to production.

---

## 🤖 AI Chatbot

The application integrates the **Google Gemini API** to provide an AI-powered chatbot that helps users with:

- 🐶 Pet care guidance
- ❤️ Adoption-related questions
- 🩺 General pet health information
- 💡 Pet ownership tips

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

## 🔮 Future Enhancements

- 📧 Email Notifications
- 📅 Appointment Scheduling
- 🤖 AI Pet Recommendation System
- ✅ Online Adoption Approval Workflow
- 📊 Advanced Admin Analytics
- 🌐 Multi-language Support
- 📱 Progressive Web App (PWA)

---

## 👨‍💻 Author

**Vijay J Patil**

- GitHub: https://github.com/vijayjp2914
- LinkedIn: https://www.linkedin.com/in/vijayp2914
- Email: vijayjp10085@gmail.com

---

## 📄 License

This project was developed for educational and learning purposes.

If you found this project helpful, consider ⭐ starring the repository on GitHub!