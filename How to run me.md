# User Management System – Full Stack Application

## 📌 Project Overview

This project is a **Full Stack User Management System** developed as part of my internship Task 6.

The application combines a **front-end interface**, **Node.js/Express back-end**, and **MySQL database** to create a simple system where users can manage their profile information.

The application supports basic **CRUD operations**:

* Create a new user
* View user details
* Update user information
* Delete a user

The project demonstrates how a front-end application communicates with a back-end server and database.

---

## 🎯 Objectives

* Understand the basics of full-stack development.
* Connect the front-end with the back-end.
* Connect the back-end with a MySQL database.
* Implement CRUD operations.
* Display database information on the website.
* Build a simple and user-friendly user management interface.

---

## 🛠️ Technologies Used

### Front-End

* HTML
* CSS
* JavaScript
* Bootstrap

### Back-End

* Node.js
* Express.js

### Database

* MySQL

### Other Tools

* Visual Studio Code
* MySQL Workbench
* Postman
* Git & GitHub
* npm

---

## ✨ Features

### 👤 User Management

* Add new users
* View existing users
* Update user information
* Delete users

### 🔗 Full Stack Integration

* Front-end communicates with the Express.js server.
* Express.js handles API requests.
* MySQL stores user information.
* Data retrieved from the database is displayed on the front-end.

### 📱 User Interface

* Simple and responsive interface
* User-friendly forms
* Easy management of user information

---

## 🏗️ Application Flow

```text
User
  ↓
Front-End
  ↓
Express.js / Node.js Server
  ↓
REST API
  ↓
MySQL Database
  ↓
Response
  ↓
Front-End
```

---

## 🔄 CRUD Operations

| Operation | Description                      |
| --------- | -------------------------------- |
| Create    | Add a new user/profile           |
| Read      | View user information            |
| Update    | Modify existing user information |
| Delete    | Remove a user/profile            |

---

## 🗄️ Database

The application uses **MySQL** to store user information.

The database contains a users table that stores details required for managing user profiles.

Example fields include:

```text
id
name
email
age
bio
password
```

> Database credentials and sensitive configuration details are not included in this repository.

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project Folder

```bash
cd user-management-system
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project directory and add your database configuration.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=user_directory
PORT=3000
```

**Do not upload your `.env` file to GitHub.**

Add it to `.gitignore`:

```text
.env
node_modules/
```

### 5. Start the Server

```bash
npm start
```

The application will run locally at:

```text
http://localhost:3000
```

---

## 🧪 API Testing

The back-end APIs can be tested using **Postman**.

Example endpoints:

```text
GET     /api/users
GET     /api/users/:id
POST    /api/users
PUT     /api/users/:id
DELETE  /api/users/:id
```

These APIs allow the application to perform the required CRUD operations.

---

## 🔐 Optional Authentication

Authentication can be added as an additional feature.

Possible authentication features include:

* User registration
* User login
* Password protection
* Session or token-based authentication
* Protected user routes

---

## 📚 Skills Learned

Through this project, I gained practical experience in:

* Full Stack Web Development
* Front-End and Back-End Integration
* Node.js
* Express.js
* REST APIs
* MySQL Database Integration
* CRUD Operations
* API Testing with Postman
* Environment Variables
* Git and GitHub
* Basic Web Application Development

---

## 📸 Project Demonstration

Screenshots and demonstration videos can be added here to showcase the working application.

---

## 👨‍💻 Author

**Jithen H**

BE – Information Science and Engineering (ISE)

---

## 📄 Internship Task

**Task 6 – Build a Full Stack Application**

This project was developed as part of my internship learning journey with **SaiKet Systems**.

---

## ⭐ Acknowledgement

Thanks to **SaiKet Systems** for providing this internship opportunity and practical tasks to develop my full-stack development skills.
