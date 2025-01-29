

# 📚 Quiz API  
**A RESTful API for creating, managing, and attempting quizzes. Built with Node.js, Express, and MongoDB.**  

![Node.js](https://img.shields.io/badge/Node.js-16.x-green.svg) ![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey.svg) ![MongoDB](https://img.shields.io/badge/MongoDB-6.x-blue.svg)  
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) [![Contributions Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](#contributing)  

---

## 🚀 Features  
✅ Create and manage quizzes  
✅ Add questions dynamically  
✅ Start and submit quiz attempts  
✅ View quiz results and performance summary  
✅ Scalable REST API design  

---

## 🛠 Tech Stack  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
 

---

## 📌 Installation & Setup  

```bash
# Clone the repository
git clone https://github.com/Harsh-Dogney/quize-api.git

# Navigate into the project directory
cd quize-api

# Install dependencies
npm install

# Create a .env file and configure your environment variables
touch .env

# Start the development server
npm run dev
```

---

## 📡 API Endpoints  

### 🎯 Quiz Routes  

| Method | Endpoint                      | Description                  |
|--------|--------------------------------|------------------------------|
| `GET`  | `/api/quizzes/:id`            | Get quiz by ID               |
| `POST` | `/api/quizzes/`               | Create a new quiz            |
| `POST` | `/api/quizzes/:id/questions`  | Add a question to a quiz     |

### 📝 Quiz Attempt Routes  

| Method | Endpoint                         | Description                     |
|--------|----------------------------------|---------------------------------|
| `POST` | `/api/quizzes/:id/start`        | Start a quiz attempt           |
| `POST` | `/api/quizzes/:id/submit`       | Submit quiz responses          |
| `GET`  | `/api/quizzes/:id/result/:attemptId` | Get quiz result         |

### 🏆 Score & Performance  

| Method | Endpoint                                      | Description                      |
|--------|----------------------------------------------|----------------------------------|
| `GET`  | `/api/quizzes/:quizId/attempt/:userId/score` | Get user's score for a quiz     |
| `GET`  | `/api/quizzes/:quizId/attempt/:userId/summary` | Get performance summary |

---

## 🏗 Future Improvements  
- ✅ Implement JWT authentication for secure user access  
- ✅ Add real-time quiz features using WebSockets  
- ✅ Enhance error handling and validation  
- ✅ Deploy to cloud hosting (Render/Heroku)  

---
