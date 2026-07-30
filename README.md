
# Pet Adoption Platform - MERN Stack

This is a full-stack pet adoption platform built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

- **/frontend**: Contains the React.js client-side application.
- **/backend**: Contains the Node.js, Express, and MongoDB server-side application.

---

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a MongoDB Atlas URI)

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the /backend directory and add your variables
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# API_KEY=your_google_gemini_api_key

# Start the backend server (runs on http://localhost:5000 by default)
npm start
```

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server (runs on http://localhost:3000 by default)
npm start
```

Now, open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## Admin Credentials

The admin user is seeded into the database on the first run.

- **Email**: `vijayjp10085@gmail.com`
- **Password**: `Patil@652`
