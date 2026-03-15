# Library Management System – Frontend

## Overview

The **Library Management System Frontend** is a React-based web application that provides a user interface for interacting with the digital library platform.

The application supports three roles:

* Reader
* Author
* Admin

Each role has its own dashboard and capabilities.

The frontend communicates with backend APIs to manage books, authentication, issues, analytics, and reviews.

---

## Tech Stack

* React.js
* JavaScript (ES6)
* React Router
* Axios
* HTML5
* CSS3

---

## System Architecture

```
React Frontend
      │
      │ REST API Calls
      ▼
Node.js / Express Backend
      │
      ▼
MySQL Database
```

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

## Key Features

* User authentication
* Protected routes
* Book browsing interface
* Issue history tracking
* Author manuscript submission
* Admin dashboard
* Analytics interface
* Responsive UI components

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

Run development server

```
npm start
```

Application runs at

```
http://localhost:3000
```

---

## Backend API

Backend repository

https://github.com/Nanekar123/library-backend

---

## Author

Supriya Nanekar

GitHub
https://github.com/Nanekar123
