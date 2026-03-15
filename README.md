# Library Management System – Frontend

## Overview

The Library Management System Frontend is a web interface built using **React.js** that allows users to interact with the library platform.

It provides different dashboards and interfaces for:

* Readers
* Authors
* Administrators

The frontend communicates with the backend APIs to manage books, user authentication, issue tracking, ratings, and other library operations.

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
src
│
├── components
│   ├── Navbar.js
│   ├── BookCard.js
│   └── ProtectedRoute.js
│
├── pages
│   ├── Welcome.js
│   ├── Login.js
│   ├── Register.js
│   ├── VerifyOtp.js
│   ├── Books.js
│   ├── IssueHistory.js
│   ├── AdminDashboard.js
│   └── AuthorDashboard.js
│
├── services
│   └── api.js
│
├── App.js
└── index.js
```

---

## Features

### Authentication

* User registration
* Login functionality
* OTP verification
* Protected routes for authenticated users

### Reader Features

* Browse books
* View issued books
* Track issue history

### Admin Features

* Admin dashboard
* Manage authors
* Monitor library operations

### Author Features

* Author dashboard
* Manuscript submission
* Track author content

### API Integration

* Axios based API service layer
* Integration with backend REST APIs

---

## Installation

### Clone repository

```
git clone https://github.com/Nanekar123/library-frontend.git
cd library-frontend
```

### Install dependencies

```
npm install
```

### Start development server

```
npm start
```

Application will run at:

```
http://localhost:3000
```

---

## Backend API

This frontend connects to the backend API:

https://github.com/Nanekar123/library-backend

---

## Future Improvements

* Responsive UI enhancements
* Advanced search filters
* Book recommendations
* Admin analytics dashboard

---

## Author

Supriya Nanekar

GitHub:
https://github.com/Nanekar123
