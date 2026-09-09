# 🚀 Todo & Task Management App (MERN Stack with Vite)

A modern, fast, full-stack Task & Todo Management web application built with **React**, **Vite**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**. Designed and developed by **Rahul Prakash**.

🌐 **Live Demo:** [https://todo-rahul-dev.vercel.app/](https://todo-rahul-dev.vercel.app/)

---

## ✨ Features

- 🔐 **User Authentication**: Secure Registration, Login, and JWT (JSON Web Token) token-based session management.
- 🔑 **Password Reset**: Forgot password flow with secure email verification tokens.
- 📝 **Task Management**: Create, view, mark as completed/active, and delete tasks in real-time.
- 🔄 **Full Database Synchronization**: All task actions (add, delete, toggle completed) are instantly persisted to MongoDB Atlas.
- 📑 **Smart Filters**: Filter tasks seamlessly between **All**, **Active**, and **Completed**.
- 🛡️ **Security & Protection**: Password hashing via Bcrypt, input validation, authenticated route protection middleware, and isolated environment variables.
- 📱 **Responsive Design**: Modern, clean UI built with Tailwind CSS and Material UI icons, optimized for mobile and desktop screens.
- ⚡ **Powered by Vite**: Blazing fast development server and optimized production build.
- 🚀 **Vercel Ready**: Preconfigured for serverless full-stack deployment on Vercel.

---

## 🛠️ Tech Stack

- **Frontend**: React.js 18, Vite, Tailwind CSS, Material-UI Icons, React Router v6, Axios, Moment.js
- **Backend**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JSON Web Token (JWT) & Bcrypt
- **Email Service**: Nodemailer (Gmail SMTP)
- **Deployment**: Vercel

---

## 📁 Project Structure

```
mern-todo-app/
├── api/
│   └── index.js              # Vercel serverless entry point
├── backend/
│   ├── controllers/          # User, Task & Password Reset controllers
│   ├── middleware/           # JWT authentication middleware (requireAuth)
│   ├── models/               # Mongoose schemas (User, Task)
│   ├── routes/               # API routes (/user, /task, /forgotPassword)
│   ├── .env.example          # Backend environment template
│   ├── package.json          # Backend dependencies and scripts
│   └── server.js             # Express app setup and MongoDB connection
├── frontend/
│   ├── public/               # Static assets (favicons, logos)
│   ├── src/
│   │   ├── Axios/            # Axios API client instance
│   │   ├── components/       # UI Components (Header, Task, CreateTask, Login, etc.)
│   │   ├── context/          # React Context (Auth token & Task state)
│   │   ├── reducer/          # Task, Token, and User state reducers
│   │   ├── App.jsx           # Main React component and client routes
│   │   └── main.jsx          # Vite React entry point
│   ├── index.html            # Vite HTML template
│   ├── vite.config.js        # Vite configuration
│   ├── .env.example          # Frontend environment template
│   └── package.json          # Frontend dependencies and scripts
├── .gitignore                # Git ignore rules for security
├── package.json              # Root scripts
├── vercel.json               # Vercel deployment configuration
└── README.md                 # Project documentation
```

---

## ⚙️ Installation & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rahulprakash/mern-todo-app.git
cd mern-todo-app
```

### 2. Configure Environment Variables

#### Backend `.env`:
Navigate to `backend/` and create a `.env` file (refer to `backend/.env.example`):
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
ACCESS_TOKEN_SECRET=your_super_secret_jwt_key
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
CLIENT_URL=http://localhost:3000
GMAIL_USERNAME=your_gmail@gmail.com
GMAIL_PASSWORD=your_gmail_app_password
```

#### Frontend `.env`:
Navigate to `frontend/` and create a `.env` file (refer to `frontend/.env.example`):
```env
VITE_API_URL=http://localhost:8000/api
```

---

### 3. Install Dependencies & Run Locally

#### Run Backend Server:
```bash
cd backend
npm install
npm start
```
*Backend will run on `http://localhost:8000`.*

#### Run Frontend Client:
```bash
cd frontend
npm install
npm run dev
```
*Frontend will open on `http://localhost:3000`.*

---

## 📡 API Endpoints

### 👤 User & Auth Routes (`/api/user`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/user/register` | Register a new user | No |
| `POST` | `/api/user/login` | Login user & get JWT token | No |
| `GET` | `/api/user/getUser` | Get authenticated user profile | Yes (Bearer Token) |

### 📋 Task Routes (`/api/task`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/task/getTask` | Fetch all tasks of logged-in user | Yes (Bearer Token) |
| `POST` | `/api/task/addTask` | Create a new task | Yes (Bearer Token) |
| `POST` | `/api/task/markDone` | Toggle task completed status | Yes (Bearer Token) |
| `POST` | `/api/task/removeTask` | Delete task by ID | Yes (Bearer Token) |

### 🔒 Password Reset Routes (`/api/forgotPassword`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/forgotPassword/forgotPassword` | Request password reset email | No |
| `POST` | `/api/forgotPassword/resetPassword` | Reset password using token | No |

---

## 🚀 Deployment on Vercel

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the **Environment Variables** in Vercel project settings:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ACCESS_TOKEN_SECRET`
   - `CLIENT_URL` = `https://todo-rahul-dev.vercel.app`
   - `GMAIL_USERNAME` (Optional)
   - `GMAIL_PASSWORD` (Optional)
   - `VITE_API_URL` = `https://todo-rahul-dev.vercel.app/api`
5. Deploy! Your app will be live at `https://todo-rahul-dev.vercel.app/`.

---

## 👨‍💻 Author

**Rahul Prakash**
- Live App: [https://todo-rahul-dev.vercel.app/](https://todo-rahul-dev.vercel.app/)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
