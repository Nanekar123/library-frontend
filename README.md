# Library Management System – Frontend

## Overview

The Library Management System Frontend is a React-based web application that provides an interactive interface for managing library operations.

The system supports three primary roles:

* Admin
* Author
* Reader

Each role has its own dashboard and features.

The frontend communicates with the backend REST APIs to perform authentication, book management, issue tracking, reviews, and analytics.

---

## Tech Stack

* React.js
* JavaScript (ES6+)
* React Router
* Axios
* HTML5
* CSS3

---

## Project Structure

```
library-frontend
│
├── public
├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── App.js
│
├── screenshots
│   ├── admin
│   ├── author
│   └── user
│
├── package.json
└── README.md
```

---

## Features

### Authentication

* User registration
* Login functionality
* OTP verification
* Protected routes

### Reader Features

* Browse books
* Issue books
* View issue history
* Manage personal dashboard

### Admin Features

* Admin dashboard
* Manage authors
* Monitor library operations
* View analytics

### Author Features

* Author dashboard
* Submit manuscripts
* Manage author content

### API Integration

* Axios based API layer
* Backend REST API integration

---

## Screenshots

### User Interface

Login Page
![Login](screenshots/user/login.png)

Books Listing
![Books](screenshots/user/books.png)

Issue History
![Issue History](screenshots/user/issue-history.png)

---

### Author Dashboard

Author Dashboard
![Author Dashboard](screenshots/author/dashboard.png)

Manuscript Submission
![Manuscript](screenshots/author/manuscript.png)

---

### Admin Dashboard

Admin Dashboard
![Admin Dashboard](screenshots/admin/dashboard.png)

Create Author
![Create Author](screenshots/admin/create-author.png)

Analytics Panel
![Analytics](screenshots/admin/analytics.png)

---

## Installation

Clone repository

```
git clone https://github.com/Nanekar123/library-frontend.git
cd library-frontend
```

Install dependencies

```
npm install
```

Start development server

```
npm start
```

Application runs at:

```
http://localhost:3000
```

---

## Backend API

Backend repository:

https://github.com/Nanekar123/library-backend

---

## Author

Supriya Nanekar

GitHub:
https://github.com/Nanekar123
