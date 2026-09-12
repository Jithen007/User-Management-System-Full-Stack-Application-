# Full Stack User Management System

## 📌 Project Overview

A full-stack User Management System developed as part of my web development internship. The application combines a responsive frontend, Node.js and Express.js backend, REST APIs, and MySQL database to provide complete user management functionality.

## 📖 Extended Description

This project is a full-stack User Management System designed to demonstrate the complete workflow of a web application, from the user interface to backend processing and database management.

The application allows users to create, view, update, and delete user profiles. The frontend provides an interface for interacting with the application, while the backend handles requests and communicates with the MySQL database.

HTML, CSS, and JavaScript are used to develop the frontend interface. Node.js provides the backend runtime environment, and Express.js is used to create the server, manage routes, and handle REST API requests. MySQL is used as the relational database for storing and managing user information.

CRUD operations are implemented to perform the main user management functions. The application follows a structured frontend-backend-database architecture, allowing data to move between the user interface, server, and database.

Through this project, I gained practical experience in full-stack development, REST API integration, backend development, MySQL database connectivity, CRUD operations, request and response handling, and connecting frontend applications with backend services.

## 🚀 Features

* ➕ Add new users
* 👀 View user profiles
* ✏️ Update user information
* 🗑️ Delete users
* 🔄 Complete CRUD functionality
* 🌐 REST API integration
* 🗄️ MySQL database integration
* 📱 Responsive user interface
* 🔗 Frontend and backend integration

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL
* mysql2

### Tools

* VS Code
* Postman
* Git
* GitHub
* npm

## 🏗️ Application Architecture

```text
Frontend
   │
   │ HTTP Requests
   ↓
Express.js REST API
   │
   ↓
Node.js Backend
   │
   │ SQL Queries
   ↓
MySQL Database
```

## 🔄 CRUD Operations

### Create

Allows users to add new user information to the system.

### Read

Allows users to retrieve and view stored user information.

### Update

Allows existing user information to be modified.

### Delete

Allows users to remove user records from the system.

## 📡 API Functionality

The backend provides API endpoints for:

```text
GET     /api/users
GET     /api/users/:id
POST    /api/users
PUT     /api/users/:id
DELETE  /api/users/:id
```

These endpoints allow the frontend to communicate with the backend and perform user management operations.

## 📂 Project Structure

```text
user-management-system/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── routes/
│
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

> The exact folder structure may vary depending on the final project implementation.

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project folder:

```bash
cd user-management-system
```

Install the required dependencies:

```bash
npm install
```

## 🗄️ Database Setup

1. Install MySQL.
2. Create the required database.
3. Create the required user table.
4. Configure the database connection in the `.env` file.

Example:

```text
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```

⚠️ **Do not upload the `.env` file to GitHub.**

Add it to `.gitignore`:

```text
.env
node_modules/
```

## ▶️ Run the Application

Start the server:

```bash
npm start
```

The application will run on the local server address shown in the terminal.

Open the address in your browser to access the application.

## 🧪 API Testing

Postman can be used to test the backend API endpoints and verify:

* GET requests
* POST requests
* PUT requests
* DELETE requests
* Response status codes
* JSON responses
* Database operations

## 🎯 Project Objectives

* Understand full-stack application development
* Connect frontend with backend APIs
* Learn Node.js and Express.js
* Implement REST APIs
* Integrate MySQL with a backend application
* Implement CRUD operations
* Understand client-server communication
* Practice database-driven application development

## 📚 Learning Outcomes

This project provided practical experience in building a complete full-stack application. I learned how frontend interfaces communicate with backend APIs and how backend services interact with a MySQL database.

The project strengthened my understanding of frontend development, backend development, REST APIs, database integration, CRUD operations, and the overall full-stack development workflow.

## 🔐 Security

Sensitive database credentials are stored using environment variables. The `.env` file is excluded from version control to prevent credentials from being exposed.

## 👨‍💻 Developed By

**Jithen H**

### Internship Project

Developed as part of my **SaiKet Systems Web Development Internship**.
